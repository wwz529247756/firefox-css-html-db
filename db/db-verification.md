# Phase C - Database Verification Report

Generated: 2026-10-04T05:32:54.513Z

[PASS] **property coverage** - 528/528 parsed from TOML
[PASS] **properties with read_by** - 214 with dedicated readers; 314 without (recorded)
[PASS] **element coverage** - 94 tags from nsHTMLTagList.inc
[PASS] **spot margin-top** - store=class:firefox/layout/style/nsStyleStruct.h:nsStyleMargin
[PASS] **spot <a>** - 
[PASS] **spot text-overflow read_by** - firefox/layout/generic/TextOverflow.cpp:306 reads mTextOverflow
[PASS] **spot line-clamp read_by** - firefox/layout/generic/nsBlockFrame.cpp:1135 reads mWebkitLineClamp
[PASS] **chains reach boundary** - 4178/5484 chains reach display-list boundary
[PASS] **source_ref hit-rate >= 90%** - 100.0% (62329/62329)
[PASS] **tree integrity** - every parent row precedes child

- properties: 528 (longhand 434 / shorthand 94)
- elements: 94 (concrete 86)
- chains: 5484 (tree nodes 62329); boundary-reaching: 4178
- completeness matrix: completeness-matrix.csv (614 rows)