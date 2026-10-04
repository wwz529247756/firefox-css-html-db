#!/usr/bin/env node
// draw-chains.cjs <propertyName|elementTag> [--out <file|->]   ('-' = print to stdout)
// Renders all chain trees of a CSS property or HTML element from the database as markdown.
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const args = process.argv.slice(2);
const ref = args.find(a => !a.startsWith('--'));
const outIdx = args.indexOf('--out');
const OUT = outIdx >= 0 ? args[outIdx + 1] : null;
if (!ref) { console.error('usage: node draw-chains.cjs <name> [--out <file|->]'); process.exit(1); }

const db = new DatabaseSync(path.join(__dirname, '..', 'db', 'css-html-callgraph.db'), { readOnly: true });
const PIN = 'Firefox 157.0.1 @ 47c5f402c8d3a5369f1fb1b6cd61b0bb92725af1 (branch release)';

let kind = 'property';
let rec = db.prepare('SELECT id, name, kind, style_struct AS styleStruct, gecko_ffi_name AS ffi, initial_value AS init, animatable, pref, spec FROM css_properties WHERE name=?').get(ref);
if (!rec) {
  rec = db.prepare('SELECT id, tag AS name, classname, webidl_interface AS webidl, creator_fn AS creator FROM html_elements WHERE tag=?').get(ref);
  if (!rec) { console.error('not found:', ref); process.exit(1); }
  kind = 'element';
}
const anchors = db.prepare('SELECT role, symbol_name, in_graph, derived, evidence FROM anchors WHERE kind=? AND ref_id=? ORDER BY role').all(kind, rec.id);
const chains = db.prepare(`SELECT id, anchor_role, terminal_boundary, (SELECT COUNT(*) FROM chain_nodes WHERE chain_id=chains.id) n
FROM chains WHERE kind=? AND ref_name=? ORDER BY id`).all(kind, ref);

const md = [];
md.push('# Chain Trees — `' + ref + '`');
md.push('');
md.push('Generated: ' + new Date().toISOString().slice(0, 10) + ' · Source pinned: ' + PIN);
md.push('');

if (kind === 'property') {
  md.push('**Record:** ' + rec.kind + ' · style_struct: `' + rec.styleStruct + '` · gecko_ffi_name: `' + rec.ffi + '` · initial: `' + rec.init + '` · animatable: ' + (rec.animatable ? 'yes' : 'no') + (rec.pref ? ' · pref: `' + rec.pref + '`' : '') + (rec.spec ? ' · spec: ' + rec.spec : ''));
} else {
  md.push('**Record:** tag `' + rec.name + '` · class: ' + rec.classname + ' · creator: ' + rec.creator + ' · webidl: ' + rec.webidl);
}
md.push('');

md.push('## Anchors (' + anchors.length + ')');
md.push('');
md.push('| Role | Symbol | Status |');
md.push('|---|---|---|');
for (const a of anchors) {
  md.push('| ' + a.role + ' | `' + a.symbol_name.slice(0, 110) + '` | ' + (a.in_graph ? 'in-graph' : 'recorded') + (a.derived ? ' (derived)' : '') + ' |');
}
md.push('');

md.push('## Chain trees (' + chains.length + ')');
md.push('');
for (const c of chains) {
  const nodes = db.prepare(`SELECT id, parent_row, depth, name, type, is_branch_point, branch_hint, terminal_boundary, source_path, source_line
  FROM chain_nodes WHERE chain_id=? ORDER BY id`).all(c.id);
  const byRow = new Map(nodes.map(n => [n.id, n]));
  const kids = new Map();
  const roots = [];
  for (const n of nodes) {
    if (n.parent_row === null || !byRow.has(n.parent_row)) roots.push(n);
    else { if (!kids.has(n.parent_row)) kids.set(n.parent_row, []); kids.get(n.parent_row).push(n); }
  }
  md.push('### ' + c.anchor_role + ' (' + c.n + ' node' + (c.n === 1 ? '' : 's') + (c.terminal_boundary ? ', reaches display-list boundary' : '') + ')');
  md.push('');
  md.push('```text');
  const short = (s) => { const b = String(s).split('/').pop(); return b.length > 52 ? b.slice(0, 49) + '...' : b; };
  const draw = (n, prefix, last) => {
    let label = short(n.name) + '  @ ' + (n.source_path ? short(n.source_path) + ':' + (n.source_line || '-') : '?');
    const marks = [];
    if (n.is_branch_point) marks.push('[branch: ' + n.branch_hint + ']');
    if (n.terminal_boundary) marks.push('<<== BOUNDARY');
    if (marks.length) label += '  ' + marks.join(' ');
    md.push(prefix + (last ? '`-- ' : '|-- ') + label);
    const kk = kids.get(n.id) || [];
    kk.forEach((k, i) => draw(k, prefix + (last ? '    ' : '|   '), i === kk.length - 1));
  };
  for (const r of roots) draw(r, '', true);
  md.push('```');
  md.push('');
}

// evidence footnotes for recorded anchors with member-sweep evidence
const ev = anchors.filter(a => a.evidence);
if (ev.length) {
  md.push('## Evidence notes');
  md.push('');
  for (const a of ev) md.push('- **' + a.role + '**: ' + a.evidence);
  md.push('');
}

if (OUT === '-') {
  console.log(md.join('\n'));
} else {
  const file = OUT || path.join(process.cwd(), ref + '-chains.md');
  fs.writeFileSync(file, md.join('\n'));
  console.log('written:', file, '(' + (fs.statSync(file).size / 1024).toFixed(1) + ' KB,', chains.length, 'trees)');
}
