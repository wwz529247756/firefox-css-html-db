# Design — Converting the Knowledge Graph into a CSS-Property & HTML-Element Call-Chain Database

**Status:** approved design, pending implementation (Phase C)
**Applies to:** `knowledge-graph.json` v1.3.0 · source `D:\geco-dict\firefox` @ `47c5f402c8`
**Deliverables:** `css-html-callgraph.db` (SQLite) + `css-html-callgraph.json` (nested trees)

---

## 1. Goal

For every **CSS property** (~420 longhands + ~80 shorthands) and every **HTML element** (~113 tags),
produce its **call chain through the Firefox Gecko engine** as a queryable database:

```
CSS property   define → codegen → parse → cascade → store(nsStyle*) → expose(getComputedStyle)
                                                        ↘ display items  [BOUNDARY]
HTML element   tag → nsHtml5 parser → factory → creator → element class → WebIDL
                                             ↘ frame construction → frame → display list [BOUNDARY]
```

Chains are **trees** (branching allowed), each node carries a **source-code reference**, and all
chains **terminate at the display-list generation boundary** — nothing beyond (no painting/compositing).

## 2. Inputs

| Input | Used for |
|---|---|
| `knowledge-graph.json` — 3,884 nodes / 4,025 edges / 18 layers | chain topology; node metadata (type, layer, summary); source of every graph_node_id |
| **Firefox source tree (user-provided)** — pinned to `47c5f402c8d3a5369f1fb1b6cd61b0bb92725af1` (branch `release`, Firefox 157.0.1); reference checkout `D:\geco-dict\firefox` | `source_ref` line numbers + snippets; the TOML/tag-list codegen tables below |
| `servo/components/style/properties/longhands.toml` | per-longhand records: name, `style_struct`, `gecko_ffi_name`, initial value, animatable, engines |
| `servo/components/style/properties/shorthands.toml` | shorthand records + `sub_properties` |
| `parser/htmlparser/nsHTMLTagList.inc` | canonical `HTML_TAG(tag, classname, interfacename)` tag list |
| `dom/html/HTMLElementFactory.cpp` | `sHTMLContentCreatorFunctions[]` creator table (tag → NS_New*Element) |
| `dom/html/*.cpp` | `NS_IMPL_NS_NEW_HTML_ELEMENT(X)` grep → creator fn + class file |
| `layout/style/nsComputedDOMStyle.h` | `DoGet<Name>` getter inventory (exposure anchors) |

## 3. Conversion pipeline (4 deterministic scripts, no LLM)

### C1 — `extract-properties.mjs` → `properties.json`
Parse the TOML property database into records; attach **role anchors**:

| Role | Anchor |
|---|---|
| `define` | `config:…properties/longhands.toml` / `shorthands.toml` (graph node) |
| `codegen` | `properties.mako.rs`, `data.py`, `build.py`, `helpers.mako.rs`, `animated_properties.mako.rs` (graph nodes) |
| `parse` | derived `longhands::<name>::parse_declared` / `parse_value` — macro-generated at build time → flagged `derived:true`, evidence = TOML name |
| `cascade` | `cascade.rs:cascade` (graph node) + derived per-property apply in `gecko.mako.rs` |
| `store` | `class:…nsStyleStruct.h:nsStyle<Struct>` from the property's `style_struct` field; `gecko_ffi_name` recorded on the row |
| `read_by` | **Consumer anchors** — the layout code that READS the computed value to act on it (the "core algorithm" sites). Found by a deterministic sweep: grep the property's `gecko_ffi_name` member (e.g. `mTextOverflow`, `mWebkitLineClamp`) across `layout/{base,generic,painting}`; every file containing it → one `read_by` anchor with the exact line (e.g. `TextOverflow.cpp:306` reads `mTextOverflow`; `nsBlockFrame.cpp:595` reads `mWebkitLineClamp`). Properties nobody reads → no anchor (no false positives). Key algorithm files surfaced by the sweep are pulled into graph scope (TextOverflow.cpp/h, nsBlockReflowContext.cpp, nsLineBox.h, ReflowInput.h); out-of-scope readers are recorded `in_graph=0` with evidence |
| `expose` | `DoGet<Name>` getter from `nsComputedDOMStyle.h` inventory (camel-case name mapping); properties without a dedicated getter recorded as `expose = servo-serialized` — **never a guessed anchor** |
| `ffi` | `glue.rs` nodes: `Servo_ParseProperty`, `Servo_DeclarationBlock_*` |

### C1.5 — Consumer sweeps (completeness mechanism, breadth A)
- **`read_by` (properties)**: grep each property's `gecko_ffi_name` member across
  `layout/{base,generic,painting}/**.{cpp,h}` → per-file anchors with `file:line`. Sweep breadth is
  **layout-only**; readers in `dom/`, `editor/`, `view/` are recorded in the completeness matrix as
  out-of-scope (honesty boundary, not silence). Sweep-discovered algorithm files (e.g.
  `TextOverflow.cpp`) are whitelisted into graph scope; all other out-of-scope readers are recorded
  `in_graph=0` + evidence.
- **`framed_by` (elements)**: parse the tag→constructor mapping in `nsCSSFrameConstructor.cpp`
  (`FindHTMLData` switch) → per-element `framed_by` anchor naming the constructor method + source
  line. Elements without a tag-specific constructor are recorded as display-driven (generic
  FCDATA path). Specific frame classes living out of scope (layout/forms, layout/tables) are
  recorded `in_graph=0` per the boundary decision.

### C2 — `extract-elements.mjs` → `elements.json`
- Parse `HTML_TAG()` rows → `{tag, classname, interfacename}` (canonical ~113 tags)
- `NS_IMPL_NS_NEW_HTML_ELEMENT` grep across `dom/html/*.cpp` → `creator_fn` + class path
- Parser-side anchors: `nsHtml5ElementName.cpp`, `nsHtml5TreeBuilder.cpp` (graph nodes)
- WebIDL anchor: `class:firefox/dom/webidl/HTML<X>.webidl:HTML<X>` (from Phase B batch 41)
- Style hooks: `MapAttributesIntoRule` nodes where the element has attribute mapping

### C3 — `link-db.mjs` → anchors resolved + chain trees
1. **Anchor resolution** (per anchor, in order): exact graph-ID match → name match within the
   anchor's file → `graph_node_id = NULL, in_graph = false` (recorded, never fabricated)
2. **Tree expansion** per anchor: BFS over graph edges (undirected), producing a **tree**:
   - rooted at the anchor node; each reached node becomes a tree node with `parent_id` + `depth`
   - visited-set prevents cycles; bounds: `depth ≤ 6`, `≤ 50 nodes per chain`
   - **layer allowlist** for expansion: stylo core, property-defs/codegen, stylo-values, rule-tree,
     selectors, FFI bridge, gecko-style-system, cssom-rules, ua-stylesheets, fonts, animations,
     typed-om, html-element-model, html-parser (+ webidl for element chains)
   - **boundary termination**: nodes in layer `layout-display-list-boundary` are included as
     tree leaves (`terminal_boundary = true`) and **not expanded**; Project-Documentation nodes skipped

### C4 — `build-db.mjs` → SQLite + JSON + verification
Builds the database (below), the JSON export, and the verification report.

## 4. Source references (`source_ref`) — condition-branch evidence

Every tree node carries a source pointer so humans can inspect the code behind a branch:

```json
{ "path": "firefox/layout/base/nsCSSFrameConstructor.cpp",
  "line": 4102, "snippet": "…3-line context around the symbol definition…" }
```

- Located deterministically per language: Rust (`fn <name>`, `struct|enum <Name>`),
  C++ (`Name::`, `class <Name>`), TOML (section header) — first defining occurrence in the node's file
- Nodes with **≥ 2 children** are flagged `is_branch_point = true` and get a `branch_hint`
  describing what the branch decides, derived from the known dispatch site:

| Branch site | branch_hint |
|---|---|
| `HTMLElementFactory` / `nsCSSFrameConstructor` | `tag / computed display value` |
| `cascade.rs` / `properties.mako.rs` | `property kind (longhand/shorthand/custom)` |
| `gecko.mako.rs` / style-struct setters | `style struct member` |
| `selector_map.rs` / matching | `selector component` |

- When a `match` / `switch` / `if` appears within ±5 lines of the definition, the matching
  source line is captured into the snippet as the condition evidence
- **Limitation (stated on the record):** definition-level + heuristic condition capture,
  *not* full CFG reconstruction (building Firefox to dump compiler CFGs is out of scope)

## 5. Data model

### SQLite (`node:sqlite`, zero dependencies) → `.understand-anything/db/css-html-callgraph.db`

```sql
css_properties(id PK, name, kind['longhand'|'shorthand'], style_struct,
               gecko_ffi_name, initial_value, animatable, engines)
html_elements(id PK, tag, classname, interfacename, creator_fn, class_path, webidl_interface)
anchors(id PK, kind['property'|'element'], ref_id, role, symbol_name,
        graph_node_id NULL, in_graph INT, derived INT, evidence TEXT)
chains(id PK, kind, ref_id, anchor_role, terminal_boundary INT)
chain_nodes(id PK, chain_id FK, node_id, parent_id NULL, depth INT,
            name, type, layer,
            source_path, source_line, source_snippet,
            is_branch_point INT, branch_hint TEXT)
-- indexes: anchors(kind, ref_id), chain_nodes(chain_id, depth)
-- views: property_chain_summary, element_chain_summary
```

### JSON → `D:\geco-dict\css-html-callgraph.json` (root)
Nested trees mirroring SQLite: `{properties: {name: {record, chains: [{role, tree: {node, depth,
source_ref, branch_hint, children[]}}]}}, elements: {…}}`.

## 6. Verification (runs at the end of C4; failures block sign-off)

1. **Coverage**: % of properties with ≥ 1 in-graph anchor; % of elements likewise (expect ~100%)
2. **Spot checks** (asserted): `margin-top` chain contains `nsStyleMargin`; `color` has an
   expose leg; `<a>` reaches `NS_NewHTMLAnchorElement`; `<table>` and `<input>` present
3. **Boundary check**: every chain terminal node ∈ `layout-display-list-boundary` layer
4. **Tree integrity**: every chain node's parent exists in the same chain; exactly one root
5. **Source refs**: % of tree nodes with a located `source_ref` (target ≥ 90%)
6. Report written to `.understand-anything/db/db-verification.md`

## 7. Files touched

| Path | Action |
|---|---|
| `.understand-anything/db/extract-properties.cjs` | new |
| `.understand-anything/db/extract-elements.cjs` | new |
| `.understand-anything/db/link-db.cjs` | new |
| `.understand-anything/db/build-db.cjs` | new |
| `.understand-anything/db/css-html-callgraph.db` | generated |
| `.understand-anything/db/db-verification.md` | generated |
| `css-html-callgraph.json` (root) | generated |
| `PLAN-understand-css-html.md` | Phase C record updated |

## 8. Re-run behavior

All scripts are deterministic and idempotent: if the knowledge graph is ever re-generated
(new stage, graph fixes), re-running C1–C4 re-derives the entire database in seconds.

## 9. Agent usage

For **consumers** of this database — especially AI agents answering
*"how does CSS property X / HTML element Y work in Firefox?"* questions — see
**`DB-AGENT-GUIDE-css-html-callgraph.md`** (root): it documents the SQL recipes (property journey,
element lifecycle, reverse lookups, condition-branch lookups, audits), the JSON traversal shape,
the citation rules (`graph_node_id` + `source_ref`), and the scope limits (chains end at the
display-list boundary; derived anchors and their evidence).
