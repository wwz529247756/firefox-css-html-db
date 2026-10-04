#!/usr/bin/env node
// C4: build SQLite database + JSON export + verification + completeness matrix
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');
const OUT = path.join(__dirname, '..', '..', 'db');
const ROOT = path.join(__dirname, '..', '..');

const props = JSON.parse(fs.readFileSync(path.join(__dirname, 'properties-linked.json'), 'utf8'));
const elements = JSON.parse(fs.readFileSync(path.join(__dirname, 'elements-linked.json'), 'utf8'));
const chains = JSON.parse(fs.readFileSync(path.join(__dirname, 'chains.json'), 'utf8'));
const kg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'knowledge-graph.json'), 'utf8'));

// ---------- SQLite ----------
const dbPath = path.join(OUT, 'css-html-callgraph.db');
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
const db = new DatabaseSync(dbPath);
db.exec(`
PRAGMA journal_mode = WAL;
CREATE TABLE css_properties(
  id INTEGER PRIMARY KEY, name TEXT, kind TEXT, style_struct TEXT,
  gecko_ffi_name TEXT, initial_value TEXT, animatable INT, engines TEXT,
  pref TEXT, spec TEXT, sub_properties TEXT);
CREATE TABLE html_elements(
  id INTEGER PRIMARY KEY, tag TEXT, classname TEXT, webidl_interface TEXT,
  creator_fn TEXT, class_path TEXT);
CREATE TABLE anchors(
  id INTEGER PRIMARY KEY, kind TEXT, ref_id INTEGER, role TEXT, symbol_name TEXT,
  graph_node_id TEXT, in_graph INT, derived INT, evidence TEXT, source_path TEXT, source_line INT);
CREATE INDEX idx_anchors ON anchors(kind, ref_id, role);
CREATE TABLE chains(
  id INTEGER PRIMARY KEY, kind TEXT, ref_name TEXT, anchor_role TEXT, terminal_boundary INT);
CREATE TABLE chain_nodes(
  id INTEGER PRIMARY KEY, chain_id INTEGER REFERENCES chains(id), node_id TEXT,
  parent_row INTEGER, depth INT, name TEXT, type TEXT, layer TEXT,
  source_path TEXT, source_line INT, source_snippet TEXT,
  is_branch_point INT, branch_hint TEXT, terminal_boundary INT);
CREATE INDEX idx_chain_nodes ON chain_nodes(chain_id, depth);
CREATE VIEW property_chain_summary AS
  SELECT p.name, p.kind, c.anchor_role, c.terminal_boundary, COUNT(cn.id) AS tree_nodes
  FROM chains c JOIN css_properties p ON p.name = c.ref_name AND c.kind='property'
  LEFT JOIN chain_nodes cn ON cn.chain_id = c.id GROUP BY c.id;
CREATE VIEW element_chain_summary AS
  SELECT e.tag, e.classname, c.anchor_role, c.terminal_boundary, COUNT(cn.id) AS tree_nodes
  FROM chains c JOIN html_elements e ON e.tag = c.ref_name AND c.kind='element'
  LEFT JOIN chain_nodes cn ON cn.chain_id = c.id GROUP BY c.id;
`);

const insP = db.prepare('INSERT INTO css_properties(name,kind,style_struct,gecko_ffi_name,initial_value,animatable,engines,pref,spec,sub_properties) VALUES (?,?,?,?,?,?,?,?,?,?)');
const insE = db.prepare('INSERT INTO html_elements(tag,classname,webidl_interface,creator_fn,class_path) VALUES (?,?,?,?,?)');
const insA = db.prepare('INSERT INTO anchors(kind,ref_id,role,symbol_name,graph_node_id,in_graph,derived,evidence,source_path,source_line) VALUES (?,?,?,?,?,?,?,?,?,?)');
const insC = db.prepare('INSERT INTO chains(kind,ref_name,anchor_role,terminal_boundary) VALUES (?,?,?,?)');
const insN = db.prepare('INSERT INTO chain_nodes(chain_id,node_id,parent_row,depth,name,type,layer,source_path,source_line,source_snippet,is_branch_point,branch_hint,terminal_boundary) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');

db.exec('BEGIN');
const propId = new Map();
props.forEach((p, i) => {
  insP.run(p.name, p.kind, p.style_struct, p.gecko_ffi_name, p.initial_value, p.animatable ? 1 : 0, p.engines, p.pref, p.spec, JSON.stringify(p.sub_properties));
  propId.set(p.name, i + 1);
});
const elemId = new Map();
elements.forEach((e, i) => {
  insE.run(e.tag, e.classname || '', e.webidl_interface || '', e.creator_fn || '', e.class_path || '');
  elemId.set(e.tag, i + 1);
});
for (const p of props) for (const a of p.anchors) insA.run('property', propId.get(p.name), a.role, a.symbol_name, a.graph_node_id, a.in_graph, a.derived, a.evidence || '', a.source_path || a.read_by_path || null, a.source_line || a.read_by_line || null);
for (const e of elements) for (const a of e.anchors) insA.run('element', elemId.get(e.tag), a.role, a.symbol_name, a.graph_node_id, a.in_graph, a.derived, a.evidence || '', a.source_path || null, a.source_line || null);
for (const c of chains) {
  const cid = Number(insC.run(c.kind, (c.ref_name ?? c.ref), c.anchor_role, c.terminal_boundary ? 1 : 0).lastInsertRowid);
  // two-pass with explicit row mapping by index
  const rowByIdx = new Map();
  c.tree.forEach((n, i) => {
    const parentIdx = n.parent_id === null ? null : c.tree.findIndex(t => t.node_id === n.parent_id);
    const parentRow = parentIdx === null || parentIdx < 0 || parentIdx >= i ? null : rowByIdx.get(parentIdx) ?? null;
    const r = Number(insN.run(cid, n.node_id, parentRow, n.depth, n.name, n.type, n.layer || '',
      n.source_ref ? n.source_ref.path : null, n.source_ref ? n.source_ref.line : null,
      n.source_ref ? n.source_ref.snippet : null, n.is_branch_point ? 1 : 0, n.branch_hint,
      n.terminal_boundary ? 1 : 0).lastInsertRowid);
    rowByIdx.set(i, r);
  });
}
db.exec('COMMIT');

// ---------- JSON export (nested trees) ----------
function buildNested(tree) {
  const byParent = new Map();
  tree.forEach((n, i) => {
    const k = n.parent_id === null ? '__root__' : n.parent_id + '#' + i;
  });
  // index children by parent node_id (first occurrence wins as parent)
  const children = new Map();
  const roots = [];
  const idxToNode = new Map();
  tree.forEach((n, i) => {
    const node = {
      name: n.name, type: n.type, layer: n.layer, node_id: n.node_id, depth: n.depth,
      source_ref: n.source_ref ? { path: n.source_ref.path, line: n.source_ref.line } : null,
      is_branch_point: !!n.is_branch_point, branch_hint: n.branch_hint || undefined,
      terminal_boundary: !!n.terminal_boundary, children: [],
    };
    idxToNode.set(i, node);
    if (n.parent_id === null) roots.push(node);
    else {
      if (!children.has(n.parent_id)) children.set(n.parent_id, []);
      children.get(n.parent_id).push(node);
    }
  });
  for (const [pid, kids] of children) {
    const parentIdx = tree.findIndex(t => t.node_id === pid);
    if (parentIdx >= 0) idxToNode.get(parentIdx).children = kids;
    else roots.push(...kids);
  }
  return roots[0] || null;
}
const jsonOut = {
  version: '1.0.0', generated: new Date().toISOString(),
  graph: { version: kg.project.version, git: kg.project.gitCommitHash, nodes: kg.nodes.length, edges: kg.edges.length },
  properties: {}, elements: {},
};
for (const p of props) {
  jsonOut.properties[p.name] = {
    kind: p.kind, style_struct: p.style_struct, gecko_ffi_name: p.gecko_ffi_name,
    initial_value: p.initial_value, animatable: p.animatable, pref: p.pref, spec: p.spec,
    sub_properties: p.sub_properties,
    anchors: p.anchors.map(a => ({ role: a.role, symbol: a.symbol_name, in_graph: !!a.in_graph, derived: !!a.derived, evidence: a.evidence || undefined })),
    chains: chains.filter(c => c.kind === 'property' && (c.ref_name ?? c.ref) === p.name)
      .map(c => ({ role: c.anchor_role, terminal_boundary: c.terminal_boundary, tree: buildNested(c.tree) })),
  };
}
for (const e of elements) {
  if (!e.anchors.length) continue;
  jsonOut.elements[e.tag] = {
    classname: e.classname, webidl_interface: e.webidl_interface, creator_fn: e.creator_fn,
    anchors: e.anchors.map(a => ({ role: a.role, symbol: a.symbol_name, in_graph: !!a.in_graph, evidence: a.evidence || undefined })),
    chains: chains.filter(c => c.kind === 'element' && (c.ref_name ?? c.ref) === e.tag)
      .map(c => ({ role: c.anchor_role, terminal_boundary: c.terminal_boundary, tree: buildNested(c.tree) })),
  };
}
fs.writeFileSync(path.join(OUT, 'css-html-callgraph.json'), JSON.stringify(jsonOut));

// ---------- completeness matrix ----------
const matrix = [];
for (const p of props) {
  const rb = p.anchors.filter(a => a.role === 'read_by');
  matrix.push({ kind: 'property', name: p.name, consumers: rb.length ? rb.map(a => a.evidence.split(' found at ')[1] || a.symbol_name).join('; ') : (p.anchors.some(a => a.role === 'store') ? 'no dedicated reader found' : 'n/a'), in_scope: rb.length ? 'yes' : 'no-readers' });
}
for (const e of elements) {
  if (!e.anchors.length) continue;
  const fb = e.anchors.find(a => a.role === 'framed_by');
  matrix.push({ kind: 'element', name: e.tag, consumers: fb ? fb.evidence : '', in_scope: fb && fb.in_graph ? 'yes' : 'recorded' });
}
const csv = ['kind,name,consumers,in_scope', ...matrix.map(m => [m.kind, m.name, '"' + m.consumers.replace(/"/g, '""') + '"', m.in_scope].join(','))].join('\n');
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'completeness-matrix.csv'), csv);

// ---------- verification ----------
const v = [];
const check = (name, pass, detail) => v.push({ name, pass, detail });
const pWithRB = props.filter(p => p.anchors.some(a => a.role === 'read_by')).length;
const pNoReader = props.filter(p => !p.anchors.some(a => a.role === 'read_by')).length;
check('property coverage', props.length === 528, props.length + '/528 parsed from TOML');
check('properties with read_by', pWithRB > 0, pWithRB + ' with dedicated readers; ' + pNoReader + ' without (recorded)');
check('element coverage', elements.length >= 90, elements.length + ' tags from nsHTMLTagList.inc');
const mt = jsonOut.properties['margin-top'];
check('spot margin-top', !!(mt && mt.anchors.some(a => a.role === 'store' && /nsStyleMargin/.test(a.symbol))), 'store=' + (mt ? mt.anchors.find(a => a.role === 'store')?.symbol : 'MISSING'));
const a = jsonOut.elements['a'];
check('spot <a>', !!(a && a.anchors.some(x => x.role === 'creator' && /NS_NewHTMLAnchorElement/.test(x.symbol))), '');
const to = props.find(p => p.name === 'text-overflow');
check('spot text-overflow read_by', !!(to && to.anchors.some(x => x.role === 'read_by' && /TextOverflow\.cpp/.test(x.symbol_name))), to ? to.anchors.find(x => x.role === 'read_by')?.symbol_name : '');
const lc = props.find(p => p.name === 'line-clamp');
check('spot line-clamp read_by', !!(lc && lc.anchors.some(x => x.role === 'read_by' && /nsBlockFrame/.test(x.symbol_name))), lc ? lc.anchors.find(x => x.role === 'read_by')?.symbol_name : '');
const boundaryTerm = chains.filter(c => c.terminal_boundary).length;
check('chains reach boundary', boundaryTerm > chains.length * 0.5, boundaryTerm + '/' + chains.length + ' chains reach display-list boundary');
const srHave = chains.reduce((n, c) => n + c.tree.filter(t => t.source_ref && t.source_ref.line).length, 0);
const srTotal = chains.reduce((n, c) => n + c.tree.length, 0);
check('source_ref hit-rate >= 90%', srHave / srTotal >= 0.9, (100 * srHave / srTotal).toFixed(1) + '% (' + srHave + '/' + srTotal + ')');
let treeOK = true;
for (const c of chains) {
  const rows = new Map(c.tree.map((t, i) => [i, t]));
  for (const [i, t] of c.tree.entries()) {
    if (t.parent_id === null) continue;
    const pi = c.tree.findIndex(x => x.node_id === t.parent_id);
    if (pi < 0 || pi >= i) { treeOK = false; break; }
  }
  if (!treeOK) break;
}
check('tree integrity', treeOK, 'every parent row precedes child');
const failed = v.filter(x => !x.pass);

const report = ['# Phase C - Database Verification Report', '', 'Generated: ' + new Date().toISOString(), ''];
for (const x of v) report.push((x.pass ? '[PASS]' : '[FAIL]') + ' **' + x.name + '** - ' + x.detail);
report.push('');
report.push('- properties: ' + props.length + ' (longhand ' + props.filter(p => p.kind === 'longhand').length + ' / shorthand ' + props.filter(p => p.kind === 'shorthand').length + ')');
report.push('- elements: ' + elements.length + ' (concrete ' + elements.filter(e => e.anchors.length).length + ')');
report.push('- chains: ' + chains.length + ' (tree nodes ' + srTotal + '); boundary-reaching: ' + boundaryTerm);
report.push('- completeness matrix: completeness-matrix.csv (' + matrix.length + ' rows)');
fs.writeFileSync(path.join(OUT, 'db-verification.md'), report.join('\n'));

console.log('ISSUES (failed checks):', failed.length);
for (const f of failed) console.log('  [FAIL]', f.name, '-', f.detail);
console.log('checks passed:', v.length - failed.length, '/', v.length);
console.log('db size:', (fs.statSync(dbPath).size / 1048576).toFixed(1) + ' MB');
console.log('json size:', (fs.statSync(path.join(OUT, 'css-html-callgraph.json')).size / 1048576).toFixed(1) + ' MB');

