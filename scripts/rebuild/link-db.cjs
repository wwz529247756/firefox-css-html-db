#!/usr/bin/env node
// C3: resolve anchors to graph ids, build chain trees with source refs
const fs = require('fs');
const path = require('path');
const FX = process.env.FIREFOX_SRC;
if (!FX) { console.error('FIREFOX_SRC is not set — point it at the pinned Firefox checkout (157.0.1 @ 47c5f402c8). Run scripts/check-env.cjs for acquisition help.'); process.exit(1); }
const OUT = __dirname;

const kg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'knowledge-graph.json'), 'utf8'));
const nodesById = new Map(kg.nodes.map(n => [n.id, n]));
// undirected adjacency (layer-allowlisted)
const SKIP_LAYERS = new Set(['layer:project-documentation']);
const BOUNDARY_LAYER = 'layer:layout-display-list-boundary';
const layerOf = new Map();
for (const l of kg.layers) for (const id of l.nodeIds) layerOf.set(id, l.id);
const nodeLayer = (id) => layerOf.get(id) || null;
const adj = new Map();
const STRUCTURAL = new Set(['calls', 'contains', 'imports', 'inherits', 'defines_schema']);
for (const e of kg.edges) {
  if (!STRUCTURAL.has(e.type)) continue;
  const sl = nodeLayer(e.source), tl = nodeLayer(e.target);
  if (SKIP_LAYERS.has(sl) || SKIP_LAYERS.has(tl)) continue;
  if (!adj.has(e.source)) adj.set(e.source, []);
  if (!adj.has(e.target)) adj.set(e.target, []);
  adj.get(e.source).push(e.target);
  adj.get(e.target).push(e.source);
}

// ---------- source_ref (definition grep) ----------
const fileCache = new Map();
function sourceRef(node) {
  const fp = node.filePath;
  if (!fp) return null;
  const abs = path.join(FX, fp.replace(/^firefox\//, ''));
  let text;
  try { text = fileCache.has(abs) ? fileCache.get(abs) : fs.readFileSync(abs, 'utf8'); } catch (_) { return { path: fp, line: null, snippet: null }; }
  fileCache.set(abs, text);
  // file-level nodes: the file itself is the reference (line 1 + header)
  if (['file', 'config', 'document'].includes(node.type)) {
    const lines = text.split('\n');
    return { path: fp, line: 1, snippet: lines.slice(0, 3).join('\n').slice(0, 400) };
  }
  const name = node.name.split(':').pop();
  const pats = [];
  if (node.type === 'function') {
    pats.push(new RegExp('^[^\\n]*\\b(?:fn\\s+' + name + '\\b|' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\()', 'm'));
    pats.push(new RegExp('^[^\\n]*\\b' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'm'));
  } else if (node.type === 'class') {
    pats.push(new RegExp('^[^\\n]*\\b(?:class|struct|enum)\\s+' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'm'));
    pats.push(new RegExp('^[^\\n]*\\b' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'm'));
  } else {
    pats.push(new RegExp('^[^\\n]*' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'm'));
  }
  const lines = text.split('\n');
  for (const pat of pats) {
    for (let i = 0; i < lines.length; i++) {
      if (pat.test(lines[i])) {
        const lo = Math.max(0, i - 1), hi = Math.min(lines.length, i + 2);
        return { path: fp, line: i + 1, snippet: lines.slice(lo, hi).join('\n').slice(0, 400) };
      }
    }
  }
  return { path: fp, line: null, snippet: null };
}

// ---------- anchor-level source_ref ----------
function snippetAt(p, line) {
  if (!p || !line) return null;
  const abs = path.join(FX, p.replace(/^firefox\//, ''));
  let text;
  try { text = fileCache.has(abs) ? fileCache.get(abs) : fs.readFileSync(abs, 'utf8'); } catch (_) { return null; }
  fileCache.set(abs, text);
  const lines = text.split('\n');
  const i = Math.min(Math.max(line - 1, 0), lines.length - 1);
  return lines.slice(Math.max(0, i - 1), i + 2).join('\n').slice(0, 400);
}

// per-anchor source_ref: exact for read_by sweeps, definition-grep for symbol nodes,
// plain-text symbol search for file-rooted (recorded) anchors
function anchorSourceRef(a, gid) {
  if (a.read_by_path) return { path: a.read_by_path, line: a.read_by_line };
  const node = nodesById.get(gid);
  if (!node) return null;
  const sr = sourceRef(node);
  const isFileish = ['file', 'config', 'document'].includes(node.type);
  if (!isFileish && sr && sr.line) return sr;
  const tail = (a.symbol_name || '').split(':').filter(Boolean).pop();
  if (tail && node.filePath) {
    const abs = path.join(FX, node.filePath.replace(/^firefox\//, ''));
    let text;
    try { text = fileCache.has(abs) ? fileCache.get(abs) : fs.readFileSync(abs, 'utf8'); } catch (_) { return sr; }
    fileCache.set(abs, text);
    const idx = text.split('\n').findIndex(l => l.includes(tail));
    if (idx >= 0) return { path: node.filePath, line: idx + 1 };
  }
  return sr;
}

function branchHint(node) {
  const f = node.filePath || '';
  if (/HTMLElementFactory|nsCSSFrameConstructor/.test(f)) return 'tag / computed display value';
  if (/\/cascade\.rs|properties\.mako\.rs|shorthands\.rs/.test(f)) return 'property kind (longhand/shorthand/custom)';
  if (/gecko\.mako\.rs|nsStyleStruct/.test(f)) return 'style struct member';
  if (/selector_map|matching\.rs|Selector/.test(f)) return 'selector component';
  if (/nsTextFrame|TextOverflow/.test(f)) return 'text content / line overflow';
  return null;
}

// ---------- distance-to-boundary (BFS from all boundary-layer nodes, structural edges) ----------
const dist = new Map();
{
  let frontier = [];
  for (const [id, l] of layerOf) if (l === BOUNDARY_LAYER && nodesById.has(id)) { dist.set(id, 0); frontier.push(id); }
  let d = 0;
  while (frontier.length) {
    d++;
    const next = [];
    for (const id of frontier) {
      for (const nb of (adj.get(id) || [])) {
        if (!dist.has(nb) && nodesById.has(nb) && !SKIP_LAYERS.has(nodeLayer(nb))) { dist.set(nb, d); next.push(nb); }
      }
    }
    frontier = next;
  }
}

// ---------- chain tree builder (monotonic descent toward the boundary) ----------
function buildTree(rootId, kind, refName, anchorRole, rootRef) {
  const rootNode = nodesById.get(rootId);
  if (!rootNode) return null;
  const nodes = [];
  let terminal = false;
  const seen = new Set([rootId]);
  const walk = (id, parentId, depth) => {
    if (depth > 6 || nodes.length >= 60) return;
    const n = nodesById.get(id);
    if (!n) return;
    const layer = nodeLayer(id);
    const isBoundary = layer === BOUNDARY_LAYER;
    const sr = (id === rootId && rootRef)
      ? { path: rootRef.path, line: rootRef.line, snippet: snippetAt(rootRef.path, rootRef.line) }
      : sourceRef(n);
    const entry = {
      node_id: id, parent_id: parentId, depth, name: n.name, type: n.type, layer: layer || '',
      source_ref: sr, is_branch_point: false, branch_hint: null,
      terminal_boundary: isBoundary,
    };
    const myIdx = nodes.push(entry) - 1;
    if (isBoundary) { terminal = true; return; }
    const dHere = dist.has(id) ? dist.get(id) : Infinity;
    if (depth >= 6 || dHere === Infinity) return;
    // expand only children strictly closer to the boundary (monotonic descent)
    const children = (adj.get(id) || [])
      .filter(c => !seen.has(c) && nodesById.has(c) && dist.has(c) && dist.get(c) < dHere);
    const real = [];
    for (const c of children) { seen.add(c); real.push(c); }
    if (real.length) {
      entry.is_branch_point = real.length > 1;
      if (entry.is_branch_point) entry.branch_hint = branchHint(n);
      for (const c of real) walk(c, id, depth + 1);
    }
  };
  walk(rootId, null, 0);
  return { anchor_role: anchorRole, ref: refName, terminal_boundary: terminal, tree: nodes };
}

// ---------- link everything ----------
const props = JSON.parse(fs.readFileSync(path.join(OUT, 'properties.json'), 'utf8'));
const elements = JSON.parse(fs.readFileSync(path.join(OUT, 'elements.json'), 'utf8'));

let linked = 0, chainsOut = [];
function resolveAnchor(a) {
  if (a.graph_node_id && nodesById.has(a.graph_node_id)) { a.resolution = 'exact'; a.in_graph = 1; return a.graph_node_id; }
  // name match within same filePath
  if (a.symbol_name && a.symbol_name.includes(':')) {
    const parts = a.symbol_name.split(':');
    const maybePath = parts[1];
    const name = parts[parts.length - 1];
    if (maybePath && maybePath.includes('/')) {
      const cand = nodesById.get((a.symbol_name.startsWith('config') ? 'config:' : a.symbol_name.split(':')[0] + ':') + maybePath);
      if (cand) { a.resolution = 'path-match'; a.in_graph = 1; return cand.id; }
    }
  }
  // file-node fallback: root the chain at the symbol's file even when the symbol itself is not a node
  if (a.symbol_name) {
    const noPrefix = a.symbol_name.replace(/^(function|class|config|file|document):/, '');
    const segs = noPrefix.split(':');
    const fp = segs.length >= 2 ? segs[0] : noPrefix;
    const fid = 'file:' + fp;
    if (nodesById.has(fid)) { a.resolution = 'file-node fallback (symbol recorded, chain rooted at file)'; a.in_graph = 0; return fid; }
  }
  a.resolution = 'recorded (not in graph)';
  a.in_graph = 0;
  return null;
}

for (const p of props) {
  for (const a of p.anchors) {
    const gid = resolveAnchor(a);
    if (!gid) continue;
    const aRef = anchorSourceRef(a, gid);
    if (aRef && aRef.path) { a.source_path = aRef.path; a.source_line = aRef.line == null ? null : aRef.line; }
    linked++;
    if (a.role === 'define' || a.role === 'expand') continue; // trivial single-node chains skipped for tree building
    const tree = buildTree(gid, 'property', p.name, a.role, aRef);
    if (tree && tree.tree.length) chainsOut.push({ kind: 'property', ref_id: p.name, ...tree });
  }
}
let elinked = 0;
for (const e of elements) {
  for (const a of e.anchors) {
    const gid = resolveAnchor(a);
    if (!gid) continue;
    const aRef = anchorSourceRef(a, gid);
    if (aRef && aRef.path) { a.source_path = aRef.path; a.source_line = aRef.line == null ? null : aRef.line; }
    elinked++;
    if (a.role === 'boundary') continue;
    const tree = buildTree(gid, 'element', e.tag, a.role, aRef);
    if (tree && tree.tree.length) chainsOut.push({ kind: 'element', ref_id: e.tag, ...tree });
  }
}

fs.writeFileSync(path.join(OUT, 'chains.json'), JSON.stringify(chainsOut, null, 1));
fs.writeFileSync(path.join(OUT, 'properties-linked.json'), JSON.stringify(props, null, 1));
fs.writeFileSync(path.join(OUT, 'elements-linked.json'), JSON.stringify(elements, null, 1));
const propChains = chainsOut.filter(c => c.kind === 'property').length;
const elemChains = chainsOut.filter(c => c.kind === 'element').length;
const totalNodes = chainsOut.reduce((a, c) => a + c.tree.length, 0);
const terminals = chainsOut.filter(c => c.terminal_boundary).length;
console.log('anchors resolved: property', linked, '/ element', elinked);
console.log('chains built:', propChains, 'property +', elemChains, 'element =', chainsOut.length, '| tree nodes total:', totalNodes);
console.log('chains reaching display-list boundary:', terminals, '/', chainsOut.length);
