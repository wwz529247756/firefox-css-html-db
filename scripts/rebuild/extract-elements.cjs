#!/usr/bin/env node
// C2: extract HTML element records + role anchors from tag list, factory, creators, webidl
const fs = require('fs');
const path = require('path');
const FX = process.env.FIREFOX_SRC;
if (!FX) { console.error('FIREFOX_SRC is not set — point it at the pinned Firefox checkout (157.0.1 @ 47c5f402c8). Run scripts/check-env.cjs for acquisition help.'); process.exit(1); }
const OUT = __dirname;

const kg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'knowledge-graph.json'), 'utf8'));
const idSet = new Set(kg.nodes.map(n => n.id));
const G = (id) => ({ graph_node_id: idSet.has(id) ? id : null, in_graph: idSet.has(id) ? 1 : 0 });

// ---------- canonical tag list ----------
const inc = fs.readFileSync(path.join(FX, 'parser/htmlparser/nsHTMLTagList.inc'), 'utf8');
const tags = [];
for (const m of inc.matchAll(/^HTML_TAG\(\s*(\w+)\s*,\s*(\w+)\s*,\s*(\w+)\s*\)/gm)) {
  tags.push({ tag: m[1], frag: m[2], ifaceFrag: m[3] });
}
for (const m of inc.matchAll(/^HTML_OTHER\(\s*(\w+)\s*\)/gm)) {
  tags.push({ tag: m[1], frag: 'NOTUSED', ifaceFrag: m[1] });
}

// ---------- creators (NS_IMPL_NS_NEW_HTML_ELEMENT* variants + hand-defined NS_NewHTML*Element) ----------
const implCreators = new Map(); // frag -> {file, fn}
const addCreator = (frag, file, fn) => { if (frag && !implCreators.has(frag)) implCreators.set(frag, { file: 'firefox/' + file.replace(/\\/g, '/'), fn }); };
for (const dir of ['dom/html', 'dom/media/mediaelement', 'dom/media/webvtt']) {
  let entries = [];
  try { entries = fs.readdirSync(path.join(FX, dir), { withFileTypes: true }); } catch (_) { continue; }
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith('.cpp')) continue;
    const rel = dir + '/' + e.name;
    const text = fs.readFileSync(path.join(FX, rel), 'utf8');
    for (const m of text.matchAll(/NS_IMPL_NS_NEW_HTML_ELEMENT(_GENERIC|_INTERNAL|_CHECK_PARSER)?\(\s*(\w+)\s*\)/g)) {
      addCreator(m[2], rel, 'NS_NewHTML' + m[2] + 'Element' + (m[1] === '_INTERNAL' ? 'Internal' : ''));
    }
    for (const m of text.matchAll(/nsGenericHTMLElement\s*\*\s*(NS_NewHTML\w+Element)\s*\(/g)) {
      const fn = m[1];
      addCreator(fn.slice('NS_NewHTML'.length, -'Element'.length), rel, fn);
    }
  }
}

// ---------- framed_by: region search in nsCSSFrameConstructor.cpp ----------
const fcPath = path.join(FX, 'layout/base/nsCSSFrameConstructor.cpp');
const fcText = fs.readFileSync(fcPath, 'utf8');
const fcLines = fcText.split(/\r?\n/);
const fcRel = 'firefox/layout/base/nsCSSFrameConstructor.cpp';
// frame classes defined out of scope (layout/forms, layout/tables)
const outOfScopeFrames = [];
try {
  for (const dir of ['layout/forms', 'layout/tables']) {
    for (const e of fs.readdirSync(path.join(FX, dir))) {
      if (!e.name.endsWith('.h')) continue;
      const t = fs.readFileSync(path.join(FX, dir, e.name), 'utf8');
      for (const m of t.matchAll(/^class (ns\w+Frame)\b/gm)) {
        outOfScopeFrames.push({ cls: m[1], file: 'firefox/' + dir + '/' + e.name });
      }
    }
  }
} catch (_) {}
// specific constructor regions (name fragments -> region label)
const regions = [
  { re: /FindInputData|ControlType::Input/i, label: 'nsCSSFrameConstructor::FindInputData (per FormControlType table)', tags: ['input'] },
  { re: /sButtonData|ConstructButton/, label: 'nsCSSFrameConstructor button data (NS_NewButtonControlFrame / nsButtonControlFrame out-of-scope)', tags: ['button'] },
  { re: /ConstructSelect|sSelectData/, label: 'nsCSSFrameConstructor select data (nsSelectControlFrame out-of-scope)', tags: ['select', 'option', 'optgroup', 'datalist'] },
  { re: /ConstructTable|TableFrame/, label: 'nsCSSFrameConstructor table construction (nsTableFrame et al. out-of-scope)', tags: ['table', 'td', 'th', 'tr', 'tbody', 'thead', 'tfoot', 'caption', 'col', 'colgroup'] },
  { re: /ConstructFieldSet/, label: 'nsCSSFrameConstructor fieldset construction (nsFieldSetFrame out-of-scope)', tags: ['fieldset', 'legend'] },
  { re: /ConstructImg|ImageFrame/, label: 'image frame construction (nsImageFrame, in scope)', tags: ['img'] },
  { re: /ConstructFormControl|FormControl/, label: 'form-control construction family', tags: ['form', 'label', 'output', 'progress', 'meter', 'textarea'] },
];
function framedBy(tag, classname) {
  for (const r of regions) {
    if (r.tags.includes(tag)) {
      const lineIdx = fcLines.findIndex(l => r.re.test(l));
      const frameCls = outOfScopeFrames.find(f => f.cls.toLowerCase().includes(r.tags[0].slice(0, 4)));
      return {
        symbol: 'nsCSSFrameConstructor::FindHTMLData -> ' + r.label,
        in_graph: 1,
        line: lineIdx >= 0 ? lineIdx + 1 : 3363,
        evidence: frameCls ? 'specific frame class ' + frameCls.cls + ' lives out of scope (' + frameCls.file + ')' : 'display-driven generic construction path',
      };
    }
  }
  return {
    symbol: 'nsCSSFrameConstructor::FindHTMLData (display-driven generic path)',
    in_graph: 1,
    line: 3363,
    evidence: 'no tag-specific constructor; frame chosen by computed display via FCDATA tables',
  };
}

// ---------- build records ----------
const elements = [];
for (const t of tags) {
  if (t.frag === 'NOTUSED') { elements.push({ tag: t.tag, kind: 'unused-slot', anchors: [] }); continue; }
  const classname = 'HTML' + t.frag + 'Element';
  const webidlName = 'HTML' + t.ifaceFrag + 'Element';
  const creator = 'NS_NewHTML' + t.frag + 'Element';
  const impl = implCreators.get(t.frag);
  const anchors = [];
  const A = (role, symbol, gid, evidence = '', derived = 0) => anchors.push({ role, symbol_name: symbol, ...G(gid), derived, evidence });

  A('parser', 'file:firefox/parser/html/nsHtml5ElementName.cpp', 'file:firefox/parser/html/nsHtml5ElementName.cpp');
  A('factory', 'function:firefox/dom/html/HTMLElementFactory.cpp:CreateHTMLElement', 'function:firefox/dom/html/HTMLElementFactory.cpp:CreateHTMLElement');
  const classId = 'class:firefox/dom/html/' + classname + '.h:' + classname;
  A('class', classId, classId);
  if (impl) {
    A('creator', 'function:' + impl.file + ':' + impl.fn, 'function:' + impl.file + ':' + impl.fn, 'NS_IMPL_NS_NEW_HTML_ELEMENT in ' + impl.file);
  } else {
    A('creator', 'creator-convention:' + creator, null, 'no NS_IMPL/hand-defined match for fragment ' + t.frag + ' (shared/unknown class or creator defined via macro variant)', 1);
  }
  const webidlClass = 'class:firefox/dom/webidl/' + webidlName + '.webidl:' + webidlName;
  A('webidl', webidlClass, webidlClass);
  const fb = framedBy(t.tag, classname);
  A('framed_by', fb.symbol, 'file:' + fcRel, fb.evidence + (fb.line ? ' [' + fcRel + ':' + fb.line + ']' : ''));
  A('boundary', 'file:firefox/layout/painting/nsDisplayList.h', 'file:firefox/layout/painting/nsDisplayList.h');
  elements.push({ tag: t.tag, classname, webidl_interface: webidlName, creator_fn: impl ? impl.fn : creator, class_path: impl ? impl.file : '', anchors });
}

fs.writeFileSync(path.join(OUT, 'elements.json'), JSON.stringify(elements, null, 1));
const concrete = elements.filter(e => e.anchors.length);
const fullyLinked = concrete.filter(e => e.anchors.every(a => a.in_graph || a.role === 'creator')).length;
console.log('elements:', elements.length, '(concrete:', concrete.length, ', unused slots:', elements.length - concrete.length, ')');
console.log('elements fully linked (all anchors in graph except creator fallback):', fullyLinked);
console.log('creators matched via NS_IMPL:', implCreators.size);
console.log('sample <a>:', JSON.stringify(elements.find(e => e.tag === 'a').anchors.map(a => a.role + ':' + (a.graph_node_id ? 'in-graph' : 'MISSING')), null, 0));
