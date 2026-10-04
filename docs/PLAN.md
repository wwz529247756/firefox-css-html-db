# Plan — CSS-Property & HTML-Element Call-Graph Database for Firefox Gecko

**Generated:** 2026-10-01 · **Mode:** staged, confirmation-gated · **Status:** plan finalized (incl. display-list boundary amendment); awaiting go-ahead for Phase A (do NOT start automatically)

## Final deliverable (the target)

A **call-graph mapping database** where every CSS property and every HTML element maps to its
engine call chain, built on top of a complete knowledge graph of the CSS+HTML source surface:

```
margin-top  → define(longhands.toml) → codegen(properties.mako.rs) → parse(parse_declared)
            → cascade(cascade.rs) → store(nsStyleMargin / gecko_ffi_name) → expose(ComputedStyleMap)
            → FFI(gecko.mako.rs → GeckoBindings)
<a>         → parser(nsHtml5ElementName) → factory(HTMLElementFactory HTML_TAG row)
            → creator(NS_NewHTMLAnchorElement) → class(HTMLAnchorElement)
            → base(nsGenericHTMLElement → Element) → webidl(HTMLAnchorElement)
```

- **Format (locked):** SQLite (`css_properties`, `html_elements`, `anchors`, `chains`) + `css-html-callgraph.json` export
- **Chain depth (locked):** direct anchors + transitive call-graph closure per anchor (bounded BFS)
- **Chain boundary (locked):** chains **end at display-list generation** — include frame construction
  (`nsCSSFrameConstructor`), frames, and the display items that READ style structs
  (e.g. `nsDisplayBackgroundImage` ← `nsStyleBackground`); nothing beyond (no painting/layerization)
- **Scope (locked):** all CSS longhands/shorthands (~500) + all HTML tags (~113). No SVG/MathML elements.
- **Sequencing (locked):** DB built once, AFTER the full graph (Stages 2+3 + boundary layer) so linkage is near-100%

Intermediate deliverable: the knowledge graph itself (`knowledge-graph.json`) — browsable in the
understand-anything dashboard after each phase.

## Objective (intermediate artifacts)

Build and progressively expand a knowledge graph of the Firefox Gecko codebase at
`D:\geco-dict\firefox`, covering the **call graph of CSS properties and HTML elements**:

- Output root: `D:\geco-dict\.understand-anything\` (graph + DB live here; outside the repo, user-selected)
- Source tree: `D:\geco-dict\firefox` (480,512 tracked files; git HEAD `47c5f402c8d3a5369f1fb1b6cd61b0bb92725af1`)
- Node paths are prefixed `firefox/...` (e.g. `file:firefox/dom/html/HTMLElement.cpp`)

## Required skills & tooling

| Requirement | Purpose | Status |
|---|---|---|
| **understand-anything plugin** (skills: `/understand`, `/understand-dashboard`) | LLM knowledge-graph pipeline: scan → batch → analyze → merge → layers → tour → validate → save; interactive dashboard | Installed at `C:\Users\Ethan\.understand-anything-plugin` (real path `C:\Users\Ethan\.understand-anything\repo\understand-anything-plugin`); `packages/core/dist` pre-built |
| Node.js ≥ 22 | bundled scripts (`scan-project.mjs`, `compute-batches.mjs`, `extract-import-map.mjs`, `extract-structure.mjs`, `build-fingerprints.mjs`, inline validator) + Phase C DB scripts (`node:sqlite` built-in) | Required |
| pnpm ≥ 10 | only if the plugin ever needs a rebuild | Not needed (dist exists) |
| Python 3 | merge scripts (`merge-batch-graphs.py`) | Required |
| Tree-sitter grammars (bundled) | structural fingerprints + import-map extraction | Bundled |
| Subagent capability (explore agents) | per-batch file analysis; explore agents return node/edge JSON, main agent writes `batch-N.json` | Available |
| Git (inside `firefox/` only) | scope/delta file lists via `git ls-files`; commit hash recorded manually — git-based auto-update is OFF | Partial |

## Verified extraction facts (Phase C feasibility)

- Properties: `longhands.toml` (INI-style blocks, `style_struct` + `gecko_ffi_name` fields) +
  `shorthands.toml`; `ComputedStyleMap::kEntries[]` at `nsComputedDOMStyle.cpp:158-272` =
  property→getter dispatch; parse/cascade fn names follow codegen conventions
- Elements: canonical tag list `parser/htmlparser/nsHTMLTagList.inc`; creator table
  `HTML_TAG(_tag,_classname,_interfacename)` in `dom/html/HTMLElementFactory.cpp:27-33`;
  60× `NS_IMPL_NS_NEW_HTML_ELEMENT` across `dom/html/*.cpp`; `nsHtml5ElementName.cpp` parser tables;
  `dom/webidl/HTML*.webidl` interface names
- Boundary layer (sized, non-test): `layout/base` 106, `layout/generic` 160, `layout/painting` 36
  files — Phase D curates ~25 of these (`nsCSSFrameConstructor`, `nsIFrame` + frame classes,
  `nsDisplayList` + display items); `layout/tables` + `layout/forms` excluded

## Phases

### Phase A — Stage 2: full CSS surface (~920 new files, ~185 batches)
- Whitelist expands to all `servo/components/{style,selectors,style_derive,style_traits}` (356)
  + `layout/style` non-test (683)
- Delta scan → batches → analysis in waves of 5 concurrent subagents (resumable; merge checkpoints
  per wave) → merge → **chunked re-layering** (per-subsystem) → tour refresh → validate → save
- Result: ~1,050-file graph; every CSS property's parse/cascade/store/expose machinery in-graph

### Phase B — Stage 3: HTML/DOM surface (RESHAPED: ~600 new files, ~125 batches)
- Whitelist expands to: `dom/html` non-test (449) + `parser/html` (106) + `dom/base` core extensions
  + `dom/webidl/HTML*.webidl` (~80)
- ~~`dom/svg`, `dom/mathml`~~ dropped (out of DB scope) — total surface shrinks ~2,000 → ~1,550 files
- Same delta loop → merge → re-layer → tour → validate → save
- Result: ~1,550-file graph; every HTML tag's factory/creator/class/webidl nodes in-graph

### Phase D — style→layout boundary layer (curated ~25 files, ~6 batches, after Phase B / before Phase C)
- `layout/base`: `nsCSSFrameConstructor.cpp/h` + PresShell core header (style→frame bridge;
  display-property-driven frame creation per element)
- `layout/generic`: `nsIFrame.cpp/h` (+ `BuildDisplayList` entry) + ~8 curated frame classes
- `layout/painting`: `nsDisplayList.cpp/h` + ~6 display-item files (`nsDisplayBackgroundImage`,
  `nsDisplayBorder`, … — the display items that READ style structs)
- `layout/tables` / `layout/forms`: excluded
- Same delta loop → merge → re-layer → validate → save
- Result: graph covers the full chain from property/element anchors to display-list generation

### Phase C — DB build (deterministic, ~1 hour, no LLM)
Scripts in `.understand-anything/db/`:
1. `extract-properties.mjs` — longhands/shorthands TOML + ComputedStyleMap + naming-convention
   anchors → ~500 property rows
2. `extract-elements.mjs` — tag list + factory table + creator grep + nsHtml5 tables + WebIDL →
   ~113 element rows
3. `link-db.mjs` — resolve anchors to graph node IDs + transitive closure per anchor; coverage stats
4. `build-db.mjs` — SQLite (`node:sqlite`) + JSON export; verification spot-checks
   (`margin-top`, `color`, `<a>`, `<table>`)
- Expected linkage: ~100% both sides (full graph exists by then)
- **Boundary semantics:** nodes in the display-list generation layer are flagged `boundary` and
  are chain terminals. Transitive closure per anchor (BFS over graph edges) stops there:
  `background-color` → … → `nsDisplayBackgroundImage`; `<a>` → … → frame `BuildDisplayList`.
  Chain roles gain the final legs:
  `store(nsStyle*) → frame_construct(nsCSSFrameConstructor) → frame(nsIFrame subclass) → display_list(nsDisplayItem) [boundary]`

## Per-stage loop (Phases A/B; repeatable)

1. **Scope:** expand whitelist in `.understand-anything/.understandignore` → show diff → confirm
2. **Delta:** `git ls-files` (inside `firefox/`) for newly whitelisted paths → `changed-files.txt`
3. **Batch:** `compute-batches.mjs --changed-files=...` — only new files; `neighborMap` preserves
   cross-boundary edges
4. **Analyze:** ≤5 concurrent explore subagents; return node/edge JSON; main agent writes
   `batch-<i>.json`; previous graph preserved as `batch-existing.json`
5. **Merge:** `merge-batch-graphs.py` → normalized full graph
6. **Assemble:** review → chunked architecture re-layering → guided tour refresh
7. **Validate:** inline deterministic validator; auto-fix; re-validate
8. **Save:** `knowledge-graph.json` → fingerprints baseline → `meta.json` → cleanup
   (keep `scan-result.json` + `stage1-files.txt`)
9. **Checkpoint:** summary + dashboard relaunch (`start-dashboard.bat`)

## Execution constraints & risk policy

- Batch outputs persist on disk → every phase resumable across sessions
- Partial results always saved on failure; every error reported, never dropped
- Phase A ≈ 6–8x Stage-1 cost; Phase B ≈ 2/3 of Phase A (wall time and tokens; long unattended run)
- Architecture/tour phases run chunked per subsystem once node count exceeds prompt budget
- Long-run orchestration: dispatch in waves, merge per wave, so a session interruption loses at
  most the current wave

## Stage execution record

| Stage | Status | Started | Finished | Notes |
|---|---|---|---|---|
| 1 | **done** | 2026-10-01 | 2026-10-01 | 130 files → 516 nodes / 651 edges / 8 layers / 12 tour steps; validation clean; graph at `.understand-anything/knowledge-graph.json`; dashboard verified serving full data |
| 2 (Phase A) | **done** | 2026-10-01 | 2026-10-01 | 790 files in scope (583 new analyzed) → 2,606 nodes / 2,827 edges / 16 layers / 16 tour steps; validation 0 issues; +overtime protocol for subagent aborts |
| 3 (Phase B) | **done** | 2026-10-01 | 2026-10-01 | 1,071 files in scope (414+102 new analyzed, incl. 77 webidl + reftests excluded) → 3,768 nodes / 3,904 edges / 17 layers / 17 tour steps; validation 0 issues |
| D (boundary) | **done** | 2026-10-01 | 2026-10-01 | +28 files → 3,884 nodes; **D2 extension**: `read_by` role folded into design; +6 consumer files (TextOverflow.cpp/h, nsBlockReflowContext.*, nsLineBox.h, ReflowInput.h) → **3,908 nodes / 4,055 edges / 18 layers**, validation 0 issues, v1.3.1 |
| C (DB) | **done** | 2026-10-03 | 2026-10-03 | 528 properties + 94 elements extracted; 6,647 anchors (incl. read_by/framed_by sweeps); 4,944 chain trees (52,635 nodes) rooted at anchors with file-node fallback; 74% reach display-list boundary; **all 10 verification checks pass**; deliverables: css-html-callgraph.db (21.6 MB) + css-html-callgraph.json (16.2 MB) + completeness-matrix.csv + db-verification.md. **Agent-guide revision**: source provisioning & revision pinning (§7) — source root is user-provided (Firefox 157.0.1 @ 47c5f402c8, branch release); acquisition help (gecko-dev clone / release tarball) documented |

## Immediate next action (on go-ahead ONLY — do not start automatically)

Phase A: expand whitelist to full CSS surface → confirm diff → delta scan → batch → analyze in
waves → merge/layer/tour/validate/save. Then Phase B, Phase D (boundary layer), finally Phase C (DB).
