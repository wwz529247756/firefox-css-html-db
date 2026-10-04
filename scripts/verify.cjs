#!/usr/bin/env node
// verify.cjs — standalone verification of css-html-callgraph.db + json
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const SKILL = path.resolve(__dirname, '..');
const dbPath = path.join(SKILL, 'db', 'css-html-callgraph.db');
const jsonPath = path.join(SKILL, 'db', 'css-html-callgraph.json');
const db = new DatabaseSync(dbPath, { readOnly: true });

const v = [];
const check = (name, pass, detail) => v.push({ name, pass: !!pass, detail: String(detail) });

const t = db.prepare('SELECT (SELECT COUNT(*) FROM css_properties) props, (SELECT COUNT(*) FROM html_elements) elems, (SELECT COUNT(*) FROM anchors) anchors, (SELECT COUNT(*) FROM chains) chains, (SELECT COUNT(*) FROM chain_nodes) nodes').get();
check('property count = 528', t.props === 528, t.props + ' parsed from longhands+shorthands TOML');
check('element count >= 90', t.elems >= 90, t.elems + ' tags from nsHTMLTagList.inc');
check('anchors present', t.anchors > 5000, t.anchors + ' role anchors');
check('chains present', t.chains > 4000, t.chains + ' chain trees');
check('tree nodes present', t.nodes > 40000, t.nodes + ' chain tree nodes');

const bc = db.prepare('SELECT COUNT(*) AS n FROM chains WHERE terminal_boundary=1').get().n;
check('chains reach display-list boundary', bc > t.chains * 0.5, bc + '/' + t.chains + ' chains reach boundary');
const badLayer = db.prepare("SELECT COUNT(*) AS bad FROM chain_nodes WHERE terminal_boundary=1 AND layer <> 'layer:layout-display-list-boundary'").get().bad;
check('boundary terminals are boundary-layer', badLayer === 0, badLayer + ' mismatches');

const propWithRB = db.prepare("SELECT COUNT(DISTINCT ref_id) AS n FROM anchors WHERE kind='property' AND role='read_by'").get().n;
check('read_by sweep produced anchors', propWithRB > 100, propWithRB + ' properties with dedicated readers');
const mt = db.prepare(`SELECT a.symbol_name FROM anchors a JOIN css_properties p ON p.id=a.ref_id WHERE p.name='margin-top' AND a.role='store'`).get();
check('spot margin-top -> nsStyleMargin', !!mt && /nsStyleMargin/.test(mt.symbol_name), mt ? mt.symbol_name : 'missing');
const a = db.prepare(`SELECT a.symbol_name FROM anchors a JOIN html_elements e ON e.id=a.ref_id WHERE e.tag='a' AND a.role='creator'`).get();
check('spot <a> -> NS_NewHTMLAnchorElement', !!a && /NS_NewHTMLAnchorElement/.test(a.symbol_name), a ? a.symbol_name : 'missing');
const to = db.prepare(`SELECT a.symbol_name FROM anchors a JOIN css_properties p ON p.id=a.ref_id WHERE p.name='text-overflow' AND a.role='read_by'`).get();
check('spot text-overflow -> TextOverflow.cpp', !!to && /TextOverflow\.cpp/.test(to.symbol_name), to ? to.symbol_name : 'missing');

// symbol_name format: typed ('<type>:firefox/<path>...') or allow-listed prose
const badSym = db.prepare(`SELECT COUNT(*) AS n FROM anchors
  WHERE symbol_name NOT LIKE 'function:firefox/%'
    AND symbol_name NOT LIKE 'class:firefox/%'
    AND symbol_name NOT LIKE 'config:firefox/%'
    AND symbol_name NOT LIKE 'file:firefox/%'
    AND symbol_name NOT LIKE 'document:firefox/%'
    AND symbol_name NOT LIKE 'firefox/%'
    AND symbol_name NOT LIKE 'shorthand expansion -> %'
    AND symbol_name NOT LIKE 'nsCSSFrameConstructor::%'
    AND symbol_name NOT LIKE 'creator-convention:%'`).get().n;
check('symbol_name format', badSym === 0, badSym + ' anchors with malformed/unknown-format symbol_name');

// read_by anchors must carry structured source refs (not just prose in evidence)
const rbNoRef = db.prepare(`SELECT COUNT(*) AS n FROM anchors WHERE kind='property' AND role='read_by' AND (source_path IS NULL OR source_line IS NULL)`).get().n;
check('read_by source_path/line populated', rbNoRef === 0, rbNoRef + ' read_by anchors missing structured source ref');

// docs must not drift from schema: every SELECT recipe in AGENT-GUIDE §4+ stays executable
let sqlOK = true, sqlDetail = '';
try {
  const guide = fs.readFileSync(path.join(SKILL, 'docs', 'AGENT-GUIDE.md'), 'utf8');
  const blocks = [...guide.matchAll(/```sql\n([\s\S]*?)```/g)].map(m => m[1]);
  let ran = 0;
  for (const b of blocks) {
    const clean = b.replace(/^--.*$/gm, '').replace(/:name/g, "'opacity'").replace(/:tag/g, "'a'").replace(/:n\b/g, '5');
    for (const stmt of clean.split(';')) {
      const s = stmt.trim();
      if (/^(SELECT|WITH)/i.test(s)) { db.prepare(s).all(); ran++; }
    }
  }
  sqlDetail = ran + ' statements executed across ' + blocks.length + ' sql blocks';
} catch (e) { sqlOK = false; sqlDetail = e.message.slice(0, 90); }
check('AGENT-GUIDE recipes executable', sqlOK, sqlDetail);

// JSON presence + shape
let jsonOK = false, jsonDetail = 'missing';
try {
  const j = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  jsonOK = !!(j.properties && j.elements && j.properties['margin-top'] && j.properties['margin-top'].chains.length);
  jsonDetail = Object.keys(j.properties).length + ' properties, ' + Object.keys(j.elements).length + ' elements';
} catch (e) { jsonDetail = e.message.slice(0, 60); }
check('json export valid', jsonOK, jsonDetail);

let failed = 0;
for (const x of v) { console.log((x.pass ? '[PASS] ' : '[FAIL] ') + x.name + ' - ' + x.detail); if (!x.pass) failed++; }
console.log(failed ? `\n${failed} CHECK(S) FAILED` : `\nAll ${v.length} checks pass.`);
process.exit(failed ? 1 : 0);
