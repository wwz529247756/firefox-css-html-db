#!/usr/bin/env node
// C1: extract CSS property records + role anchors from TOML database and source sweeps
const fs = require('fs');
const path = require('path');
const FX = process.env.FIREFOX_SRC;
if (!FX) { console.error('FIREFOX_SRC is not set — point it at the pinned Firefox checkout (157.0.1 @ 47c5f402c8). Run scripts/check-env.cjs for acquisition help.'); process.exit(1); }
const OUT = __dirname;
fs.mkdirSync(OUT, { recursive: true });

// ---------- parse longhands.toml / shorthands.toml ----------
function parseTomlProps(rel) {
  const text = fs.readFileSync(path.join(FX, rel), 'utf8');
  const blocks = [];
  let cur = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    const sec = /^\[(-?[a-zA-Z0-9-]+)\]$/.exec(line);
    if (sec) { cur = { name: sec[1], fields: {} }; blocks.push(cur); continue; }
    if (!cur || !line || line.startsWith('#')) continue;
    const kv = /^([a-z_]+)\s*=\s*(.+?)\s*,?$/.exec(line);
    if (kv) cur.fields[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1');
  }
  return blocks;
}
const camel = (ident) => ident.split('-').map(s => s ? s[0].toUpperCase() + s.slice(1) : s).join('');
const snake = (name) => name.replace(/-/g, '_');

const longhands = parseTomlProps('servo/components/style/properties/longhands.toml');
const shorthands = parseTomlProps('servo/components/style/properties/shorthands.toml').map(b => ({
  ...b,
  sub: (b.fields.sub_properties || '').split(/[\s,"]+/).filter(s => s && s !== 'sub_properties' && s.startsWith('"') === false && !/^(none|auto)$/i.test(s) === false ? s : s).map(s => s.replace(/["[\]]/g, '').trim()).filter(Boolean),
}));

// ---------- graph node id lookup ----------
const kg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'knowledge-graph.json'), 'utf8'));
const idSet = new Set(kg.nodes.map(n => n.id));
const byId = id => (idSet.has(id) ? id : null);
const G = (id) => ({ graph_node_id: byId(id) || null, in_graph: byId(id) ? 1 : 0 });

// ---------- exposure getters ----------
const cdsH = fs.readFileSync(path.join(FX, 'layout/style/nsComputedDOMStyle.h'), 'utf8');
const getters = new Set();
for (const m of cdsH.matchAll(/void\s+DoGet([A-Za-z0-9]+)\s*\(/g)) getters.add(m[1]);

// ---------- read_by sweep across layout/{base,generic,painting} ----------
const sweepDirs = ['layout/base', 'layout/generic', 'layout/painting'];
function* walk(dir) {
  for (const e of fs.readdirSync(path.join(FX, dir), { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/(test|crashtest|gtest)/i.test(e.name)) yield* walk(p); }
    else if (/\.(cpp|h)$/.test(e.name)) yield p;
  }
}
const sweepFiles = [];
for (const d of sweepDirs) { try { sweepFiles.push(...walk(d)); } catch (_) {} }
const sweepText = new Map(sweepFiles.map(f => [f, fs.readFileSync(path.join(FX, f), 'utf8')]));

function readBy(ffiName) {
  const hits = [];
  for (const [f, text] of sweepText) {
    let idx = -1;
    for (let i = 0; i < text.length; i++) {
      idx = text.indexOf(ffiName, i);
      if (idx < 0) break;
      const before = text[idx - 1] || ' ';
      const after = text[idx + ffiName.length] || ' ';
      if (!/[A-Za-z0-9_]/.test(before) && !/[A-Za-z0-9_]/.test(after)) {
        const line = text.slice(0, idx).split('\n').length;
        hits.push({ file: 'firefox/' + f.replace(/\\/g, '/'), line });
        break; // first hit per file
      }
      i = idx + ffiName.length - 1;
    }
    if (hits.length >= 8) break;
  }
  return hits;
}

// ---------- build records ----------
const CG = 'file:firefox/servo/components/style/properties/';
const props = [];
function addProp(rec) {
  const name = rec.name;
  const ident = snake(name);
  const isShorthand = !!rec.sub;
  const styleStruct = rec.fields.struct || rec.fields.style_struct || '';
  const structCC = camel(styleStruct);
  const ffi = rec.fields.gecko_ffi_name || ('m' + camel(name.replace(/^-(?:webkit|moz)-/, '')));
  const animKey = rec.fields.animation_type || rec.fields.animation_value_type || rec.fields.animatable || '';
  const animatable = animKey === '' ? true : !/^(none|discrete)$/i.test(animKey); // missing key = animatable by type (Stylo default)
  const anchors = [];
  const A = (role, symbol, g, derived = 0, evidence = '') => anchors.push({ role, symbol_name: symbol, ...G(g), derived, evidence: evidence || (derived ? 'convention-derived (macro-generated at build time); evidence: ' + evidence || 'TOML name' : '') });

  A('define', 'config:firefox/servo/components/style/properties/' + (isShorthand ? 'shorthands.toml' : 'longhands.toml'),
    'config:firefox/servo/components/style/properties/' + (isShorthand ? 'shorthands.toml' : 'longhands.toml'));
  for (const cg of ['properties.mako.rs', 'data.py', 'build.py']) {
    const id = CG + cg;
    A('codegen', id, id);
  }
  if (isShorthand) {
    const id = CG + 'shorthands.rs';
    A('parse', 'function:' + id.replace(/^\w+:/, '') + ':shorthands::' + ident + '::parse', null, 1, 'shorthands.toml name: ' + name);
  } else {
    const id = CG + 'properties.mako.rs';
    A('parse', 'function:' + id.replace(/^\w+:/, '') + ':longhands::' + ident + '::parse_declared', null, 1, 'longhands.toml name: ' + name);
  }
  const cascadeId = 'function:firefox/servo/components/style/properties/cascade.rs:cascade';
  A('cascade', cascadeId, cascadeId);
  const geckoMako = 'file:firefox/servo/components/style/properties/gecko.mako.rs';
  A('cascade', geckoMako, geckoMako);
  const storeId = 'class:firefox/layout/style/nsStyleStruct.h:nsStyle' + structCC;
  A('store', storeId, storeId, 0, 'TOML struct field: ' + styleStruct + ' -> member ' + ffi);
  if (isShorthand) {
    for (const sub of rec.sub) A('expand', 'shorthand expansion -> ' + sub, null, 1, 'sub_property of ' + name);
  }
  const getter = camel(name);
  if (getters.has(getter)) {
    A('expose', 'function:firefox/layout/style/nsComputedDOMStyle.h:DoGet' + getter, null, 0, 'DoGet' + getter + ' declared in nsComputedDOMStyle.h');
  } else {
    A('expose', 'function:firefox/servo/ports/geckolib/glue.rs:Servo_DeclarationBlock_SerializePropertyValue', null, 0, 'no dedicated DoGet getter; generic Servo serialization via glue.rs');
  }
  const glueId = 'function:firefox/servo/ports/geckolib/glue.rs:Servo_ParseProperty';
  A('ffi', glueId, glueId);
  for (const hit of readBy(ffi)) {
    const sym = hit.file + ':' + hit.line + ' reads ' + ffi;
    anchors.push({
      role: 'read_by', symbol_name: sym, graph_node_id: null, in_graph: 0, derived: 0,
      evidence: 'member sweep: ' + ffi + ' found at ' + hit.file + ':' + hit.line,
      read_by_path: hit.file, read_by_line: hit.line,
    });
  }
  props.push({
    name, kind: isShorthand ? 'shorthand' : 'longhand',
    style_struct: styleStruct, gecko_ffi_name: ffi,
    initial_value: rec.fields.initial || rec.fields.initial_value || '',
    animatable, engines: rec.fields.engine || rec.fields.engines || 'gecko,servo',
    pref: rec.fields.gecko_pref || rec.fields.servo_pref || '',
    spec: rec.fields.spec || '',
    sub_properties: rec.sub || [],
    anchors,
  });
}
for (const b of longhands) addProp(b);
for (const b of shorthands) addProp(b);

fs.writeFileSync(path.join(OUT, 'properties.json'), JSON.stringify(props, null, 1));
const withRB = props.filter(p => p.anchors.some(a => a.role === 'read_by')).length;
console.log('properties:', props.length, '(longhand:', longhands.length, ', shorthand:', shorthands.length, ')');
console.log('properties with read_by anchors:', withRB);
console.log('sample margin-top anchors:');
for (const a of (props.find(p => p.name === 'margin-top') || {}).anchors || []) console.log(' ', a.role, '->', a.symbol_name.slice(0, 90), a.in_graph ? '[graph]' : '[derived]');
console.log('sample text-overflow read_by:');
for (const a of ((props.find(p => p.name === 'text-overflow') || {}).anchors || []).filter(a => a.role === 'read_by')) console.log(' ', a.symbol_name, '|', a.evidence);
console.log('sample line-clamp read_by:');
for (const a of ((props.find(p => p.name === 'line-clamp') || {}).anchors || []).filter(a => a.role === 'read_by')) console.log(' ', a.symbol_name, '|', a.evidence);
