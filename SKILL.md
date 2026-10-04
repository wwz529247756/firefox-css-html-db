---
name: firefox-css-html-db
description: Query how CSS properties and HTML elements are implemented in Firefox Gecko (157.0.1, release branch). Use when answering "how does CSS property X / HTML element Y work in Firefox" — call-chain trees, parse/cascade/store/expose anchors, core-algorithm (read_by) sites, with source references. Not for painting internals, SVG/MathML, or non-CSS/HTML subsystems.
---

# firefox-css-html-db

Query database mapping **528 CSS properties** and **94 HTML elements** to their implementation
call chains in the Firefox Gecko engine — chain trees, role anchors, and source references,
pinned to **Firefox 157.0.1 @ `47c5f402c8d3a5369f1fb1b6cd61b0bb92725af1`** (branch `release`).

## Prerequisites

| Prerequisite | Required for | Check |
|---|---|---|
| **Node.js ≥ 22** | everything (built-in `node:sqlite` — no other dependencies) | `node --version` |
| **Firefox source repo**, pinned to commit `47c5f402c8d3a5369f1fb1b6cd61b0bb92725af1` (branch `release`, Firefox **157.0.1**) | rebuild pipeline; reading source context beyond stored snippets | `git -C <repo> rev-parse HEAD` |

**Resolving the Firefox repo — no default location is assumed:**

1. `FIREFOX_SRC` environment variable, or
2. pass the checkout path explicitly as an argument, or
3. if neither exists, run `node scripts/check-env.cjs` — it prints step-by-step
   acquisition instructions (gecko-dev clone at the pinned commit, or the official
   157.0.1 source tarball).

Note: **querying the bundled database works without the Firefox repo** — the source is
required for the rebuild pipeline and for expanding `source_ref` citations into full code.

## What's in the box

| Path | Contents |
|---|---|
| `db/css-html-callgraph.db` | SQLite database (properties, elements, anchors, chains, chain_nodes) |
| `data/knowledge-graph.json` | Source knowledge graph (enables full DB regeneration) |
| `data/completeness-matrix.csv` | Per-property/per-element consumer coverage proof |
| `data/scope-report.md` | File coverage ledger (1,099 analyzed / exclusions with reasons) |
| `scripts/query.cjs` | CLI for the common queries |
| `scripts/draw-chains.cjs` | Render chain trees of any property/element as markdown |
| `scripts/verify.cjs` | Database verification (counts, formats, doc-recipe smoke test) |
| `scripts/rebuild/` | Full regeneration pipeline (C1→C4) |
| `docs/` | DESIGN (build), AGENT-GUIDE (consumption), PLAN (history) |

## Quick start

```powershell
node "<skill>/scripts/check-env.cjs"                      # verify prerequisites (DB, Node, Firefox repo)
node "<skill>/scripts/query.cjs" property margin-top      # record + role anchors + chains
```
node "<skill>/scripts/query.cjs" element a                # element lifecycle anchors
node "<skill>/scripts/query.cjs" tree text-overflow       # ASCII chain trees
node "<skill>/scripts/query.cjs" readers text-overflow    # core-algorithm sites (read_by)
node "<skill>/scripts/query.cjs" dump text-overflow       # one-shot: record + anchors + chains + snippets (--json for machine-readable)
node "<skill>/scripts/query.cjs" struct Margin            # properties per style struct
node "<skill>/scripts/query.cjs" search clamp             # name search
node "<skill>/scripts/query.cjs" stats                    # totals
```

SQL access (read-only):

```js
const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("<skill>/db/css-html-callgraph.db", { readOnly: true });
```

Full SQL recipes: `docs/AGENT-GUIDE.md` §4 (property journey, element lifecycle, reverse
lookups, condition branches, audits). Schema: `docs/DESIGN.md` §5.

## Chain-tree rendering

```powershell
node "<skill>/scripts/draw-chains.cjs" text-overflow --out text-overflow-chains.md
```

Works for all 528 properties and 94 elements. Samples in `examples/`.

## Source provisioning (user-provided)

`source_ref` line numbers are pinned to **Firefox 157.0.1 @ `47c5f402c8` (branch `release`)**.
The database does not own a source tree — resolve it per **Prerequisites** above. If the
user's checkout is a different revision, treat line references as approximate, locate
symbols by name, and say so. Detailed workflow: `docs/AGENT-GUIDE.md` §7.

## Regeneration

The JSON export (`db/css-html-callgraph.json`) is bundled alongside the database and is
regenerated together with it.
To (re)generate the database + JSON from the bundled knowledge graph + a Firefox checkout:

```powershell
$env:FIREFOX_SRC = "<firefox-checkout-path>"   # required — no default location is assumed
node "<skill>/scripts/rebuild/extract-properties.cjs"
node "<skill>/scripts/rebuild/extract-elements.cjs"
node "<skill>/scripts/rebuild/link-db.cjs"
node "<skill>/scripts/rebuild/build-db.cjs"
node "<skill>/scripts/verify.cjs"
```

Deterministic and idempotent (seconds). Outputs land in `db/` and `data/`.

## Agent rules (summary — full list in docs/AGENT-GUIDE.md §6)

1. `in_graph=0` anchors are convention-derived (macro-generated code) — cite the `evidence`,
   never present them as literal source.
2. Chains **terminate at the display-list boundary** (frame construction → frames → display
   items). Painting/compositing questions are out of scope — say so.
3. `source_ref` paths are relative to the user's Firefox checkout; line numbers are pinned to
   the revision above.
4. Every answer should cite `symbol_name` + `source_ref` (`path:line`) for verifiability.
5. The database is the *index*; the source is the *truth*.
