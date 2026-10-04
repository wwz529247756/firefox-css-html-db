# Agent Guide — Using the CSS-Property & HTML-Element Call-Chain Database

**Audience:** AI agents (and humans) answering *“how does X work in Firefox Gecko?”* questions.
**Companion docs:** `docs/DESIGN.md` (how the database is built) · `docs/PLAN.md` (project plan) · `data/scope-report.md` (file coverage)

---

## 1. What this database is

A precomputed, queryable map of how **every CSS property** (~420 longhands + ~80 shorthands) and
**every HTML element** (~113 tags) flows through the Firefox Gecko engine:

```
CSS property   define (TOML) → codegen (mako) → parse → cascade → store(nsStyle*)
                                                       ↘ expose (getComputedStyle)
                                                       ↘ display items        [BOUNDARY]
HTML element   tag → nsHtml5 parser → factory → creator → element class → WebIDL
                                            ↘ frame construction → frame → display list [BOUNDARY]
```

Two synchronized formats:

| Format | Path (relative to the skill base dir) | Best for |
|---|---|---|
| **SQLite** | `db/css-html-callgraph.db` | SQL queries, joins, reverse lookups, audits |
| **JSON** | `db/css-html-callgraph.json` | Programmatic traversal of nested chain trees with `source_ref` per node |

## 2. When an agent should use it

✅ Good questions:
- “How does `margin-top` get from CSS text to pixels?”
- “Which C++ class implements `<progress>`? Where is it created?”
- “What code parses `background-image`? Where does the cascade branch per property?”
- “Which properties store into `nsStyleMargin`?” / “Which elements have attribute-to-style mapping?”
- “Show me the source line where the frame-type branch happens.”

❌ Out of scope (by design — chains end at the display list):
- painting / compositing / layerization internals
- SVG / MathML elements (locked out of scope)
- non-CSS/HTML subsystems (networking, JS engine, media…)

## 3. Schema quick reference

```sql
css_properties(id PK, name, kind['longhand'|'shorthand'], style_struct,
               gecko_ffi_name, initial_value, animatable, engines, pref, spec, sub_properties)
html_elements(id PK, tag, classname, webidl_interface, creator_fn, class_path)
anchors(id, kind['property'|'element'], ref_id, role, symbol_name,
        graph_node_id, in_graph, derived, evidence, source_path, source_line)
chains(id, kind['property'|'element'], ref_name, anchor_role, terminal_boundary)
chain_nodes(id, chain_id, node_id, parent_row, depth, name, type, layer,
            source_path, source_line, source_snippet, is_branch_point, branch_hint, terminal_boundary)
-- views: property_chain_summary, element_chain_summary
```

> **Join keys differ by table:** `anchors` joins via `ref_id` (the property/element row id),
> while `chains` joins via `ref_name` (the property name / element tag) + `chains.kind`.
> The tree parent column is `chain_nodes.parent_row` (row id within the chain), not `parent_id`.

Anchor roles — property: `define, codegen, parse, cascade, store, read_by, expose, ffi`;
element: `parser, factory, creator, class, webidl, style_hook, boundary`.

`read_by` = the **consumer side** of a property: files that READ the computed value to act on it
(`store` = where it is written, `read_by` = where the algorithm uses it, `expose` = where script
reads it back). This is the **"core algorithm of property X"** query — see Recipe F.

`source_ref` = `source_path` (relative to `D:\geco-dict\firefox\`) + `source_line` + `source_snippet`
(3-line context around the symbol definition).

## 4. Recipes

### A. Journey of a CSS property

```sql
-- 1) record + role anchors
SELECT p.name, p.kind, p.style_struct, p.gecko_ffi_name,
       a.role, a.symbol_name, a.in_graph, a.derived, a.evidence
FROM css_properties p
JOIN anchors a ON a.kind='property' AND a.ref_id = p.id
WHERE p.name = :name;

-- 2) chain tree (flat; parent_row rebuilds the tree)
SELECT c.anchor_role, cn.depth, cn.parent_row, cn.name, cn.type, cn.layer,
       cn.is_branch_point, cn.branch_hint,
       cn.source_path || ':' || cn.source_line AS source_ref, cn.source_snippet
FROM chains c
JOIN chain_nodes cn ON cn.chain_id = c.id
JOIN css_properties p ON p.name = c.ref_name AND c.kind='property'
WHERE p.name = :name
ORDER BY c.id, cn.id;
```

**Interpretation:** one tree per `(chain, anchor_role)`; within a chain, walk `parent_row` to
rebuild the tree (`ORDER BY c.id, cn.id` keeps each chain contiguous, parents before children).
Role anchors tell you *where each step lives*; the tree tells you *what connects to what*.

### B. Lifecycle of an HTML element

```sql
SELECT e.tag, e.classname, e.creator_fn, e.webidl_interface,
       a.role, a.symbol_name, a.in_graph
FROM html_elements e
JOIN anchors a ON a.kind='element' AND a.ref_id = e.id
WHERE e.tag = :tag;

SELECT c.anchor_role, cn.depth, cn.parent_row, cn.name, cn.layer, cn.is_branch_point, cn.branch_hint,
       cn.source_path || ':' || cn.source_line AS source_ref
FROM chains c
JOIN chain_nodes cn ON cn.chain_id = c.id
JOIN html_elements e ON e.tag = c.ref_name AND c.kind='element'
WHERE e.tag = :tag
ORDER BY c.id, cn.id;
```

### C. Reverse lookups

```sql
-- every property that lands in a given style struct
SELECT name, kind, gecko_ffi_name FROM css_properties WHERE style_struct = 'Margin';

-- element(s) behind a WebIDL interface name
SELECT tag, classname, class_path FROM html_elements WHERE webidl_interface = :name;

-- all properties with a dedicated getComputedStyle getter
SELECT name FROM css_properties p
WHERE EXISTS (SELECT 1 FROM anchors a WHERE a.kind='property' AND a.ref_id=p.id
              AND a.role='expose' AND a.symbol_name LIKE '%nsComputedDOMStyle%');
```

### D. Condition branches

```sql
SELECT cn.name, cn.branch_hint, cn.source_path, cn.source_line, cn.source_snippet
FROM chain_nodes cn
WHERE cn.is_branch_point = 1
LIMIT :n;

-- branch points within one property's chains
SELECT c.anchor_role, cn.depth, cn.name, cn.branch_hint, cn.source_path || ':' || cn.source_line AS ref
FROM chain_nodes cn JOIN chains c ON c.id = cn.chain_id
WHERE c.kind='property' AND c.ref_name = :name AND cn.is_branch_point=1;
```

`branch_hint` vocabulary: `tag / computed display value` (factory, frame constructor),
`property kind (longhand/shorthand/custom)` (cascade, parse dispatch),
`style struct member` (style-struct setters), `selector component` (matching).

### F. Core algorithm of a CSS property (`read_by`)

```sql
-- where does the engine CONSUME the computed value?
SELECT a.symbol_name, a.source_path
FROM anchors a JOIN css_properties p ON p.id = a.ref_id
WHERE a.kind='property' AND a.role='read_by' AND p.name = :name;
```

**Examples:**
- `:name = 'text-overflow'` → `TextOverflow.cpp:306` (reads `mTextOverflow`) — the ellipsis/clip
  algorithm (`WillProcessLines` → `CreateMarkers` → `nsDisplayTextOverflowMarker`, executed during
  display-list construction).
- `:name = 'line-clamp'` → `nsBlockFrame.cpp:595` (the block-frame line-clamping algorithm), plus
  consumers `nsBlockReflowContext.cpp`, `nsLineBox.h`, `ReflowInput.h`, and its `TextOverflow`
  integration.

**Interpretation:** `store` tells you where the value lives; `read_by` tells you which algorithm
acts on it. Combine with Recipe D (branch points in those files) for full behavior explanations.

### E. Audits & summaries

```sql
SELECT * FROM property_chain_summary;   -- one row per property × role × terminal
SELECT * FROM element_chain_summary;
SELECT branch_hint, COUNT(*) FROM chain_nodes WHERE is_branch_point=1 GROUP BY 1;
SELECT COUNT(*) FROM anchors WHERE in_graph=0;   -- derived anchors
```

## 5. JSON traversal (equivalent of recipes A/B)

```js
const fs = require('fs');
const db = JSON.parse(fs.readFileSync('<skill>/db/css-html-callgraph.json', 'utf8'));
const p = db.properties['margin-top'];
p.kind; p.style_struct; p.gecko_ffi_name  // record fields
p.anchors                                 // [{role, symbol, in_graph, derived, evidence}]
p.chains                                  // [{role, terminal_boundary, tree}]
p.chains[0].tree.children                 // nested tree — walk children[] for branches
// tree node: {name, type, layer, node_id, depth, source_ref: {path, line},
//             is_branch_point, branch_hint, terminal_boundary, children[]}
const e = db.elements['a'];
e.chains[0].tree.children                 // same shape for elements
```

Use JSON when you need the *shape* of the tree (UI rendering, recursive walkers);
use SQLite when you need *filtering/joining* (reverse lookups, audits).

## 6. Agent rules (read before answering)

1. **`in_graph = 0` anchors are convention-derived** (the code is macro-generated at build time).
   The TOML name / convention is recorded in `evidence`. Never present them as literal source text.
2. **Chains terminate at the display-list boundary.** Questions about painting/compositing are out
   of database scope — say so explicitly instead of guessing.
3. **`source_ref` paths are relative to the user's Firefox checkout** — prepend the root when reading code. Line numbers are pinned to **Firefox 157.0.1 @ `47c5f402c8` (branch `release`)** — see §7. If the user hasn't provided a matching checkout, follow §7.2 to help them obtain one.
4. **`source_ref` is definition-level** (grep-located), not a full control-flow graph. Verify
   condition semantics by reading the surrounding function before making strong claims.
5. **Always cite**: `graph_node_id` + `source_ref` (`path:line`) in answers, so humans can verify.
6. **Bounds**: chains are depth ≤ 6, ≤ 50 nodes. Questions needing deeper context require direct
   source reading — the database is the *index*, the source is the *truth*.
7. **Node types are canonical** (`file/config/document/function/class`); layer names match the
   knowledge-graph's 18 layers (`layers.json`).

## 7. Source provisioning & revision pinning (critical for source references)

All `source_ref` values (`path:line`, `source_snippet`) are tied to an **exact Firefox
revision**, recorded in the database and `meta.json`:

| Attribute | Value |
|---|---|
| Branch | `release` |
| Commit | `47c5f402c8d3a5369f1fb1b6cd61b0bb92725af1` |
| Firefox version | **157.0.1** |
| Reference checkout (this machine) | `D:\geco-dict\firefox` |

### 7.1 Source root is user-provided

The database does **not** own a source tree. When answering questions that require
reading code:

1. Ask the user for their Firefox checkout path **and verify it matches the pinned
   commit** (`git -C <path> rev-parse HEAD` → `47c5f402c8d3…`).
2. If the user's checkout is a different revision, line numbers may be wrong — treat
   `source_ref` as approximate, locate the symbol by name, and warn the user.

### 7.2 If no matching source exists — help the user obtain it

Offer, in order of preference:

```powershell
# Option 1: git clone (verifiable commit hashes; gecko-dev GitHub mirror)
git clone https://github.com/mozilla/gecko-dev.git firefox
cd firefox
git checkout 47c5f402c8d3a5369f1fb1b6cd61b0bb92725af1

# Option 2: official release source tarball (no git; content matches 157.0.1)
# https://ftp.mozilla.org/pub/firefox/releases/157.0.1/source/firefox-157.0.1.source.tar.xz
```

Note: a full checkout is ~480k files / several GB — confirm disk space and set the
resulting path as the source root for all `source_ref` lookups.

### 7.3 After a Firefox update

Line numbers are only valid for the pinned revision. If the user moves to a newer
Firefox: regenerate the knowledge graph + re-run the Phase C scripts; the tree-sitter
fingerprints baseline detects changed files automatically.

## 8. Worked example (agent session)

**Q:** “How does `text-decoration-color` reach the screen?”

```sql
SELECT role, symbol_name, in_graph FROM anchors
WHERE kind='property' AND ref_id=(SELECT id FROM css_properties WHERE name='text-decoration-color');
```

→ rows: `define` (longhands.toml), `codegen` (properties.mako.rs), `parse`
(`longhands::text_decoration_color::parse_declared`, derived), `cascade` (cascade.rs),
`store` (`class:…nsStyleStruct.h:nsStyleText`), `expose` (getter or servo-serialized), `ffi`
(`glue.rs:Servo_ParseProperty`).

```sql
-- chain tree, then branch points
… WHERE p.name='text-decoration-color' AND cn.is_branch_point=1;
```

→ e.g. branch in `cascade.rs` (`branch_hint = property kind…`) with `source_ref` into
`cascade.rs:…`.

**Answer template**: “`text-decoration-color` is defined in `longhands.toml` (style struct
**Text**, FFI name `mTextDecorationColor`). Parsing is generated into
`properties.mako.rs` (`parse_declared` — derived symbol). During cascade,
`properties/cascade.rs:cascade` applies it into `nsStyleText` (branch site:
`cascade.rs:412`, decides per property kind). The value reaches layout through
`gecko.mako.rs` bindings and can be read from script via `nsComputedDOMStyle`. The chain
ends at display-list generation (`nsDisplayText` reads `nsStyleText`) — painting itself is
out of scope.” — every claim backed by an `anchor` row and a `source_ref`.

## 9. Re-generation

If the knowledge graph changes (new phases, fixes): re-run the four scripts in
`scripts/rebuild/` (`extract-properties` → `extract-elements` → `link-db` → `build-db`) with
`FIREFOX_SRC` set to the pinned checkout.
Deterministic and idempotent; seconds per run. See `docs/DESIGN.md` §8.
