#!/usr/bin/env node
// query.cjs — friendly CLI over css-html-callgraph.db
// usage: node query.cjs <property|element|tree|readers|dump|struct|search|stats> [name] [role|--json]
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DB = path.join(__dirname, '..', 'db', 'css-html-callgraph.db');
const [cmd, name, role] = process.argv.slice(2);
const db = new DatabaseSync(DB, { readOnly: true });
const p = (s) => String(s == null ? '' : s).replace(/\|/g, '\\|');

function propId(name) { return db.prepare("SELECT id FROM css_properties WHERE name=?").get(name)?.id; }
function elemId(tag) { return db.prepare("SELECT id FROM html_elements WHERE tag=?").get(tag)?.id; }
function printAnchors(kind, id) {
  for (const a of db.prepare("SELECT role, symbol_name, in_graph, derived, evidence FROM anchors WHERE kind=? AND ref_id=? ORDER BY role").all(kind, id)) {
    const status = a.in_graph ? 'in-graph' : 'recorded' + (a.derived ? ', derived' : '');
    console.log(`  ${a.role.padEnd(9)} ${status.padEnd(9)} ${a.symbol_name.slice(0, 100)}`);
    if (a.evidence) console.log(`            evidence: ${a.evidence.slice(0, 110)}`);
  }
}
function printChains(kind, ref) {
  const rows = db.prepare(`SELECT id, anchor_role, terminal_boundary, (SELECT COUNT(*) FROM chain_nodes WHERE chain_id=chains.id) n FROM chains WHERE kind=? AND ref_name=? ORDER BY id`).all(kind, ref);
  if (!rows.length) { console.log('  (no chains)'); return; }
  for (const r of rows) console.log(`  ${r.anchor_role.padEnd(9)} nodes=${String(r.n).padEnd(3)} ${r.terminal_boundary ? 'reaches display-list boundary' : 'limited'}`);
}
function printTree(kind, ref, role) {
  let sql = `SELECT c.id, c.anchor_role FROM chains c WHERE c.kind=? AND c.ref_name=?`;
  const args = [kind, ref];
  if (role) { sql += ` AND c.anchor_role=?`; args.push(role); }
  const refId = kind === 'property' ? propId(ref) : elemId(ref);
  const anchorsByRole = new Map();
  if (refId != null) {
    for (const a of db.prepare('SELECT role, symbol_name, source_path, source_line FROM anchors WHERE kind=? AND ref_id=? ORDER BY id').all(kind, refId)) {
      if (!anchorsByRole.has(a.role)) anchorsByRole.set(a.role, []);
      anchorsByRole.get(a.role).push(a);
    }
  }
  for (const c of db.prepare(sql).all(...args)) {
    let anchorNote = '';
    const pool = anchorsByRole.get(c.anchor_role) || [];
    if (pool.length) {
      // pair chain <-> anchor by root source_path (chains may not exist for every anchor)
      const root = db.prepare('SELECT source_path FROM chain_nodes WHERE chain_id=? ORDER BY id LIMIT 1').get(c.id);
      let ai = root && root.source_path ? pool.findIndex(a => a.source_path === root.source_path) : -1;
      if (ai < 0) ai = 0;
      const ra = pool.splice(ai, 1)[0];
      if (ra && ra.source_path) anchorNote = `  [anchor @ ${ra.source_path.replace('firefox/', '')}:${ra.source_line ?? '-'}]`;
    }
    const nodes = db.prepare(`SELECT id, parent_row, depth, name, type, is_branch_point, branch_hint, terminal_boundary, source_path, source_line FROM chain_nodes WHERE chain_id=? ORDER BY id`).all(c.id);
    const byRow = new Map(nodes.map(n => [n.id, n]));
    const kids = new Map(); const roots = [];
    for (const n of nodes) {
      if (n.parent_row === null || !byRow.has(n.parent_row)) roots.push(n);
      else { if (!kids.has(n.parent_row)) kids.set(n.parent_row, []); kids.get(n.parent_row).push(n); }
    }
    console.log(`\n[${c.anchor_role}] (${nodes.length} nodes${c.terminal_boundary ? ', reaches display-list boundary' : ''})${anchorNote}`);
    const draw = (n, pre, last) => {
      let label = n.name.slice(0, 62);
      if (n.source_path) label += `  @ ${n.source_path.replace('firefox/', '')}:${n.source_line ?? '-'}`;
      const marks = [];
      if (n.is_branch_point) marks.push('[branch: ' + n.branch_hint + ']');
      if (n.terminal_boundary) marks.push('<<== BOUNDARY');
      if (marks.length) label += '  ' + marks.join(' ');
      console.log(pre + (last ? '`-- ' : '|-- ') + label);
      const kk = kids.get(n.id) || [];
      kk.forEach((k, i) => draw(k, pre + (last ? '    ' : '|   '), i === kk.length - 1));
    };
    for (const r of roots) draw(r, '', true);
  }
}

switch (cmd) {
  case 'property': {
    if (!name) { console.log('usage: query.cjs property <name>'); break; }
    const rec = db.prepare('SELECT * FROM css_properties WHERE name=?').get(name);
    if (!rec) { console.log('not found:', name); break; }
    console.log(`property ${rec.name} (${rec.kind})`);
    console.log(`  style_struct: ${rec.style_struct}  |  gecko_ffi_name: ${rec.gecko_ffi_name}`);
    console.log(`  initial: ${rec.initial_value || '-'}  |  animatable: ${rec.animatable ? 'yes' : 'no'}${rec.pref ? '  |  pref: ' + rec.pref : ''}`);
    if (rec.spec) console.log(`  spec: ${rec.spec}`);
    if (rec.sub_properties && rec.sub_properties !== '[]') console.log(`  sub_properties: ${rec.sub_properties}`);
    console.log('--- anchors ---'); printAnchors('property', rec.id);
    console.log('--- chains ---'); printChains('property', rec.name);
    break;
  }
  case 'element': {
    if (!name) { console.log('usage: query.cjs element <tag>'); break; }
    const rec = db.prepare('SELECT * FROM html_elements WHERE tag=?').get(name);
    if (!rec) { console.log('not found:', name); break; }
    console.log(`element <${rec.tag}>  class: ${rec.classname}  creator: ${rec.creator_fn}`);
    console.log(`  webidl: ${rec.webidl_interface}  |  class_path: ${rec.class_path || '-'}`);
    console.log('--- anchors ---'); printAnchors('element', rec.id);
    console.log('--- chains ---'); printChains('element', rec.tag);
    break;
  }
  case 'tree': {
    if (!name) { console.log('usage: query.cjs tree <name> [role]'); break; }
    if (propId(name)) printTree('property', name, role);
    else if (elemId(name)) printTree('element', name, role);
    else console.log('not found:', name);
    break;
  }
  case 'readers': {
    if (!name) { console.log('usage: query.cjs readers <property>'); break; }
    const id = propId(name);
    if (!id) { console.log('not found:', name); break; }
    const rows = db.prepare("SELECT symbol_name, evidence FROM anchors WHERE kind='property' AND ref_id=? AND role='read_by'").all(id);
    if (!rows.length) console.log(`${name}: no dedicated reader in layout/ (see evidence on other anchors)`);
    for (const r of rows) console.log(' ', r.symbol_name, r.evidence ? '| ' + r.evidence.slice(0, 90) : '');
    break;
  }
  case 'dump': {
    const jsonMode = process.argv.slice(2).includes('--json');
    if (!name || name.startsWith('--')) { console.log('usage: query.cjs dump <name> [--json]'); break; }
    let kind = 'property';
    let rec = db.prepare('SELECT * FROM css_properties WHERE name=?').get(name);
    if (!rec) { kind = 'element'; rec = db.prepare('SELECT * FROM html_elements WHERE tag=?').get(name); }
    if (!rec) { console.log('not found:', name); break; }
    const refName = kind === 'property' ? rec.name : rec.tag;
    const anchors = db.prepare('SELECT role, symbol_name, in_graph, derived, evidence, source_path, source_line FROM anchors WHERE kind=? AND ref_id=? ORDER BY role, id').all(kind, rec.id);
    const chains = db.prepare('SELECT id, anchor_role, terminal_boundary FROM chains WHERE kind=? AND ref_name=? ORDER BY id').all(kind, refName)
      .map(c => ({ role: c.anchor_role, terminal_boundary: !!c.terminal_boundary,
        nodes: db.prepare('SELECT depth, parent_row AS parent, name, type, layer, source_path, source_line, source_snippet, is_branch_point, branch_hint, terminal_boundary FROM chain_nodes WHERE chain_id=? ORDER BY id').all(c.id) }));
    if (jsonMode) { console.log(JSON.stringify({ kind, record: rec, anchors, chains }, null, 1)); break; }
    if (kind === 'property') {
      console.log(`property ${rec.name} (${rec.kind})`);
      console.log(`  style_struct: ${rec.style_struct}  |  gecko_ffi_name: ${rec.gecko_ffi_name}`);
      console.log(`  initial: ${rec.initial_value || '-'}  |  animatable: ${rec.animatable ? 'yes' : 'no'}${rec.pref ? '  |  pref: ' + rec.pref : ''}`);
      if (rec.spec) console.log(`  spec: ${rec.spec}`);
    } else {
      console.log(`element <${rec.tag}>  class: ${rec.classname}  creator: ${rec.creator_fn}`);
      console.log(`  webidl: ${rec.webidl_interface}  |  class_path: ${rec.class_path || '-'}`);
    }
    console.log('--- anchors ---');
    for (const a of anchors) {
      const status = a.in_graph ? 'in-graph' : 'recorded' + (a.derived ? ', derived' : '');
      const ref = a.source_path ? ` @ ${a.source_path.replace('firefox/', '')}:${a.source_line ?? '-'}` : '';
      console.log(`  ${a.role.padEnd(9)} ${status.padEnd(9)} ${a.symbol_name.slice(0, 90)}${ref}`);
      if (a.evidence) console.log(`            evidence: ${a.evidence.slice(0, 110)}`);
    }
    console.log('--- chains (full, with snippets) ---');
    for (const c of chains) {
      console.log(`\n[${c.role}] (${c.nodes.length} nodes${c.terminal_boundary ? ', reaches display-list boundary' : ''})`);
      for (const n of c.nodes) {
        console.log(`${'  '.repeat(n.depth || 0)}- ${n.name} @ ${n.source_path ? n.source_path.replace('firefox/', '') + ':' + (n.source_line ?? '-') : '?'}${n.terminal_boundary ? ' [BOUNDARY]' : ''}${n.is_branch_point ? ' [branch: ' + n.branch_hint + ']' : ''}`);
        if (n.source_snippet) for (const l of n.source_snippet.split(/\r?\n/)) console.log(`${'  '.repeat((n.depth || 0) + 1)}| ${l.slice(0, 120)}`);
      }
    }
    break;
  }
  case 'struct': {
    if (!name) { console.log('usage: query.cjs struct <StyleStruct e.g. Margin>'); break; }
    for (const r of db.prepare('SELECT name, kind, gecko_ffi_name FROM css_properties WHERE style_struct LIKE ? ORDER BY name').all('%' + name + '%'))
      console.log(`  ${r.name} (${r.kind}) -> ${r.gecko_ffi_name}`);
    break;
  }
  case 'search': {
    if (!name) { console.log('usage: query.cjs search <pattern>'); break; }
    console.log('-- properties --');
    for (const r of db.prepare("SELECT name, kind FROM css_properties WHERE name LIKE ? ORDER BY name").all('%' + name + '%'))
      console.log(`  ${r.name} (${r.kind})`);
    console.log('-- elements --');
    for (const r of db.prepare("SELECT tag, classname FROM html_elements WHERE tag LIKE ? OR classname LIKE ? ORDER BY tag").all('%' + name + '%', '%' + name + '%'))
      console.log(`  ${r.tag} -> ${r.classname}`);
    break;
  }
  case 'stats': {
    const t = db.prepare('SELECT (SELECT COUNT(*) FROM css_properties) props, (SELECT COUNT(*) FROM html_elements) elems, (SELECT COUNT(*) FROM anchors) anchors, (SELECT COUNT(*) FROM chains) chains, (SELECT COUNT(*) FROM chain_nodes) nodes').get();
    const bc = db.prepare('SELECT COUNT(*) AS n FROM chains WHERE terminal_boundary=1').get().n;
    console.log(`properties: ${t.props}  |  elements: ${t.elems}`);
    console.log(`anchors: ${t.anchors}  |  chains: ${t.chains} (${bc} reach display-list boundary)  |  tree nodes: ${t.nodes}`);
    console.log('branch hints:');
    for (const r of db.prepare('SELECT branch_hint, COUNT(*) n FROM chain_nodes WHERE is_branch_point=1 GROUP BY branch_hint ORDER BY n DESC').all())
      console.log(`  ${String(r.n).padStart(5)}  ${r.branch_hint}`);
    break;
  }
  default:
    console.log('usage: node query.cjs <property|element|tree|readers|dump|struct|search|stats> [name] [role|--json]');
}
