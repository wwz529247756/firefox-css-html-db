# Firefox Gecko — CSS & HTML Analysis Scope Report

Generated: 2026-10-03 · Graph: v1.3.0 (`knowledge-graph.json`) · Source: `D:\geco-dict\firefox` @ `47c5f402c8`

**In scope: 1099 files — analyzed: 1099/1099 (100%) — graph nodes: 3884**

Every file below has at least one node in the knowledge graph (file node + extracted symbols). Paths are relative to `firefox/`.

## 1. servo/components/style — Stylo CSS Engine — 310 files

### servo/components/style/ (42)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/applicable_declarations.rs` | rust | 326 | Stylo Style Engine Core (Rust) | Applicable-declarations management for the Stylo style system |
| `servo/components/style/author_styles.rs` | rust | 83 | Stylo Style Engine Core (Rust) | GenericAuthorStyles (exported as AuthorStyles) holds a set of author stylesheets plus computed Arc<CascadeData>, used e.g |
| `servo/components/style/bezier.rs` | rust | 176 | Stylo Style Engine Core (Rust) | Parametric unit cubic Bezier curve used for CSS transition/animation timing functions (based on WebKit's UnitBezier.h); solves with Newton's method and a bisec… |
| `servo/components/style/bloom.rs` | rust | 403 | Stylo Style Engine Core (Rust) | The style bloom filter used to fast-reject deep descendant selectors during matching |
| `servo/components/style/build_gecko.rs` | rust | 393 | Stylo Style Engine Core (Rust) | Gecko-only build script logic: drives bindgen to generate structs.rs from layout/style/ServoBindings.toml (headers, allowlists, opaque types, fixups, cbindgen … |
| `servo/components/style/build.rs` | rust | 85 | Stylo Style Engine Core (Rust) | Build script for the style crate: requires exactly one of the servo/gecko features, locates a Python 3 interpreter (PYTHON3 or PATH), runs properties/build.py … |
| `servo/components/style/Cargo.toml` | toml | 112 | Stylo Style Engine Core (Rust) | Cargo manifest for the style crate ('The Stylo CSS engine'); declares the build.rs script, gecko/servo feature sets, and dependencies including style_traits, s… |
| `servo/components/style/context.rs` | rust | 716 | Stylo Style Engine Core (Rust) | The context within which style is calculated |
| `servo/components/style/custom_properties_map.rs` | rust | 248 | Stylo Style Engine Core (Rust) | CustomPropertiesMap: an Arc<Inner> persistent map of an element's custom properties with cheap copy-on-write; Inner chains to a parent (ancestor limit of 4) st… |
| `servo/components/style/custom_properties.rs` | rust | 2020 | Stylo Style Engine Core (Rust) | The var()/env()/attr() substitution engine for custom properties: VariableValue parsing that records substitution-function references and unit dependencies, Cs… |
| `servo/components/style/data.rs` | rust | 693 | Stylo Style Engine Core (Rust) | Per-node style data for style calculation |
| `servo/components/style/dom_apis.rs` | rust | 937 | Stylo Style Engine Core (Rust) | Generic DOM-API implementations shared between Servo and Gecko, driven from C++ bindings |
| `servo/components/style/dom.rs` | rust | 1166 | Stylo Style Engine Core (Rust) | The generic DOM abstraction the style crate is written against |
| `servo/components/style/driver.rs` | rust | 172 | Stylo Style Engine Core (Rust) | Style traversal driver: traverse_dom() seeds a breadth-first work queue from the traversal root, sets up ScopedTLS thread-local contexts, and hands off to para… |
| `servo/components/style/error_reporting.rs` | rust | 484 | Stylo Style Engine Core (Rust) | Types used to report CSS parsing errors |
| `servo/components/style/font_face.rs` | rust | 554 | Stylo Style Engine Core (Rust) | The @font-face at-rule: FontFaceRule with shared Descriptors, the src descriptor's Source/SourceList (url with format()/tech(), local()), FontFaceSourceTechFla… |
| `servo/components/style/font_metrics.rs` | rust | 124 | Stylo Style Engine Core (Rust) | FontMetrics struct exposing what the style system needs for metric-dependent CSS units (ex/ch/cap/ic, ascent, MathML script scale factors), with spec-mandated … |
| `servo/components/style/global_style_data.rs` | rust | 224 | Stylo Style Engine Core (Rust) | Global style-system singletons: GLOBAL_STYLE_DATA (leaked SharedRwLock plus StyleSystemOptions) and STYLE_THREAD_POOL, a lazily built rayon pool of Stylo worke… |
| `servo/components/style/lib.rs` | rust | 349 | Stylo Style Engine Core (Rust) | Crate root of Stylo's style component (servo/components/style), a primary consumer of the selectors crate for CSS selector handling in the style engine. |
| `servo/components/style/logical_geometry.rs` | rust | 1684 | Stylo Style Engine Core (Rust) | Flow-relative geometry: WritingMode bitflags derived from writing-mode/direction/text-orientation style structs, plus LogicalSize/LogicalPoint/LogicalMargin/Lo… |
| `servo/components/style/macros.rs` | rust | 70 | Stylo Style Engine Core (Rust) | Macro helpers for the style crate: trivial_to_computed_value, try_match_ident_ignore_ascii_case for keyword parsing, gecko/servo local_name!/ns! shims, and a s… |
| `servo/components/style/matching.rs` | rust | 1228 | Stylo Style Engine Core (Rust) | High-level orchestration of CSS selector matching and restyling - the heart of rule matching: MatchMethods/PrivateMatchMethods collect cascade inputs via the s… |
| `servo/components/style/parallel.rs` | rust | 205 | Stylo Style Engine Core (Rust) | Parallel DOM traversal for styling built on Rayon: distributes SendNode work chunks across a ScopeFifo thread pool, keeps a local work queue per thread, tracks… |
| `servo/components/style/parser.rs` | rust | 276 | Stylo Style Engine Core (Rust) | The context within which CSS is parsed: ParserContext (stylesheet origin, url data, parsing mode, quirks mode, namespaces, error reporter, use counters, attr()… |
| `servo/components/style/piecewise_linear.rs` | rust | 282 | Stylo Style Engine Core (Rust) | Piecewise linear function support for CSS linear() easing: entry/function representations with spec-compliant at() evaluation (asymptote extension outside the … |
| `servo/components/style/prefs.rs` | rust | 33 | Stylo Style Engine Core (Rust) | Defines the crate::pref! macro to read static preference values, allowing gecko/servo-specific overrides for preferences that exist in only one embedding. |
| `servo/components/style/README.md` | markdown | 6 | Project Documentation | Short readme for the servo-style crate: states it is the style system for Servo using rust-cssparser, and links to Servo's architecture book for style-system d… |
| `servo/components/style/rule_cache.rs` | rust | 266 | Stylo Style Engine Core (Rust) | Thread-local cache mapping StrongRuleNode paths to finished ComputedValues for reset properties, guarded by RuleCacheConditions (font-size, line-height, writin… |
| `servo/components/style/rule_collector.rs` | rust | 555 | Stylo Style Engine Core (Rust) | RuleCollector gathers all applicable declarations for an element in cascade order: UA/user/author stylist rules via SelectorMaps, :host/::slotted and ::part sh… |
| `servo/components/style/scoped_tls.rs` | rust | 80 | Stylo Style Engine Core (Rust) | Stack-scoped thread-local storage for rayon thread pools: a fixed array of per-thread slots alive for the 'scope lifetime, cleared by the owning thread after r… |
| `servo/components/style/selector_map.rs` | rust | 1040 | Stylo Style Engine Core (Rust) | Stylo component implementing selector maps (indexed rule storage/lookup), built on top of the selectors crate's parsed selectors. |
| `servo/components/style/selector_parser.rs` | rust | 305 | Stylo Style Engine Core (Rust) | Stylo component defining the SelectorParser and Stylo's selector/pseudo-element support, implementing the selectors crate's parser traits. |
| `servo/components/style/shared_lock.rs` | rust | 271 | Stylo Style Engine Core (Rust) | SharedRwLock (AtomicRefCell-backed, supports read-only instances) plus Locked<T> and read/write guards; protects stylesheets, style rules and PropertyDeclarati… |
| `servo/components/style/simple_buckets_map.rs` | rust | 52 | Stylo Style Engine Core (Rust) | A small map for filtering selectors by easily discernible features (class, id, local name), built on the selector map's hash map types. |
| `servo/components/style/str.rs` | rust | 168 | Stylo Style Engine Core (Rust) | String utilities for attributes and number parsing: HTML whitespace handling, splitting, checked ASCII number/fraction/exponent reading, joining and case-insen… |
| `servo/components/style/style_adjuster.rs` | rust | 1085 | Stylo Style Engine Core (Rust) | StyleAdjuster applies post-cascade fixups to a StyleBuilder: blockification, display:contents handling, top-layer, position/overflow/contain propagation, writi… |
| `servo/components/style/style_resolver.rs` | rust | 660 | Stylo Style Engine Core (Rust) | StyleResolverForElement drives per-element styling: match_primary/match_pseudo call Stylist::push_applicable_declarations, compute_rule_node builds the rule no… |
| `servo/components/style/stylesheet_set.rs` | rust | 707 | Stylo Style Engine Core (Rust) | DocumentStylesheetSet tracks the document's stylesheets per origin with append/insert/remove and dirty tracking, producing DocumentStylesheetFlusher/SheetColle… |
| `servo/components/style/stylist.rs` | rust | 5061 | Stylo Style Engine Core (Rust) | The Stylist is the per-document style engine: it owns the StylistStylesheetSet (a DocumentStylesheetSet), rebuilds CascadeData/DocumentCascadeData (SelectorMap… |
| `servo/components/style/thread_state.rs` | rust | 87 | Stylo Style Engine Core (Rust) | Thread-state assertions for the Stylo style engine: a thread-local ThreadState bitflags (SCRIPT/LAYOUT/IN_WORKER/IN_GC) with initialize/get/enter/exit helpers … |
| `servo/components/style/traversal_flags.rs` | rust | 68 | Stylo Style Engine Core (Rust) | TraversalFlags bitflags (AnimationOnly, ForCSSRuleChanges, FinalAnimationTraversal, ParallelTraversal, FlushThrottledAnimations) that control style traversal b… |
| `servo/components/style/traversal.rs` | rust | 764 | Stylo Style Engine Core (Rust) | Implements DOM style traversal: the DomTraversal trait with pre_traverse/element_needs_traversal, recalc_style_at and compute_style (MatchAndCascade / CascadeW… |

### servo/components/style/color/ (8)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/color/color_function.rs` | rust | 599 | Stylo Style Engine Core (Rust) | Defines ColorFunction<OriginColor>, the parsed output of rgb()/hsl()/hwb()/lab()/lch()/oklab()/oklch()/color()/alpha() including relative-color origin |
| `servo/components/style/color/component.rs` | rust | 207 | Stylo Style Engine Core (Rust) | Defines ColorComponent<ValueType> (none, value, channel keyword, calc(), omitted alpha) and the ColorComponentType constructor trait; parses single color compo… |
| `servo/components/style/color/convert.rs` | rust | 956 | Stylo Style Engine Core (Rust) | CSS Color 4 conversion algorithms: hue normalization, HSL/RGB/HWB conversions, polar/orthogonal transforms, D50/D65 white point handling, and the ColorSpaceCon… |
| `servo/components/style/color/gamut.rs` | rust | 225 | Stylo Style Engine Core (Rust) | CSS Color 4 gamut mapping: AbsoluteColor::gamut_map_binary_search implements the binary-search-with-local-MINDE algorithm over Oklch chroma, with in-gamut/clip… |
| `servo/components/style/color/mix.rs` | rust | 645 | Stylo Style Engine Core (Rust) | Color mixing/interpolation for color-mix(): HueInterpolationMethod and ColorInterpolationMethod parse/serialize, mix_many left-to-right fold with weight normal… |
| `servo/components/style/color/mod.rs` | rust | 742 | Stylo Style Engine Core (Rust) | Color support module of the style crate: ColorComponents, the ColorSpace enum covering all CSS Color 4 spaces, ColorFlags bitflags (none-component and legacy-s… |
| `servo/components/style/color/parsing.rs` | rust | 770 | Stylo Style Engine Core (Rust) | CSS color parsing: ChannelKeyword bitflags for relative-color channel keywords, parse_color_with/parse_color_keyword/parse_color_function dispatching rgb/hsl/h… |
| `servo/components/style/color/to_css.rs` | rust | 295 | Stylo Style Engine Core (Rust) | Serialization of colors to CSS: legacy rgb()/rgba(), modern lab()/lch()/oklab()/oklch()/color() with none/calc(infinity) handling via ModernComponent, ToCss im… |

### servo/components/style/color/gamut/ (1)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/color/gamut/raytrace.rs` | rust | 263 | Stylo Style Engine Core (Rust) | Ray-trace gamut mapping (CSS Color 4 section 13.2.5): casts rays through linear-light RGB space from an achromatic anchor to find the gamut boundary intersecti… |

### servo/components/style/counter_style/ (3)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/counter_style/mod.rs` | rust | 754 | Stylo Style Engine Core (Rust) | Implementation of the @counter-style at-rule for Stylo: parses <counter-style> values (name, none, symbols()), defines CounterStyleRule with its descriptors an… |
| `servo/components/style/counter_style/predefined.rs` | rust | 61 | Stylo Style Engine Core (Rust) | Data-only file with a single predefined! invocation listing every predefined counter style name (decimal, disc, cjk-decimal, ethiopic-numeric, ...); include!'d… |
| `servo/components/style/counter_style/update_predefined.py` | python | 35 | Stylo Style Engine Core (Rust) | Generator script that scrapes https://drafts.csswg.org/css-counter-styles/ for names tagged data-dfn-for=<counter-style-name>/<counter-style> and regenerates p… |

### servo/components/style/device/ (3)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/device/gecko.rs` | rust | 486 | Stylo Style Engine Core (Rust) | Gecko backend for Device: holds a raw *const structs::Document (ExtraDeviceData), walks to nsPresContext for viewport size, DPR, text zoom, print preview, medi… |
| `servo/components/style/device/mod.rs` | rust | 304 | Stylo Style Engine Core (Rust) | Platform-independent Device: the media-query evaluation context holding default ComputedValues, the root element's style, atomically-cached root font-size/line… |
| `servo/components/style/device/servo.rs` | rust | 507 | Stylo Style Engine Core (Rust) | Servo backend for Device: ExtraDeviceData carries media type, viewport/device size, DPR, quirks mode, color scheme, pointer capabilities, and a boxed FontMetri… |

### servo/components/style/gecko/ (18)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/gecko/anon_boxes.toml` | toml | 113 | Gecko↔Stylo FFI Bridge | Declarative list of Gecko anonymous boxes (-moz-table, -moz-ruby, -moz-viewport, -moz-block-inside-inline-wrapper, etc.) with inherits and wrapper flags, consu… |
| `servo/components/style/gecko/arc_types.rs` | rust | 217 | Gecko↔Stylo FFI Bridge | Lists all Arc'd FFI types shared with Gecko and generates Servo_*_AddRef/Servo_*_Release extern "C" functions via impl_simple_arc_ffi!/impl_locked_arc_ffi! for… |
| `servo/components/style/gecko/conversions.rs` | rust | 59 | Gecko↔Stylo FFI Bridge | Small conversion helpers between Servo and Gecko types kept here for coherence reasons: RulesMutateError -> nsresult and bidirectional conversion between Matri… |
| `servo/components/style/gecko/data.rs` | rust | 222 | Gecko↔Stylo FFI Bridge | Data needed to style a Gecko document |
| `servo/components/style/gecko/media_features.rs` | rust | 969 | Gecko↔Stylo FFI Bridge | Gecko's media-query feature evaluation |
| `servo/components/style/gecko/mod.rs` | rust | 20 | Gecko↔Stylo FFI Bridge | Module root for Gecko-specific style-system bits |
| `servo/components/style/gecko/non_ts_pseudo_class_list.rs` | rust | 119 | Gecko↔Stylo FFI Bridge | Macro-driven catalogue of all supported non-tree-structural pseudo-classes (:hover, :checked, -moz-* etc.) with their ElementState bits and enabling flags |
| `servo/components/style/gecko/pseudo_element_definition.mako.rs` | rust | 326 | Gecko↔Stylo FFI Bridge | Mako template that generates the Gecko PseudoElement enum, EAGER_PSEUDOS tables, per-type PseudoStyleTypeFlags, property restrictions (APPLIES_TO_FIRST_LETTER … |
| `servo/components/style/gecko/pseudo_element.rs` | rust | 631 | Gecko↔Stylo FFI Bridge | Gecko PseudoElement support built on the include!'d generated definition: parsing pseudo-element syntax (including functional/element-backed view-transition ps… |
| `servo/components/style/gecko/pseudo_elements.py` | python | 137 | Gecko↔Stylo FFI Bridge | Python data model for pseudo-elements and anonymous boxes: parses pseudo_elements.toml and anon_boxes.toml into Pseudo/PseudoElement/AnonBox objects, computes … |
| `servo/components/style/gecko/pseudo_elements.toml` | toml | 198 | Gecko↔Stylo FFI Bridge | Declarative catalogue of supported CSS pseudo-elements (::after, ::before, ::marker, ::highlight, view-transition pseudos, -moz-tree pseudos, form-control pseu… |
| `servo/components/style/gecko/regen_pseudo_elements.py` | python | 37 | Gecko↔Stylo FFI Bridge | Build-script helper that renders pseudo_element_definition.mako.rs with PseudoElementData and writes the generated pseudo_element_definition.rs into the cargo … |
| `servo/components/style/gecko/restyle_damage.rs` | rust | 127 | Gecko↔Stylo FFI Bridge | Gecko's restyle damage representation: GeckoRestyleDamage wraps nsChangeHint with bitwise ops, and compute_style_difference diffs old vs new ComputedValues via… |
| `servo/components/style/gecko/selector_parser.rs` | rust | 622 | Gecko↔Stylo FFI Bridge | Cross-batch file: Gecko's SelectorImpl implementation defining PseudoElement/PseudoClass parsing (::-moz-* etc.), non-tree-skipping pseudo-classes and element … |
| `servo/components/style/gecko/snapshot_helpers.rs` | rust | 334 | Gecko↔Stylo FFI Bridge | Low-level helpers shared by GeckoElement and ServoElementSnapshot to inspect Gecko attribute arrays: finding attrs, id extraction, class/part matching with a b… |
| `servo/components/style/gecko/snapshot.rs` | rust | 202 | Gecko↔Stylo FFI Bridge | Defines GeckoElementSnapshot (ServoElementSnapshot) and SnapshotMap (ServoElementSnapshotTable) and implements the ElementSnapshot trait, so restyle invalidati… |
| `servo/components/style/gecko/traversal.rs` | rust | 52 | Gecko↔Stylo FFI Bridge | Gecko's DomTraversal implementation: RecalcStyleOnly wraps the SharedStyleContext and drives preorder styling of GeckoElement/GeckoNode trees by ensuring eleme… |
| `servo/components/style/gecko/wrapper.rs` | rust | 2243 | Gecko↔Stylo FFI Bridge | The Rust-to-Gecko DOM bridge: GeckoElement, GeckoNode, GeckoDocument and GeckoShadowRoot wrappers implement TElement/TNode/TDocument (plus selectors::Element),… |

### servo/components/style/gecko_bindings/ (1)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/gecko_bindings/mod.rs` | rust | 34 | Gecko↔Stylo FFI Bridge | Root of Gecko's C++ bindings: includes the bindgen-generated structs.rs from OUT_DIR into a permissive `structs` module, re-exports it as `bindings`, and decla… |

### servo/components/style/gecko_bindings/sugar/ (7)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/gecko_bindings/sugar/mod.rs` | rust | 12 | Gecko↔Stylo FFI Bridge | Module index for Rust sugar over Gecko types: ns_com_ptr, ns_compatibility, ns_style_auto_array, origin_flags, ownership, and refptr. |
| `servo/components/style/gecko_bindings/sugar/ns_com_ptr.rs` | rust | 15 | Gecko↔Stylo FFI Bridge | Tiny helper adding nsCOMPtr<T>::raw() returning the underlying mRawPtr. |
| `servo/components/style/gecko_bindings/sugar/ns_compatibility.rs` | rust | 19 | Gecko↔Stylo FFI Bridge | Converts Gecko's nsCompatibility modes (FullStandards/AlmostStandards/NavQuirks) into Stylo's QuirksMode via From. |
| `servo/components/style/gecko_bindings/sugar/ns_style_auto_array.rs` | rust | 111 | Gecko↔Stylo FFI Bridge | Index/IndexMut, iter/iter_mut, len and IntoIterator for nsStyleAutoArray<T> (mFirstElement plus mOtherElements), and type-specialized ensure_len() that calls G… |
| `servo/components/style/gecko_bindings/sugar/origin_flags.rs` | rust | 31 | Gecko↔Stylo FFI Bridge | assert_flags_match() checks OriginFlags bit values against OriginSet, and From impls convert between bindgen OriginFlags and Stylo's OriginSet. |
| `servo/components/style/gecko_bindings/sugar/ownership.rs` | rust | 70 | Gecko↔Stylo FFI Bridge | Helpers for Gecko FFI pointer kinds: Strong<GeckoType> is a repr(C), null-able, deliberately leak-on-drop FFI-safe Arc wrapper, and CopyablePtr gets Deref/Dere… |
| `servo/components/style/gecko_bindings/sugar/refptr.rs` | rust | 299 | Gecko↔Stylo FFI Bridge | Rust mirror of Gecko refcounting: unsafe RefCounted/ThreadSafeRefCounted traits, a custom RefPtr<T> with from_addrefed/new/forget/get and Drop that releases, p… |

### servo/components/style/gecko_string_cache/ (2)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/gecko_string_cache/mod.rs` | rust | 560 | Stylo Style Engine Core (Rust) | string_cache replacement backed by Gecko nsAtom: Atom is a NonZeroUsize handle that is either a dynamic nsAtom pointer or a gGkAtoms static index tagged with t… |
| `servo/components/style/gecko_string_cache/namespace.rs` | rust | 96 | Stylo Style Engine Core (Rust) | Defines the style crate's Namespace types on top of gecko_string_cache atoms: Namespace is a repr(transparent) wrapper around a strong Atom with PrecomputedHas… |

### servo/components/style/invalidation/ (4)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/invalidation/media_queries.rs` | rust | 144 | Stylo Style Engine Core (Rust) | Invalidation support for media-query-affected rules: MediaListKey (address-based key for media lists), ToMediaListKey trait, EffectiveMediaQueryResults cache o… |
| `servo/components/style/invalidation/mod.rs` | rust | 10 | Stylo Style Engine Core (Rust) | Module root for style invalidation code, exposing the element, media_queries, stylesheets, and viewport_units invalidation submodules. |
| `servo/components/style/invalidation/stylesheets.rs` | rust | 744 | Stylo Style Engine Core (Rust) | Invalidations due to stylesheet changes: StylesheetInvalidationSet collects id/class/local-name invalidations (element or subtree scope) from effective rules, … |
| `servo/components/style/invalidation/viewport_units.rs` | rust | 71 | Stylo Style Engine Core (Rust) | Invalidates style of all elements depending on viewport units (svh/lvh/dvh etc.): walks the tree inserting RESTYLE_SELF for query-dependent usage or RECASCADE_… |

### servo/components/style/invalidation/element/ (8)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/invalidation/element/document_state.rs` | rust | 156 | Stylo Style Engine Core (Rust) | An invalidation processor for document-wide state changes (e.g |
| `servo/components/style/invalidation/element/element_wrapper.rs` | rust | 452 | Stylo Style Engine Core (Rust) | Enables selector matching against the pre-restyle state of an element: the ElementSnapshot trait abstracts snapshot data (state, attributes, classes, parts, cu… |
| `servo/components/style/invalidation/element/invalidation_map.rs` | rust | 1630 | Stylo Style Engine Core (Rust) | Builds the per-cascade-data InvalidationMap used for state/attribute invalidations: defines Dependency (selector + offset + chained next for :is/:where/@scope)… |
| `servo/components/style/invalidation/element/invalidator.rs` | rust | 1470 | Stylo Style Engine Core (Rust) | Core driver of element style invalidation: defines the InvalidationProcessor strategy trait, the Invalidation unit (dependency + host + scope + offset), Descen… |
| `servo/components/style/invalidation/element/mod.rs` | rust | 13 | Stylo Style Engine Core (Rust) | Module root for element style invalidation in Stylo: declares the document_state, element_wrapper, invalidation_map, invalidator, relative_selector, restyle_hi… |
| `servo/components/style/invalidation/element/relative_selector.rs` | rust | 1393 | Stylo Style Engine Core (Rust) | Invalidation of element styles for relative selectors (:has()) |
| `servo/components/style/invalidation/element/restyle_hints.rs` | rust | 226 | Stylo Style Engine Core (Rust) | Defines the RestyleHint bitflags, an optimization to avoid unnecessarily re-matching selectors during restyle traversals: RESTYLE_SELF/DESCENDANTS, RECASCADE_*… |
| `servo/components/style/invalidation/element/state_and_attributes.rs` | rust | 758 | Stylo Style Engine Core (Rust) | Invalidation processor for style changes due to element state and attribute changes: compares snapshots against current elements via check_dependency, scans th… |

### servo/components/style/media_queries/ (3)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/media_queries/media_list.rs` | rust | 168 | Stylo Style Engine Core (Rust) | MediaList: parses a comma-separated media query list per the Media Queries spec (invalid queries become 'not all'), evaluates it against a Device with custom-m… |
| `servo/components/style/media_queries/media_query.rs` | rust | 190 | Stylo Style Engine Core (Rust) | MediaQuery per the Media Queries spec: qualifier (only/not), media type (all or concrete custom-ident), and an optional QueryCondition; includes parsing, CSS s… |
| `servo/components/style/media_queries/mod.rs` | rust | 13 | Stylo Style Engine Core (Rust) | Module root for media queries, re-exporting MediaList, MediaQuery, MediaQueryType, MediaType, and Qualifier from its media_list and media_query submodules. |

### servo/components/style/properties/ (18)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/properties/build.py` | python | 113 | Property Definitions & Codegen | Entry point of the property-definition codegen pipeline: builds data.PropertiesData for the servo or gecko engine, renders properties.mako.rs into properties.r… |
| `servo/components/style/properties/cascade.rs` | rust | 2708 | Property Definitions & Codegen | Cross-batch file: implements cascade() and apply_declarations(), walking the rule node path to build the cascade priority queue and apply winning declarations … |
| `servo/components/style/properties/computed_value_flags.rs` | rust | 209 | Property Definitions & Codegen | Bitflags of facts about a computed style (viewport/container-unit usage, visited-dependent values, first-line subtrees, font-metric dependencies...) with helpe… |
| `servo/components/style/properties/counted_unknown_properties.py` | python | 106 | Property Definitions & Codegen | List of recognized-but-unimplemented (mostly -webkit- and legacy) property names tracked for telemetry use counters; consumed by data.py to build CountedUnknow… |
| `servo/components/style/properties/counter_style_descriptors.toml` | toml | 45 | Property Definitions & Codegen | Lists the descriptors of the @counter-style rule (system, negative, prefix, suffix, range, pad, fallback, symbols, additive-symbols, speak-as) with their Rust … |
| `servo/components/style/properties/data.py` | python | 1417 | Property Definitions & Codegen | The property-definition data model driving all property codegen: parses longhand/shorthand definitions (from properties.mako.rs data) into Longhand/Shorthand/A… |
| `servo/components/style/properties/declaration_block.rs` | rust | 1783 | Property Definitions & Codegen | Parsed declaration storage and CSSOM: PropertyDeclarationBlock holds PropertyDeclarations with Importance, supports insertion (push), importance-aware iteratio… |
| `servo/components/style/properties/font_face_descriptors.toml` | toml | 50 | Property Definitions & Codegen | Lists the descriptors of the @font-face rule (font-family, src, font-style/weight/width ranges, font-display, unicode-range, feature/variation settings, metric… |
| `servo/components/style/properties/gecko.mako.rs` | rust | 1566 | Property Definitions & Codegen | Cross-batch file: Gecko-side codegen (included by properties.mako.rs) that bridges computed property values into Gecko's nsStyle* structs, including system fon… |
| `servo/components/style/properties/helpers.mako.rs` | rust | 812 | Property Definitions & Codegen | Mako template library of <%def> blocks that emit the Rust module for each longhand (parse_declared, computed_value, get_initial_value) and each shorthand (Long… |
| `servo/components/style/properties/longhands.toml` | toml | 4288 | Property Definitions & Codegen | Central descriptor file that defines every CSS longhand property (name, Rust value type, initial value, animation behavior, style struct, spec link, flags, pre… |
| `servo/components/style/properties/mod.rs` | rust | 1854 | Property Definitions & Codegen | Hand-written module root of the properties system: defines PropertyId/PropertyDeclarationId/NonCustomPropertyId/LonghandIdSet and PropertyDeclaration::parse_in… |
| `servo/components/style/properties/properties.html.mako` | mako | 31 | Property Definitions & Codegen | Tiny Mako template that renders an HTML documentation page listing the CSS properties Servo supports, with their prefs, from the same property data used for co… |
| `servo/components/style/properties/properties.mako.rs` | rust | 3108 | Property Definitions & Codegen | Main codegen output of the style property system: generated from longhands.toml/shorthands.toml via data.py and build.py, instantiating helpers.mako.rs defs |
| `servo/components/style/properties/property_descriptors.toml` | toml | 18 | Property Definitions & Codegen | Lists the descriptors of the CSS Houdini @property rule (syntax, inherits, initial-value) with their Rust types |
| `servo/components/style/properties/shorthands.rs` | rust | 4232 | Property Definitions & Codegen | Hand-written implementations of shorthand property parsing and expansion (border, margin, background, grid, font, ...): each shorthand has parse_value/parse_in… |
| `servo/components/style/properties/shorthands.toml` | toml | 578 | Property Definitions & Codegen | Defines all CSS shorthand properties (margin, padding, border-*, font, text-decoration, etc.) as tables listing their longhand sub_properties plus expansion ki… |
| `servo/components/style/properties/view_transition_descriptors.toml` | toml | 11 | Property Definitions & Codegen | Lists the descriptors of the @view-transition rule (navigation, types) with their Rust types |

### servo/components/style/properties/helpers/ (1)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/properties/helpers/animated_properties.mako.rs` | rust | 801 | Property Definitions & Codegen | Codegen for CSS animation: defines the AnimationValue enum over all animatable properties plus Animate/ComputeSquaredDistance/ToAnimatedZero impls for interpol… |

### servo/components/style/properties_and_values/ (4)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/properties_and_values/mod.rs` | rust | 12 | Stylo Style Engine Core (Rust) | Module root for CSS Properties and Values (css-properties-values-api): registry, @property rule, syntax string parsing, and registered custom property values. |
| `servo/components/style/properties_and_values/registry.rs` | rust | 65 | Stylo Style Engine Core (Rust) | Registered custom property storage: PropertyRegistration (validated name/descriptors/url data/source location) and ScriptRegistry, the window's registered prop… |
| `servo/components/style/properties_and_values/rule.rs` | rust | 331 | Stylo Style Engine Core (Rust) | The @property at-rule: parses the descriptor block into a PropertyRegistration (requiring syntax and inherits descriptors and a valid initial value), computes/… |
| `servo/components/style/properties_and_values/value.rs` | rust | 757 | Stylo Style Engine Core (Rust) | Specified and computed values for registered custom properties: generic component enums over CSS types, ComponentList with multipliers, Value with url data for… |

### servo/components/style/properties_and_values/syntax/ (3)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/properties_and_values/syntax/ascii.rs` | rust | 60 | Stylo Style Engine Core (Rust) | Small helper that trims leading/trailing ASCII whitespace from a syntax string, used in the 'consume a syntax definition' algorithm. |
| `servo/components/style/properties_and_values/syntax/data_type.rs` | rust | 146 | Stylo Style Engine Core (Rust) | Syntax component data types for @property: the DataType enum of supported <type> names with parsing/serialization/pre-multiplication, and DependentDataTypes bi… |
| `servo/components/style/properties_and_values/syntax/mod.rs` | rust | 437 | Stylo Style Engine Core (Rust) | Parsing and serialization of the @property syntax string per css-properties-values-api: Descriptor (components + specified string, universal '*'), multipliers … |

### servo/components/style/queries/ (5)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/queries/condition.rs` | rust | 994 | Stylo Style Engine Core (Rust) | Query conditions per mediaqueries-4/css-contain-3: QueryCondition tree (Feature, Custom media reference, Not/Operation/InParens, Style, -moz-pref, GeneralEnclo… |
| `servo/components/style/queries/feature_expression.rs` | rust | 1170 | Stylo Style Engine Core (Rust) | Parsing/evaluation of feature expressions like (foo: bar) and (width >= 400px): QueryFeatureExpression with Empty/Single/LegacyRange/Range kinds (legacy min-/m… |
| `servo/components/style/queries/feature.rs` | rust | 199 | Stylo Style Engine Core (Rust) | Query feature plumbing: Evaluator enum describing the value kind each feature parses/evaluates (length, integer, float, bool-integer, ratio, resolution, enumer… |
| `servo/components/style/queries/mod.rs` | rust | 19 | Stylo Style Engine Core (Rust) | Module hub for code shared between media queries and container queries |
| `servo/components/style/queries/values.rs` | rust | 46 | Stylo Style Engine Core (Rust) | Feature value enums shared between media and container features: Orientation (portrait/landscape, square counts as portrait) and PrefersColorScheme (light/dark… |

### servo/components/style/rule_tree/ (6)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/rule_tree/core.rs` | rust | 787 | Selector Matching & Rule Tree | Implements the RuleTree trie of matched declaration blocks: RuleNode/StrongRuleNode/WeakRuleNode with atomic refcounting, a free list and periodic GC so common… |
| `servo/components/style/rule_tree/level.rs` | rust | 396 | Selector Matching & Rule Tree | Defines CascadeLevel (packed bitfield of cascade origin, !important bit and shadow order), the CascadeOrigin enum (UA, User, PresHints, Author, PositionFallbac… |
| `servo/components/style/rule_tree/map.rs` | rust | 202 | Selector Matching & Rule Tree | Small map abstraction (Empty \| One \| full FxHashMap) used for rule node children lists, avoiding heap allocation in the common zero/one-child case |
| `servo/components/style/rule_tree/mod.rs` | rust | 420 | Selector Matching & Rule Tree | Public facade of the rule tree: compute_rule_node and insert_ordered_rules_with_important turn an ApplicableDeclarationList into a StrongRuleNode path (handlin… |
| `servo/components/style/rule_tree/source.rs` | rust | 133 | Selector Matching & Rule Tree | StyleSource/StyleSourceBorrow wrap an Arc<Locked<PropertyDeclarationBlock>> stored in each rule node, coming from style rules, style attributes, animations, SM… |
| `servo/components/style/rule_tree/unsafe_box.rs` | rust | 78 | Selector Matching & Rule Tree | UnsafeBox: a ManuallyDrop<Box<T>> helper providing the manual, refcount-free memory management that RuleNode relies on for its intrusive free-list scheme |

### servo/components/style/servo/ (8)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/servo/animation.rs` | rust | 1922 | Stylo Style Engine Core (Rust) | Servo's CSS transitions and animations engine: keyframe computation, animation state machines, transition starting/reversing per the CSS specs, and per-documen… |
| `servo/components/style/servo/attr.rs` | rust | 714 | Stylo Style Engine Core (Rust) | Parsed representations of DOM attributes for Servo: AttrValue variants with lazy serialization, HTML parsing algorithms for integers, doubles, legacy colors an… |
| `servo/components/style/servo/encoding_support.rs` | rust | 81 | Stylo Style Engine Core (Rust) | Parses stylesheets from raw bytes rather than &str: wires cssparser's stylesheet_encoding up to encoding_rs and adds Stylesheet::from_bytes. |
| `servo/components/style/servo/media_features.rs` | rust | 254 | Stylo Style Engine Core (Rust) | Servo's media feature list and evaluators: viewport size, device size/DPR, orientation, pointer/hover capabilities, aspect ratio, resolution, scan, and prefers… |
| `servo/components/style/servo/mod.rs` | rust | 16 | Stylo Style Engine Core (Rust) | Module root for the Servo-specific bits of the style system (animations, attributes, encoding support, media features, restyle damage, selector parser, shadow … |
| `servo/components/style/servo/restyle_damage.rs` | rust | 215 | Stylo Style Engine Core (Rust) | Servo's restyle damage: hints telling layout which phases (repaint, stacking context, overflow, relayout) to rerun after incremental style changes, computed by… |
| `servo/components/style/servo/selector_parser.rs` | rust | 1031 | Stylo Style Engine Core (Rust) | Servo's selector parser implementation: pseudo-elements, non-tree-structural pseudo-classes, the SelectorImpl binding, element snapshots for restyles, and :lan… |
| `servo/components/style/servo/shadow_parts.rs` | rust | 207 | Stylo Style Engine Core (Rust) | Parsing and storage of the exportparts attribute per css-shadow-parts: part mappings between shadow tree part names. |

### servo/components/style/sharing/ (2)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/sharing/checks.rs` | rust | 281 | Stylo Style Engine Core (Rust) | Eligibility checks for the style sharing cache: quick tests deciding whether two elements can share the same style (parents, style attribute, pres hints, class… |
| `servo/components/style/sharing/mod.rs` | rust | 1002 | Stylo Style Engine Core (Rust) | The style sharing cache: per-DOM-depth LRU caches of candidate elements kept in leaked thread-local storage, letting similar elements reuse computed styles wit… |

### servo/components/style/stylesheets/ (29)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/stylesheets/appearance_base_rule.rs` | rust | 51 | Stylo Style Engine Core (Rust) | The @appearance-base at-rule used for appearance-dependent styles in UA stylesheets: nested rules plus source location, with CSS serialization and deep cloning… |
| `servo/components/style/stylesheets/container_rule.rs` | rust | 769 | Stylo Style Engine Core (Rust) | The @container rule: condition parsing, container lookup by container-type axes and names, query evaluation with size lookups, attribute (attr()) dependency tr… |
| `servo/components/style/stylesheets/counter_style_rule.rs` | rust | 7 | Stylo Style Engine Core (Rust) | Thin re-export of the @counter-style rule definition from crate::counter_style for the stylesheets module tree. |
| `servo/components/style/stylesheets/document_rule.rs` | rust | 272 | Stylo Style Engine Core (Rust) | The prefixed @-moz-document rule (CSS Conditional 3): URL matching functions, condition parsing with Gecko-only allowances, and evaluation delegated to Gecko_D… |
| `servo/components/style/stylesheets/font_face_rule.rs` | rust | 7 | Stylo Style Engine Core (Rust) | Thin Stylo stylesheet-module shim for the @font-face rule; it only re-exports crate::font_face::FontFaceRule as the stylesheets::FontFaceRule used by the CssRu… |
| `servo/components/style/stylesheets/font_feature_values_rule.rs` | rust | 481 | Stylo Style Engine Core (Rust) | Implements the @font-feature-values at-rule (CSS Fonts): value containers (SingleValue/PairValues/VectorValues), the FontFeatureValuesRule with per-feature-typ… |
| `servo/components/style/stylesheets/font_palette_values_rule.rs` | rust | 304 | Stylo Style Engine Core (Rust) | Implements the @font-palette-values at-rule (CSS Fonts 4): FontPaletteValuesRule with font-family/base-palette/override-colors descriptors, its declaration par… |
| `servo/components/style/stylesheets/import_rule.rs` | rust | 259 | Stylo Style Engine Core (Rust) | Implements the @import at-rule: ImportRule holding the URL, an ImportSheet (loaded/pending/refused stylesheet), optional supports() condition and layer() targe… |
| `servo/components/style/stylesheets/keyframes_rule.rs` | rust | 652 | Stylo Style Engine Core (Rust) | Implements @keyframes (CSS Animations): KeyframesRule with named keyframes, selector parsing (from/to/percentage and scroll-driven timeline-range selectors), K… |
| `servo/components/style/stylesheets/layer_rule.rs` | rust | 221 | Stylo Style Engine Core (Rust) | Implements @layer (CSS Cascade 5): LayerName (dot-separated names), block-form LayerBlockRule with nested rules, statement-form LayerStatementRule, and the pac… |
| `servo/components/style/stylesheets/loader.rs` | rust | 29 | Stylo Style Engine Core (Rust) | Defines the StylesheetLoader trait, the abstraction used by the style system to trigger network requests for @import rules while parsing, returning the constru… |
| `servo/components/style/stylesheets/margin_rule.rs` | rust | 190 | Stylo Style Engine Core (Rust) | Implements the page margin at-rules from CSS Paged Media (@top-left, @bottom-center, ...): MarginRuleType enum generated by macro with name matching, and Margi… |
| `servo/components/style/stylesheets/media_rule.rs` | rust | 191 | Stylo Style Engine Core (Rust) | Implements @media and the experimental @custom-media (Media Queries 5): MediaRule with MediaList and nested rules, CustomMediaCondition/CustomMediaRule storage… |
| `servo/components/style/stylesheets/mod.rs` | rust | 920 | Stylo Style Engine Core (Rust) | Module root for stylesheets and CSS rules: declares all rule modules, defines the CssRule enum (Stylo counterpart of Gecko's CSSOM rule wrappers), CssRuleType/… |
| `servo/components/style/stylesheets/namespace_rule.rs` | rust | 43 | Stylo Style Engine Core (Rust) | Implements the @namespace at-rule: NamespaceRule storing an optional prefix and the namespace URL, with CSSOM serialization. |
| `servo/components/style/stylesheets/nested_declarations_rule.rs` | rust | 51 | Stylo Style Engine Core (Rust) | Implements the nested declarations rule from CSS Nesting (bare declarations inside a style rule): NestedDeclarationsRule wrapping a PropertyDeclarationBlock, w… |
| `servo/components/style/stylesheets/origin.rs` | rust | 249 | Stylo Style Engine Core (Rust) | Defines CSS cascade origins: the Origin enum (UserAgent/User/Author), the OriginSet bitflags (equivalent to Gecko OriginFlags), OriginSetIterator, and the PerO… |
| `servo/components/style/stylesheets/page_rule.rs` | rust | 354 | Stylo Style Engine Core (Rust) | Implements the @page rule (CSS Paged Media): PageSelector with name and :first/:blank/:left/:right pseudo-classes, PagePseudoClassFlags, page-selector specific… |
| `servo/components/style/stylesheets/position_try_rule.rs` | rust | 68 | Stylo Style Engine Core (Rust) | Implements the @position-try rule for CSS Anchor Positioning: PositionTryRule with a dashed-ident name and a PropertyDeclarationBlock, with deep clone and seri… |
| `servo/components/style/stylesheets/property_rule.rs` | rust | 5 | Stylo Style Engine Core (Rust) | Thin shim for the @property rule; re-exports crate::properties_and_values::registry::PropertyRegistration as stylesheets::PropertyRule, which is the variant st… |
| `servo/components/style/stylesheets/rule_list.rs` | rust | 167 | Stylo Style Engine Core (Rust) | Implements CssRules, the list of CSS rules: spec-compliant removeRule/insertRule support (parse_rule_for_insert with InsertRuleContext), block serialization us… |
| `servo/components/style/stylesheets/rule_parser.rs` | rust | 1188 | Stylo Style Engine Core (Rust) | The stylesheet rule parser: TopLevelRuleParser with its State machine (Start/EarlyLayers/Imports/Namespaces/Body), AtRuleType/AtRulePrelude dispatch for every … |
| `servo/components/style/stylesheets/rules_iterator.rs` | rust | 397 | Stylo Style Engine Core (Rust) | Provides RulesIterator, a stack-based iterator that recursively walks rule lists (including into @import), gated by the NestedRuleIterationCondition trait with… |
| `servo/components/style/stylesheets/scope_rule.rs` | rust | 507 | Stylo Style Engine Core (Rust) | Implements the @scope rule (CSS Cascade 6): ScopeRule with ScopeBounds (scope-start/scope-end selector lists), parsing, implicit scope roots for shadow trees a… |
| `servo/components/style/stylesheets/starting_style_rule.rs` | rust | 54 | Stylo Style Engine Core (Rust) | Implements the @starting-style rule (CSS Transitions 2 before-change style): StartingStyleRule holding nested CssRules, with deep clone, serialization and heap… |
| `servo/components/style/stylesheets/style_rule.rs` | rust | 80 | Stylo Style Engine Core (Rust) | Implements the ordinary style rule: StyleRule with a selector list, locked PropertyDeclarationBlock and optional nested rules for CSS nesting, plus deep clone,… |
| `servo/components/style/stylesheets/stylesheet.rs` | rust | 570 | Stylo Style Engine Core (Rust) | Stylesheet representation: StylesheetContents (rules, origin, url data, namespaces, quirks mode, use counters; maps to Gecko StyleSheetInner), the Servo Styles… |
| `servo/components/style/stylesheets/supports_rule.rs` | rust | 483 | Stylo Style Engine Core (Rust) | Implements @supports (CSS Conditional): SupportsRule with nested rules, the recursive SupportsCondition AST (not/and/or, declarations, selector(), at-rule(), f… |
| `servo/components/style/stylesheets/view_transition_rule.rs` | rust | 81 | Stylo Style Engine Core (Rust) | Implements the @view-transition rule (CSS View Transitions 2): ViewTransitionRule holding parsed descriptors (navigation/types) via the shared DescriptorParser… |

### servo/components/style/typed_om/ (5)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/typed_om/mod.rs` | rust | 981 | CSS Typed OM | CSS Typed OM (css-typed-om-1) core in Stylo: property-agnostic value representations (TypedValue, NumericValue, the MathValue family, transform components, ima… |
| `servo/components/style/typed_om/numeric_declaration.rs` | rust | 93 | CSS Typed OM | Numeric declaration for CSSNumericValue.parse(): parses a number/dimension token or a calc() expression into a NumericDeclaration (NoCalcNumeric or CalcNode), … |
| `servo/components/style/typed_om/numeric_type.rs` | rust | 640 | CSS Typed OM | NumericType/NumericBaseType implementing the Typed OM numeric-typing algorithm: a fixed-size exponent vector over base types with a percent hint, add/multiply/… |
| `servo/components/style/typed_om/numeric.rs` | rust | 128 | CSS Typed OM | NoCalcNumeric: a Typed OM numeric value without calc() (length/angle/time/number/percentage) exposing unitless_value, unit, canonical_unit, unit conversion, an… |
| `servo/components/style/typed_om/sum_value.rs` | rust | 428 | CSS Typed OM | SumValue: implements the spec's create-a-sum-value algorithm over NumericValue (unit, sum, product, negate, invert, min, max, clamp) using unit-map algebra, pl… |

### servo/components/style/url/ (3)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/url/gecko.rs` | rust | 366 | Stylo Style Engine Core (Rust) | Gecko backend for CSS url() values in Stylo: CssUrl/CssUrlData keep the unresolved serialization plus UrlExtraData and CORS mode, lazily share C++-mutable Load… |
| `servo/components/style/url/mod.rs` | rust | 71 | Stylo Style Engine Core (Rust) | Shared CSS url() handling for Stylo: cfg-selects the Gecko or Servo CssUrl/SpecifiedUrl/ComputedUrl definitions and implements Parse for CssUrl, CORS-mode-awar… |
| `servo/components/style/url/servo.rs` | rust | 241 | Stylo Style Engine Core (Rust) | Servo backend for CSS url() values: eagerly resolves CssUrl against the stylesheet base URL with rust-url at parse time, distinguishing Valid/Invalid ComputedU… |

### servo/components/style/use_counters/ (1)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/use_counters/mod.rs` | rust | 137 | Stylo Style Engine Core (Rust) | CSS property use counters for Stylo: atomic bitset counters (NonCustomPropertyUseCounters, CountedUnknownPropertyUseCounters, CustomUseCounters) recorded durin… |

### servo/components/style/values/ (3)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/values/distance.rs` | rust | 139 | Stylo Property Values | Interpolation infrastructure shared by animatable computed values: defines SquaredDistance and WeightedRatio helpers used by derive(Animate)/ComputeSquaredDist… |
| `servo/components/style/values/mod.rs` | rust | 816 | Stylo Property Values | Values module root for the style system: common CSS value primitives (CSSFloat, normalize/calc_min/calc_max, CustomIdent, parsing helpers) and submodule declar… |
| `servo/components/style/values/tagged_numeric.rs` | rust | 253 | Stylo Property Values | Infrastructure module providing NumericUnion, a niche-optimized tagged union storing small numeric values inline or boxing calc() expressions |

### servo/components/style/values/animated/ (9)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/values/animated/color.rs` | rust | 103 | Stylo Property Values | Animation impls for colors in Stylo: Animate for AbsoluteColor via color-mix with best interpolation method, animated Color (GenericColor<Percentage>) animated… |
| `servo/components/style/values/animated/effects.rs` | rust | 26 | Stylo Property Values | Animated type aliases for CSS filter effects: AnimatedSimpleShadow for drop-shadow() and AnimatedFilter instantiated over animated angle/number/length/color ge… |
| `servo/components/style/values/animated/font.rs` | rust | 37 | Stylo Property Values | Animation impls for font-related types: Animate/ComputeSquaredDistance/ToAnimatedZero for FontVariationSettings using by-computed-value list animation over the… |
| `servo/components/style/values/animated/grid.rs` | rust | 161 | Stylo Property Values | Animation impls for grid types: interpolation for TrackSize/TrackRepeat/TrackList with discrete fallback per csswg resolutions (auto-fit/fill and line names no… |
| `servo/components/style/values/animated/lists.rs` | rust | 141 | Stylo Property Values | List animation strategies from Web Animations: by_computed_value (element-wise, equal lengths), with_zero (shadow/filter semantics interpolating missing entrie… |
| `servo/components/style/values/animated/mod.rs` | rust | 550 | Stylo Property Values | Animated values core for the Stylo style engine: the Animate/ToAnimatedValue/ToAnimatedZero traits, the Procedure enum (Interpolate/Add/Accumulate) with weight… |
| `servo/components/style/values/animated/svg.rs` | rust | 46 | Stylo Property Values | Animation impls for SVG types: Animate/ComputeSquaredDistance for SVGStrokeDashArray using repeatable-list interpolation and rejecting Add/Accumulate as non-ad… |
| `servo/components/style/values/animated/text.rs` | rust | 58 | Stylo Property Values | Animation impls for text-related types: TextDecorationInset resolves text-decoration inset auto into animatable start/end LengthPercentage values with an is_au… |
| `servo/components/style/values/animated/transform.rs` | rust | 1590 | Stylo Property Values | Transform interpolation for the Stylo style engine: 2D/3D matrix decomposition (MatrixDecomposed2D/3D, Quaternion) with recomposition, and Animate for computed… |

### servo/components/style/values/computed/ (38)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/values/computed/align.rs` | rust | 90 | Stylo Property Values | Computed values for CSS Box Alignment in Stylo: re-exports specified ContentDistribution/ItemPlacement/SelfAlignment and defines ComputedJustifyItems carrying … |
| `servo/components/style/values/computed/angle.rs` | rust | 130 | Stylo Property Values | Computed Angle value for Stylo: stored in degrees with radian/degree conversion, Zero/Neg/AddAssign and derived Animate, ComputeSquaredDistance using the SVG a… |
| `servo/components/style/values/computed/animation.rs` | rust | 124 | Stylo Property Values | Computed values for animation/transition properties in Stylo: AnimationDuration, AnimationIterationCount (number or infinite), AnimationTimeline, ViewTimelineI… |
| `servo/components/style/values/computed/background.rs` | rust | 13 | Stylo Property Values | Computed values for the CSS background property group (background-size etc.); computed types derive from specified via ToComputedValue. |
| `servo/components/style/values/computed/basic_shape.rs` | rust | 267 | Stylo Property Values | Computed values for clip-path, shape-outside and shape() basic shapes; reuses specified svg_path parsing (PathCommand, CoordPair) and generic shape definitions. |
| `servo/components/style/values/computed/border.rs` | rust | 163 | Stylo Property Values | Computed values for the border/border-image/border-radius property group; widths resolve to device pixels (Au) at computed-value time. |
| `servo/components/style/values/computed/box.rs` | rust | 267 | Stylo Property Values | Computed values for the box layout property group (display-side properties like overflow, resize, zoom, line-clamp, perspective); keywords are mirrored from sp… |
| `servo/components/style/values/computed/calc.rs` | rust | 334 | Stylo Property Values | Computed leaf nodes for calc() math expressions across length/angle/time/percentage/number/resolution units; simplification lives in specified/calc with Comput… |
| `servo/components/style/values/computed/color.rs` | rust | 157 | Stylo Property Values | Computed values for the color property group (color, caret-color, color-mix); resolves specified colors (system colors, currentcolor) into AbsoluteColor at com… |
| `servo/components/style/values/computed/column.rs` | rust | 11 | Stylo Property Values | Computed values for the CSS multicol property group (column-count); thin alias module over the generic column count. |
| `servo/components/style/values/computed/corner_shape.rs` | rust | 151 | Stylo Property Values | Computed values for the corner-shape property (superellipse/round/square/bevel/scoop/notch); mirrors the specified keywords with a computed rect helper. |
| `servo/components/style/values/computed/counters.rs` | rust | 26 | Stylo Property Values | Computed values for counter-increment/reset/set and the content property; count values resolve to i32 with calc() already evaluated. |
| `servo/components/style/values/computed/easing.rs` | rust | 109 | Stylo Property Values | Computed timing functions for the transition/animation property group; converts specified keywords/steps to piecewise-linear functions plus integer/number para… |
| `servo/components/style/values/computed/effects.rs` | rust | 30 | Stylo Property Values | Computed values for the filter and box-shadow effect property group; lengths resolve at computed-value time and urls are kept (or dropped in the servo variant). |
| `servo/components/style/values/computed/flex.rs` | rust | 19 | Stylo Property Values | Computed values for the flexbox item properties (flex-basis); thin alias over the generic flex basis using computed Size. |
| `servo/components/style/values/computed/font.rs` | rust | 1517 | Stylo Property Values | Computed values for the font property group (font-family/size/weight/style/width/variant, line-height, font-feature/variation-settings, math-depth); the larges… |
| `servo/components/style/values/computed/image.rs` | rust | 273 | Stylo Property Values | Computed values for the image property group (background-image, content images, gradients, image-set, cross-fade); mirrors specified::image generics with compu… |
| `servo/components/style/values/computed/length_percentage.rs` | rust | 1057 | Stylo Property Values | Core computed LengthPercentage type: a tagged union (tag + f32 or CalcLengthPercentage) shared by nearly every length-accepting property; resolves calc() again… |
| `servo/components/style/values/computed/length.rs` | rust | 572 | Stylo Property Values | Core computed absolute length types (CSSPixelLength) and derived aliases for size/margin/width properties (Size, MaxSize, Margin, LengthOrAuto); conversion ent… |
| `servo/components/style/values/computed/list.rs` | rust | 16 | Stylo Property Values | Computed values for the list property group (list-style-type, quotes); re-exports the specified ListStyleType/Quotes and defines the quotes initial value. |
| `servo/components/style/values/computed/mod.rs` | rust | 1143 | Stylo Property Values | Hub of the computed values module: the ToComputedValue Context (style/quirks/device, font metrics, zoom), iterators, and shared aliases (Number, Integer, Opaci… |
| `servo/components/style/values/computed/motion.rs` | rust | 73 | Stylo Property Values | Computed values for the CSS motion path property group (offset-path, offset-position, offset-rotate); built on generic motion definitions with computed basic s… |
| `servo/components/style/values/computed/outline.rs` | rust | 7 | Stylo Property Values | Computed values for the outline property group; thin module re-exporting specified OutlineStyle (computed == specified). |
| `servo/components/style/values/computed/page.rs` | rust | 77 | Stylo Property Values | Computed values for paged media (page name and the size property); PageSize resolves specified keywords/lengths to orientation + concrete dimensions. |
| `servo/components/style/values/computed/param.rs` | rust | 9 | Stylo Property Values | Computed values for CSS link-parameters (param()); specified == computed, so this module just re-exports specified LinkParameters. |
| `servo/components/style/values/computed/percentage.rs` | rust | 143 | Stylo Property Values | Core computed Percentage type and ToPercentage helper; percentages are stored as f32 and converted from specified via ToComputedValue. |
| `servo/components/style/values/computed/position.rs` | rust | 273 | Stylo Property Values | Computed values for the position property group (object-position, anchor positioning, inset, z-index, aspect-ratio); Position resolves to LengthPercentage pair… |
| `servo/components/style/values/computed/ratio.rs` | rust | 88 | Stylo Property Values | Computed values for the <ratio> type used by aspect-ratio; thin alias of the generic ratio over NonNegativeNumber. |
| `servo/components/style/values/computed/rect.rs` | rust | 19 | Stylo Property Values | Computed values for rectangle-shaped values used by the shape-outside/border-image property group; defines NonNegativeLengthOrNumberRect over generics::rect |
| `servo/components/style/values/computed/resolution.rs` | rust | 76 | Stylo Property Values | Computed value for the <resolution> type serving the resolution media/property group |
| `servo/components/style/values/computed/svg.rs` | rust | 66 | Stylo Property Values | Computed values for the SVG properties group (fill, stroke, stroke-width, opacity, etc.) as type aliases over generics::svg |
| `servo/components/style/values/computed/table.rs` | rust | 7 | Stylo Property Values | Computed values for the table properties group (caption-side); a thin re-export of specified::table::CaptionSide since keywords are computation-invariant |
| `servo/components/style/values/computed/text.rs` | rust | 199 | Stylo Property Values | Computed values for the CSS text properties group (text-align, text-indent, letter-spacing, word-spacing, text-emphasis, hyphenate-limit-chars, initial-letter,… |
| `servo/components/style/values/computed/time.rs` | rust | 83 | Stylo Property Values | Computed <time> value serving the animation/transition property group |
| `servo/components/style/values/computed/transform.rs` | rust | 559 | Stylo Property Values | Computed values for the CSS transform property group (transform, translate/rotate/scale, transform-origin); mostly re-exports aliases over generics::transform … |
| `servo/components/style/values/computed/tree_counting.rs` | rust | 30 | Stylo Property Values | Computed result type for tree-counting functions serving the sibling-index()/sibling-count() property group |
| `servo/components/style/values/computed/ui.rs` | rust | 23 | Stylo Property Values | Computed values for the UI properties group (cursor, scrollbar-color) as aliases over generics::ui |
| `servo/components/style/values/computed/url.rs` | rust | 12 | Stylo Property Values | Computed url helper for the url()/image property groups; re-exports ComputedUrl from crate::url and defines UrlOrNone |

### servo/components/style/values/generics/ (28)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/values/generics/animation.rs` | rust | 363 | Stylo Property Values | Generic value types for the animation property group (animation-duration/timeline/range, view(), view-timeline-inset) |
| `servo/components/style/values/generics/background.rs` | rust | 65 | Stylo Property Values | Generic values for the background property group (background-size cover/contain/length pair) |
| `servo/components/style/values/generics/basic_shape.rs` | rust | 1385 | Stylo Property Values | Generic values for the shape property group: clip-path, shape-outside, shape-rendering geometry (inset/circle/ellipse/polygon/path/shape commands) |
| `servo/components/style/values/generics/border.rs` | rust | 303 | Stylo Property Values | Generic values for the border property group (border-image slice/width, border-radius, border-spacing, corner-shape) |
| `servo/components/style/values/generics/box.rs` | rust | 552 | Stylo Property Values | Generic values for the box model / layout property group: baseline-shift, contain-intrinsic-size, block-ellipsis, max-lines, line-clamp, perspective, overflow-… |
| `servo/components/style/values/generics/calc.rs` | rust | 2976 | Stylo Property Values | Core calc() infrastructure shared by all math-enabled property groups: the GenericCalcNode tree (calc/min/max/clamp/mod/rem/round/abs/sign/hypot/progress/ancho… |
| `servo/components/style/values/generics/color.rs` | rust | 318 | Stylo Property Values | Generic color values serving all color-accepting property groups: color-mix(), light-dark(), ColorOrAuto/CaretColor |
| `servo/components/style/values/generics/column.rs` | rust | 44 | Stylo Property Values | Generic values for the multicol property group (column-count) |
| `servo/components/style/values/generics/counters.rs` | rust | 320 | Stylo Property Values | Generic values for the counters/content property group (counter-reset/set/increment, content items) |
| `servo/components/style/values/generics/easing.rs` | rust | 132 | Stylo Property Values | Generic easing values for the animation/transition property group (timing functions: linear stops, steps, cubic-bezier, keywords) |
| `servo/components/style/values/generics/effects.rs` | rust | 131 | Stylo Property Values | Generic values for the filter/box-shadow/text-shadow property group |
| `servo/components/style/values/generics/flex.rs` | rust | 34 | Stylo Property Values | Generic values for the flexbox property group (flex-basis) |
| `servo/components/style/values/generics/font.rs` | rust | 376 | Stylo Property Values | Generic values for the font property group: font-feature-settings, font-variation-settings, font-style, font-size-adjust, line-height and font tags |
| `servo/components/style/values/generics/grid.rs` | rust | 962 | Stylo Property Values | Generic values for the CSS grid property group (grid-template-*, line names, track sizing, repeat(), flex units) |
| `servo/components/style/values/generics/image.rs` | rust | 653 | Stylo Property Values | Generic CSS <image> value types shared by specified/computed values: GenericImage (url, gradient, element, cross-fade, image-set) plus gradient and paint-workl… |
| `servo/components/style/values/generics/length.rs` | rust | 651 | Stylo Property Values | Generic length value types shared across the style system: LengthPercentageOrAuto, anchor-size functions, and side/size wrappers used by positioning properties. |
| `servo/components/style/values/generics/mod.rs` | rust | 303 | Stylo Property Values | Module root for generic CSS value types: declares all generics submodules and defines shared wrappers such as NonNegative and Optional. |
| `servo/components/style/values/generics/motion.rs` | rust | 274 | Stylo Property Values | Generic types for CSS Motion Path: RaySize enum and the ray() offset-path function value with position/coord-box support. |
| `servo/components/style/values/generics/page.rs` | rust | 167 | Stylo Property Values | Generic @page at-rule value types: PaperSize names with physical dimensions, PageName, and size values for the page size property. |
| `servo/components/style/values/generics/position.rs` | rust | 666 | Stylo Property Values | Generic <position> value types (GenericPosition, PositionComponent, PositionOrAuto, tree-scoped anchor names) used by background/offset/anchor positioning. |
| `servo/components/style/values/generics/ratio.rs` | rust | 88 | Stylo Property Values | Generic <ratio> value type (Ratio) with degenerate-ratio handling, used-value clamping, and slash-delimited serialization. |
| `servo/components/style/values/generics/rect.rs` | rust | 147 | Stylo Property Values | Generic four-sided Rect value type with minimal-component serialization for properties like border-width and clip rects. |
| `servo/components/style/values/generics/size.rs` | rust | 102 | Stylo Property Values | Generic Size2D two-dimension value type used by border-*-radius longhands and border-spacing. |
| `servo/components/style/values/generics/svg.rs` | rust | 226 | Stylo Property Values | Generic SVG CSS value types: SVGPaintFallback, SVGPaint/SVGStroke paint servers, and context-fill/context-stroke handling. |
| `servo/components/style/values/generics/text.rs` | rust | 268 | Stylo Property Values | Generic text property value types: NumberOrAuto, hyphenate-limit-chars components, and text-box-edge/trim values. |
| `servo/components/style/values/generics/transform.rs` | rust | 1157 | Stylo Property Values | Generic transform value types: 2D/3D matrices, transform functions (translate/rotate/scale/skew/perspective), Transform lists, and interpolation logic. |
| `servo/components/style/values/generics/ui.rs` | rust | 147 | Stylo Property Values | Generic UI property value types, chiefly GenericCursor combining cursor images with a CursorKind keyword. |
| `servo/components/style/values/generics/url.rs` | rust | 51 | Stylo Property Values | Generic UrlOrNone value type (image url or none) used for example by list-style-image. |

### servo/components/style/values/resolved/ (4)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/values/resolved/animation.rs` | rust | 33 | Stylo Property Values | Resolved-value conversion for AnimationDuration: resolves auto to 0s for backwards compatibility when animation-timeline is the initial value. |
| `servo/components/style/values/resolved/color.rs` | rust | 53 | Stylo Property Values | Resolved-value conversions for colors: resolves currentcolor to an absolute color (except for text-decoration) and caret-color auto to currentcolor. |
| `servo/components/style/values/resolved/counters.rs` | rust | 45 | Stylo Property Values | Resolved-value conversion for the content property: normal/none mapping on ::before/::after/::marker pseudo-elements. |
| `servo/components/style/values/resolved/mod.rs` | rust | 316 | Stylo Property Values | Resolved value infrastructure: the resolution Context and ToResolvedValue trait, plus conversions for lengths, numbers, and other computed values. |

### servo/components/style/values/specified/ (43)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style/values/specified/align.rs` | rust | 703 | Stylo Property Values | Specified values for CSS Box Alignment: AlignFlags bitflags, AlignJustifyNormal, ContentDistribution, and parsing for align/justify-content/items/self properti… |
| `servo/components/style/values/specified/angle.rs` | rust | 407 | Stylo Property Values | Specified <angle> values: AngleUnit (deg/grad/rad/turn), the Angle type with calc() support, unit conversion, and serialization. |
| `servo/components/style/values/specified/animation.rs` | rust | 913 | Stylo Property Values | Specified types for animation/transition properties: TransitionProperty, AnimationDuration/Timeline/Range, and iteration-count parsing. |
| `servo/components/style/values/specified/background.rs` | rust | 269 | Stylo Property Values | Specified background values: BackgroundSize parsing and the background-repeat keywords and RepeatStyle. |
| `servo/components/style/values/specified/basic_shape.rs` | rust | 986 | Stylo Property Values | Specified basic-shape values for clip-path/shape-outside: inset/circle/ellipse/polygon/path shapes, ClipPath and ShapeOutside aliases, and GeometryBox parsing. |
| `servo/components/style/values/specified/border.rs` | rust | 430 | Stylo Property Values | Specified border values: BorderStyle, border side widths, border-image slice/width/outset, border radii, and border spacing. |
| `servo/components/style/values/specified/box.rs` | rust | 2225 | Stylo Property Values | Specified values for box properties such as display, overflow, margin-trim, contain, scroll-snap, and appearance. |
| `servo/components/style/values/specified/calc.rs` | rust | 1651 | Stylo Property Values | Specified calc() expression AST and parsing for all math functions (calc, min/max/clamp, trig, progress, sibling-count) underlying every numeric CSS property. |
| `servo/components/style/values/specified/color.rs` | rust | 1208 | Stylo Property Values | Specified color values for all color-taking properties, including color-mix(), light-dark(), and system colors. |
| `servo/components/style/values/specified/column.rs` | rust | 11 | Stylo Property Values | Specified types for the CSS multicol (column-count) properties. |
| `servo/components/style/values/specified/corner_shape.rs` | rust | 152 | Stylo Property Values | Specified types for the corner-shape family of properties including superellipse() corner shapes. |
| `servo/components/style/values/specified/counters.rs` | rust | 242 | Stylo Property Values | Specified values for counter-increment/set/reset and the content property's counter and quote items. |
| `servo/components/style/values/specified/easing.rs` | rust | 225 | Stylo Property Values | Specified values for CSS easing functions used by animation and transition timing properties. |
| `servo/components/style/values/specified/effects.rs` | rust | 421 | Stylo Property Values | Specified values for effect properties such as box-shadow, filter, and drop-shadow(). |
| `servo/components/style/values/specified/flex.rs` | rust | 42 | Stylo Property Values | Specified values for flexbox properties, currently flex-basis. |
| `servo/components/style/values/specified/font.rs` | rust | 2101 | Stylo Property Values | Specified values for the font properties: font-family, weight, size, style, variants, feature and variation settings, line-height, and math script sizing. |
| `servo/components/style/values/specified/frequency.rs` | rust | 39 | Stylo Property Values | Specified <frequency> values (Hz/kHz) for audio-related CSS values. |
| `servo/components/style/values/specified/grid.rs` | rust | 409 | Stylo Property Values | Specified values for CSS grid properties: track lists, repeat() counts, line names, and template components. |
| `servo/components/style/values/specified/image.rs` | rust | 1378 | Stylo Property Values | Specified <image> values: url, gradients, cross-fade(), image-set(), and paint worklets, serving background/content/mask/list properties. |
| `servo/components/style/values/specified/intersection_observer.rs` | rust | 80 | Stylo Property Values | Specified types parsed by the style system for IntersectionObserver root/scroll margins (px or percentage only). |
| `servo/components/style/values/specified/length.rs` | rust | 2015 | Stylo Property Values | Specified <length> values and all length-derived types (LengthPercentage, Size, Margin) underlying most box, text, and layout properties. |
| `servo/components/style/values/specified/list.rs` | rust | 190 | Stylo Property Values | Specified values for list properties: list-style-type and quotes. |
| `servo/components/style/values/specified/mod.rs` | rust | 531 | Stylo Property Values | Root module re-exporting all specified value types and defining shared numeric primitives (Integer, Number, Percentage aliases) for every CSS property. |
| `servo/components/style/values/specified/motion.rs` | rust | 316 | Stylo Property Values | Specified values for the CSS motion path properties: offset-path, offset-position, and offset-rotate. |
| `servo/components/style/values/specified/number.rs` | rust | 603 | Stylo Property Values | Specified <number> and <integer> values with calc() support, serving opacity, z-index, flex, transform, and counting properties. |
| `servo/components/style/values/specified/outline.rs` | rust | 69 | Stylo Property Values | Specified values for the outline properties, specifically outline-style. |
| `servo/components/style/values/specified/page.rs` | rust | 94 | Stylo Property Values | Specified values for @page at-rule descriptors and named pages: size, page name, and orientation. |
| `servo/components/style/values/specified/param.rs` | rust | 121 | Stylo Property Values | Specified handling of param() link parameters for the css-link-params feature. |
| `servo/components/style/values/specified/percentage.rs` | rust | 364 | Stylo Property Values | Specified <percentage> values with calc() support, serving every percentage-accepting property. |
| `servo/components/style/values/specified/position.rs` | rust | 2235 | Stylo Property Values | Specified <position> values for background-position, object-position, inset, anchor positioning, aspect-ratio, and z-index. |
| `servo/components/style/values/specified/ratio.rs` | rust | 29 | Stylo Property Values | Specified <ratio> values serving the aspect-ratio property. |
| `servo/components/style/values/specified/rect.rs` | rust | 28 | Stylo Property Values | Specified values for CSS border rectangles: defines NonNegativeLengthOrNumberRect, a 4-sided <length-or-number> rect serving border-image-outset/slice-style pr… |
| `servo/components/style/values/specified/resolution.rs` | rust | 237 | Stylo Property Values | Specified values for the <resolution> type (dppx/dpi/dpcm/x), serving media queries and the image-resolution/resolution property group |
| `servo/components/style/values/specified/source_size_list.rs` | rust | 135 | Stylo Property Values | Specified values for the HTML sizes attribute on img/source (source-size-list) |
| `servo/components/style/values/specified/svg_path.rs` | rust | 1115 | Stylo Property Values | Specified values for SVG path data, serving the d property and clip-path path() |
| `servo/components/style/values/specified/svg.rs` | rust | 427 | Stylo Property Values | Specified values for SVG property group: paint-order, -moz-context-properties, the d property, and vector-effect |
| `servo/components/style/values/specified/table.rs` | rust | 38 | Stylo Property Values | Specified values for table-related properties; currently holds the CaptionSide keyword enum serving the caption-side property. |
| `servo/components/style/values/specified/text.rs` | rust | 1560 | Stylo Property Values | Specified values for the text/typography property group: letter-spacing, word-spacing, text-overflow, text-decoration, text-transform, text-align, text-emphasi… |
| `servo/components/style/values/specified/time.rs` | rust | 313 | Stylo Property Values | Specified values for the <time> type (s/ms), serving the transition/animation property group |
| `servo/components/style/values/specified/transform.rs` | rust | 599 | Stylo Property Values | Specified values for the transform property group (transform-box, transform-origin components, scale factors); the full transform list itself lives in generics… |
| `servo/components/style/values/specified/tree_counting.rs` | rust | 32 | Stylo Property Values | Specified values for the tree-counting functions (sibling-index()/sibling-count()) used in the counter-style/sibling positioning of the CSS trees counting spec |
| `servo/components/style/values/specified/ui.rs` | rust | 342 | Stylo Property Values | Specified values for the UI property group: user-select, cursor (CursorKind), -moz-theme, pointer-events, inert, and user-focus, plus BoolInteger |
| `servo/components/style/values/specified/url.rs` | rust | 12 | Stylo Property Values | Specified values for CSS url(): re-exports crate::url::SpecifiedUrl and defines UrlOrNone = GenericUrlOrNone<SpecifiedUrl> serving all <url> \| none property va… |

## 2. servo/components/{selectors, style_traits, style_derive} — 40 files

### servo/components/selectors/ (15)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/selectors/attr.rs` | rust | 196 | Selectors Crate | Attribute selector support for the selectors crate: AttrSelectorWithOptionalNamespace and namespace constraints, parsed attribute operations, and the six AttrS… |
| `servo/components/selectors/bloom.rs` | rust | 422 | Selectors Crate | Counting and non-counting Bloom filters tuned as ancestor filters for selector matching |
| `servo/components/selectors/builder.rs` | rust | 455 | Selectors Crate | SelectorBuilder assembles Component streams from the parser into an Arc-ed SelectorData in matching order: compound selectors right-to-left, simple selectors l… |
| `servo/components/selectors/Cargo.toml` | toml | 33 | Selectors Crate | Manifest of the selectors crate (v0.26.0, edition 2024, MPL-2.0) — CSS Selectors parsing/serialization/matching for Rust, maintained under servo/stylo and used… |
| `servo/components/selectors/CHANGES.md` | markdown | 1 | Project Documentation | Single-entry changelog for the selectors crate: parser.rs no longer wraps values in quotes ("...") but expects their to_css impl to already wrap them (Gecko Bu… |
| `servo/components/selectors/context.rs` | rust | 527 | Selectors Crate | Matching context and modes for selector matching: MatchingContext carries matching mode, bloom filter, scope/shadow-host elements, nesting level, negation, vis… |
| `servo/components/selectors/kleene_value.rs` | rust | 127 | Selectors Crate | KleeneValue, a three-valued (False/True/Unknown) logic type based on Kleene logic, with Not/BitAnd/BitOr operators and any/any_false iterator helpers; used by … |
| `servo/components/selectors/lib.rs` | rust | 26 | Selectors Crate | Crate root of the selectors crate: declares the attr/bloom/builder/context/kleene_value/matching/nth_index_cache/parser/relative_selector/sink/tree/visitor mod… |
| `servo/components/selectors/matching.rs` | rust | 1602 | Selectors Crate | Core selector matching engine: matches selector lists and complex selectors right-to-left against elements with bloom-filter fast rejection, backtracking acros… |
| `servo/components/selectors/nth_index_cache.rs` | rust | 102 | Selectors Crate | Caches speeding up nth-child-like selectors: NthIndexCache selects between nth/nth-last/nth-of-type/nth-last-of-type maps and NthIndexOfSelectorsCaches keyed b… |
| `servo/components/selectors/parser.rs` | rust | 4912 | Selectors Crate | Selector parser and data model: SelectorImpl/Parser/PseudoElement/NonTSPseudoClass traits, Selector/SelectorList/Component/Combinator types with specificity an… |
| `servo/components/selectors/README.md` | markdown | 24 | Project Documentation | rust-selectors: CSS Selectors library for Rust covering parsing, serialization, and matching against a generic element tree; pseudo-elements and most pseudo-cl… |
| `servo/components/selectors/sink.rs` | rust | 31 | Selectors Crate | The Push trait abstracting a push() method over Vec, SmallVec, and presence-only sinks, used by the selector builder to stay container-agnostic. |
| `servo/components/selectors/tree.rs` | rust | 180 | Selectors Crate | The Element trait and OpaqueElement identity type that decouple the selectors crate from any specific DOM: traversal, local-name/namespace/class/id/attribute c… |
| `servo/components/selectors/visitor.rs` | rust | 137 | Selectors Crate | The SelectorVisitor trait for traversing selector components (attributes, simple selectors, nested and relative selector lists, complex selectors with their co… |

### servo/components/selectors/relative_selector/ (3)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/selectors/relative_selector/cache.rs` | rust | 81 | Selectors Crate | RelativeSelectorCache: an FxHashMap keyed by (OpaqueElement anchor, SelectorKey) storing Matched/NotMatched results of has() evaluations, reused across repeate… |
| `servo/components/selectors/relative_selector/filter.rs` | rust | 157 | Selectors Crate | RelativeSelectorFilterMap: a lazily-built map of Bloom filters over an element's children or descendant subtree used to fast-reject has() matches; sibling-dire… |
| `servo/components/selectors/relative_selector/mod.rs` | rust | 6 | Selectors Crate | Module root for relative selector (has()) support; re-exports the cache and filter submodules. |

### servo/components/style_derive/ (13)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style_derive/animate.rs` | rust | 138 | Style Traits & Derive | Implementation of derive(Animate): generates crate::values::animated::Animate impls that interpolate field-by-field only when both values share the same enum d… |
| `servo/components/style_derive/Cargo.toml` | toml | 19 | Style Traits & Derive | Manifest for the style_derive proc-macro crate (derive crate for the Stylo CSS engine) |
| `servo/components/style_derive/cg.rs` | rust | 409 | Style Traits & Derive | Shared code-generation helpers for every style_derive derive: where-clause manipulation (add_predicate, propagate_clauses_to_output_type), synstructure binding… |
| `servo/components/style_derive/compute_squared_distance.rs` | rust | 128 | Style Traits & Derive | Implementation of derive(ComputeSquaredDistance): generates crate::values::distance::ComputeSquaredDistance impls summing per-field squared distances, reusing … |
| `servo/components/style_derive/lib.rs` | rust | 89 | Style Traits & Derive | Crate root of the style_derive proc-macro crate |
| `servo/components/style_derive/parse.rs` | rust | 327 | Style Traits & Derive | Implementation of derive(Parse): generates crate::parser::Parse impls matching keyword variants via cssparser match_ignore_ascii_case (with aliases and conditi… |
| `servo/components/style_derive/specified_value_info.rs` | rust | 196 | Style Traits & Derive | Implementation of derive(SpecifiedValueInfo): generates style_traits::SpecifiedValueInfo impls exposing the SUPPORTED_TYPES bitmask and collect_completion_keyw… |
| `servo/components/style_derive/to_animated_value.rs` | rust | 42 | Style Traits & Derive | Implementation of derive(ToAnimatedValue): a thin instantiation of to_computed_value::derive_to_value parameterized with the animated trait paths and move bind… |
| `servo/components/style_derive/to_animated_zero.rs` | rust | 63 | Style Traits & Derive | Implementation of derive(ToAnimatedZero): generates crate::values::animated::ToAnimatedZero impls mapping each variant to its zero-equivalent for interpolation… |
| `servo/components/style_derive/to_computed_value.rs` | rust | 206 | Style Traits & Derive | Implementation of derive(ToComputedValue) plus the generic derive_to_value engine shared by the ToComputedValue/ToAnimatedValue/ToResolvedValue derives: propag… |
| `servo/components/style_derive/to_css.rs` | rust | 383 | Style Traits & Derive | Implementation of derive(ToCss): generates style_traits::ToCss impls for CSS value types, including bitflag serialization (single/mixed flags, overlapping bits… |
| `servo/components/style_derive/to_resolved_value.rs` | rust | 52 | Style Traits & Derive | Implementation of derive(ToResolvedValue): instantiates derive_to_value for crate::values::resolved::ToResolvedValue with move bindings, generating to_resolved… |
| `servo/components/style_derive/to_typed.rs` | rust | 720 | Style Traits & Derive | Implementation of derive(ToTyped) for CSS Typed OM: all-unit enums delegate to ToCss and wrap the result in TypedValue::Keyword; mixed enums and structs build … |

### servo/components/style_traits/ (9)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/components/style_traits/arc_slice.rs` | rust | 159 | Style Traits & Derive | Defines ArcSlice<T>, a thin atomically reference-counted slice over servo_arc::ThinArc with a u64 canary header, FFI forget/leak helpers, and serde/malloc_size… |
| `servo/components/style_traits/Cargo.toml` | toml | 33 | Style Traits & Derive | Cargo manifest for the style_traits crate ('Types used by the Stylo CSS engine'); declares servo/gecko features and dependencies on cssparser, selectors, servo… |
| `servo/components/style_traits/dom.rs` | rust | 25 | Style Traits & Derive | Defines OpaqueNode, an opaque, comparable handle to a DOM node, letting layout/style reference nodes without dereferencing DOM data. |
| `servo/components/style_traits/lib.rs` | rust | 255 | Style Traits & Derive | Crate root of style_traits, the shared types crate used by both Servo and Gecko (Stylo) |
| `servo/components/style_traits/owned_array.rs` | rust | 157 | Style Traits & Derive | Defines OwnedArray<T, N>, a cbindgen-friendly #[repr(C)] replacement for Box<[T; N]> held as a single thin pointer, plus malloc_size_of/to_shmem impls; used to… |
| `servo/components/style_traits/owned_slice.rs` | rust | 208 | Style Traits & Derive | Defines OwnedSlice<T>, a cbindgen-friendly #[repr(C)] replacement for Box<[T]> storing a NonNull pointer and length, with serde, hashing, iteration, malloc_siz… |
| `servo/components/style_traits/owned_str.rs` | rust | 81 | Style Traits & Derive | Defines OwnedStr, a defined-layout (#[repr(C)]) replacement for Box<str> built over OwnedSlice<u8>, with conversions to/from String and Box<str> for FFI. |
| `servo/components/style_traits/specified_value_info.rs` | rust | 142 | Style Traits & Derive | Value information for devtools: the derivable SpecifiedValueInfo trait (SUPPORTED_TYPES + collect_completion_keywords) with blanket impls for primitives and co… |
| `servo/components/style_traits/values.rs` | rust | 590 | Style Traits & Derive | Helper types and traits for CSS values shared between cssparser-based parsing and Stylo: the derivable ToCss trait, CssWriter/SequenceWriter serialization help… |

## 3. layout/style — Gecko Style System (C++) — 333 files

### layout/style/ (240)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `layout/style/AnimatedPropertyIDSet.h` | c | 222 | Gecko Style System (C++) | Defines AnimatedPropertyIDSet, which pairs an nsCSSPropertyIDSet of non-custom property IDs with a set of custom property (CSS variable) names, supporting set … |
| `layout/style/AnimationCollection.cpp` | cpp | 81 | CSS Animations & Timelines | Implements the AnimationCollection template shared by CSS animations (dom::CSSAnimation) and transitions (dom::CSSTransition): destructor/Destroy cancel animat… |
| `layout/style/AnimationCollection.h` | c | 68 | CSS Animations & Timelines | Declares AnimationCollection<AnimationType>, a LinkedListElement holding the owning element, its PseudoStyleRequest, and the array of RefPtr<AnimationType> (CS… |
| `layout/style/AnimationCommon.h` | c | 302 | CSS Animations & Timelines | Common infrastructure for CSS animations and transitions: CommonAnimationManager owns the linked list of per-element AnimationCollections and can stop animatio… |
| `layout/style/AttributeStyles.cpp` | cpp | 108 | Gecko Style System (C++) | Implements AttributeStyles: creates empty Servo declaration blocks for the link/virtual-visited/active link colors (presentational attribute data) via Servo_De… |
| `layout/style/AttributeStyles.h` | c | 83 | Gecko Style System (C++) | Declares AttributeStyles, the per-document holder of style data derived from presentational HTML attributes: StyleLockedDeclarationBlock refs for unvisited/vis… |
| `layout/style/BindgenUniquePtr.h` | c | 30 | Gecko Style System (C++) | Defines mozilla::BindgenUniquePtr, a subclass of std::unique_ptr with DefaultDelete that static_asserts size/alignment equality with a raw-pointer struct so ru… |
| `layout/style/BuiltinCounterStyleList.inc` | inc | 36 | Gecko Style System (C++) | X-macro list of builtin counter styles (none, decimal, disc/circle/square, disclosure styles, hebrew, CJK ideographic variants, ethiopic-numeric) expanded via … |
| `layout/style/BuiltInStyleSheetList.inc` | inc | 35 | Gecko Style System (C++) | X-macro list of user-agent built-in style sheets managed by GlobalStyleSheetCache (html.css, forms.css, xul.css, counterstyles.css, etc.), each with an identif… |
| `layout/style/BuiltInStyleSheets.h` | c | 37 | Gecko Style System (C++) | Declares BuiltInStyleSheetFlags (UA, Author, NotShared, UAUnshared) and the BuiltInStyleSheet enum generated by expanding BuiltInStyleSheetList.inc, providing … |
| `layout/style/CachedInheritingStyles.cpp` | cpp | 154 | Gecko Style System (C++) | Implements the word-sized tagged cache of inheriting anon-box and lazily-cascaded pseudo-element ComputedStyles: Insert promotes from direct-pointer or null-di… |
| `layout/style/CachedInheritingStyles.h` | c | 102 | Gecko Style System (C++) | Declares CachedStyleEntry (style + functional pseudo parameter + pseudo type) and CachedInheritingStyles, the per-ComputedStyle cache of anon-box/lazy pseudo s… |
| `layout/style/ComputedStyle.cpp` | cpp | 497 | Gecko Style System (C++) | Core implementation for ComputedStyle: CalcStyleDifference diffs all 22 style structs (including nsStyleDisplay and visited-style structs) to accumulate an nsC… |
| `layout/style/ComputedStyle.h` | c | 397 | Gecko Style System (C++) | Declares ComputedStyle, the refcounted C++ handle on Servo's immutable ServoComputedData holding the nsStyle* structs; exposes per-struct accessors, computed-v… |
| `layout/style/ComputedStyleInlines.h` | c | 168 | Gecko Style System (C++) | Inline ComputedStyle methods: StartImageLoads triggers image loads across every style struct via the HasTriggerImageLoads trait, PointerEvents/UserSelect resol… |
| `layout/style/contenteditable.css` | css | 5 | UA Stylesheets | Built-in UA stylesheet intended for documents with the contenteditable attribute; it is now an intentionally empty placeholder (see bug 1941134) after its rule… |
| `layout/style/CounterStyleManager.cpp` | cpp | 1893 | Gecko Style System (C++) | Implements the CSS counter style system: text generation algorithms for builtin systems (cyclic, fixed, symbolic, alphabetic, numeric, additive, CJK ideographi… |
| `layout/style/CounterStyleManager.h` | c | 202 | Gecko Style System (C++) | Declares the counter style object hierarchy: abstract CounterStyle (prefix/suffix/range/pad/fallback/speak-as/GetCounterText), stack-allocated AnonymousCounter… |
| `layout/style/CSS.cpp` | cpp | 524 | Gecko Style System (C++) | Implements the DOM-exposed CSS namespace: CSS.supports() in both forms via Servo_CSSSupports/Servo_CSSSupports2, CSS.escape(), CSS.registerProperty() routed in… |
| `layout/style/CSS.h` | c | 192 | Gecko Style System (C++) | Declares the mozilla::dom::CSS WebIDL interface (non-instantiable): static Supports overloads, Escape, GetHighlights, RegisterProperty, and the full CSS Typed … |
| `layout/style/CSSAppearanceBaseRule.cpp` | cpp | 44 | CSSOM Rules & Declarations | Implements the DOM wrapper for the internal appearance-base group rule: cycle-collection stubs, Servo_AppearanceBaseRule_* FFI for debug listing, css text, and… |
| `layout/style/CSSAppearanceBaseRule.h` | c | 52 | CSSOM Rules & Declarations | Declares CSSAppearanceBaseRule, a css::GroupRule subclass wrapping a RefPtr<StyleAppearanceBaseRule> with WebIDL Type()/GetCssText() and raw-rule clone support… |
| `layout/style/CSSContainerRule.cpp` | cpp | 121 | CSSOM Rules & Declarations | Implements the CSSContainerRule DOM wrapper around Servo's StyleContainerRule: condition text and cssText via Servo_ContainerRule_* FFI, per-condition containe… |
| `layout/style/CSSContainerRule.h` | c | 57 | CSSOM Rules & Declarations | Declares CSSContainerRule, a css::ConditionRule subclass wrapping RefPtr<StyleContainerRule>, exposing WebIDL containerName/containerQuery/conditions and conta… |
| `layout/style/CSSCounterStyleRule.cpp` | cpp | 96 | CSSOM Rules & Declarations | Implements the CSSCounterStyleRule DOM wrapper: name and descriptor accessors that mutate the raw StyleLockedCounterStyleRule through Servo_CounterStyleRule_* … |
| `layout/style/CSSCounterStyleRule.h` | c | 59 | CSSOM Rules & Declarations | Declares CSSCounterStyleRule, a css::Rule subclass wrapping RefPtr<StyleLockedCounterStyleRule>, with WebIDL name/descriptor accessors keyed by CounterStyleDes… |
| `layout/style/CSSCustomMediaRule.cpp` | cpp | 125 | CSSOM Rules & Declarations | CSSOM wrapper impl for @custom-media (extension) rules over Stylo StyleCustomMediaRule; Type()=StyleCssRuleType::CustomMedia; GetQuery lazily builds a MediaLis… |
| `layout/style/CSSCustomMediaRule.h` | c | 52 | CSSOM Rules & Declarations | Declares mozilla::dom::CSSCustomMediaRule final : css::Rule holding RefPtr<StyleCustomMediaRule> plus lazy MediaList; exposes Raw(), SetRawAfterClone, Type(), … |
| `layout/style/CSSEnabledState.h` | c | 36 | CSSOM Rules & Declarations | Standalone enum header defining mozilla::CSSEnabledState (ForAllContent, InUASheets, InChrome, IgnoreEnabledState) with bitwise operators via MOZ_MAKE_ENUM_CLA… |
| `layout/style/CSSFontFaceRule.cpp` | cpp | 218 | CSS Fonts & Font Loading | Implements CSSFontFaceRule (css::Rule) and its embedded CSSFontFaceRuleDecl (nsICSSDeclaration aggregated onto the rule) |
| `layout/style/CSSFontFaceRule.h` | c | 104 | CSS Fonts & Font Loading | Declares CSSFontFaceRuleDecl (nsICSSDeclaration over StyleLockedFontFaceRule, embedded in the rule via offsetof-based ContainingRule) and CSSFontFaceRule final… |
| `layout/style/CSSFontFeatureValuesRule.cpp` | cpp | 83 | CSSOM Rules & Declarations | CSSOM wrapper impl for @font-feature-values rules over Stylo StyleFontFeatureValuesRule; Type()=FontFeatureValues; fontFamily/valueText getters via Servo_FontF… |
| `layout/style/CSSFontFeatureValuesRule.h` | c | 54 | CSSOM Rules & Declarations | Declares CSSFontFeatureValuesRule final : css::Rule holding RefPtr<StyleFontFeatureValuesRule>; inline ctor, Raw()/SetRawAfterClone, WebIDL font-family and val… |
| `layout/style/CSSFontPaletteValuesRule.cpp` | cpp | 73 | CSSOM Rules & Declarations | CSSOM wrapper impl for @font-palette-values rules over Stylo StyleFontPaletteValuesRule; Type()=FontPaletteValues; name, font-family, base-palette and override… |
| `layout/style/CSSFontPaletteValuesRule.h` | c | 56 | CSSOM Rules & Declarations | Declares CSSFontPaletteValuesRule final : css::Rule holding RefPtr<StyleFontPaletteValuesRule>; inline ctor, Raw()/SetRawAfterClone, WebIDL getters (name, font… |
| `layout/style/CSSImportRule.cpp` | cpp | 154 | CSSOM Rules & Declarations | CSSOM wrapper impl for @import rules over Stylo StyleLockedImportRule; adopts the child StyleSheet from Servo_ImportRule_GetSheet with referencing-rule bookkee… |
| `layout/style/CSSImportRule.h` | c | 61 | CSSOM Rules & Declarations | Declares CSSImportRule final : css::Rule holding RefPtr<StyleLockedImportRule> and the child StyleSheet; WebIDL href, media, styleSheet, layerName, supports ac… |
| `layout/style/CSSKeyframeRule.cpp` | cpp | 207 | CSSOM Rules & Declarations | Implements CSSKeyframeRule (css::Rule over StyleLockedKeyframe) plus file-local CSSKeyframeDeclaration (nsDOMCSSDeclaration) reading style via Servo_Keyframe_G… |
| `layout/style/CSSKeyframeRule.h` | c | 60 | CSSOM Rules & Declarations | Declares CSSKeyframeRule final : css::Rule holding RefPtr<StyleLockedKeyframe> and a lazily created CSSKeyframeDeclaration; keyText accessors, Style(), Raw()/S… |
| `layout/style/CSSKeyframesRule.cpp` | cpp | 362 | CSSOM Rules & Declarations | Implements CSSKeyframesRule (css::Rule over StyleLockedKeyframesRule) and CSSKeyframeList (dom::CSSRuleList) that lazily materializes CSSKeyframeRule children … |
| `layout/style/CSSKeyframesRule.h` | c | 68 | CSSOM Rules & Declarations | Declares CSSKeyframesRule final : css::Rule holding RefPtr<StyleLockedKeyframesRule> and lazy CSSKeyframeList; CssRules/IndexedGetter/Length, AppendRule/Delete… |
| `layout/style/CSSLayerBlockRule.cpp` | cpp | 65 | CSSOM Rules & Declarations | CSSOM wrapper impl for @layer block rules; CSSLayerBlockRule derives from css::GroupRule over StyleLayerBlockRule; GetOrCreateRawRules returns Servo_LayerBlock… |
| `layout/style/CSSLayerBlockRule.h` | c | 46 | CSSOM Rules & Declarations | Declares CSSLayerBlockRule final : css::GroupRule holding RefPtr<StyleLayerBlockRule>; Raw()/SetRawAfterClone, GetOrCreateRawRules, name accessor, Type(), Wrap… |
| `layout/style/CSSLayerStatementRule.cpp` | cpp | 67 | CSSOM Rules & Declarations | CSSOM wrapper impl for statement-form @layer rules over Stylo StyleLayerStatementRule; GetNameList iterates Servo_LayerStatementRule_GetNameCount/GetNameAt; Ty… |
| `layout/style/CSSLayerStatementRule.h` | c | 47 | CSSOM Rules & Declarations | Declares CSSLayerStatementRule final : css::Rule holding RefPtr<StyleLayerStatementRule>; Raw()/SetRawAfterClone, GetNameList, Type(), WrapObject. |
| `layout/style/CSSMarginRule.cpp` | cpp | 168 | CSSOM Rules & Declarations | Implements CSSMarginRule (css::Rule over StyleMarginRule) with embedded CSSMarginRuleDeclaration (nsDOMCSSDeclaration) built from Servo_MarginRule_GetStyle; Se… |
| `layout/style/CSSMarginRule.h` | c | 98 | CSSOM Rules & Declarations | Declares CSSMarginRuleDeclaration (nsDOMCSSDeclaration with offsetof-based Rule() backpointer) and CSSMarginRule final : css::Rule embedding it; Style() access… |
| `layout/style/CSSMediaRule.cpp` | cpp | 111 | CSSOM Rules & Declarations | CSSOM wrapper impl for @media rules; CSSMediaRule derives from css::ConditionRule over StyleMediaRule; lazily creates MediaList via Servo_MediaRule_GetMedia, G… |
| `layout/style/CSSMediaRule.h` | c | 53 | CSSOM Rules & Declarations | Declares CSSMediaRule final : css::ConditionRule holding RefPtr<StyleMediaRule> and lazy MediaList; Media(), GetConditionText, GetOrCreateRawRules, SetRawAfter… |
| `layout/style/CSSMozDocumentRule.cpp` | cpp | 134 | CSSOM Rules & Declarations | CSSOM wrapper impl for @-moz-document rules; CSSMozDocumentRule derives from css::ConditionRule over StyleDocumentRule; static Match() implements DocumentMatch… |
| `layout/style/CSSMozDocumentRule.h` | c | 51 | CSSOM Rules & Declarations | Declares CSSMozDocumentRule final : css::ConditionRule holding RefPtr<StyleDocumentRule>; static Match() over DocumentMatchingFunction, GetConditionText, GetOr… |
| `layout/style/CSSNamespaceRule.cpp` | cpp | 49 | CSSOM Rules & Declarations | Implements the CSSOM CSSNamespaceRule interface for @namespace rules, wrapping Stylo's StyleNamespaceRule |
| `layout/style/CSSNamespaceRule.h` | c | 61 | CSSOM Rules & Declarations | Declares mozilla::dom::CSSNamespaceRule, a final css::Rule subclass holding RefPtr<StyleNamespaceRule> |
| `layout/style/CSSNestedDeclarations.cpp` | cpp | 167 | Gecko Style System (C++) | Implements CSSNestedDeclarations (CSSOM wrapper for StyleLockedNestedDeclarationsRule) and its CSSNestedDeclarationsDeclaration style block derived from nsDOMC… |
| `layout/style/CSSNestedDeclarations.h` | c | 111 | Gecko Style System (C++) | Declares CSSNestedDeclarations (css::Rule subclass wrapping StyleLockedNestedDeclarationsRule) and CSSNestedDeclarationsDeclaration, whose inline Rule() recove… |
| `layout/style/CSSPageRule.cpp` | cpp | 191 | CSSOM Rules & Declarations | Implements CSSPageRule, the CSSOM @page rule wrapper around StyleLockedPageRule, as a css::GroupRule whose children are margin rules, plus its CSSPageRuleDecla… |
| `layout/style/CSSPageRule.h` | c | 108 | CSSOM Rules & Declarations | Declares CSSPageRule (css::GroupRule subclass wrapping StyleLockedPageRule with GetOrCreateRawRules for nested rules) and CSSPageRuleDeclaration |
| `layout/style/CSSPositionTryRule.cpp` | cpp | 190 | CSSOM Rules & Declarations | Implements CSSPositionTryRule, the CSSOM @position-try wrapper around StyleLockedPositionTryRule, and its CSSPositionTryRuleDeclaration block |
| `layout/style/CSSPositionTryRule.h` | c | 96 | CSSOM Rules & Declarations | Declares CSSPositionTryRule (css::Rule subclass wrapping StyleLockedPositionTryRule, exposing name, style and RawStyle) and CSSPositionTryRuleDeclaration |
| `layout/style/CSSPropertyId.h` | c | 130 | CSSOM Rules & Declarations | Defines mozilla::CSSPropertyId, a value type unifying a NonCustomCSSPropertyId enum with an optional custom-property name atom (leading -- stripped) |
| `layout/style/CSSPropertyRule.cpp` | cpp | 71 | CSSOM Rules & Declarations | Implements CSSPropertyRule, the CSSOM @property rule wrapper around StylePropertyRule |
| `layout/style/CSSPropertyRule.h` | c | 58 | CSSOM Rules & Declarations | Declares CSSPropertyRule, a final css::Rule subclass holding RefPtr<StylePropertyRule> |
| `layout/style/CSSPropFlags.h` | c | 65 | CSSOM Rules & Declarations | Defines the mozilla::CSSPropFlags uint16_t bitmask enum describing per-property metadata: enabled-in-UA/chrome, compositor animation, logical-property, Seriali… |
| `layout/style/CSSRuleList.cpp` | cpp | 29 | CSSOM Rules & Declarations | Provides the base nsISupports/cycle-collection implementation and JS wrapper (CSSRuleList_Binding::Wrap) for mozilla::dom::CSSRuleList, the abstract CSSOM CSSR… |
| `layout/style/CSSRuleList.h` | c | 37 | CSSOM Rules & Declarations | Declares the abstract CSSRuleList (nsISupports + nsWrapperCache) with pure-virtual IndexedGetter and Length and an Item helper returning css::Rule pointers |
| `layout/style/CSSScopeRule.cpp` | cpp | 65 | CSSOM Rules & Declarations | Implements CSSScopeRule, the CSSOM @scope rule wrapper around StyleScopeRule, as a css::GroupRule |
| `layout/style/CSSScopeRule.h` | c | 47 | CSSOM Rules & Declarations | Declares CSSScopeRule, a final css::GroupRule subclass wrapping RefPtr<StyleScopeRule>, exposing start/end scope prelude text and GetOrCreateRawRules for its n… |
| `layout/style/CSSStartingStyleRule.cpp` | cpp | 46 | CSSOM Rules & Declarations | Implements CSSStartingStyleRule, the CSSOM @starting-style wrapper around StyleStartingStyleRule, as a css::GroupRule |
| `layout/style/CSSStartingStyleRule.h` | c | 52 | CSSOM Rules & Declarations | Declares CSSStartingStyleRule, a final css::GroupRule subclass holding RefPtr<StyleStartingStyleRule>, with inline SetRawAfterClone calling GroupRule::DidSetRa… |
| `layout/style/CSSStyleRule.cpp` | cpp | 414 | CSSOM Rules & Declarations | Implements CSSStyleRule, the CSSOM wrapper for StyleLockedStyleRule, as a css::GroupRule supporting nested rules, plus its CSSStyleRuleDeclaration style block |
| `layout/style/CSSStyleRule.h` | c | 125 | CSSOM Rules & Declarations | Declares CSSStyleRule (css::GroupRule subclass wrapping StyleLockedStyleRule with selector inspection, matching, warnings and StyleMap APIs) and CSSStyleRuleDe… |
| `layout/style/CSSSupportsRule.cpp` | cpp | 74 | CSSOM Rules & Declarations | Implements CSSSupportsRule, the CSSOM @supports wrapper around StyleSupportsRule, deriving from css::ConditionRule |
| `layout/style/CSSSupportsRule.h` | c | 45 | CSSOM Rules & Declarations | Declares CSSSupportsRule, a final css::ConditionRule subclass wrapping RefPtr<StyleSupportsRule>, implementing GetConditionText and GetOrCreateRawRules for nes… |
| `layout/style/CSSValue.h` | c | 52 | Gecko Style System (C++) | Declares the abstract mozilla::dom::CSSValue base class (RefCounted) representing values in computed style, with CSS_INHERIT/PRIMITIVE_VALUE/VALUE_LIST/CUSTOM … |
| `layout/style/CSSViewTransitionRule.cpp` | cpp | 51 | CSSOM Rules & Declarations | Implements CSSViewTransitionRule, the CSSOM @view-transition wrapper around StyleViewTransitionRule |
| `layout/style/CSSViewTransitionRule.h` | c | 54 | CSSOM Rules & Declarations | Declares CSSViewTransitionRule, a final css::Rule subclass wrapping RefPtr<StyleViewTransitionRule>, exposing navigation name and types list plus SetRawAfterCl… |
| `layout/style/DeclarationBlock.cpp` | cpp | 24 | CSSOM Rules & Declarations | Implementation of DeclarationBlock memory reporting; defines malloc-size-of hooks and SizeofIncludingThis which measures the backing Servo StyleLockedDeclarati… |
| `layout/style/DeclarationBlock.h` | c | 170 | CSSOM Rules & Declarations | Header for mozilla::DeclarationBlock, the Gecko-side wrapper around a Servo locked declaration block used for CSS declaration blocks in stylesheets and style a… |
| `layout/style/designmode.css` | css | 5 | UA Stylesheets | Built-in UA stylesheet intended for documents put into document.designMode; like contenteditable.css it is now an empty placeholder (bug 1941134) |
| `layout/style/DocumentMatchingFunction.h` | c | 27 | Gecko Style System (C++) | Defines the DocumentMatchingFunction enum (URL, URLPrefix, Domain, RegExp, MediaDocument, PlainTextDocument) used for @-moz-document rule conditions |
| `layout/style/DocumentStyleRootIterator.cpp` | cpp | 45 | Gecko Style System (C++) | Implements DocumentStyleRootIterator: builds the list of style roots (document root element plus document-level native anonymous content, or a single element) … |
| `layout/style/DocumentStyleRootIterator.h` | c | 43 | Gecko Style System (C++) | Declares mozilla::DocumentStyleRootIterator, a small helper that enumerates the roots of a document from the Servo style system's perspective, optionally restr… |
| `layout/style/ErrorReporter.cpp` | cpp | 252 | Gecko Style System (C++) | Diagnostic reporting for the CSS style sheet parser: initializes the console service and css.properties string bundle globals, caches sanitized URI specs brief… |
| `layout/style/ErrorReporter.h` | c | 71 | Gecko Style System (C++) | Declares mozilla::css::ErrorReporter, a stack-only helper for building and reporting CSS parser warnings to the error console, with static helpers to decide wh… |
| `layout/style/FontFace.cpp` | cpp | 318 | CSS Fonts & Font Loading | DOM-facing FontFace implementation: the JS constructor parses descriptors and buffers via FontFaceImpl, CreateForRule wraps @font-face rules, and the lazy mLoa… |
| `layout/style/FontFace.h` | c | 124 | CSS Fonts & Font Loading | Declares the DOM FontFace interface implementation (CSS Font Loading API), a GlobalTeardownObserver/nsWrapperCache that delegates descriptor get/set, load stat… |
| `layout/style/FontFaceImpl.cpp` | cpp | 893 | CSS Fonts & Font Loading | Core FontFace logic: descriptor parsing through Servo_FontFaceRule_* FFI, gfxUserFontAttributes extraction from @font-face rules, unicode-range character-map c… |
| `layout/style/FontFaceImpl.h` | c | 310 | CSS Fonts & Font Loading | Declares FontFaceImpl, the thread-safe non-DOM core of a FontFace: descriptor storage in a StyleLockedFontFaceRule, source type (rule/URL/buffer), load status,… |
| `layout/style/FontFaceSet.cpp` | cpp | 482 | CSS Fonts & Font Loading | DOM FontFaceSet implementation: creates document or worker impls, mirrors the non-rule/rule FontFace records, dispatches loading/loadingdone/loadingerror event… |
| `layout/style/FontFaceSet.h` | c | 172 | CSS Fonts & Font Loading | Declares the DOM FontFaceSet (document.fonts), a DOMEventTargetHelper implementing the CSS Font Loading API collection methods (load/check/add/clear/entries) p… |
| `layout/style/FontFaceSetDocumentImpl.cpp` | cpp | 772 | CSS Fonts & Font Loading | Document-specific font set behavior: UpdateRules reconciles @font-face rules with existing FontFaces (migrating entries, cancelling orphaned loaders, disconnec… |
| `layout/style/FontFaceSetDocumentImpl.h` | c | 120 | CSS Fonts & Font Loading | Declares FontFaceSetDocumentImpl, the document-bound FontFaceSetImpl that also implements nsIDOMEventListener and nsICSSLoaderObserver; handles @font-face rule… |
| `layout/style/FontFaceSetImpl.cpp` | cpp | 916 | CSS Fonts & Font Loading | Implements FontFaceSetImpl: font shorthand parsing for matching, FindOrCreateUserFontEntryFromFontFace building gfxFontFaceSrc lists from Servo source lists (U… |
| `layout/style/FontFaceSetImpl.h` | c | 314 | CSS Fonts & Font Loading | Declares FontFaceSetImpl, the thread-safe gfxUserFontSet subclass underlying a FontFaceSet: manages non-rule faces, loaders, font-load permission caching, load… |
| `layout/style/FontFaceSetIterator.cpp` | cpp | 80 | CSS Fonts & Font Loading | Implements the iterator's Next(): skips non-Author-origin faces via FontFaceSet::GetFontFaceAt, and returns JS values (or [value, value] pairs) until the set i… |
| `layout/style/FontFaceSetIterator.h` | c | 40 | CSS Fonts & Font Loading | Declares FontFaceSetIterator, the WebIDL iterator for FontFaceSet entries()/values(), holding a FontFaceSet reference, next index, and key-and-value flag. |
| `layout/style/FontFaceSetWorkerImpl.cpp` | cpp | 383 | CSS Fonts & Font Loading | Worker font set implementation: initializes principals, bypass-cache/private-browsing flags, and URLExtraData on the main thread, dispatches back to the worker… |
| `layout/style/FontFaceSetWorkerImpl.h` | c | 71 | CSS Fonts & Font Loading | Declares FontFaceSetWorkerImpl, the worker-thread FontFaceSetImpl using ThreadSafeWorkerRef for lifetime, a captured ClientInfo for main-thread font channel cr… |
| `layout/style/FontLoaderUtils.cpp` | cpp | 191 | CSS Fonts & Font Loading | Builds font load channels: computes CORS/security flags (with chrome/resource exceptions), sets font Accept headers, referrer info, no-recompression for WOFF/W… |
| `layout/style/FontLoaderUtils.h` | c | 63 | CSS Fonts & Font Loading | Declares mozilla::FontLoaderUtils with static BuildChannel overloads that create font-load nsIChannels for document and worker contexts, plus private helpers f… |
| `layout/style/FontPreloader.cpp` | cpp | 30 | CSS Fonts & Font Loading | Implements FontPreloader::CreateChannel, refusing to preload when downloadable fonts are disabled and otherwise delegating to FontLoaderUtils::BuildChannel wit… |
| `layout/style/FontPreloader.h` | c | 28 | CSS Fonts & Font Loading | Declares mozilla::FontPreloader, a FetchPreloader subclass for <link rel=preload as=font> that overrides CreateChannel to build font-specific channels. |
| `layout/style/GeckoBindings.cpp` | cpp | 2041 | Gecko↔Stylo FFI Bridge | Implements the C++ side of the Stylo FFI: the Gecko_* callbacks that the Servo (Rust) style engine calls into Gecko, e.g |
| `layout/style/GeckoBindings.h` | c | 669 | Gecko↔Stylo FFI Bridge | Header ('FFI functions for Servo to call into Gecko') declaring the Gecko_* callback signatures exposed to the generated Rust bindings; includes nsStyleStruct.… |
| `layout/style/GenerateCSSProperties.py` | python | 706 | Gecko Style System (C++) | Build-time codegen script that imports Servo's property metadata (servo/components/style/properties/data.py) and generates the Gecko-side CSS property tables: … |
| `layout/style/GeneratePseudoStyleTypeList.py` | python | 77 | Gecko Style System (C++) | Small codegen script that imports PseudoElementData from servo/components/style/gecko/pseudo_elements.py and emits PseudoStyleTypeList.h, a macro-based list of… |
| `layout/style/GlobalStyleSheetCache.cpp` | cpp | 602 | Gecko Style System (C++) | Process-wide singleton cache of built-in (agent/user/author) stylesheets, userContent.css/userChrome.css, and sheets shared to content processes via read-only … |
| `layout/style/GlobalStyleSheetCache.h` | c | 127 | Gecko Style System (C++) | Declares GlobalStyleSheetCache, the nsIObserver singleton owning built-in and user stylesheets, with shared-memory plumbing for cross-process sheet reuse. |
| `layout/style/GroupRule.cpp` | cpp | 144 | CSSOM Rules & Declarations | Implements mozilla::css::GroupRule, the internal base class for grouping CSS rules (@media, @supports, @document) |
| `layout/style/GroupRule.h` | c | 93 | CSSOM Rules & Declarations | Header for css::GroupRule (shared by MediaRule and DocumentRule) and css::ConditionRule (the WebIDL CSSConditionRule implementation) |
| `layout/style/ImageDocument.css` | css | 43 | UA Stylesheets | Built-in UA stylesheet applied to all ImageDocuments (standalone image-view documents, including those inside frames) |
| `layout/style/ImageLoader.cpp` | cpp | 841 | Gecko Style System (C++) | Implements the style-system image loader: starts imgRequestProxy loads for Stylo StyleComputedUrl values (LoadImage), tracks request-to-frame and frame-to-requ… |
| `layout/style/ImageLoader.h` | c | 167 | Gecko Style System (C++) | Header for mozilla::css::ImageLoader, which handles CSS-triggered image loads (background/border-image/list-style, etc.) on behalf of the Servo-backed style sy… |
| `layout/style/ImportScanner.cpp` | cpp | 227 | Gecko Style System (C++) | Implements the best-effort @import scanner used by the HTML parser to speculatively preload imports inside <style> text |
| `layout/style/ImportScanner.h` | c | 92 | Gecko Style System (C++) | Header for mozilla::ImportScanner, a simple state-machine scanner for @import rules in stylesheet text consumed by the HTML parser |
| `layout/style/jar.mn` | mn | 36 | Gecko Style System (C++) | JAR packaging manifest that installs the layout/style UA stylesheet resources (ua.css, html.css, quirk.css, forms.css, scrollbars.css, counterstyles.css, acces… |
| `layout/style/LayerAnimationInfo.cpp` | cpp | 44 | CSS Animations & Timelines | Defines LayerAnimationInfo::sDisplayItemTypes and GetDisplayItemTypeForProperty, mapping compositor-animatable CSS properties (background-color, opacity, trans… |
| `layout/style/LayerAnimationInfo.h` | c | 89 | CSS Animations & Timelines | Header for mozilla::LayerAnimationInfo, providing static lookups between compositor-animated CSS properties and display item types, plus the nsChangeHint each … |
| `layout/style/Loader.cpp` | cpp | 2395 | Gecko Style System (C++) | The CSS loader implementation: sync/async sheet loading, content policy checks, load coalescing/deferral, caching, priority adjustment, and tree insertion of l… |
| `layout/style/Loader.h` | c | 658 | Gecko Style System (C++) | Declares css::Loader (per-document stylesheet loader registered in SharedSubResourceCache), SheetLoadDataHashKey, and the SheetLoadData forward interface used … |
| `layout/style/MappedDeclarationsBuilder.cpp` | cpp | 40 | CSSOM Rules & Declarations | Out-of-line pieces of MappedDeclarationsBuilder: SetIdentAtomValue forwards to the Stylo FFI Servo_DeclarationBlock_SetIdentStringValue, and SetBackgroundImage… |
| `layout/style/MappedDeclarationsBuilder.h` | c | 224 | CSSOM Rules & Declarations | MOZ_STACK_CLASS helper that gives attribute mappers (MapAttributesIntoRule) a typed interface for building the element's presentation-attribute StyleLockedDecl… |
| `layout/style/MediaFeatureChange.h` | c | 89 | Gecko Style System (C++) | Defines MediaFeatureChange, its MediaFeatureChangeReason bitmask (viewport, zoom, resolution, medium, size-mode, system metrics, display-mode, preference chang… |
| `layout/style/MediaList.cpp` | cpp | 173 | Gecko Style System (C++) | Implements the DOM MediaList on top of a Stylo-owned StyleLockedMediaList: text get/set, item access, append/delete medium, clone, and viewport-dependency chec… |
| `layout/style/MediaList.h` | c | 98 | Gecko Style System (C++) | Header for mozilla::dom::MediaList, the cycle-collected wrapper-cache class holding RefPtr<StyleLockedMediaList> and a weak back-pointer to its StyleSheet for … |
| `layout/style/MediaQueryList.cpp` | cpp | 145 | Gecko Style System (C++) | Implements the DOM MediaQueryList (window.matchMedia result): evaluates its immutable MediaList against the Document, tracks the mMatches vs mMatchesOnRenderin… |
| `layout/style/MediaQueryList.h` | c | 104 | Gecko Style System (C++) | Header for mozilla::dom::MediaQueryList, a DOMEventTargetHelper and LinkedListElement owned by the document's mDOMMediaQueryLists list |
| `layout/style/moz.build` | build | 371 | Gecko Style System (C++) | Build definition for layout/style: bug-component routing, exported headers (GeckoBindings.h, ServoBindings.h, StyleSheet.h, ServoStyleSet.h, MappedDeclarations… |
| `layout/style/NonCustomCSSPropertyId.h.in` | in | 85 | CSSOM Rules & Declarations | Autoconf-style template expanded at build time into NonCustomCSSPropertyId.h, declaring the NonCustomCSSPropertyId enum of all non-custom CSS property IDs plus… |
| `layout/style/nsAnimationManager.cpp` | cpp | 726 | CSS Animations & Timelines | Implementation of the CSS animation manager: builds and updates CSSAnimation objects from computed nsStyleUIReset animation data, resolves named/scroll/view ti… |
| `layout/style/nsAnimationManager.h` | c | 153 | CSS Animations & Timelines | Header for nsAnimationManager, a CommonAnimationManager<CSSAnimation> subclass that updates CSS animations on style changes, manages named-timeline animation m… |
| `layout/style/nsChangeHint.h` | c | 502 | Gecko Style System (C++) | Defines the nsChangeHint bitmask enum describing what must be recomputed after a style change (repaint, reflow, frame reconstruction, overflow updates, etc.), … |
| `layout/style/nsComputedDOMStyle.cpp` | cpp | 2480 | Gecko Style System (C++) | Implements the CSSOM getComputedStyle exposure to web content: flushes style via ServoStyleSet (ResolveStyleLazily / pres Shell style set), then computes seria… |
| `layout/style/nsComputedDOMStyle.h` | c | 407 | Gecko Style System (C++) | Declares nsComputedDOMStyle (an nsDOMCSSDeclaration bound to one element + PseudoStyleRequest) and its ComputedStyleMap machinery for property getter dispatch. |
| `layout/style/nsCSSPropertyIDSet.h` | c | 301 | Gecko Style System (C++) | Header-only bit-vector set of non-custom (longhand) CSS property IDs, with set algebra (Intersect, Xor, IsSubsetOf), presets for compositor-animatable/transfor… |
| `layout/style/nsCSSProps.cpp` | cpp | 213 | Gecko Style System (C++) | Gecko-side CSS property data tables: builds the IDL-name lookup hash from generated kIDLNameTable, tracks pref-controlled property enabled state (kPropertyPref… |
| `layout/style/nsCSSProps.h` | c | 254 | Gecko Style System (C++) | Declares class nsCSSProps: static lookup helpers (LookupProperty/LookupPropertyByIDLName), enabled-state queries, flag checks, and the generated tables (kIDLNa… |
| `layout/style/nsCSSValue.cpp` | cpp | 118 | Gecko Style System (C++) | Implementation of the numeric core of nsCSSValue: constructors, copy/move assignment, equality, unit conversion in GetPixelLength (via nsPresContext::CSSPixels… |
| `layout/style/nsCSSValue.h` | c | 131 | Gecko Style System (C++) | Declares nsCSSValue, the representation of simple numeric CSS property values (a float plus an nsCSSUnit), and the nsCSSUnit enum covering percent, number, fon… |
| `layout/style/nsCSSVisitedDependentPropList.h` | c | 41 | Gecko Style System (C++) | X-macro header listing style struct member variables that can depend on :visited state (background/border/outline/column-rule colors, text colors, fill/stroke,… |
| `layout/style/nsDOMCSSAttrDeclaration.cpp` | cpp | 250 | CSSOM Rules & Declarations | Implementation of the DOM object for element.style: resolves inline or SMIL-override declaration blocks on the owning Element, applies SMIL/SVG animated values… |
| `layout/style/nsDOMCSSAttrDeclaration.h` | c | 101 | CSSOM Rules & Declarations | Header for nsDOMCSSAttributeDeclaration, the final nsDOMCSSDeclaration subclass backing element.style and SMIL override styles, exposing SetSMILValue/ClearSMIL… |
| `layout/style/nsDOMCSSDeclaration.cpp` | cpp | 406 | CSSOM Rules & Declarations | Core CSSOM plumbing shared by element.style and cssStyleRule.style: implements GetCssText/SetCssText/GetPropertyValue/SetProperty/RemoveProperty by fetching-or… |
| `layout/style/nsDOMCSSDeclaration.h` | c | 211 | CSSOM Rules & Declarations | Abstract base class for DOM CSSStyleDeclaration objects (element.style and cssStyleRule.style), subclassing nsICSSDeclaration |
| `layout/style/nsDOMCSSValueList.cpp` | cpp | 60 | CSSOM Rules & Declarations | Implements nsDOMCSSValueList: appending CSSValue items and serializing GetCssText with comma or space separators for computed style value lists. |
| `layout/style/nsDOMCSSValueList.h` | c | 37 | CSSOM Rules & Declarations | Declares nsDOMCSSValueList, a DOM CSSValue subclass representing a list of CSS values in computed style, tracking whether the list is comma-delimited. |
| `layout/style/nsFontFaceLoader.cpp` | cpp | 369 | CSS Fonts & Font Loading | Implements loading of @font-face downloadable font data: streams the font over nsIChannel, applies font-display-dependent fallback timers (LoadTimerCallback wi… |
| `layout/style/nsFontFaceLoader.h` | c | 72 | CSS Fonts & Font Loading | Declares nsFontFaceLoader, which loads a single @font-face src URL on behalf of a gfxUserFontEntry and FontFaceSetImpl, implementing nsIStreamLoaderObserver, n… |
| `layout/style/nsFontFaceUtils.cpp` | cpp | 219 | CSS Fonts & Font Loading | Utilities for downloadable fonts: MarkDirtyForFontChange walks the frame subtree (following placeholders to out-of-flow frames) to find frames using a changed … |
| `layout/style/nsFontFaceUtils.h` | c | 20 | CSS Fonts & Font Loading | Header for the nsFontFaceUtils static helper class declaring MarkDirtyForFontChange, which marks dirty the frames affected by a downloaded font becoming availa… |
| `layout/style/nsICSSDeclaration.cpp` | cpp | 26 | CSSOM Rules & Declarations | Non-inline bits of nsICSSDeclaration: GetDocGroup via the associated node and IsReadOnly, which consults the parent CSS rule's read-only state. |
| `layout/style/nsICSSDeclaration.h` | c | 128 | CSSOM Rules & Declarations | Internal XPCOM interface (with nsWrapperCache) for accessing style declarations using NonCustomCSSPropertyId enums instead of strings; mirrors the CSSStyleDecl… |
| `layout/style/nsICSSLoaderObserver.h` | c | 40 | Gecko Style System (C++) | Internal nsISupports interface for observing CSS style sheet loads; its single StyleSheetLoaded method is invoked by the CSS Loader when a sheet completes, bef… |
| `layout/style/nsIPreloadedStyleSheet.idl` | idl | 15 | Gecko Style System (C++) | IDL defining nsIPreloadedStyleSheet, an opaque scriptable interface for style sheet handles returned by nsIStyleSheetService.preloadSheet and consumable via ns… |
| `layout/style/nsIStyleSheetService.idl` | idl | 70 | Gecko Style System (C++) | Scriptable XPCOM interface for managing user, agent, and author style sheets: loadAndRegisterSheet, sheetRegistered, preloadSheet/preloadSheetAsync, and unregi… |
| `layout/style/nsMediaFeatures.cpp` | cpp | 452 | Gecko Style System (C++) | Implements the Gecko_MediaFeatures_* callback functions that Stylo calls to evaluate media queries and @media descriptors (device size, resolution, color depth… |
| `layout/style/nsROCSSPrimitiveValue.cpp` | cpp | 159 | Gecko Style System (C++) | Implements nsROCSSPrimitiveValue: serializes typed values (px, %, number, deg, s, string) into cssText via nsStyleUtil::AppendCSSNumber, provides Set* mutators… |
| `layout/style/nsROCSSPrimitiveValue.h` | c | 79 | Gecko Style System (C++) | Declares nsROCSSPrimitiveValue, a read-only mozilla::dom::CSSValue subclass representing primitive values in DOM computed style, storing a float/int32/uint32/s… |
| `layout/style/nsStyleAutoArray.h` | c | 72 | Gecko Style System (C++) | Header-only template nsStyleAutoArray<T>, a memmovable AutoTArray-like container that always holds at least one inline element, used inside style structs for l… |
| `layout/style/nsStyleChangeList.cpp` | cpp | 69 | Gecko Style System (C++) | Implements nsStyleChangeList::AppendChange with debug assertions about hint validity (frame present, no neutral changes, reconstruct-only semantics) and merges… |
| `layout/style/nsStyleChangeList.h` | c | 52 | Gecko Style System (C++) | Declares nsStyleChangeData (weak frame, content, nsChangeHint) and nsStyleChangeList, an AutoTArray-backed list of recomputations to perform in response to sty… |
| `layout/style/nsStyleConsts.h` | c | 513 | Gecko Style System (C++) | Large header of enum-class constants (StyleBoxAlign, StyleGeometryBox, StyleVisibility, etc.) used in ComputedStyle style structs; values mirror Servo-generate… |
| `layout/style/nsStyleSheetService.cpp` | cpp | 310 | Gecko Style System (C++) | Implements the style sheet service: synchronously loads and registers agent/user/author sheets via css::Loader, notifies registered PresShells and replicates c… |
| `layout/style/nsStyleSheetService.h` | c | 69 | Gecko Style System (C++) | Declares the nsStyleSheetService singleton (nsIStyleSheetService + nsIMemoryReporter) holding per-type sheet arrays (agent/user/author), PresShell registration… |
| `layout/style/nsStyleStruct.cpp` | cpp | 3830 | Gecko Style System (C++) | Implementation of the Gecko nsStyle* computed-style structs (nsStyleFont, nsStyleMargin, nsStyleBorder, nsStyleList, nsStyleText, nsStyleDisplay, ...): constru… |
| `layout/style/nsStyleStruct.h` | c | 2509 | Gecko Style System (C++) | Cross-batch reference: C++ definitions of Gecko's nsStyleFont/nsStyleDisplay/nsStyleColor etc., which the Rust ComputedValues mirrors and fills through the gen… |
| `layout/style/nsStyleStructFwd.h` | c | 69 | Gecko Style System (C++) | Forward declarations to avoid including all of nsStyleStruct.h: defines StyleStructID (from FOR_EACH_STYLE_STRUCT) and StyleStructConstants bitmask helpers for… |
| `layout/style/nsStyleStructInlines.h` | c | 139 | Gecko Style System (C++) | Inline helper methods on nsStyleText and nsStyleDisplay (NewlineIsSignificant, WhiteSpaceCanWrap, WordCanWrap, IsBlockOutside, IsInlineOutside, GetDisplay) tha… |
| `layout/style/nsStyleStructList.h` | c | 53 | Gecko Style System (C++) | High-order macro FOR_EACH_STYLE_STRUCT enumerating all inherited (Font, List, Text, Visibility, UI, TableBorder, SVG) and reset (Background, Position, Display,… |
| `layout/style/nsStyleTransformMatrix.cpp` | cpp | 658 | Gecko Style System (C++) | Converts CSS transform lists into Matrix4x4: resolves percentages against CSS or SVG reference boxes (transform-box handling, stroke-bounds cycles), dispatches… |
| `layout/style/nsStyleTransformMatrix.h` | c | 188 | Gecko Style System (C++) | Declares the nsStyleTransformMatrix namespace: TransformReferenceBox for lazily resolved transform reference boxes, ReadTransforms to build gfx::Matrix4x4 from… |
| `layout/style/nsStyleUtil.cpp` | cpp | 380 | Gecko Style System (C++) | Implements style utilities: dash and language-tag matching (language tags via the oxilangtag FFI), quoted/escaped CSS string and identifier serialization, CSSO… |
| `layout/style/nsStyleUtil.h` | c | 162 | Gecko Style System (C++) | Declares the nsStyleUtil class of static style-system helpers: selector matching comparators (DashMatchCompare, ValueIncludes, LangTagCompare), CSS string/iden… |
| `layout/style/nsTransitionManager.cpp` | cpp | 544 | CSS Animations & Timelines | Starts, replaces, and cancels CSS transitions during style changes: expands transition-property shorthands and 'all', consults Servo FFI (Servo_ComputedValues_… |
| `layout/style/nsTransitionManager.h` | c | 90 | CSS Animations & Timelines | Declares nsTransitionManager, a CommonAnimationManager<CSSTransition>, exposing UpdateTransitions for stylo restyles plus internal DoUpdateTransitions / Consid… |
| `layout/style/PaintWorkletGlobalScope.cpp` | cpp | 33 | Gecko Style System (C++) | Implements PaintWorkletGlobalScope: wraps the JS global object with its generated binding, exposes the owning PaintWorkletImpl, and provides an empty RegisterP… |
| `layout/style/PaintWorkletGlobalScope.h` | c | 36 | Gecko Style System (C++) | Declares mozilla::dom::PaintWorkletGlobalScope, the WorkletGlobalScope subclass for the CSS Paint API, with JS global wrapping and a (currently stubbed) Regist… |
| `layout/style/PaintWorkletImpl.cpp` | cpp | 38 | Gecko Style System (C++) | Implements PaintWorkletImpl, the WorkletImpl subclass backing CSS Paint API worklets: CreateWorklet builds a dom::Worklet for a window/principal (crashing in r… |
| `layout/style/PaintWorkletImpl.h` | c | 35 | Gecko Style System (C++) | Declares PaintWorkletImpl, the parent-process WorkletImpl subclass backing the CSS Paint API (window.paintWorklet) |
| `layout/style/PostTraversalTask.cpp` | cpp | 42 | Gecko Style System (C++) | Implements PostTraversalTask::Run and its destructor, executing the few tasks allowed right after a Servo traversal: dispatching font loading events / replacin… |
| `layout/style/PostTraversalTask.h` | c | 79 | Gecko Style System (C++) | Declares PostTraversalTask, a value type run immediately after a Servo traversal; replaces runnables to avoid virtual calls and allocations, and may hold raw D… |
| `layout/style/PreferenceSheet.cpp` | cpp | 297 | Gecko Style System (C++) | Loads the preference-derived color sheets (chrome, content, print) used by the style system: system vs pref vs stand-in colors, high-contrast mode handling, li… |
| `layout/style/PreferenceSheet.h` | c | 121 | Gecko Style System (C++) | Declares PreferenceSheet, the static holder of prefable colors for the style system: per-kind Prefs (chrome/content/print) with light and dark color sets, colo… |
| `layout/style/PreloadedStyleSheet.cpp` | cpp | 81 | Gecko Style System (C++) | Implements preloading of chrome style sheets for nsIStyleSheetService.preloadSheet: synchronous load via css::Loader::LoadSheetSync in Preload/GetSheet, and Pr… |
| `layout/style/PreloadedStyleSheet.h` | c | 71 | Gecko Style System (C++) | Declares PreloadedStyleSheet, the cycle-collected nsIPreloadedStyleSheet object returned from nsIStyleSheetService.preloadSheet, wrapping a lazily loaded Style… |
| `layout/style/PseudoStyleRequest.h` | c | 95 | Gecko Style System (C++) | Declares mozilla::PseudoStyleRequest, a (PseudoStyleType, optional identifier atom) pair used to request pseudo-element style, plus a PLDHash key wrapper for h… |
| `layout/style/PseudoStyleType.cpp` | cpp | 106 | Gecko Style System (C++) | Pseudo-element plumbing: streaming PseudoStyleType names from the generated list, parsing pseudo-element strings via the Servo_ParsePseudoElement FFI into a Ps… |
| `layout/style/PseudoStyleType.h` | c | 165 | Gecko Style System (C++) | Declares the PseudoStyleType enum and PseudoStyleTypeFlags from mozilla/PseudoStyleTypeList.h, and class PseudoStyle with classification helpers (IsPseudoEleme… |
| `layout/style/RestyleManager.cpp` | cpp | 4020 | Gecko Style System (C++) | The core of Gecko restyle orchestration: converts DOM mutations (content insert/remove, attribute and state changes) into element snapshots and restyle hints, … |
| `layout/style/RestyleManager.h` | c | 614 | Gecko Style System (C++) | Declares RestyleManager, Gecko's restyle orchestrator (post-restyle events, pending restyle processing, element snapshot tables, animation/restyle generations,… |
| `layout/style/Rule.cpp` | cpp | 146 | CSSOM Rules & Declarations | Implements the CSSOM css::Rule base class: skippable cycle collection (IsCCLeaf/IsKnownLive), careful unlinking of declaration wrappers, DropSheetReference, Se… |
| `layout/style/Rule.h` | c | 151 | CSSOM Rules & Declarations | Declares mozilla::css::Rule, the abstract base class for all CSS rule types in a style sheet and the CSSOM CSSRule base: holds non-owning sheet/parent-rule poi… |
| `layout/style/RustCell.h` | c | 43 | Gecko↔Stylo FFI Bridge | Defines the RustCell<T> template with the same layout as Rust's std::cell::Cell<T>, so bindgen-generated FFI structs can embed it; ServoBindings.toml maps it t… |
| `layout/style/ServoBindings.h` | c | 114 | Gecko↔Stylo FFI Bridge | Declares, via BASIC_RULE_FUNCS/GROUP_RULE_FUNCS macro families, the Servo_* FFI entry points per CSS rule type (Servo_CssRules_Get<Kind>RuleAt, Servo_StyleSet_… |
| `layout/style/ServoBindings.toml` | toml | 696 | Gecko↔Stylo FFI Bridge | cbindgen configuration for the Servo style-system bindings: declares which Rust types map to which Gecko C++ types (including the SERVO_LOCKED_ARC_TYPE entries… |
| `layout/style/ServoBindingTypes.h` | c | 167 | Gecko↔Stylo FFI Bridge | Defines the C++/FFI ownership glue for Servo types: SERVO_ARC_TYPE RefPtrTraits routing AddRef/Release to Servo_*_AddRef/Release, SERVO_BOXED_TYPE std::default… |
| `layout/style/ServoBoxedTypeList.inc` | inc | 32 | Gecko Style System (C++) | Preprocessor list of Servo Box<T> FFI types (PerDocumentStyleData/StyleSet, SelectorList, UseCounters, AuthorStyles, SourceSizeList, ...), expanded by ServoBin… |
| `layout/style/ServoComputedData.h` | c | 122 | Gecko Style System (C++) | Declares ServoComputedData, the C++ mirror of Servo's computed values backing ComputedStyle: per-style-struct pointers and accessors generated over FOR_EACH_ST… |
| `layout/style/ServoCSSParser.cpp` | cpp | 131 | Gecko Style System (C++) | Implements ServoCSSParser as thin forwarders onto the Servo_* FFI: color/image validity, color computation and color-space conversion, property parsing into lo… |
| `layout/style/ServoCSSParser.h` | c | 233 | Gecko Style System (C++) | Declares ServoCSSParser, the static utility facade over Servo's parsing FFI used throughout Gecko: color validation/computation/conversion, ParseProperty into … |
| `layout/style/ServoCSSRuleList.cpp` | cpp | 320 | CSSOM Rules & Declarations | DOM css::RuleList wrapper over Stylo's StyleLockedCssRules: lazily instantiates Gecko css::Rule objects from raw rule types via Servo_CssRules_Get/ListTypes, a… |
| `layout/style/ServoCSSRuleList.h` | c | 94 | CSSOM Rules & Declarations | Declares ServoCSSRuleList, a dom::CSSRuleList holding a RefPtr<StyleLockedCssRules> and a cached array of instantiated Gecko rule objects with lazy SetRule map… |
| `layout/style/ServoElementSnapshot.cpp` | cpp | 91 | Gecko Style System (C++) | Implements ServoElementSnapshot capture for Servo's selector-matching/invalidation: constructor records chrome-doc and lang-attr support, AddAttrs copies attri… |
| `layout/style/ServoElementSnapshot.h` | c | 175 | Gecko Style System (C++) | Declares ServoElementSnapshot and ServoElementSnapshotFlags: the Gecko-side capture of an element's attributes, ElementState (:hover/:active etc.), custom stat… |
| `layout/style/ServoElementSnapshotTable.h` | c | 21 | Gecko Style System (C++) | Declares ServoElementSnapshotTable, an nsClassHashtable from dom::Element to its ServoElementSnapshot used to carry snapshots through Servo traversals. |
| `layout/style/ServoLockedArcTypeList.inc` | inc | 26 | Gecko Style System (C++) | X-macro list of every Servo Arc<Locked<T>> FFI type (CssRules, DeclarationBlock, StyleRule, ImportRule, Keyframe, MediaList, PageRule, FontFaceRule, etc.) expa… |
| `layout/style/ServoStyleConstsForwards.h` | c | 252 | Gecko↔Stylo FFI Bridge | Forward declarations and typedefs that cbindgen cannot emit itself, included from generated ServoStyleConsts.h: StyleLoader/StyleRawGeckoElement aliases, Style… |
| `layout/style/ServoStyleConstsInlines.h` | c | 1605 | Gecko↔Stylo FFI Bridge | Hand-written inline implementations for cbindgen-generated style types: StyleOwnedSlice/StyleOwnedArray copy/destroy and StyleOwnedRect, StyleAtom refcounting … |
| `layout/style/ServoStyleSet.cpp` | cpp | 1693 | Gecko Style System (C++) | Implementation of ServoStyleSet, the per-document Gecko wrapper around the Servo style system: stylesheet add/remove per origin, stylist updates and sheet-dirt… |
| `layout/style/ServoStyleSet.h` | c | 785 | Gecko Style System (C++) | The Gecko front door to the Stylo style engine: owns the StyleSetContents raw data (Servo_StyleSet_Init) and exposes style resolution (ResolveStyleLazily, Reso… |
| `layout/style/ServoStyleSetInlines.h` | c | 25 | Gecko Style System (C++) | Inline ServoStyleSet methods that go straight to the FFI: Servo_SourceSizeList_Evaluate for <source size> lists and Servo_ResolveStyle for element style resolu… |
| `layout/style/ServoTraversalStatistics.h` | c | 26 | Gecko Style System (C++) | Declares ServoTraversalStatistics, counters for elements traversed/styled/matched and styles shared/reused during a Servo traversal, mirroring style::context::… |
| `layout/style/ServoTypes.h` | c | 140 | Gecko Style System (C++) | Types defined to pass values through Gecko_*/Servo_* FFI: LazyComputeBehavior, ServoTraversalFlags, StyleRuleInclusion, UpdateAnimationsTasks, InheritTarget, P… |
| `layout/style/ServoUtils.h` | c | 36 | Gecko Style System (C++) | Utilities for Servo initialization and assertions: declares InitializeServo/ShutdownServo and AssertIsMainThreadOrServoFontMetricsLocked (implemented in GeckoB… |
| `layout/style/ShadowParts.cpp` | cpp | 141 | Gecko Style System (C++) | Implements parsing of the shadow part mapping list per css-shadow-parts: ParseSingleMapping tokenizes 'outer::inner' entries (space- and colon-delimited) and S… |
| `layout/style/ShadowParts.h` | c | 45 | Gecko Style System (C++) | Declares mozilla::ShadowParts with forward/reverse part-name hashtables, a PartList array type, and the static Parse entry point plus DEBUG Dump. |
| `layout/style/SharedStyleSheetCache.cpp` | cpp | 332 | Gecko Style System (C++) | Implementation of the process-wide SharedStyleSheetCache: memory reporting and pref-triggered clearing in Init(), static LoadCompleted plumbing that marks fail… |
| `layout/style/SharedStyleSheetCache.h` | c | 115 | Gecko Style System (C++) | Declares SharedStyleSheetCacheTraits (binding the generic cache to css::Loader/SheetLoadDataHashKey/StyleSheet/SheetLoadData) and SharedStyleSheetCache with in… |
| `layout/style/SharedSubResourceCache.cpp` | cpp | 191 | Gecko Style System (C++) | Implements SharedSubResourceCacheUtils (Add/RemoveMemoryPressureObserver on 'memory-pressure' topics, AddPerformanceEntryForCache building PerformanceTimingDat… |
| `layout/style/SharedSubResourceCache.h` | c | 648 | — | file node only |
| `layout/style/SheetLoadData.h` | c | 313 | Gecko Style System (C++) | Declares css::SheetLoadData (and SheetLoadDataHolder): the per-stylesheet load descriptor deriving from PreloaderBase and SharedSubResourceCacheLoadingValueBas… |
| `layout/style/StreamLoader.cpp` | cpp | 297 | Gecko Style System (C++) | Implements css::StreamLoader: OnStartRequest reserves capacity from Content-Length and retargets delivery to a TaskQueue; WriteSegmentFun buffers bytes with 3-… |
| `layout/style/StreamLoader.h` | c | 71 | Gecko Style System (C++) | Declares css::StreamLoader wrapping a SheetLoadData reference, BOM/byte buffers, request pointer, and NIGHTLY channel-open-failure instrumentation. |
| `layout/style/StyleAnimationValue.cpp` | cpp | 283 | CSS Animations & Timelines | Implements AnimationValue on top of the Servo_AnimationValue_* FFI: deep equality, opacity/color/currentcolor extraction, transform/translate/rotate/scale and … |
| `layout/style/StyleAnimationValue.h` | c | 122 | CSS Animations & Timelines | Declares AnimationValue and PropertyStyleAnimationValuePair: utilities for animating computed style values across the Servo FFI, including transform/motion-pat… |
| `layout/style/StyleColor.cpp` | cpp | 174 | Gecko Style System (C++) | Template specializations for cbindgen-generated StyleColor/StyleColorFunction/StyleGenericColorMix: MaybeTransparent, DependsOnCurrentColor across rgb/hsl/hwb/… |
| `layout/style/StyleColorInlines.h` | c | 75 | Gecko Style System (C++) | Inline functions for StyleColor (values::computed::Color): StyleAbsoluteColor::FromColor converting an nscolor to sRGB legacy components, SrgbLegacy constructo… |
| `layout/style/StylePreloadKind.h` | c | 53 | Gecko Style System (C++) | Declares css::StylePreloadKind, a uint8_t enum class distinguishing none, parser-speculative, <link rel=preload as=style>, Link rel=preload response-header, an… |
| `layout/style/StyleSheet.cpp` | cpp | 1535 | Gecko Style System (C++) | DOM-facing stylesheet object: parsing entry points ParseSheet/ParseSheetSync hand bytes to Servo_StyleSheet_FromUTF8Bytes (Stylo), and it manages rule insertio… |
| `layout/style/StyleSheet.h` | c | 602 | Gecko Style System (C++) | Declares mozilla::StyleSheet (base of CSSStyleSheet): the stylesheet DOM interface with inner StyleSheetInfo, parse/replace APIs, rule mutation, principal/subj… |
| `layout/style/StyleSheetInfo.h` | c | 80 | Gecko Style System (C++) | Header declaring mozilla::StyleSheetInfo, a struct holding data common to CSSStyleSheetInner and ServoStyleSheet: CORS mode, SRI integrity metadata, origin-cle… |
| `layout/style/StyleSheetInlines.h` | c | 29 | Gecko Style System (C++) | Out-of-line header providing the inline definition of mozilla::StyleSheet::GetParentObject, resolving the DOM parent (constructor document, document/shadow-roo… |
| `layout/style/TimelineCollection.cpp` | cpp | 69 | CSS Animations & Timelines | Implementation of the mozilla::TimelineCollection template: destructor unlinks from the LinkedList, Destroy() clears the per-element/per-pseudo entry in Elemen… |
| `layout/style/TimelineCollection.h` | c | 85 | CSS Animations & Timelines | Header declaring mozilla::TimelineEntry (timeline ref plus cascade level) and the mozilla::TimelineCollection template, which shares implementation between Scr… |
| `layout/style/TimelineManager.cpp` | cpp | 550 | CSS Animations & Timelines | Implementation of mozilla::TimelineManager: creates, replaces, destroys and resolves named scroll/view progress timelines from computed nsStyleUIReset values, … |
| `layout/style/TimelineManager.h` | c | 160 | CSS Animations & Timelines | Header declaring mozilla::TimelineManager, the per-pres-context owner of scroll/view timeline collections and timeline-name maps; exposes UpdateTimelines, Upda… |
| `layout/style/TopLevelImageDocument.css` | css | 48 | UA Stylesheets | Companion UA stylesheet applied only to top-level ImageDocuments (not iframes) |
| `layout/style/TopLevelVideoDocument.css` | css | 31 | UA Stylesheets | UA stylesheet applied to top-level VideoDocuments (standalone video player documents, not iframes) |
| `layout/style/URLExtraData.cpp` | cpp | 52 | Gecko Style System (C++) | Implements URLExtraData lifecycle: Init() creates the dummy and dummy-chrome instances backed by a NullPrincipal URI, Shutdown() releases them, and ChromeRules… |
| `layout/style/URLExtraData.h` | c | 84 | Gecko Style System (C++) | Thread-safe container bundling base URI, referrer info, and principal used to resolve url() values during CSS parsing, shared with the Servo selectors/style co… |

### layout/style/res/ (13)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `layout/style/res/accessiblecaret.css` | css | 96 | UA Stylesheets | Built-in user-agent stylesheet loaded by GlobalStyleSheetCache at startup |
| `layout/style/res/counterstyles.css` | css | 549 | UA Stylesheets | Built-in user-agent stylesheet loaded by GlobalStyleSheetCache at startup |
| `layout/style/res/details.css` | css | 24 | UA Stylesheets | Built-in user-agent stylesheet loaded by GlobalStyleSheetCache at startup |
| `layout/style/res/forms.css` | css | 1107 | UA Stylesheets | Built-in user-agent stylesheet loaded by GlobalStyleSheetCache at startup |
| `layout/style/res/html.css` | css | 1195 | UA Stylesheets | Built-in user-agent stylesheet loaded by GlobalStyleSheetCache at startup; the main default style sheet for HTML documents (default namespace set to XHTML via … |
| `layout/style/res/Mozilla_Bullet.bf` | bf | 157 | UA Stylesheets | BirdFont XML project source for the 'Mozilla Bullet' font (designed by Mats Palmgren, SIL Open Font License), the built-in font Gecko ships for list bullets an… |
| `layout/style/res/noframes.css` | css | 15 | UA Stylesheets | Built-in user-agent stylesheet loaded by GlobalStyleSheetCache at startup; only added to the style set for documents with frames disabled |
| `layout/style/res/plaintext.css` | css | 35 | UA Stylesheets | Built-in user-agent stylesheet loaded by GlobalStyleSheetCache at startup; used for documents rendered as plain text (text/plain, similar to view-source stylin… |
| `layout/style/res/quirk.css` | css | 103 | UA Stylesheets | Built-in user-agent stylesheet loaded by GlobalStyleSheetCache at startup; applied only to documents in quirks mode |
| `layout/style/res/scrollbars.css` | css | 186 | UA Stylesheets | Built-in user-agent stylesheet loaded by GlobalStyleSheetCache at startup |
| `layout/style/res/select.css` | css | 18 | UA Stylesheets | Built-in user-agent stylesheet loaded by GlobalStyleSheetCache at startup |
| `layout/style/res/ua.css` | css | 562 | UA Stylesheets | Built-in user-agent stylesheet loaded by GlobalStyleSheetCache at startup; the core UA sheet applied to all documents |
| `layout/style/res/viewsource.css` | css | 98 | UA Stylesheets | Built-in user-agent stylesheet loaded by GlobalStyleSheetCache at startup; used for view-source: documents |

### layout/style/tools/ (1)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `layout/style/tools/cleanup_computed_getters.py` | python | 85 | Gecko Style System (C++) | Developer utility script run from topsrcdir with the objdir as argument: it reads the generated nsComputedDOMStyleGenerated.inc to find which DoGet* getters ar… |

### layout/style/typedom/ (79)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `layout/style/typedom/CSSColor.cpp` | cpp | 65 | CSS Typed OM | Implementation of the CSSColor Typed OM interface (generic color() with color space, channels and alpha); most setters and channel mutation hooks throw NS_ERRO… |
| `layout/style/typedom/CSSColor.h` | c | 67 | CSS Typed OM | Header declaring mozilla::dom::CSSColor final, a CSSColorValue subclass implementing the CSSColor Web IDL interface (colorSpace, channels, alpha) for the CSS T… |
| `layout/style/typedom/CSSColorValue.cpp` | cpp | 39 | CSS Typed OM | Implementation of the CSSColorValue Typed OM base class: constructor chaining to CSSStyleValue, IsEnabled() gated on layout.css.typedom.enabled plus layout.css… |
| `layout/style/typedom/CSSColorValue.h` | c | 49 | CSS Typed OM | Header declaring mozilla::dom::CSSColorValue, the CSSStyleValue subclass that is the base for all Typed OM color value wrappers (CSSColor, CSSHSL, CSSHWB, CSSL… |
| `layout/style/typedom/CSSHSL.cpp` | cpp | 70 | CSS Typed OM | Implementation of the CSSHSL Typed OM interface (h, s, l, alpha attributes); the constructor is stubbed and all setters throw NS_ERROR_NOT_IMPLEMENTED, with ge… |
| `layout/style/typedom/CSSHSL.h` | c | 67 | CSS Typed OM | Header declaring mozilla::dom::CSSHSL final, a CSSColorValue subclass implementing the CSSHSL Web IDL interface for the CSS Typed OM hsl()/hsla() color value. |
| `layout/style/typedom/CSSHWB.cpp` | cpp | 68 | CSS Typed OM | Implementation of the CSSHWB Typed OM interface (h, w, b, alpha attributes); constructor is stubbed and all attribute setters throw NS_ERROR_NOT_IMPLEMENTED, w… |
| `layout/style/typedom/CSSHWB.h` | c | 64 | CSS Typed OM | Header declaring mozilla::dom::CSSHWB final, a CSSColorValue subclass implementing the CSSHWB Web IDL interface for the CSS Typed OM hwb() color value. |
| `layout/style/typedom/CSSImageValue.cpp` | cpp | 50 | CSS Typed OM | Implementation of the CSSImageValue Typed OM interface: wraps a servo StyleImageValue (FFI-owned UniquePtr), provides Create(), serializes via Servo_ImageValue… |
| `layout/style/typedom/CSSImageValue.h` | c | 52 | CSS Typed OM | Header declaring mozilla::dom::CSSImageValue final, a CSSStyleValue subclass holding a NotNull<UniquePtr<StyleImageValue>> representing <image> values in the C… |
| `layout/style/typedom/CSSKeywordValue.cpp` | cpp | 105 | CSS Typed OM | Implementation of the CSSKeywordValue Typed OM interface per the CSS Typed OM spec: string constructor rejecting empty values, Create() overloads rectifying CS… |
| `layout/style/typedom/CSSKeywordValue.h` | c | 73 | CSS Typed OM | Header declaring mozilla::dom::CSSKeywordValue final, a CSSStyleValue subclass wrapping a CSS keyword string (nsCString mValue) with constructor, rectifying Cr… |
| `layout/style/typedom/CSSLab.cpp` | cpp | 70 | CSS Typed OM | Implementation of the CSSLab Typed OM interface (l, a, b, alpha attributes); constructor is stubbed and all attribute setters throw NS_ERROR_NOT_IMPLEMENTED, w… |
| `layout/style/typedom/CSSLab.h` | c | 67 | CSS Typed OM | Header declaring mozilla::dom::CSSLab final, a CSSColorValue subclass implementing the CSSLab Web IDL interface for the CSS Typed OM lab() color value. |
| `layout/style/typedom/CSSLCH.cpp` | cpp | 70 | CSS Typed OM | Implementation of the CSSLCH Typed OM interface (l, c, h, alpha attributes); constructor is stubbed and all attribute setters throw NS_ERROR_NOT_IMPLEMENTED, w… |
| `layout/style/typedom/CSSLCH.h` | c | 67 | CSS Typed OM | Header declaring mozilla::dom::CSSLCH final, a CSSColorValue subclass implementing the CSSLCH Web IDL interface for the CSS Typed OM lch() color value. |
| `layout/style/typedom/CSSMathClamp.cpp` | cpp | 140 | CSS Typed OM | Implements CSSMathClamp: Create from the fixed three-element StyleMathClamp values array, WebIDL Constructor merging the three operand types with Servo_Numeric… |
| `layout/style/typedom/CSSMathClamp.h` | c | 84 | CSS Typed OM | Declares CSSMathClamp, the Typed OM CSSMathValue subclass representing clamp(lower, value, upper) |
| `layout/style/typedom/CSSMathInvert.cpp` | cpp | 109 | CSS Typed OM | Implements CSSMathInvert: Create from StyleMathInvert, WebIDL Constructor that rectifies the argument and inverts its numeric type with Servo_NumericType_Inver… |
| `layout/style/typedom/CSSMathInvert.h` | c | 73 | CSS Typed OM | Declares CSSMathInvert, the Typed OM CSSMathValue subclass representing the reciprocal (1/value) of a single CSSNumericValue |
| `layout/style/typedom/CSSMathMax.cpp` | cpp | 148 | CSS Typed OM | Implements CSSMathMax: Create from StyleMathMax, WebIDL Constructor merging operand numeric types with Servo_NumericType_AddTypes (SyntaxError for empty args, … |
| `layout/style/typedom/CSSMathMax.h` | c | 78 | CSS Typed OM | Declares CSSMathMax, the Typed OM CSSMathValue subclass representing max() over an operand list |
| `layout/style/typedom/CSSMathMin.cpp` | cpp | 148 | CSS Typed OM | Implements CSSMathMin: Create from StyleMathMin, WebIDL Constructor merging operand numeric types with Servo_NumericType_AddTypes (SyntaxError for empty args, … |
| `layout/style/typedom/CSSMathMin.h` | c | 78 | CSS Typed OM | Declares CSSMathMin, the Typed OM CSSMathValue subclass representing min() over an operand list |
| `layout/style/typedom/CSSMathNegate.cpp` | cpp | 109 | CSS Typed OM | Implements CSSMathNegate: Create from StyleMathNegate, WebIDL Constructor that rectifies the numberish argument and copies its numeric type unchanged, serializ… |
| `layout/style/typedom/CSSMathNegate.h` | c | 73 | CSS Typed OM | Declares CSSMathNegate, the Typed OM CSSMathValue subclass representing unary negation of a single CSSNumericValue |
| `layout/style/typedom/CSSMathProduct.cpp` | cpp | 169 | CSS Typed OM | Implements CSSMathProduct: Create from StyleMathProduct, WebIDL Constructor that merges factor types with Servo_NumericType_MultiplyTypes (TypeError on incompa… |
| `layout/style/typedom/CSSMathProduct.h` | c | 79 | CSS Typed OM | Declares CSSMathProduct, the Typed OM CSSMathValue subclass representing a calc() product |
| `layout/style/typedom/CSSMathSum.cpp` | cpp | 168 | CSS Typed OM | Implements CSSMathSum: Create from StyleMathSum, WebIDL Constructor that rectifies numberish arguments, rejects an empty list, merges operand numeric types wit… |
| `layout/style/typedom/CSSMathSum.h` | c | 77 | CSS Typed OM | Declares CSSMathSum, the Typed OM CSSMathValue subclass representing a calc() sum |
| `layout/style/typedom/CSSMathValue.cpp` | cpp | 268 | CSS Typed OM | Implements the CSSMathValue base: constructors forwarding NumericValueType::MathValue to CSSNumericValue, the static Create factory that dispatches on the Styl… |
| `layout/style/typedom/CSSMathValue.h` | c | 135 | CSS Typed OM | Declares CSSMathValue, the abstract Typed OM base class for calc()-style math values, derived from CSSNumericValue |
| `layout/style/typedom/CSSMatrixComponent.cpp` | cpp | 135 | CSS Typed OM | Implements CSSMatrixComponent: Create copies all sixteen StyleMatrixComponent entries into a fresh DOMMatrix; WebIDL Constructor picks is2D from options or the… |
| `layout/style/typedom/CSSMatrixComponent.h` | c | 72 | CSS Typed OM | Declares CSSMatrixComponent, the CSSTransformComponent subclass wrapping a DOMMatrix plus an is-2D flag |
| `layout/style/typedom/CSSNumericArray.cpp` | cpp | 53 | CSS Typed OM | Implements CSSNumericArray: constructor asserting a parent, cycle-collected ISUPPORTS and wrapper-cache boilerplate, Length() and the bounds-checked IndexedGet… |
| `layout/style/typedom/CSSNumericArray.h` | c | 57 | CSS Typed OM | Declares CSSNumericArray, a cycle-collected nsISupports/nsWrapperCache WebIDL array of CSSNumericValue operands, exposing Length(), the indexed getter, and the… |
| `layout/style/typedom/CSSNumericValue.cpp` | cpp | 368 | CSS Typed OM | Implements CSSNumericValue: numberish rectification (returning an existing CSSNumericValue or wrapping a double in CSSUnitValue) and creation from StyleNumeric… |
| `layout/style/typedom/CSSNumericValue.h` | c | 189 | CSS Typed OM | Declares CSSNumericValue, the Typed OM base class (derived from CSSStyleValue) shared by CSSUnitValue and CSSMathValue |
| `layout/style/typedom/CSSOKLab.cpp` | cpp | 70 | CSS Typed OM | Stub implementation of CSSOKLab: the Constructor only allocates the object, the l/a/b/alpha getters all return zero and the setters throw NS_ERROR_NOT_IMPLEMEN… |
| `layout/style/typedom/CSSOKLab.h` | c | 67 | CSS Typed OM | Declares CSSOKLab, a CSSColorValue subclass for the Typed OM oklab() color function, exposing the WebIDL Constructor and l/a/b/alpha attributes over CSSColorPe… |
| `layout/style/typedom/CSSOKLCH.cpp` | cpp | 70 | CSS Typed OM | Stub implementation of CSSOKLCH: the Constructor only allocates the object, the l/c/h/alpha getters all return zero and the setters throw NS_ERROR_NOT_IMPLEMEN… |
| `layout/style/typedom/CSSOKLCH.h` | c | 67 | CSS Typed OM | Header for the CSS Typed OM oklch() color value |
| `layout/style/typedom/CSSPerspective.cpp` | cpp | 184 | CSS Typed OM | Implements CSSPerspective: factory Create() from StylePerspectiveComponent (numeric or keyword length), WebIDL Constructor validating a <length> numeric or the… |
| `layout/style/typedom/CSSPerspective.h` | c | 77 | CSS Typed OM | Header declaring CSSPerspective, a final CSSTransformComponent holding an OwningCSSPerspectiveValue length (CSSNumericValue or CSSKeywordValue), with WebIDL le… |
| `layout/style/typedom/CSSRGB.cpp` | cpp | 70 | CSS Typed OM | Stub implementation of CSSRGB: the WebIDL constructor ignores its r/g/b/alpha arguments and all getters return 0 while setters throw NS_ERROR_NOT_IMPLEMENTED; … |
| `layout/style/typedom/CSSRGB.h` | c | 67 | CSS Typed OM | Header declaring CSSRGB, a final CSSColorValue subclass representing the CSS rgb() function, with WebIDL r/g/b (CSSColorRGBComp) and alpha (CSSColorPercent) ac… |
| `layout/style/typedom/CSSRotate.cpp` | cpp | 250 | CSS Typed OM | Implements CSSRotate: two WebIDL constructors (single <angle> producing a 2D z-axis rotate; x/y/z numbers plus <angle> producing rotate3d), Create() from Style… |
| `layout/style/typedom/CSSRotate.h` | c | 95 | CSS Typed OM | Header declaring CSSRotate, a final CSSTransformComponent with RefPtr<CSSNumericValue> slots mX/mY/mZ/mAngle, dual WebIDL constructors, x/y/z/angle accessors, … |
| `layout/style/typedom/CSSScale.cpp` | cpp | 207 | CSS Typed OM | Implements CSSScale: WebIDL constructor validating x/y and optional z as <number> (z defaults to a CSSUnitValue of 1.0 and forces 2D), Create() from StyleScale… |
| `layout/style/typedom/CSSScale.h` | c | 85 | CSS Typed OM | Header declaring CSSScale, a final CSSTransformComponent with RefPtr<CSSNumericValue> slots mX/mY/mZ, WebIDL number accessors, ToMatrix(), ToCssTextWithPropert… |
| `layout/style/typedom/CSSSkew.cpp` | cpp | 132 | CSS Typed OM | Implements CSSSkew: WebIDL constructor and ax/ay setters requiring <angle> numeric types, Create() from StyleSkewComponent, ToMatrix() via DOMMatrix::SkewSelf,… |
| `layout/style/typedom/CSSSkew.h` | c | 77 | CSS Typed OM | Header declaring CSSSkew, a final CSSTransformComponent with RefPtr<CSSNumericValue> angle slots mAx/mAy, WebIDL accessors, ToMatrix(), ToCssTextWithProperty()… |
| `layout/style/typedom/CSSSkewX.cpp` | cpp | 108 | CSS Typed OM | Implements CSSSkewX: WebIDL constructor and ax setter requiring a single <angle>, Create() from StyleSkewXComponent (an alias of StyleNumericValue), ToMatrix()… |
| `layout/style/typedom/CSSSkewX.h` | c | 72 | CSS Typed OM | Header declaring CSSSkewX, a final CSSTransformComponent with a single RefPtr<CSSNumericValue> mAx angle slot; aliases StyleSkewXComponent to StyleNumericValue… |
| `layout/style/typedom/CSSSkewY.cpp` | cpp | 108 | CSS Typed OM | Implements CSSSkewY: WebIDL constructor and ay setter requiring a single <angle>, Create() from StyleSkewYComponent (an alias of StyleNumericValue), ToMatrix()… |
| `layout/style/typedom/CSSSkewY.h` | c | 72 | CSS Typed OM | Header declaring CSSSkewY, a final CSSTransformComponent with a single RefPtr<CSSNumericValue> mAy angle slot; aliases StyleSkewYComponent to StyleNumericValue… |
| `layout/style/typedom/CSSStyleValue.cpp` | cpp | 307 | CSS Typed OM | Root of the CSS Typed OM value hierarchy implementation |
| `layout/style/typedom/CSSStyleValue.h` | c | 159 | CSS Typed OM | Abstract base class of all Typed OM values: nsISupports + nsWrapperCache cycle-collected root holding a parent global and a StyleValueType tag |
| `layout/style/typedom/CSSTransformComponent.cpp` | cpp | 217 | CSS Typed OM | Base class of transform components: is2d attribute (SetIs2D is a no-op for skew/skewX/skewY/perspective), polymorphic ToMatrix() dispatching through TransformC… |
| `layout/style/typedom/CSSTransformComponent.h` | c | 156 | CSS Typed OM | Abstract base class for Typed OM transform functions (nsISupports + nsWrapperCache) |
| `layout/style/typedom/CSSTransformValue.cpp` | cpp | 196 | CSS Typed OM | Implements CSSTransformValue: Create() maps each StyleTransformComponent variant to a concrete CSSTransformComponent (CSSTranslate, CSSRotate, CSSScale, CSSSke… |
| `layout/style/typedom/CSSTransformValue.h` | c | 89 | CSS Typed OM | Header declaring CSSTransformValue, a final CSSStyleValue holding nsTArray<RefPtr<CSSTransformComponent>> mValues; aliases StyleTransformValue to CopyableTArra… |
| `layout/style/typedom/CSSTranslate.cpp` | cpp | 191 | CSS Typed OM | Implements CSSTranslate: WebIDL constructor validating x/y as <length-percentage> and optional z as <length> (defaulting to a 0px CSSUnitValue with Length nume… |
| `layout/style/typedom/CSSTranslate.h` | c | 87 | CSS Typed OM | Header declaring CSSTranslate, a final CSSTransformComponent with RefPtr<CSSNumericValue> slots mX/mY/mZ, WebIDL accessors, ToMatrix(), ToCssTextWithProperty()… |
| `layout/style/typedom/CSSUnitValue.cpp` | cpp | 232 | CSS Typed OM | Implements CSSUnitValue, the (value, unit) leaf of CSSNumericValue: three Create() factories (explicit StyleNumericType, plain number, StyleUnitValue), a WebID… |
| `layout/style/typedom/CSSUnitValue.h` | c | 87 | CSS Typed OM | Header declaring CSSUnitValue, a final CSSNumericValue storing a double mValue and nsCString mUnit plus an inherited StyleNumericType; declares the three Creat… |
| `layout/style/typedom/CSSUnparsedValue.cpp` | cpp | 184 | CSS Typed OM | Implements CSSUnparsedValue: converts Servo StyleUnparsedValue segments into DOM tokens (creating CSSVariableReferenceValue for var() references), implements t… |
| `layout/style/typedom/CSSUnparsedValue.h` | c | 87 | CSS Typed OM | Header for the CSS Typed OM CSSUnparsedValue, a CSSStyleValue subclass holding a token sequence of strings and CSSVariableReferenceValue |
| `layout/style/typedom/CSSUnsupportedValue.cpp` | cpp | 77 | CSS Typed OM | Implements CSSUnsupportedValue: wraps a StyleUnsupportedValue's StyleLockedDeclarationBlock into a DeclarationBlock, serializes the property value via GetPrope… |
| `layout/style/typedom/CSSUnsupportedValue.h` | c | 56 | CSS Typed OM | Header for CSSUnsupportedValue, the Typed OM representation of a reify-failure value per the css-typed-om spec |
| `layout/style/typedom/CSSVariableReferenceValue.cpp` | cpp | 108 | CSS Typed OM | Implements CSSVariableReferenceValue: Create() builds the fallback CSSUnparsedValue from the Servo struct when present, and the WebIDL Constructor/SetVariable … |
| `layout/style/typedom/CSSVariableReferenceValue.h` | c | 81 | CSS Typed OM | Header for the Typed OM CSSVariableReferenceValue, representing a var() reference with a custom property name and an optional CSSUnparsedValue fallback |
| `layout/style/typedom/moz.build` | build | 92 | CSS Typed OM | Build definition for the CSS Typed OM module: exports all CSS*Value and StylePropertyMap headers under mozilla/dom, lists the unified sources compiled into the… |
| `layout/style/typedom/StylePropertyMap.cpp` | cpp | 258 | CSS Typed OM | Implements the writable StylePropertyMap operations |
| `layout/style/typedom/StylePropertyMap.h` | c | 61 | CSS Typed OM | Header for StylePropertyMap, the mutable Typed OM property map over an element's inline style or a CSSStyleRule's declarations |
| `layout/style/typedom/StylePropertyMapReadOnly.cpp` | cpp | 420 | CSS Typed OM | Implements StylePropertyMapReadOnly: DeclarationTraits specializations per declaration source dispatch to Servo FFI (Servo_DeclarationBlock_GetPropertyTypedVal… |
| `layout/style/typedom/StylePropertyMapReadOnly.h` | c | 133 | CSS Typed OM | Header for the read-only Typed OM StylePropertyMapReadOnly base class, exposing get/getAll/has/size and list iteration |
| `layout/style/typedom/TypedOMUtils.cpp` | cpp | 47 | CSS Typed OM | Implements ToCSSKeywordish, converting a pre-checked CSSPerspectiveValue union into a CSSKeywordish (UTF8 string or CSSKeywordValue) |
| `layout/style/typedom/TypedOMUtils.h` | c | 41 | CSS Typed OM | Shared helpers for the Typed OM: defines CSSNUMERIC_BASE_TYPE_COUNT and the CSSNUMERIC_TYPE_FIELDS member-pointer table used for generic CSSNumericType manipul… |

## 4. dom/html — HTML Element Classes — 188 files

### dom/html/ (172)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `dom/html/ConstraintValidation.cpp` | cpp | 67 | HTML Element Model | Core of the HTML constraint validation API: GetValidationMessage dispatch over validity states, CheckValidity delegated to nsIConstraintValidation, and SetCust… |
| `dom/html/ConstraintValidation.h` | c | 46 | HTML Element Model | Declaration of the mozilla::dom::ConstraintValidation mixin (inherits nsIConstraintValidation) providing the CheckValidity/GetValidationMessage/SetCustomValidi… |
| `dom/html/CustomStateSet.cpp` | cpp | 102 | HTML Element Model | Implements the CustomStateSet setlike for custom element states: Add/Delete/Clear maintain nsAtom states on the target HTMLElement and notify the PresShell (Cu… |
| `dom/html/CustomStateSet.h` | c | 54 | HTML Element Model | Declaration of CustomStateSet, a cycle-collected nsWrapperCache setlike (Add/Delete/Clear) bound to an HTMLElement target for the custom states WebIDL interfac… |
| `dom/html/EditContext.cpp` | cpp | 1136 | HTML Element Model | Implementation of the EditContext API: manages the associated editable element and its anonymous text content, tracks the focused edit context, and coordinates… |
| `dom/html/EditContext.h` | c | 282 | HTML Element Model | Header for the EditContext DOM API (w3c/edit-context) |
| `dom/html/ElementInternals.cpp` | cpp | 692 | HTML Element Model | Implementation of ElementInternals: form-associated custom element support (setFormValue, setValidity, validation), nsIFormControl plumbing (form/fieldset wiri… |
| `dom/html/ElementInternals.h` | c | 284 | HTML Element Model | Header declaring ElementInternals (nsIFormControl + nsIConstraintValidation + nsWrapperCache) with WebIDL accessors (shadowRoot, form, validity, labels, states… |
| `dom/html/FetchPriority.cpp` | cpp | 104 | HTML Element Model | Implements conversion from RequestPriority to FetchPriority and DEBUG-only logging that maps a FetchPriority to nsISupportsPriority constants for diagnostic ou… |
| `dom/html/FetchPriority.h` | c | 45 | HTML Element Model | Defines the FetchPriority enum (High/Low/Auto) per the HTML fetch priority attributes spec, ToFetchPriority conversion, FETCH_PRIORITY_ADJUSTMENT_FOR pref macr… |
| `dom/html/HTMLAllCollection.cpp` | cpp | 159 | HTML Element Model | Implements document.all: lazily builds an all-elements ContentList, resolves named results by id or by name attribute on a legacy list of named elements (IsAll… |
| `dom/html/HTMLAllCollection.h` | c | 88 | HTML Element Model | Header for HTMLAllCollection (nsISupports + nsWrapperCache), the [LegacyUnenumerableNamedProperties] object behind document.all, exposing Length, indexed/named… |
| `dom/html/HTMLAnchorElement.cpp` | cpp | 199 | HTML Element Model | Implements the <a> element: WrapNode, BindToTree/UnbindFromTree managing DNS prefetch and link state, and click/post-handle event logic |
| `dom/html/HTMLAnchorElement.h` | c | 194 | HTML Element Model | Declares class HTMLAnchorElement final : public nsGenericHTMLElement, public Link, public SupportsDNSPrefetch for the <a> tag; includes nsGenericHTMLElement.h. |
| `dom/html/HTMLAreaElement.cpp` | cpp | 109 | HTML Element Model | Implementation of the <area> element: Link integration (href state reset on attribute change, cached URI), anchor-like event handling, target resolution fallin… |
| `dom/html/HTMLAreaElement.h` | c | 174 | HTML Element Model | Header for HTMLAreaElement (nsGenericHTMLElement + Link): reflected attributes alt/coords/shape/href/target/download/hreflang/type/ping/rel/referrerpolicy/nohr… |
| `dom/html/HTMLBodyElement.cpp` | cpp | 274 | HTML Element Model | Implements the <body> element: legacy presentational attribute parsing and MapAttributesIntoRule (bgcolor, background, text/link margins) feeding mapped-attrib… |
| `dom/html/HTMLBodyElement.h` | c | 108 | HTML Element Model | Declares class HTMLBodyElement final : public nsGenericHTMLElement for the <body> tag; includes nsGenericHTMLElement.h. |
| `dom/html/HTMLBRElement.cpp` | cpp | 92 | HTML Element Model | Implementation of the <br> element: parses the legacy clear attribute as an enum, maps it into the clear CSS property via MapAttributesIntoRule, and declares a… |
| `dom/html/HTMLBRElement.h` | c | 70 | HTML Element Model | Header for HTMLBRElement: defines BR element flag bits used by editor (NS_PADDING_FOR_EMPTY_EDITOR, NS_PADDING_FOR_EMPTY_LAST_LINE), the clear attribute access… |
| `dom/html/HTMLButtonElement.cpp` | cpp | 641 | HTML Element Model | Implementation of the <button> form control: type resolution including type=auto relative to owning <select>, activation behavior for submit/reset/button, form… |
| `dom/html/HTMLButtonElement.h` | c | 162 | HTML Element Model | Header for HTMLButtonElement (nsGenericHTMLFormControlElementWithState + ConstraintValidation): WebIDL attributes (disabled, form*, name, type, value), event/a… |
| `dom/html/HTMLCanvasElement.cpp` | cpp | 1599 | HTML Element Model | Implementation of the <canvas> element: context creation for 2d/webgl/webgpu/OffscreenCanvas transfer, width/height handling, toDataURL/toBlob image extraction… |
| `dom/html/HTMLCanvasElement.h` | c | 455 | HTML Element Model | Header for HTMLCanvasElement (nsGenericHTMLElement + CanvasRenderingContextHelper + SupportsWeakPtr) and the FrameCaptureListener interface used by captureStre… |
| `dom/html/HTMLDataElement.cpp` | cpp | 27 | HTML Element Model | Trivial implementation of the <data> element: element construction, clone support, and WebIDL binding wrap; value attribute accessors live inline in the header. |
| `dom/html/HTMLDataElement.h` | c | 35 | HTML Element Model | Header for HTMLDataElement (nsGenericHTMLElement): the machine-readable value attribute accessors and clone declaration for the <data> element. |
| `dom/html/HTMLDataListElement.cpp` | cpp | 36 | HTML Element Model | Implementation of the <datalist> element: cycle-collected mOptions ContentList and the MatchOptions predicate selecting non-disabled <option> children used for… |
| `dom/html/HTMLDataListElement.h` | c | 53 | HTML Element Model | Header for HTMLDataListElement (nsGenericHTMLElement): sets ELEMENT_IS_DATALIST_OR_HAS_DATALIST_ANCESTOR on construction and exposes Options() returning a cach… |
| `dom/html/HTMLDetailsElement.cpp` | cpp | 278 | HTML Element Model | Implementation of the <details> disclosure widget: builds a UA shadow tree with named slots for the main summary and DetailsContent pseudo, fires async toggle … |
| `dom/html/HTMLDetailsElement.h` | c | 88 | HTML Element Model | Header for HTMLDetailsElement (nsGenericHTMLElement): open/name WebIDL attributes, ToggleOpen, first-summary lookup, UA shadow tree setup, slot name customizat… |
| `dom/html/HTMLDialogElement.cpp` | cpp | 784 | HTML Element Model | Implementation of the <dialog> element: show/showModal/close/requestClose per HTML spec, top-layer (modal) management, CloseWatcher integration with DialogClos… |
| `dom/html/HTMLDialogElement.h` | c | 156 | HTML Element Model | Header for HTMLDialogElement: open/closedby/returnValue accessors, ClosedBy enum (Auto/None/Any/CloseRequest), CloseWatcher member, setup/cleanup steps, previo… |
| `dom/html/HTMLDivElement.cpp` | cpp | 52 | HTML Element Model | Implementation of the <div> element: align attribute parsing (ParseDivAlignValue) and style mapping (MapDivAlignAttributeInto) plus common attribute mapping. |
| `dom/html/HTMLDivElement.h` | c | 43 | HTML Element Model | Header for HTMLDivElement, a minimal nsGenericHTMLElement subclass for <div> with legacy align attribute accessors and mapped-attribute support. |
| `dom/html/HTMLDNSPrefetch.cpp` | cpp | 759 | HTML Element Model | DNS-prefetch machinery for <link rel=dns-prefetch> and speculative anchor prefetch: permission checks, immediate and deferred (DeferredDNSPrefetches ring-buffe… |
| `dom/html/HTMLDNSPrefetch.h` | c | 151 | HTML Element Model | Declares static HTMLDNSPrefetch service (IsAllowed/Prefetch/CancelPrefetch/DeferPrefetch, Priority and PrefetchSource enums) and the SupportsDNSPrefetch mixin … |
| `dom/html/HTMLElement.cpp` | cpp | 480 | HTML Element Model | Concrete HTMLElement implementation plus hand-expanded NS_IMPL_NS_NEW_HTML_ELEMENT creators NS_NewHTMLElement and NS_NewCustomElement, which placement-new the … |
| `dom/html/HTMLElement.h` | c | 92 | HTML Element Model | Declares class HTMLElement final : public nsGenericHTMLFormElement (transitively nsGenericHTMLElement); the concrete class produced by the NS_NewHTMLElement/NS… |
| `dom/html/HTMLElementFactory.cpp` | cpp | 75 | HTML Element Model | The HTML element-creation dispatch: builds sHTMLContentCreatorFunctions[] from nsHTMLTagList.inc mapping each tag enum to its NS_New*Element constructor, and N… |
| `dom/html/HTMLEmbedElement.cpp` | cpp | 244 | HTML Element Model | Implementation of the <embed> element on top of nsObjectLoadingContent: deferred StartObjectLoad on tree binding, src attribute change handling that triggers L… |
| `dom/html/HTMLEmbedElement.h` | c | 132 | HTML Element Model | Header for HTMLEmbedElement (nsGenericHTMLElement + nsObjectLoadingContent): WebIDL accessors for align/height/name/width/src/type, GetSVGDocument, AllowFullsc… |
| `dom/html/HTMLFieldSetElement.cpp` | cpp | 321 | HTML Element Model | Implementation of the <fieldset> element: elements ContentList of listed form controls, first-legend tracking on child insertion/removal with notifications, di… |
| `dom/html/HTMLFieldSetElement.h` | c | 146 | HTML Element Model | Header for HTMLFieldSetElement (nsGenericHTMLFormControlElement + ConstraintValidation): disabled/name/type WebIDL, Elements() collection, dependent-element re… |
| `dom/html/HTMLFontElement.cpp` | cpp | 108 | HTML Element Model | Implementation of the legacy <font> element: legacy font size parsing, color parsing, and MapAttributesIntoRule mapping face/size/color to font-family/font-siz… |
| `dom/html/HTMLFontElement.h` | c | 48 | HTML Element Model | Header for HTMLFontElement, a minimal nsGenericHTMLElement subclass exposing legacy color/face/size attribute accessors and mapped-attribute support. |
| `dom/html/HTMLFormControlsCollection.cpp` | cpp | 291 | HTML Element Model | Implementation of form.elements collection: ShouldBeInElements control-type filter, tree-order merge of mElements/mNotInElements into GetSortedControls, named-… |
| `dom/html/HTMLFormControlsCollection.h` | c | 115 | HTML Element Model | Header for HTMLFormControlsCollection (an HTMLCollection): weak form back-pointer, TreeOrderedArray mElements/mNotInElements, name lookup hashtable, and sorted… |
| `dom/html/HTMLFormElement.cpp` | cpp | 1985 | HTML Element Model | Implementation of the <form> element: submit/reset event handling (MaybeSubmit/RequestSubmit/DoSubmit), entry-list construction firing formdata, submission bui… |
| `dom/html/HTMLFormElement.h` | c | 583 | HTML Element Model | Header for HTMLFormElement: WebIDL form attributes (action/method/enctype/novalidate/target/rel...), elements collection and length, submit/reset APIs, element… |
| `dom/html/HTMLFormSubmission.cpp` | cpp | 889 | HTML Element Model | Form submission encoders: GetFromForm factory choosing urlencoded/multipart/text-plain/dialog submissions from method/enctype attributes; EncodingFormSubmissio… |
| `dom/html/HTMLFormSubmission.h` | c | 295 | HTML Element Model | Declares the HTMLFormSubmission abstract base (AddNameValuePair/AddNameBlobPair/AddNameDirectoryPair/GetEncodedSubmission) and subclasses EncodingFormSubmissio… |
| `dom/html/HTMLFormSubmissionConstants.h` | c | 34 | HTML Element Model | Constants for form method (NS_FORM_METHOD_GET/POST/DIALOG) and enctype (URLENCODED/MULTIPART/TEXTPLAIN) plus the kFormMethodTable/kFormEnctypeTable enum tables… |
| `dom/html/HTMLFrameElement.cpp` | cpp | 52 | HTML Element Model | Implementation of the legacy <frame> element on nsGenericHTMLFrameElement: parsing of bordercolor/frameborder/marginwidth/marginheight/scrolling attributes and… |
| `dom/html/HTMLFrameElement.h` | c | 96 | HTML Element Model | Header for HTMLFrameElement: WebIDL accessors for frameborder/longdesc/marginheight/marginwidth/name/noresize/scrolling/src plus contentDocument/contentWindow … |
| `dom/html/HTMLFrameSetElement.cpp` | cpp | 283 | HTML Element Model | Implementation of the legacy <frameset> element: rows/cols spec parsing into nsFramesetSpec arrays (percent/relative/fixed units, quirks-mode quirks), reflow v… |
| `dom/html/HTMLFrameSetElement.h` | c | 138 | HTML Element Model | Header for the <frameset> element |
| `dom/html/HTMLHeadingElement.cpp` | cpp | 179 | HTML Element Model | Implementation of <h1>-<h6>: computes the spec-defined heading level including the headingoffset/headingreset ancestor traversal, updates HEADING_LEVEL_BITS el… |
| `dom/html/HTMLHeadingElement.h` | c | 65 | HTML Element Model | Header for HTMLHeadingElement declaring ComputedLevel/GetComputedHeadingOffset, level updating on bind, align accessors, and attribute mapping hooks. |
| `dom/html/HTMLHRElement.cpp` | cpp | 189 | HTML Element Model | Implementation of the <hr> element: parses width/size/align/color/noshade presentational attributes and maps them into margin, height, border, and color declar… |
| `dom/html/HTMLHRElement.h` | c | 72 | HTML Element Model | Header for HTMLHRElement declaring WebIDL accessors for align, color, noshade, size, and width plus the style mapping hooks. |
| `dom/html/HTMLIFrameElement.cpp` | cpp | 413 | HTML Element Model | Implementation of <iframe>: lazy-load state management, sandbox flag handling, feature policy creation/refresh and cross-process storage, referrerpolicy propag… |
| `dom/html/HTMLIFrameElement.h` | c | 231 | HTML Element Model | Header for HTMLIFrameElement (derived from nsGenericHTMLFrameElement) declaring sandbox token list, feature policy members, lazy loading API, fullscreen flag, … |
| `dom/html/HTMLImageElement.cpp` | cpp | 1239 | HTML Element Model | Implementation of <img>: responsive image source selection with ResponsiveImageSelector over srcset/sizes and <picture> siblings, lazy loading, sizes=auto resi… |
| `dom/html/HTMLImageElement.h` | c | 413 | HTML Element Model | Header for HTMLImageElement (nsGenericHTMLElement + nsImageLoadingContent) declaring the responsive selection pipeline, picture/source notification hooks, form… |
| `dom/html/HTMLInputElement.cpp` | cpp | 7680 | HTML Element Model | Implementation of <input> (~7700 lines): value/checked state machinery for all input types, text editor state via TextControlState, file and color pickers, rad… |
| `dom/html/HTMLInputElement.h` | c | 1751 | HTML Element Model | Header for HTMLInputElement (TextControlElement + nsImageLoadingContent + ConstraintValidation) and the UploadLastDir per-domain last-upload-directory helper; … |
| `dom/html/HTMLLabelElement.cpp` | cpp | 261 | HTML Element Model | Implementation of <label>: resolves the labeled control via the for attribute or first labelable descendant, forwards focus and accesskeys to the control, and … |
| `dom/html/HTMLLabelElement.h` | c | 74 | HTML Element Model | Header for HTMLLabelElement declaring labeled-control resolution, Focus/PerformAccesskey overrides, form access for bindings, and the for-attribute WebIDL acce… |
| `dom/html/HTMLLegendElement.cpp` | cpp | 146 | HTML Element Model | Implementation of <legend>: locates the containing fieldset, parses the legacy align enum, resolves logical alignment against the fieldset writing mode, and fo… |
| `dom/html/HTMLLegendElement.h` | c | 91 | HTML Element Model | Header for HTMLLegendElement declaring the LegendAlignValue enum, LogicalAlign, fieldset lookup, form plumbing, and focus/accesskey overrides. |
| `dom/html/HTMLLIElement.cpp` | cpp | 98 | HTML Element Model | Implementation of <li>: parses the ordered/unordered list type enums and the value integer, maps type to list-style-type and value to counter-set: list-item in… |
| `dom/html/HTMLLIElement.h` | c | 52 | HTML Element Model | Header for HTMLLIElement declaring the kOLTypeTable/kULTypeTable enum tables and the type/value WebIDL accessors. |
| `dom/html/HTMLLinkElement.cpp` | cpp | 790 | HTML Element Model | Implementation of <link>: rel link-type processing driving stylesheet loading via LinkStyle, DNS prefetch/preconnect/prefetch/preload/modulepreload handling, D… |
| `dom/html/HTMLLinkElement.h` | c | 221 | HTML Element Model | Header for HTMLLinkElement (nsGenericHTMLElement + LinkStyle + SupportsDNSPrefetch) declaring rel/relList/sizes/blocking token lists, preload bookkeeping, cach… |
| `dom/html/HTMLMapElement.cpp` | cpp | 43 | HTML Element Model | Implementation of <map>: lazily creates an uncached ContentList of <area> children for the areas HTMLCollection and wraps the node for the binding. |
| `dom/html/HTMLMapElement.h` | c | 42 | HTML Element Model | Header for HTMLMapElement declaring the name accessor and the areas HTMLCollection backed by ContentList. |
| `dom/html/HTMLMarqueeElement.cpp` | cpp | 158 | HTML Element Model | Implementation of the non-standard <marquee>: attaches a UA widget shadow root on bind, parses behavior/direction/scroll metrics attributes, maps margin/size/b… |
| `dom/html/HTMLMarqueeElement.h` | c | 121 | HTML Element Model | Header for HTMLMarqueeElement declaring the marquee WebIDL accessors (behavior, direction, loop, scrollamount, scrolldelay, truespeed, etc.), default constants… |
| `dom/html/HTMLMenuElement.cpp` | cpp | 26 | HTML Element Model | Implementation of <menu>: constructor, clone support, and JS wrapping only. |
| `dom/html/HTMLMenuElement.h` | c | 38 | HTML Element Model | Header for HTMLMenuElement declaring the compact boolean WebIDL accessor and clone support. |
| `dom/html/HTMLMetaElement.cpp` | cpp | 177 | HTML Element Model | Implementation of <meta>: handles attribute changes and tree binding to process viewport/referrer/color-scheme metadata, apply meta CSP, and dispatch chrome-on… |
| `dom/html/HTMLMetaElement.h` | c | 70 | HTML Element Model | Header declaring mozilla::dom::HTMLMetaElement with WebIDL attribute accessors (name, httpEquiv, content, scheme, media) and private meta-processing helpers. |
| `dom/html/HTMLMeterElement.cpp` | cpp | 258 | HTML Element Model | Implementation of <meter>: parses value/min/max/low/high/optimum as doubles, clamps them per spec, and maintains the METER_OPTIMUM_STATES element state for sty… |
| `dom/html/HTMLMeterElement.h` | c | 93 | HTML Element Model | Header declaring mozilla::dom::HTMLMeterElement with WebIDL double getters/setters for value, min, max, low, high, optimum and private optimum-state computatio… |
| `dom/html/HTMLModElement.cpp` | cpp | 27 | HTML Element Model | Implementation of <ins>/<del> (HTMLModElement): element construction, cloning, and JS wrapping only; behavior comes from nsGenericHTMLElement. |
| `dom/html/HTMLModElement.h` | c | 39 | HTML Element Model | Header declaring mozilla::dom::HTMLModElement with cite and dateTime WebIDL accessors. |
| `dom/html/HTMLObjectElement.cpp` | cpp | 279 | HTML Element Model | Implementation of <object>: combines a form control element with nsObjectLoadingContent to load plugin/document content, triggers loads on bind/attribute chang… |
| `dom/html/HTMLObjectElement.h` | c | 201 | HTML Element Model | Header declaring mozilla::dom::HTMLObjectElement (nsGenericHTMLFormControlElement + nsObjectLoadingContent + ConstraintValidation) with the full legacy WebIDL … |
| `dom/html/HTMLOptGroupElement.cpp` | cpp | 89 | HTML Element Model | Implementation of <optgroup>: manages ENABLED/DISABLED element state from the disabled attribute and propagates disabled-state changes to descendant <option> e… |
| `dom/html/HTMLOptGroupElement.h` | c | 58 | HTML Element Model | Header declaring mozilla::dom::HTMLOptGroupElement with disabled/label WebIDL accessors and GetSelect to find the owning select. |
| `dom/html/HTMLOptionElement.cpp` | cpp | 398 | HTML Element Model | Implementation of <option>: maintains CHECKED (selected) and ENABLED/DISABLED states, caches the nearest ancestor select, implements the spec's selectedness an… |
| `dom/html/HTMLOptionElement.h` | c | 138 | HTML Element Model | Header declaring mozilla::dom::HTMLOptionElement with selected/disabled/label/value/text/index WebIDL surface, mCachedNearestAncestorSelect, and disabled-state… |
| `dom/html/HTMLOptionsCollection.cpp` | cpp | 149 | HTML Element Model | Implementation of select.options (HTMLOptionsCollection): a live ContentList of valid options in a select, with indexed setter, add/remove, selectedIndex passt… |
| `dom/html/HTMLOptionsCollection.h` | c | 68 | HTML Element Model | Header declaring mozilla::dom::HTMLOptionsCollection (a ContentList of <option> elements) with ItemAsOption, GetOptionIndex, Add/Remove, SelectedIndex and Inde… |
| `dom/html/HTMLOutputElement.cpp` | cpp | 142 | HTML Element Model | Implementation of <output>: observes DOM mutations to track defaultValue, switches between default/value modes for the value IDL attribute, implements reset, a… |
| `dom/html/HTMLOutputElement.h` | c | 96 | HTML Element Model | Header declaring mozilla::dom::HTMLOutputElement (form control + nsStubMutationObserver + ConstraintValidation) with value/defaultValue/htmlFor/name/type WebID… |
| `dom/html/HTMLParagraphElement.cpp` | cpp | 58 | HTML Element Model | Implementation of <p>: parses the legacy align attribute and maps it (plus common attributes) into style declarations. |
| `dom/html/HTMLParagraphElement.h` | c | 48 | HTML Element Model | Header declaring mozilla::dom::HTMLParagraphElement with an align WebIDL accessor and attribute-mapping hooks. |
| `dom/html/HTMLPictureElement.cpp` | cpp | 82 | HTML Element Model | Implementation of <picture>: on child insertion/removal notifies sibling <img> elements about <source> changes so they re-evaluate their selected image source. |
| `dom/html/HTMLPictureElement.h` | c | 43 | HTML Element Model | Header declaring mozilla::dom::HTMLPictureElement with InsertChildBefore/RemoveChildNode overrides used to notify images of source changes. |
| `dom/html/HTMLPreElement.cpp` | cpp | 80 | HTML Element Model | Implementation of <pre> (also shared by listing/plaintext): parses the width attribute and maps the wrap attribute to white-space-collapse/text-wrap-mode style… |
| `dom/html/HTMLPreElement.h` | c | 46 | HTML Element Model | Header declaring mozilla::dom::HTMLPreElement with a width WebIDL accessor and attribute-mapping hooks. |
| `dom/html/HTMLProgressElement.cpp` | cpp | 86 | HTML Element Model | Implementation of <progress>: parses value/max doubles, toggles the INDETERMINATE state when value is absent or invalid, and computes clamped value/max/positio… |
| `dom/html/HTMLProgressElement.h` | c | 53 | HTML Element Model | Header declaring mozilla::dom::HTMLProgressElement with value/max/position WebIDL surface (max reflects only positive values). |
| `dom/html/HTMLScriptElement.cpp` | cpp | 377 | HTML Element Model | Implementation of <script>: parses crossorigin/integrity/fetchpriority/blocking attributes, freezes execution attributes (kind, URI, async/defer), processes sc… |
| `dom/html/HTMLScriptElement.h` | c | 201 | HTML Element Model | Header for the <script> element implementation |
| `dom/html/HTMLSelectedContentElement.cpp` | cpp | 108 | HTML Element Model | Implementation of the customizable <selectedcontent> element |
| `dom/html/HTMLSelectedContentElement.h` | c | 45 | HTML Element Model | Header declaring HTMLSelectedContentElement, a final nsGenericHTMLElement subclass for <selectedcontent> that tracks a mDisabled flag, exposes ClearContent() a… |
| `dom/html/HTMLSelectElement.cpp` | cpp | 2909 | HTML Element Model | Large (~2900 lines) implementation of the <select> element: shadow-tree setup for customizable select, option-list maintenance (HTMLOptionsCollection, Add/Remo… |
| `dom/html/HTMLSelectElement.h` | c | 613 | HTML Element Model | Header declaring HTMLSelectElement: nsGenericHTMLFormControlElementWithState + nsStubMutationObserver + ConstraintValidation |
| `dom/html/HTMLSharedElement.cpp` | cpp | 231 | HTML Element Model | Shared implementation for the structurally simple tags html, head and param: href/AfterSetAttr handling, BindToTree/UnbindFromTree and WrapNode. |
| `dom/html/HTMLSharedElement.h` | c | 125 | HTML Element Model | Declares class HTMLSharedElement final : public nsGenericHTMLElement, one class shared by the html, head and param tags; includes nsGenericHTMLElement.h. |
| `dom/html/HTMLSharedListElement.cpp` | cpp | 146 | HTML Element Model | One C++ class shared by <ul>, <ol> and <dl> |
| `dom/html/HTMLSharedListElement.h` | c | 59 | HTML Element Model | Header declaring HTMLSharedListElement, a final nsGenericHTMLElement subclass implementing the union of ol/ul/dl WebIDL members (reversed, start, type, compact… |
| `dom/html/HTMLSlotElement.cpp` | cpp | 448 | HTML Element Model | Implementation of the <slot> element for shadow DOM: registering with the containing ShadowRoot on bind/unbind and name changes, manual slot assignment (assign… |
| `dom/html/HTMLSlotElement.h` | c | 94 | HTML Element Model | Header declaring HTMLSlotElement: final nsGenericHTMLElement managing mAssignedNodes (FastFrontRemovableArray) and mManuallyAssignedNodes, with WebIDL name/ass… |
| `dom/html/HTMLSourceElement.cpp` | cpp | 228 | HTML Element Model | Implementation of the <source> element: media-attribute matching via MediaList, notification of sibling HTMLImageElement responsive selectors on srcset/sizes/m… |
| `dom/html/HTMLSourceElement.h` | c | 154 | HTML Element Model | Header declaring HTMLSourceElement: final nsGenericHTMLElement with WebIDL src/srcset/sizes/media/type/width/height, MatchesCurrentMedia and WouldMatchMediaFor… |
| `dom/html/HTMLSpanElement.cpp` | cpp | 22 | HTML Element Model | Trivial implementation of the <span> element: NS_IMPL_NS_NEW_HTML_ELEMENT, element cloning and WrapNode binding to HTMLSpanElement_Binding. |
| `dom/html/HTMLSpanElement.h` | c | 28 | HTML Element Model | Header declaring HTMLSpanElement, a minimal final nsGenericHTMLElement subclass for <span> with only Clone and WrapNode overrides. |
| `dom/html/HTMLStyleElement.cpp` | cpp | 245 | HTML Element Model | Implementation of the <style> element: LinkStyle sheet lifecycle (UpdateStyleSheetInternal via GetStyleSheetInfo), mutation-observer-driven stylesheet updates … |
| `dom/html/HTMLStyleElement.h` | c | 107 | HTML Element Model | Header declaring HTMLStyleElement: nsGenericHTMLElement + LinkStyle + nsStubMutationObserver, with SetInnerHTMLTrusted/SetTextContentInternal, SetDevtoolsAsTri… |
| `dom/html/HTMLSummaryElement.cpp` | cpp | 117 | HTML Element Model | Implementation of the <summary> element: post-handle-event activation toggling the parent details' open state on left clicks (ignoring interactive content targ… |
| `dom/html/HTMLSummaryElement.h` | c | 52 | HTML Element Model | Header declaring HTMLSummaryElement, final nsGenericHTMLElement for <summary>, with PostHandleEvent, IsHTMLFocusable/TabIndexDefault, IsMainSummary and GetDeta… |
| `dom/html/HTMLTableCaptionElement.cpp` | cpp | 71 | HTML Element Model | Implementation of the <caption> element: parses the align attribute against a top/bottom enum table and maps it to the caption-side CSS property via MappedDecl… |
| `dom/html/HTMLTableCaptionElement.h` | c | 44 | HTML Element Model | Header declaring HTMLTableCaptionElement, a final nsGenericHTMLElement for <caption> with weird parser insertion mode, align WebIDL, and attribute parsing/mapp… |
| `dom/html/HTMLTableCellElement.cpp` | cpp | 209 | HTML Element Model | Implementation of <td>/<th> (HTMLTableCellElement): CellIndex lookup within the row's cells collection, table/row resolution helpers, clamped colspan/rowspan a… |
| `dom/html/HTMLTableCellElement.h` | c | 122 | HTML Element Model | Header declaring HTMLTableCellElement, final nsGenericHTMLElement for td/th with weird parser insertion mode; exposes colspan/rowspan/headers/abbr/scope/align/… |
| `dom/html/HTMLTableColElement.cpp` | cpp | 101 | HTML Element Model | Implementation of <col>/<colgroup>: clamps span to MAX_COLSPAN (1000), parses width/align/valign presentation attributes, and maps span, width and table align … |
| `dom/html/HTMLTableColElement.h` | c | 67 | HTML Element Model | Header declaring HTMLTableColElement, a final nsGenericHTMLElement for col/colgroup with weird parser insertion mode; exposes span/align/char/charoff/valign/wi… |
| `dom/html/HTMLTableElement.cpp` | cpp | 971 | HTML Element Model | Implementation of the <table> element: nested TableRowsCollection (a live HTMLCollection of tr elements across sections), row/section/caption creation and dele… |
| `dom/html/HTMLTableElement.h` | c | 201 | HTML Element Model | Header for HTMLTableElement (the <table> element): caption/tHead/tFoot accessors, TBodies/Rows collections, InsertRow/DeleteRow, deprecated presentational attr… |
| `dom/html/HTMLTableRowElement.cpp` | cpp | 248 | HTML Element Model | Implementation of the <tr> element: RowIndex/SectionRowIndex computation by walking the parent table/section, Cells collection, InsertCell/DeleteCell, and pres… |
| `dom/html/HTMLTableRowElement.h` | c | 87 | HTML Element Model | Header for HTMLTableRowElement (the <tr> element): row indexing, cells collection, cell insertion/removal and deprecated align/ch/valign attributes. |
| `dom/html/HTMLTableSectionElement.cpp` | cpp | 176 | HTML Element Model | Implementation of <thead>/<tbody>/<tfoot> sections: Rows collection of tr children, InsertRow/DeleteRow per HTML spec, and mapping of height/align/valign/backg… |
| `dom/html/HTMLTableSectionElement.h` | c | 72 | HTML Element Model | Header for HTMLTableSectionElement: rows collection, row insertion/removal and deprecated align/char/charoff/valign attributes. |
| `dom/html/HTMLTemplateElement.cpp` | cpp | 141 | HTML Element Model | Implementation of the <template> element: creates its inert DocumentFragment content from the template contents owner document, parses shadowrootmode/shadowroo… |
| `dom/html/HTMLTemplateElement.h` | c | 113 | HTML Element Model | Header for HTMLTemplateElement: content fragment access, declarative shadow root attributes (shadowrootmode, delegatesfocus, clonable, serializable, slotassign… |
| `dom/html/HTMLTextAreaElement.cpp` | cpp | 1116 | HTML Element Model | Implementation of the <textarea> multi-line text control: value handling via TextControlState and editor, selection APIs, event handling, state save/restore, c… |
| `dom/html/HTMLTextAreaElement.h` | c | 377 | HTML Element Model | Header for HTMLTextAreaElement, a TextControlElement + ConstraintValidation + nsStubMutationObserver: value/selection APIs, maxlength/minlength, rows/cols/wrap… |
| `dom/html/HTMLTimeElement.cpp` | cpp | 28 | HTML Element Model | Implementation of the <time> element: constructor, clone support and WebIDL binding wrapper only; the datetime attribute lives in the header. |
| `dom/html/HTMLTimeElement.h` | c | 36 | HTML Element Model | Header for HTMLTimeElement (the <time> element): datetime attribute getter/setter and clone support. |
| `dom/html/HTMLTitleElement.cpp` | cpp | 94 | HTML Element Model | Implementation of the <title> element: text get/set via node text content, and as a mutation observer notifies the document (NotifyPossibleTitleChange) wheneve… |
| `dom/html/HTMLTitleElement.h` | c | 56 | HTML Element Model | Header for HTMLTitleElement, an nsGenericHTMLElement + nsStubMutationObserver exposing text and title-change notifications to the document. |
| `dom/html/HTMLUnknownElement.cpp` | cpp | 25 | HTML Element Model | Implementation of HTMLUnknownElement used for unrecognized HTML tags: ISUPPORTs, binding wrapper and clone support only. |
| `dom/html/HTMLUnknownElement.h` | c | 34 | HTML Element Model | Header for HTMLUnknownElement, the fallback class for unknown HTML elements with its own IID. |
| `dom/html/ImageDocument.cpp` | cpp | 795 | HTML Element Model | Standalone image viewer document (MediaDocument subclass): builds a synthetic doc around an <img>, observes image notifications, implements shrink-to-fit/resto… |
| `dom/html/ImageDocument.h` | c | 159 | HTML Element Model | Header for ImageDocument, a MediaDocument + imgINotificationObserver + nsIDOMEventListener implementing the standalone image document with shrink-to-fit state … |
| `dom/html/MediaDocument.cpp` | cpp | 412 | HTML Element Model | Implements MediaDocument, the nsHTMLDocument base for synthetic standalone media views (image/video/plain text): builds the synthetic HTML shell (html/head/met… |
| `dom/html/MediaDocument.h` | c | 119 | HTML Element Model | Declares MediaDocument (nsHTMLDocument subclass with MediaDocumentKind, synthetic-document setup, string-bundle based title/charset updating) and MediaDocument… |
| `dom/html/moz.build` | build | 227 | HTML Element Model | Build script for dom/html: declares the input subdirectory, mochitest/chrome/browser-chrome manifests, exports of generic HTML headers and TextControlState, th… |
| `dom/html/nsDOMStringMap.cpp` | cpp | 237 | HTML Element Model | Implements the element.dataset DOMStringMap: named getter/setter/deleter backed by data-* attributes, camelCase <-> data-attribute name conversion (DataPropToA… |
| `dom/html/nsDOMStringMap.h` | c | 63 | HTML Element Model | Declares nsDOMStringMap, a nsStubMutationObserver/nsWrapperCache implementing the DOMStringMap WebIDL named-property interface over an Element's data-* attribu… |
| `dom/html/nsGenericHTMLElement.cpp` | cpp | 4056 | HTML Element Model | Common behavior for all HTML elements: BindToTree/UnbindFromTree, ParseAttribute/AfterSetAttr, anchor event handling, popover and editability, plus style-adjac… |
| `dom/html/nsGenericHTMLElement.h` | c | 1513 | HTML Element Model | Declares class nsGenericHTMLElement : public nsGenericHTMLElementBase (alias for nsStyledElement, i.e |
| `dom/html/nsGenericHTMLFrameElement.cpp` | cpp | 329 | HTML Element Model | Implements the shared frame-element behavior for iframe/frame/browser hosts: lazy nsFrameLoader creation, LoadSrc honoring lazy-loading and src-once semantics,… |
| `dom/html/nsGenericHTMLFrameElement.h` | c | 144 | HTML Element Model | Declares nsGenericHTMLFrameElement, the nsGenericHTMLElement + nsFrameLoaderOwner helper base for frame elements (iframe, XUL frame), with focusability, frame-… |
| `dom/html/nsHTMLDocument.cpp` | cpp | 890 | HTML Element Model | Core HTML document implementation: NS_NewHTMLDocument factory, StartDocumentLoad with HTML5/XHTML/plain-text parser selection (nsHtml5Parser, nsParser, Prototy… |
| `dom/html/nsHTMLDocument.h` | c | 186 | HTML Element Model | Declares nsHTMLDocument, the Document subclass for text/html (and XHTML/plain-text) documents: document load/reset lifecycle, charset source negotiation helper… |
| `dom/html/nsIConstraintValidation.cpp` | cpp | 134 | HTML Element Model | Implements the constraint-validation API plumbing: lazily created ValidityState, CheckValidity dispatching the non-bubbling 'invalid' event, ReportValidity add… |
| `dom/html/nsIConstraintValidation.h` | c | 110 | HTML Element Model | Declares nsIConstraintValidation, the nsISupports interface implemented by all form elements supporting the constraint-validation API: ValidityStateType bit fl… |
| `dom/html/nsIFormControl.h` | c | 302 | HTML Element Model | Declares FormControlType (fieldset/output/select/textarea/object/form-associated custom element plus masked button-element and input-element type ranges with s… |
| `dom/html/RadioNodeList.cpp` | cpp | 57 | HTML Element Model | Implements RadioNodeList's value access: the GetAsRadio helper filters list items to radio HTMLInputElements, GetValue returns the value of the checked radio, … |
| `dom/html/RadioNodeList.h` | c | 34 | HTML Element Model | Declares RadioNodeList, a SimpleContentList rooted at an HTMLFormElement exposing the RadioNodeList WebIDL binding with GetValue/SetValue semantics for radio b… |
| `dom/html/TextControlElement.cpp` | cpp | 444 | HTML Element Model | Implements TextControlElement behavior: UA shadow-tree construction (editing root, placeholder, preview, auxiliary buttons), preview/placeholder updates, focus… |
| `dom/html/TextControlElement.h` | c | 265 | HTML Element Model | Declares mozilla::TextControlElement, the abstract base class shared by text-bearing form controls (<input> text-like types and <textarea>) that exposes editor… |
| `dom/html/TextControlState.cpp` | cpp | 2773 | HTML Element Model | Implementation of TextControlState (~2800 lines): editor initialization and destruction, value get/set with or without an editor, selection range/direction API… |
| `dom/html/TextControlState.h` | c | 544 | HTML Element Model | Declares TextControlState, the central state manager for plaintext controls (value storage, TextEditor lifecycle, selection controller, cached selection proper… |
| `dom/html/TextInputListener.h` | c | 106 | HTML Element Model | Declares TextInputListener, an nsIDOMEventListener/nsSupportsWeakReference bridging TextEditor edit actions and selection changes back to the TextControlElemen… |
| `dom/html/ValidityState.cpp` | cpp | 29 | HTML Element Model | Cycle-collected nsISupports implementation and JS wrapper binding (ValidityState_Binding::Wrap) for ValidityState. |
| `dom/html/ValidityState.h` | c | 91 | HTML Element Model | Declares mozilla::dom::ValidityState, the IDL ValidityState object that reflects the constraint-validation flags (valueMissing, typeMismatch, rangeOverflow, et… |
| `dom/html/VideoDocument.cpp` | cpp | 162 | HTML Element Model | Implements VideoDocument, a MediaDocument subclass that synthesizes a document containing a single <video> element fed from the loaded channel, sets autoplay/c… |

### dom/html/input/ (16)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `dom/html/input/ButtonInputTypes.h` | c | 71 | HTML Element Model | InputType subclasses for button-like <input> types: ButtonInputTypeBase plus type=button, type=image, type=reset and type=submit, each with placement-new Creat… |
| `dom/html/input/CheckableInputTypes.cpp` | cpp | 34 | HTML Element Model | Validation logic for checkable inputs: checkbox IsValueMissing (required but unchecked) and localized value-missing messages for checkbox and radio types. |
| `dom/html/input/CheckableInputTypes.h` | c | 53 | HTML Element Model | InputType subclasses for checkable inputs: CheckableInputTypeBase with type=checkbox (IsValueMissing override) and type=radio, both providing localized value-m… |
| `dom/html/input/ColorInputType.h` | c | 26 | HTML Element Model | ColorInputType, the InputType for <input type=color>; adds no behavior beyond the base InputType. |
| `dom/html/input/DateTimeInputTypes.cpp` | cpp | 605 | HTML Element Model | Date/time input type implementations (date, time, week, month, datetime-local): shared range/step/bad-input validation in DateTimeInputTypeBase, ISO string-to-… |
| `dom/html/input/DateTimeInputTypes.h` | c | 169 | HTML Element Model | Header declaring DateTimeInputTypeBase (validation, locale formatting, year 1..275760 limits) and its concrete Date/Time/Week/Month/DateTimeLocal input types. |
| `dom/html/input/FileInputType.cpp` | cpp | 24 | HTML Element Model | Validation for <input type=file>: IsValueMissing checks required inputs for an empty file list and provides the localized FormValidationFileMissing message. |
| `dom/html/input/FileInputType.h` | c | 30 | HTML Element Model | Header for input type=file support |
| `dom/html/input/HiddenInputType.h` | c | 26 | HTML Element Model | Header for input type=hidden support |
| `dom/html/input/InputType.cpp` | cpp | 349 | HTML Element Model | Implementation of the InputType strategy hierarchy: the Create() factory dispatching every FormControlType to a concrete input-type class placed in preallocate… |
| `dom/html/input/InputType.h` | c | 243 | HTML Element Model | Declares InputType, the common abstract superclass for all HTMLInputElement value types, plus NS_floorModulo for Decimal step arithmetic, the StringToNumberRes… |
| `dom/html/input/moz.build` | build | 34 | HTML Element Model | Build script for dom/html/input: exports the input-type headers under mozilla/dom, compiles the Checkable/DateTime/File/Input/Numeric/SingleLineText input type… |
| `dom/html/input/NumericInputTypes.cpp` | cpp | 180 | HTML Element Model | Implements numeric input types: range overflow/underflow and step-mismatch checks against HTMLInputElement min/max/step, localized number formatting/parsing vi… |
| `dom/html/input/NumericInputTypes.h` | c | 73 | HTML Element Model | Declares NumericInputTypeBase (shared range/step validation and Decimal conversions) and its subclasses NumberInputType (type=number, with localized parsing an… |
| `dom/html/input/SingleLineTextInputTypes.cpp` | cpp | 280 | HTML Element Model | Implements single-line text input types: maxlength/minlength and required validation, pattern matching via nsContentUtils::IsPatternMatching, URL parseability … |
| `dom/html/input/SingleLineTextInputTypes.h` | c | 156 | HTML Element Model | Declares SingleLineTextInputTypeBase (maxlength/minlength/required/pattern validation applying to all single-line types) and the concrete text, search, tel, ur… |

## 5. parser/html — HTML5 Parser (nsHtml5) — 102 files

### parser/html/ (93)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `parser/html/jArray.h` | c | 139 | HTML Parser & Element Creation | C++ header providing Java-like array abstractions (jArray, staticJArray, autoJArray, jInlineArray) used throughout the generated HTML5 parser code for buffers … |
| `parser/html/moz.build` | build | 127 | HTML Parser & Element Creation | Build file for the HTML5 parser: exports jArray.h and the nsHtml5* headers, compiles the translated tokenizer/tree builder sources, and selects SIMD/ALU tokeni… |
| `parser/html/nsAHtml5TreeBuilderState.h` | c | 52 | HTML Parser & Element Creation | C++ interface exposing the tree builder's internal state (stacks, pointers, mode flags) for speculation comparison, mirroring the Java StateSnapshot/TreeBuilde… |
| `parser/html/nsAHtml5TreeOpSink.h` | c | 29 | HTML Parser & Element Creation | C++ interface connecting tree-op producers to consumers: the main-thread executor, the off-main-thread tree op stage, and speculative flushes all implement Mov… |
| `parser/html/nsHtml5ArrayCopy.h` | c | 60 | HTML Parser & Element Creation | C++ helper providing arraycopy overloads (char16_t, int32_t, nsHtml5StackNode*) that translate Java System.arraycopy calls used by the tokenizer and tree build… |
| `parser/html/nsHtml5AtomTable.cpp` | cpp | 41 | HTML Parser & Element Creation | Implements nsHtml5AtomTable::GetAtom: a 64-entry recently-used atom cache indexed by high bits of a scrambled hash, falling back to NS_Atomize for new strings;… |
| `parser/html/nsHtml5AtomTable.h` | c | 65 | HTML Parser & Element Creation | Declares nsHtml5AtomTable, a per-parser atom cache for nsHtml5Parser/nsHtml5StreamParser with single-thread-at-a-time access semantics and bulk release on Clea… |
| `parser/html/nsHtml5AttributeEntry.h` | c | 162 | HTML Parser & Element Creation | Value type for one parsed attribute: a tagged pointer that is either an interned nsHtml5AttributeName* or a custom nsAtom* (low bit tag), plus an nsHtml5String… |
| `parser/html/nsHtml5AttributeName.cpp` | cpp | 3319 | HTML Parser & Element Creation | Generated (from AttributeName.java) static tables for all HTML/MathML/SVG attribute names: the ATTRIBUTE_NAMES array with per-namespace URI/prefix/local atoms,… |
| `parser/html/nsHtml5AttributeName.h` | c | 756 | HTML Parser & Element Creation | Generated header for nsHtml5AttributeName: per-namespace (HTML/MathML/SVG) uri/local/prefix triples for every known attribute, static ATTR_* singletons, level-… |
| `parser/html/nsHtml5AutoPauseUpdate.h` | c | 27 | HTML Parser & Element Creation | MOZ_RAII helper that pauses document updates around a code region: calls nsHtml5DocumentBuilder::EndDocUpdate on construction and BeginDocUpdate on destruction… |
| `parser/html/nsHtml5ByteReadable.h` | c | 28 | HTML Parser & Element Creation | Weak-reference wrapper around a raw byte array (current/end pointers) with a read() that returns the next byte or -1 at EOF; used by meta-charset scanning code. |
| `parser/html/nsHtml5ContentCreatorFunction.h` | c | 16 | HTML Parser & Element Creation | Union of mozilla::dom::HTMLContentCreatorFunction and SVGContentCreatorFunction so tree builders/highlighter can pass the right element factory function when c… |
| `parser/html/nsHtml5DependentUTF16Buffer.cpp` | cpp | 30 | HTML Parser & Element Creation | Implements nsHtml5DependentUTF16Buffer: wraps an existing nsAString without owning it and provides FalliblyCopyAsOwningBuffer, which memcpy's the unconsumed ra… |
| `parser/html/nsHtml5DependentUTF16Buffer.h` | c | 30 | HTML Parser & Element Creation | MOZ_STACK_CLASS subclass of nsHtml5UTF16Buffer that wraps (does not own) an nsAString, plus declaration of FalliblyCopyAsOwningBuffer for handing the remaining… |
| `parser/html/nsHtml5DocumentBuilder.cpp` | cpp | 102 | HTML Parser & Element Creation | Implementation of the shared nsContentSink subclass for HTML5 parsing: cycle collection, MarkAsBroken, UpdateStyleSheet (LinkStyle updates and parser-blocking … |
| `parser/html/nsHtml5DocumentBuilder.h` | c | 127 | HTML Parser & Element Creation | Base class for nsHtml5TreeOpExecutor/nsHtml5BuilderSink-style parsers: nsContentSink subclass with element retention (HoldElement/mOwnedElements), broken-state… |
| `parser/html/nsHtml5DocumentMode.h` | c | 10 | HTML Parser & Element Creation | Defines enum nsHtml5DocumentMode { STANDARDS_MODE, ALMOST_STANDARDS_MODE, QUIRKS_MODE } produced by the tree builder for doctype handling. |
| `parser/html/nsHtml5ElementName.cpp` | cpp | 1482 | HTML Parser & Element Creation | Generated file (from ElementName.java) holding the static element-name tables for the HTML5 parser |
| `parser/html/nsHtml5ElementName.h` | c | 459 | HTML Parser & Element Creation | Header for the generated nsHtml5ElementName class |
| `parser/html/nsHtml5Highlighter.cpp` | cpp | 791 | HTML Parser & Element Creation | View-source syntax highlighter: mirrors tokenizer state transitions to emit an HTML document (html/head/meta/title/link/body/pre with line spans and colored sp… |
| `parser/html/nsHtml5Highlighter.h` | c | 409 | HTML Parser & Element Creation | Declares nsHtml5Highlighter, a state machine that generates HTML for view-source from tokenizer transitions; owns the op queue, op sink, element-handle pool (N… |
| `parser/html/nsHtml5HtmlAttributes.cpp` | cpp | 140 | HTML Parser & Element Creation | Implements the attribute list used by tokenizer/tree builder: getValue/contains via tagged-name bit matching against nsHtml5AttributeEntry storage, addAttribut… |
| `parser/html/nsHtml5HtmlAttributes.h` | c | 113 | HTML Parser & Element Creation | Generated header for the tokenizer/tree-builder attribute holder: AutoTArray<nsHtml5AttributeEntry,5> storage with raw-pointer iteration, duplicate-attribute e… |
| `parser/html/nsHtml5Macros.h` | c | 30 | HTML Parser & Element Creation | Control-flow macros NS_HTML5_CONTINUE(target) and NS_HTML5_BREAK(target) that expand to goto statements, translating Java loop control in generated parser code… |
| `parser/html/nsHtml5Module.cpp` | cpp | 89 | HTML Parser & Element Creation | Module-wide static lifecycle: InitializeStatics calls initializeStatics on AttributeName/ElementName/HtmlAttributes/NamedCharacters/Portability/StackNode/Token… |
| `parser/html/nsHtml5Module.h` | c | 28 | HTML Parser & Element Creation | Declares nsHtml5Module: static init/release of generated parser tables, NewHtml5Parser factory, and GetStreamParserEventTarget for the off-main-thread parsing … |
| `parser/html/nsHtml5NamedCharacters.cpp` | cpp | 101 | HTML Parser & Element Creation | Generated tables for HTML named character references: VALUES[][2] replacement pairs and packed ALL_NAMES string data from nsHtml5NamedCharactersInclude.inc, th… |
| `parser/html/nsHtml5NamedCharacters.h` | c | 50 | HTML Parser & Element Creation | Declares nsHtml5CharacterName (offset/length into the packed name string data with length()/charAt()) and nsHtml5NamedCharacters holding NAMES[], VALUES[][2] r… |
| `parser/html/nsHtml5NamedCharactersAccel.cpp` | cpp | 371 | HTML Parser & Element Creation | Generated hilo-acceleration tables for named character reference lookup: per-first-character HILO_ACCEL_NN arrays of packed low/high indices, aggregated into n… |
| `parser/html/nsHtml5NamedCharactersAccel.h` | c | 22 | HTML Parser & Element Creation | Declares nsHtml5NamedCharactersAccel with the static HILO_ACCEL[] table of per-character accelerator arrays for fast named character reference rejection. |
| `parser/html/nsHtml5NamedCharactersInclude.inc` | inc | 5467 | HTML Parser & Element Creation | Generated data table of HTML named character references, expanded via the NAMED_CHARACTER_REFERENCE macro (name chars, length, placeholder flag, code points) |
| `parser/html/nsHtml5OplessBuilder.cpp` | cpp | 38 | HTML Parser & Element Creation | Implementation of nsHtml5OplessBuilder: Start/Finish wrap tree building in a document update batch and flush, then reset nsContentSink fields; used when tree o… |
| `parser/html/nsHtml5OplessBuilder.h` | c | 41 | HTML Parser & Element Creation | Minimal nsHtml5DocumentBuilder subclass for cases where nsHtml5TreeOpExecutor is not used; wraps tree building in an update batch and resets nsContentSink stat… |
| `parser/html/nsHtml5OwningUTF16Buffer.cpp` | cpp | 57 | HTML Parser & Element Creation | Refcounted owning UTF-16 buffer for parser input queues: fallible allocation, iterative destructor to avoid recursion through the next-chain (bug 706932), span… |
| `parser/html/nsHtml5OwningUTF16Buffer.h` | c | 64 | HTML Parser & Element Creation | Threadsafe-refcounted nsHtml5UTF16Buffer subclass that owns its buffer; forms the linked queue of pending input buffers (next/key fields) used by nsHtml5Parser… |
| `parser/html/nsHtml5Parser.cpp` | cpp | 798 | HTML Parser & Element Creation | Implementation of the nsIParser-facing HTML5 parser used for document.write/script-created parses and non-initial about:blank: drives the tokenizer over an nsH… |
| `parser/html/nsHtml5Parser.h` | c | 371 | HTML Parser & Element Creation | nsHtml5Parser class declaration: nsIParser + nsIStreamListener implementation owning a tree builder, tokenizer, doc.write speculator pair, tree op executor and… |
| `parser/html/nsHtml5PlainTextUtils.cpp` | cpp | 32 | HTML Parser & Element Creation | Builds synthetic link (rel=stylesheet pointing at plaintext.css) and body attributes used when parsing plain-text documents as HTML; body gets a nowrap class u… |
| `parser/html/nsHtml5PlainTextUtils.h` | c | 16 | HTML Parser & Element Creation | Static helpers NewLinkAttributes/NewBodyAttributes producing nsHtml5HtmlAttributes for plain-text presentation documents. |
| `parser/html/nsHtml5Portability.cpp` | cpp | 92 | HTML Parser & Element Creation | Generated portability layer between the Java-derived HTML5 parser and Gecko: interning local names via nsHtml5AtomTable, nsHtml5String creation/comparison help… |
| `parser/html/nsHtml5Portability.h` | c | 81 | HTML Parser & Element Creation | Static portability API for string/atom/jArray operations used across the generated HTML5 parser; augmented by nsHtml5PortabilityHSupplement.h templates. |
| `parser/html/nsHtml5PortabilityHSupplement.h` | c | 15 | HTML Parser & Element Creation | Hand-written supplement to nsHtml5Portability.h: template memcmp-based bufferStartsWithLiteral(AssumeSufficientLength) helpers for fast UTF-16 literal prefix c… |
| `parser/html/nsHtml5Speculation.cpp` | cpp | 32 | HTML Parser & Element Creation | Speculation record holding the pending input buffer, start line/column, tree-builder state snapshot and an ops queue; MoveOpsFrom appends tree operations falli… |
| `parser/html/nsHtml5Speculation.h` | c | 68 | HTML Parser & Element Creation | nsAHtml5TreeOpSink subclass capturing speculative tree operations and parser state so speculative loads (e.g |
| `parser/html/nsHtml5SpeculativeLoad.cpp` | cpp | 143 | HTML Parser & Element Creation | Executes a queued speculative load by dispatching on its opcode to nsHtml5TreeOpExecutor preload APIs (image/script/style/font/fetch/preconnect/picture, base U… |
| `parser/html/nsHtml5SpeculativeLoad.h` | c | 434 | HTML Parser & Element Creation | Value type for one speculative load with opcode enum and overloaded string fields (url/charset/srcset/crossorigin/media/nonce/integrity/fetchpriority...); Init… |
| `parser/html/nsHtml5StackNode.cpp` | cpp | 214 | HTML Parser & Element Creation | Generated open-element stack node for the tree builder: multiple setValues overloads for HTML/SVG/MathML (flag preparation for scoping/integration points), man… |
| `parser/html/nsHtml5StackNode.h` | c | 111 | HTML Parser & Element Creation | Stack node class declaration: element/pop name atoms, namespace, nsIContentHandle, attributes, element-name flags and the mozilla::dom::HTMLContentCreatorFunct… |
| `parser/html/nsHtml5StateSnapshot.cpp` | cpp | 110 | HTML Parser & Element Creation | Generated immutable snapshot of tree builder state (stack, list of active formatting elements, template mode stack, form/head pointers, insertion mode, quirks)… |
| `parser/html/nsHtml5StateSnapshot.h` | c | 95 | HTML Parser & Element Creation | nsAHtml5TreeBuilderState implementation holding autoJArray copies of parser stacks plus mode/quirks flags, enabling tree builder state restore after failed spe… |
| `parser/html/nsHtml5StreamListener.cpp` | cpp | 105 | HTML Parser & Element Creation | Thread-safe nsIThreadRetargetableStreamListener that delegates OnStartRequest/OnDataAvailable/OnStopRequest to nsHtml5StreamParser under a ReentrantMonitor and… |
| `parser/html/nsHtml5StreamListener.h` | c | 61 | HTML Parser & Element Creation | Wrapper solving the refcounting mismatch between cycle-collected nsHtml5StreamParser (main-thread only) and retargetable stream listeners (off-main-thread); ho… |
| `parser/html/nsHtml5StreamParser.cpp` | cpp | 2876 | HTML Parser & Element Creation | Core off-main-thread HTML5 stream parser: encoding sniffing (BOM, chardetng, meta charset scanning with UTF-16 decoder re-switching), feeding decoded UTF-16 to… |
| `parser/html/nsHtml5StreamParser.h` | c | 794 | HTML Parser & Element Creation | nsHtml5StreamParser declaration (cycle-collected, parser-thread operated): parser modes enum, BOM sniffing states, stream states, tokenizer/tree builder owners… |
| `parser/html/nsHtml5StreamParserPtr.h` | c | 227 | HTML Parser & Element Creation | Smart pointer for nsHtml5StreamParser whose release is proxied to the main thread via nsHtml5StreamParserReleaser runnable, mirroring nsCOMPtr semantics (assig… |
| `parser/html/nsHtml5StreamParserReleaser.h` | c | 24 | HTML Parser & Element Creation | Declares nsHtml5StreamParserReleaser, a runnable that releases a raw nsHtml5StreamParser pointer on a specific thread, used by the stream parser for thread-saf… |
| `parser/html/nsHtml5String.cpp` | cpp | 216 | HTML Parser & Element Creation | Implements the nsHtml5String value type: ToString/MoveToString conversion, ASCII comparisons, Clone/Release, and factory methods FromBuffer/FromLiteral/FromStr… |
| `parser/html/nsHtml5String.h` | c | 172 | HTML Parser & Element Creation | Declares nsHtml5String, a pass-by-value tagged-pointer type (2 low tag bits) representing null, empty, exactly-sized StringBuffer, or nsAtom strings shared bet… |
| `parser/html/nsHtml5StringParser.cpp` | cpp | 179 | HTML Parser & Element Creation | Implements the off-main-thread-free fragment/document string parser: ParseFragment (innerHTML algorithm), ParseDocument, and the Tokenize driver loop that feed… |
| `parser/html/nsHtml5StringParser.h` | c | 127 | HTML Parser & Element Creation | Declares nsHtml5StringParser (nsParserBase subclass) owning an nsHtml5OplessBuilder, nsHtml5TreeBuilder, nsHtml5Tokenizer and atom table, plus an internal Cach… |
| `parser/html/nsHtml5SVGLoadDispatcher.cpp` | cpp | 35 | HTML Parser & Element Creation | Implements nsHtml5SVGLoadDispatcher::Run: blocks document onload at construction, then dispatches an eSVGLoad widget event on the SVG element via EventDispatch… |
| `parser/html/nsHtml5SVGLoadDispatcher.h` | c | 21 | HTML Parser & Element Creation | Declares nsHtml5SVGLoadDispatcher, a runnable holding an nsIContent element and its document to fire the SVG load event asynchronously from tree operations. |
| `parser/html/nsHtml5Tokenizer.cpp` | cpp | 1111 | HTML Parser & Element Creation | Generated (from Tokenizer.java) implementation of the HTML5 tokenizer state machine: constructor, literal arrays (TITLE/SCRIPT/STYLE etc.), start/tokenizeBuffe… |
| `parser/html/nsHtml5Tokenizer.h` | c | 4595 | HTML Parser & Element Creation | Generated class declaration of nsHtml5Tokenizer with all HTML5 tokenizer state constants (DATA, RCDATA, SCRIPT_DATA, TAG_OPEN, ...), buffers, and the template … |
| `parser/html/nsHtml5TokenizerALU.cpp` | cpp | 33 | HTML Parser & Element Creation | Instantiates nsHtml5Tokenizer::stateLoop with the ALU loop policies (nsHtml5FastestPolicyALU, nsHtml5LineColPolicyALU, nsHtml5ViewSourcePolicyALU) into this tr… |
| `parser/html/nsHtml5TokenizerALUStubs.cpp` | cpp | 32 | HTML Parser & Element Creation | Fallback stub definitions of the ALU state-loop entry points (StateLoopFastestALU/LineColALU/ViewSourceALU) that MOZ_RELEASE_ASSERT on inconsistent build confi… |
| `parser/html/nsHtml5TokenizerCppSupplement.h` | c | 494 | HTML Parser & Element Creation | Hand-written C++ methods appended to the generated tokenizer: EnsureBufferSpace power-of-two buffer growth with overflow checks, view-source plumbing (EnableVi… |
| `parser/html/nsHtml5TokenizerHSupplement.h` | c | 211 | HTML Parser & Element Creation | Hand-written declarations injected into the nsHtml5Tokenizer class body: column tracking state, StateLoopFastest/LineCol/ViewSource wrappers for SIMD and ALU p… |
| `parser/html/nsHtml5TokenizerLoopPoliciesALU.h` | c | 287 | HTML Parser & Element Creation | Scalar (non-SIMD) tokenizer loop policy structs nsHtml5FastestPolicyALU (no errors, no line/col, used for innerHTML), nsHtml5LineColPolicyALU (tracks line/colu… |
| `parser/html/nsHtml5TokenizerLoopPoliciesSIMD.h` | c | 649 | HTML Parser & Element Creation | SIMD tokenizer loop policy structs nsHtml5FastestPolicySIMD, nsHtml5LineColPolicySIMD and nsHtml5ViewSourcePolicySIMD that accelerate buffer advancement throug… |
| `parser/html/nsHtml5TokenizerSIMD.cpp` | cpp | 33 | HTML Parser & Element Creation | Instantiates nsHtml5Tokenizer::stateLoop with the SIMD loop policies (nsHtml5FastestPolicySIMD, nsHtml5LineColPolicySIMD, nsHtml5ViewSourcePolicySIMD) in a ded… |
| `parser/html/nsHtml5TokenizerSIMDStubs.cpp` | cpp | 32 | HTML Parser & Element Creation | Fallback stub definitions of the SIMD state-loop entry points (StateLoopFastestSIMD/LineColSIMD/ViewSourceSIMD) that MOZ_RELEASE_ASSERT on inconsistent build c… |
| `parser/html/nsHtml5TreeBuilder.cpp` | cpp | 4713 | HTML Parser & Element Creation | The 4713-line generated tree-construction state machine of the HTML5 parser (starttagloop over insertion modes: before-html, in-head, in-body, in-table, in-tem… |
| `parser/html/nsHtml5TreeBuilder.h` | c | 601 | HTML Parser & Element Creation | Class declaration for nsHtml5TreeBuilder (implements nsAHtml5TreeBuilderState for snapshot/restore) |
| `parser/html/nsHtml5TreeBuilderCppSupplement.h` | c | 2550 | HTML Parser & Element Creation | Hand-written out-of-line body of nsHtml5TreeBuilder: element creation (createElement overloads enqueueing create-element tree ops), append/foster-parent operat… |
| `parser/html/nsHtml5TreeBuilderHSupplement.h` | c | 418 | HTML Parser & Element Creation | Hand-written declarations injected into nsHtml5TreeBuilder: dual construction modes (op-less builder vs op queue with nsAHtml5TreeOpSink and speculative-load s… |
| `parser/html/nsHtml5TreeOperation.cpp` | cpp | 1635 | HTML Parser & Element Creation | Implements the tree operation value type: Perform dispatches each queued op on the main thread (append, detach, foster parent, insert, attributes, comments, do… |
| `parser/html/nsHtml5TreeOperation.h` | c | 753 | HTML Parser & Element Creation | Declares nsHtml5TreeOperation as a mozilla::Variant of op structs (opAppend, opDetach, opFosterParent, opCreateHTMLElement, opCreateSVGElement, opCreateMathMLE… |
| `parser/html/nsHtml5TreeOpExecutor.cpp` | cpp | 1483 | HTML Parser & Element Creation | Main-thread executor of the HTML5 tree op queue: RunFlushLoop/FlushDocumentWrite drain nsHtml5TreeOperation batches with DidBuildModel EOF emission, RunScript … |
| `parser/html/nsHtml5TreeOpExecutor.h` | c | 334 | HTML Parser & Element Creation | Declares nsHtml5TreeOpExecutor, an nsHtml5DocumentBuilder/nsIContentSink/nsAHtml5TreeOpSink/LinkedListElement that owns the op queue and speculation stage, imp… |
| `parser/html/nsHtml5TreeOpStage.cpp` | cpp | 48 | HTML Parser & Element Creation | Implementation of the mutex-guarded tree-operation stage: moves nsHtml5TreeOperation queues in/out and moves nsHtml5SpeculativeLoad queues, all under mozilla::… |
| `parser/html/nsHtml5TreeOpStage.h` | c | 61 | HTML Parser & Element Creation | Declares nsHtml5TreeOpStage, an nsAHtml5TreeOpSink that buffers tree operations and speculative loads behind a mutex so the off-main-thread parser can hand bat… |
| `parser/html/nsHtml5UTF16Buffer.cpp` | cpp | 64 | HTML Parser & Element Creation | Generated (from UTF16Buffer.java) implementation of the UTF-16 input buffer accessors: getStart/setStart/getBuffer/getEnd/setEnd, hasMore, getLength and adjust… |
| `parser/html/nsHtml5UTF16Buffer.h` | c | 77 | HTML Parser & Element Creation | Generated declaration of nsHtml5UTF16Buffer, the tokenizer's char16_t buffer window (buffer/start/end) with hasMore/adjust semantics; extended via included Cpp… |
| `parser/html/nsHtml5UTF16BufferCppSupplement.h` | c | 26 | HTML Parser & Element Creation | Gecko supplement included at the end of nsHtml5UTF16Buffer.cpp: defines the protected ctor/dtor with MOZ_COUNT_CTOR/DTOR lifetime tracking, DeleteBuffer() and … |
| `parser/html/nsHtml5UTF16BufferHSupplement.h` | c | 17 | HTML Parser & Element Creation | Gecko supplement included inside the nsHtml5UTF16Buffer class body: declares the protected constructor/destructor and the DeleteBuffer()/Swap() helpers that th… |
| `parser/html/nsHtml5ViewSourceUtils.cpp` | cpp | 50 | HTML Parser & Element Creation | Builds synthesized view-source markup attributes: body gets id=viewsource plus a tab-size style from the view_source.tab_size pref, a stylesheet link to resour… |
| `parser/html/nsHtml5ViewSourceUtils.h` | c | 17 | HTML Parser & Element Creation | Declares nsHtml5ViewSourceUtils, a static-only helper that produces nsHtml5HtmlAttributes for the synthetic body/link/meta elements injected when parsing view-… |
| `parser/html/nsIContentHandle.h` | c | 10 | HTML Parser & Element Creation | Defines nsIContentHandle as a typedef for void: the opaque handle type the generated HTML5 tree builder uses for content nodes, letting the parser code compile… |
| `parser/html/nsIParserUtils.idl` | idl | 141 | HTML Parser & Element Creation | XPIDL interface exposing non-web HTML parser functionality to extensions: sanitize(src, flags) with Sanitizer* bit flags (AllowComments, AllowStyle, CidEmbedsO… |
| `parser/html/nsParserUtils.cpp` | cpp | 126 | HTML Parser & Element Creation | Implements nsIParserUtils via nsContentUtils helpers: SanitizeWith template parses an inert HTML document, applies a sanitizer callable, and serializes with an… |
| `parser/html/nsParserUtils.h` | c | 18 | HTML Parser & Element Creation | Declares nsParserUtils, the final nsIParserUtils implementation behind the @mozilla.org/parserutils;1 contract, expanding NS_DECL_ISUPPORTS and NS_DECL_NSIPARS… |

### parser/html/javasrc/ (9)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `parser/html/javasrc/AttributeName.java` | java | 2294 | HTML Parser & Element Creation | Java source (translator snapshot) defining the AttributeName class and the static ATTRIBUTE_NAMES table of all HTML/SVG/MathML attribute names consumed by the … |
| `parser/html/javasrc/ElementName.java` | java | 1978 | HTML Parser & Element Creation | Java source (translator snapshot) defining the ElementName class and the ELEMENT_NAMES table of all HTML/SVG/MathML element names with their grouping/scoping f… |
| `parser/html/javasrc/Portability.java` | java | 181 | HTML Parser & Element Creation | Java source (translator snapshot) of the Portability helper whose string allocation, release, and ASCII-case-insensitive comparison routines are translated to … |
| `parser/html/javasrc/README.txt` | txt | 6 | Project Documentation | Explains that these .java files are a translator-generated snapshot of the Java sources compiled into the neighboring nsHtml5*.h/.cpp files and must not be edi… |
| `parser/html/javasrc/StackNode.java` | java | 364 | HTML Parser & Element Creation | Java source (translator snapshot) of the open-elements stack entry, wrapping an ElementName's flags plus namespace, node handle, and attributes for tree constr… |
| `parser/html/javasrc/StateSnapshot.java` | java | 205 | HTML Parser & Element Creation | Java source (translator snapshot) implementing TreeBuilderState as an immutable copy of the tree builder state (stacks, form/head pointers, mode, quirks) for s… |
| `parser/html/javasrc/Tokenizer.java` | java | 7721 | HTML Parser & Element Creation | Java source (translator snapshot) of the HTML5 tokenizer state machine (~7700 lines) that turns UTF-16 buffers into start/end tag, character, comment, and DOCT… |
| `parser/html/javasrc/TreeBuilder.java` | java | 6692 | HTML Parser & Element Creation | Java source (translator snapshot) of the HTML5 tree construction phase (~6700 lines) implementing TokenHandler: insertion modes, open element stack, active for… |
| `parser/html/javasrc/UTF16Buffer.java` | java | 151 | HTML Parser & Element Creation | Java source (translator snapshot) of the UTF-16 code unit buffer with start/end cursors that the tokenizer consumes chunk by chunk (translated to nsHtml5UTF16B… |

## 6. dom/base — Element Core (curated) — 20 files

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `dom/base/Element.cpp` | cpp | 6951 | HTML Element Model | Core implementation of mozilla::dom::Element: attribute handling (SetAttr/GetAttr/UnsetAttr), tree binding (BindToTree/UnbindFromTree) and computed-style acces… |
| `dom/base/Element.h` | c | 2848 | HTML Element Model | Declares class Element : public FragmentOrElement, the DOM Element base for all HTML/SVG elements |
| `dom/base/ElementInlines.h` | c | 60 | HTML Element Model | Inline helpers for Element and nsINode: activity observer registration, contenteditable checks via nsGenericHTMLElement, and flattened-tree parent-element look… |
| `dom/base/FragmentOrElement.cpp` | cpp | 2139 | HTML Element Model | Implements FragmentOrElement (ctor/dtor chaining to nsIContent), its nsDOMSlots/nsExtendedDOMSlots, and nsIContent slot creation |
| `dom/base/FragmentOrElement.h` | c | 443 | HTML Element Model | Declares class FragmentOrElement : public nsIContent (base class include), the generic content-node implementation beneath Element (DocumentFragment, Text, etc… |
| `dom/base/nsAttrValue.cpp` | cpp | 2176 | HTML Element Model | Implementation of nsAttrValue, the space-efficient typed storage for attribute values: parses strings into enums, integers, colors, doubles, atom lists and CSS… |
| `dom/base/nsAttrValue.h` | c | 607 | HTML Element Model | Header for nsAttrValue: a tagged-pointer value object representing an attribute's type and data (atom, integer, color, enum, CSS DeclarationBlock, atom array w… |
| `dom/base/nsContentCreatorFunctions.h` | c | 107 | HTML Element Model | Declares the Gecko-internal element-creator functions: NS_NewElement overloads, NS_NewHTMLElement, NS_NewXMLElement, NS_NewMathMLElement, NS_NewXULElement, NS_… |
| `dom/base/nsContentUtils.cpp` | cpp | 14024 | HTML Element Model | Implementation of the nsContentUtils static-helper class: element creation per the DOM spec (NewXULOrHTMLElement) with custom-element upgrade reactions, truste… |
| `dom/base/nsContentUtils.h` | c | 4142 | HTML Element Model | Declaration of nsContentUtils, the central static utility class for DOM/content code: hundreds of helpers for node relationships, principals, event dispatch, p… |
| `dom/base/nsIContent.h` | c | 803 | HTML Element Model | Declares class nsIContent : public nsINode, the abstract content-node interface (content slots, IME state, event attributes) that FragmentOrElement implements. |
| `dom/base/nsIContentInlines.h` | c | 430 | HTML Element Model | Inline flattened-tree traversal: GetFlattenedTreeParentNode (normal and style-facing variants), nsIContent::GetFlattenedTreeParent, and slot/shadow-root aware … |
| `dom/base/nsINode.cpp` | cpp | 4981 | HTML Element Model | Root node implementation: nsINode ctor, slot allocation, and ReplaceOrInsertBefore, the shared machinery behind AppendChild/InsertBefore |
| `dom/base/nsINode.h` | c | 3379 | HTML Element Model | Declares class nsINode : public mozilla::dom::EventTarget, the base of the whole node hierarchy, with inline AppendChild/InsertBefore/ReplaceChild delegating t… |
| `dom/base/nsNameSpaceManager.cpp` | cpp | 306 | HTML Element Model | Runtime manager mapping namespace URIs to int32 namespace IDs: registers the built-in namespaces (None, XMLNS, XML, XHTML, XLink, XSLT, MathML, RDF, XUL, SVG),… |
| `dom/base/nsNameSpaceManager.h` | c | 78 | HTML Element Model | Declaration of the nsNameSpaceManager singleton: URI-to-ID hash tables plus an ordered ID-to-atom array, registration/lookup APIs, HasElementCreator, and pref-… |
| `dom/base/nsNodeInfoManager.cpp` | cpp | 416 | HTML Element Model | Implements nsNodeInfoManager construction (bound to a Document) and GetNodeInfo, the per-document NodeInfo factory/ consulted by every NS_New*Element creator b… |
| `dom/base/nsNodeInfoManager.h` | c | 180 | HTML Element Model | Declares class nsNodeInfoManager final, which allocates and caches NodeInfo objects (tag name + namespace + node kind) that give elements their identity. |
| `dom/base/nsStyledElement.cpp` | cpp | 217 | HTML Element Model | Implements id/class/style-attribute styling support shared by HTML/SVG/MathML elements: CSP-checked parsing of the style attribute into a DeclarationBlock, ins… |
| `dom/base/nsStyledElement.h` | c | 92 | HTML Element Model | Declaration of nsStyledElement, common base for elements styled via id/class/style; overrides ParseAttribute for the style attribute, exposes Style() and Attri… |

## 7. dom/webidl — HTML Interface Contracts — 77 files

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `dom/webidl/HTMLAllCollection.webidl` | webidl | 14 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLAllCollection: the legacy document.all collection exposing indexed/named element access with undefined-emulating behavior v… |
| `dom/webidl/HTMLAnchorElement.webidl` | webidl | 48 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLAnchorElement: <a> hyperlink DOM surface with download/ping/rel/referrerPolicy/text attributes plus obsolete coords/charset… |
| `dom/webidl/HTMLAreaElement.webidl` | webidl | 44 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLAreaElement: <area> image-map hotspot DOM surface with alt/coords/shape/download/ping/rel attributes and hyperlink URL util… |
| `dom/webidl/HTMLAudioElement.webidl` | webidl | 17 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLAudioElement: <audio> element extending HTMLMediaElement with only the Audio(src) legacy factory function. |
| `dom/webidl/HTMLBaseElement.webidl` | webidl | 22 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLBaseElement: <base> element DOM surface exposing href and target attributes. |
| `dom/webidl/HTMLBodyElement.webidl` | webidl | 34 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLBodyElement: <body> element with obsolete text/link/vLink/aLink/bgColor/background attributes and the WindowEventHandlers m… |
| `dom/webidl/HTMLBRElement.webidl` | webidl | 38 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLBRElement: <br> element DOM surface with obsolete clear attribute and ChromeOnly editor padding flags. |
| `dom/webidl/HTMLButtonElement.webidl` | webidl | 53 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLButtonElement: <button> form control DOM surface with form submission attributes, constraint validation, labels, and comman… |
| `dom/webidl/HTMLCanvasElement.webidl` | webidl | 68 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLCanvasElement: <canvas> element DOM surface with width/height, getContext, toDataURL/toBlob, captureStream and transferCont… |
| `dom/webidl/HTMLCollection.webidl` | webidl | 18 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLCollection: the generic live element collection DOM surface with length, item() and namedItem(). |
| `dom/webidl/HTMLDataElement.webidl` | webidl | 15 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLDataElement: <data> element DOM surface exposing the machine-readable value attribute. |
| `dom/webidl/HTMLDataListElement.webidl` | webidl | 18 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLDataListElement: <datalist> element DOM surface exposing the options HTMLCollection. |
| `dom/webidl/HTMLDetailsElement.webidl` | webidl | 22 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLDetailsElement: <details> disclosure widget DOM surface with name and open attributes. |
| `dom/webidl/HTMLDialogElement.webidl` | webidl | 31 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLDialogElement: <dialog> element DOM surface with open/returnValue/closedBy and show/showModal/close/requestClose methods. |
| `dom/webidl/HTMLDirectoryElement.webidl` | webidl | 20 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLDirectoryElement: obsolete <dir> element DOM surface with the compact attribute. |
| `dom/webidl/HTMLDivElement.webidl` | webidl | 21 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLDivElement: <div> generic container DOM surface with the obsolete align attribute. |
| `dom/webidl/HTMLDListElement.webidl` | webidl | 25 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLDListElement: <dl> description list DOM surface with the obsolete compact attribute. |
| `dom/webidl/HTMLDocument.webidl` | webidl | 40 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLDocument: legacy Document subclass adding the named-property getter for document.<name> tree access. |
| `dom/webidl/HTMLElement.webidl` | webidl | 145 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLElement: the base HTML element DOM surface with metadata attributes, user interaction (hidden/inert/contentEditable), popov… |
| `dom/webidl/HTMLEmbedElement.webidl` | webidl | 44 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLEmbedElement: <embed> external content element DOM surface with src/type/width/height and plugin-loading chrome mixins. |
| `dom/webidl/HTMLFieldSetElement.webidl` | webidl | 37 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLFieldSetElement: <fieldset> grouping element DOM surface with disabled/name, elements collection, and constraint validation. |
| `dom/webidl/HTMLFontElement.webidl` | webidl | 20 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLFontElement: obsolete <font> element DOM surface with color/face/size attributes. |
| `dom/webidl/HTMLFormControlsCollection.webidl` | webidl | 17 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLFormControlsCollection: HTMLCollection subtype whose namedItem returns a RadioNodeList or Element for form controls. |
| `dom/webidl/HTMLFormElement.webidl` | webidl | 58 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLFormElement: <form> element DOM surface with submission attributes, elements collection, submit/requestSubmit/reset and val… |
| `dom/webidl/HTMLFrameElement.webidl` | webidl | 39 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLFrameElement: obsolete <frame> element DOM surface with name/src/scrolling attributes and nested browsing context access. |
| `dom/webidl/HTMLFrameSetElement.webidl` | webidl | 23 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLFrameSetElement: obsolete <frameset> element DOM surface with cols/rows attributes and WindowEventHandlers. |
| `dom/webidl/HTMLHeadElement.webidl` | webidl | 17 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLHeadElement: <head> document metadata container with no additional members. |
| `dom/webidl/HTMLHeadingElement.webidl` | webidl | 24 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLHeadingElement: <h1>-<h6> heading elements DOM surface with the obsolete align attribute. |
| `dom/webidl/HTMLHRElement.webidl` | webidl | 32 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLHRElement: <hr> thematic break element DOM surface with obsolete align/color/noShade/size/width attributes. |
| `dom/webidl/HTMLHtmlElement.webidl` | webidl | 24 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLHtmlElement: root <html> element DOM surface with the obsolete version attribute. |
| `dom/webidl/HTMLHyperlinkElementUtils.webidl` | webidl | 17 | HTML WebIDL Interfaces | WebIDL interface definition for the HTMLHyperlinkElementUtils mixin: adds stringifier href and target attributes to hyperlink elements. |
| `dom/webidl/HTMLIFrameElement.webidl` | webidl | 74 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLIFrameElement: <iframe> nested browsing context DOM surface with src/srcdoc/sandbox/allowFullscreen/loading, contentDocumen… |
| `dom/webidl/HTMLImageElement.webidl` | webidl | 135 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLImageElement: <img> element DOM surface with src/srcset/sizes/decoding/loading, intrinsic dimensions, decode(), and chrome … |
| `dom/webidl/HTMLInputElement.webidl` | webidl | 319 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLInputElement: <input> control DOM surface with value/checked/files, form association, selection API, constraint validation,… |
| `dom/webidl/HTMLLabelElement.webidl` | webidl | 21 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLLabelElement: <label> element DOM surface with htmlFor attribute and labeled control access. |
| `dom/webidl/HTMLLegendElement.webidl` | webidl | 26 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLLegendElement: <legend> element DOM surface with form association and obsolete align attribute. |
| `dom/webidl/HTMLLIElement.webidl` | webidl | 27 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLLIElement: <li> list item DOM surface with the value attribute and obsolete type attribute. |
| `dom/webidl/HTMLLinkElement.webidl` | webidl | 68 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLLinkElement: <link> element DOM surface with rel/href/media/sizes, relList, preload/blocking/fetchpriority, and the LinkSty… |
| `dom/webidl/HTMLMapElement.webidl` | webidl | 23 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLMapElement: <map> client-side image map DOM surface with name attribute and areas collection. |
| `dom/webidl/HTMLMarqueeElement.webidl` | webidl | 32 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLMarqueeElement: obsolete <marquee> scrolling text element DOM surface with behavior/direction/speed attributes and start/st… |
| `dom/webidl/HTMLMediaElement.webidl` | webidl | 294 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLMediaElement: base media element DOM surface with network/ready/playback state, controls, tracks, EME, captureStream, and d… |
| `dom/webidl/HTMLMenuElement.webidl` | webidl | 24 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLMenuElement: <menu> element DOM surface with the obsolete compact attribute. |
| `dom/webidl/HTMLMetaElement.webidl` | webidl | 32 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLMetaElement: <meta> metadata element DOM surface with name/httpEquiv/content/media attributes. |
| `dom/webidl/HTMLMeterElement.webidl` | webidl | 32 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLMeterElement: <meter> scalar gauge DOM surface with value/min/max/low/high/optimum attributes and labels. |
| `dom/webidl/HTMLModElement.webidl` | webidl | 21 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLModElement: <ins>/<del> edit indicator DOM surface with cite and dateTime attributes. |
| `dom/webidl/HTMLObjectElement.webidl` | webidl | 114 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLObjectElement: <object> embedded resource DOM surface with data/type, nested document access, constraint validation, and pl… |
| `dom/webidl/HTMLOListElement.webidl` | webidl | 31 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLOListElement: <ol> ordered list DOM surface with reversed/start/type attributes. |
| `dom/webidl/HTMLOptGroupElement.webidl` | webidl | 21 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLOptGroupElement: <optgroup> option group DOM surface with disabled and label attributes. |
| `dom/webidl/HTMLOptionElement.webidl` | webidl | 33 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLOptionElement: <option> choice element DOM surface with selected/value/text/index and the Option() legacy factory. |
| `dom/webidl/HTMLOptionsCollection.webidl` | webidl | 23 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLOptionsCollection: HTMLCollection subtype for select options with add/remove/indexed setter and selectedIndex mutation. |
| `dom/webidl/HTMLOutputElement.webidl` | webidl | 42 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLOutputElement: <output> calculation result element DOM surface with htmlFor/value and constraint validation. |
| `dom/webidl/HTMLParagraphElement.webidl` | webidl | 24 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLParagraphElement: <p> paragraph element DOM surface with the obsolete align attribute. |
| `dom/webidl/HTMLParamElement.webidl` | webidl | 31 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLParamElement: obsolete <param> plugin parameter DOM surface with name/value/type/valueType attributes. |
| `dom/webidl/HTMLPictureElement.webidl` | webidl | 10 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLPictureElement: <picture> responsive image container DOM surface with no additional members. |
| `dom/webidl/HTMLPreElement.webidl` | webidl | 24 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLPreElement: <pre> preformatted text element DOM surface with the obsolete width attribute. |
| `dom/webidl/HTMLProgressElement.webidl` | webidl | 24 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLProgressElement: <progress> progress indicator DOM surface with value/max attributes and the position indicator. |
| `dom/webidl/HTMLQuoteElement.webidl` | webidl | 20 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLQuoteElement: <blockquote>/<q> quotation element DOM surface with the cite attribute. |
| `dom/webidl/HTMLScriptElement.webidl` | webidl | 59 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLScriptElement: <script> element DOM surface with src/type/async/defer/crossOrigin/integrity, static supports(), and Trusted… |
| `dom/webidl/HTMLSelectedContentElement.webidl` | webidl | 13 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLSelectedContentElement: pref-gated <selectedcontent> element for customizable select, showing the selected option. |
| `dom/webidl/HTMLSelectElement.webidl` | webidl | 86 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLSelectElement: <select> control DOM surface with options/selectedOptions/selectedIndex/value, add/remove, validation, and c… |
| `dom/webidl/HTMLSlotElement.webidl` | webidl | 25 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLSlotElement: <slot> shadow DOM slot DOM surface with name, assignedNodes/assignedElements, and declarative assign(). |
| `dom/webidl/HTMLSourceElement.webidl` | webidl | 34 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLSourceElement: <source> media source element DOM surface with src/type/srcset/sizes/media/width/height attributes. |
| `dom/webidl/HTMLSpanElement.webidl` | webidl | 17 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLSpanElement: <span> generic inline container DOM surface with no additional members. |
| `dom/webidl/HTMLStyleElement.webidl` | webidl | 35 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLStyleElement: <style> element DOM surface with media/type/blocking, the LinkStyle mixin, and a devtools-only triggering-pri… |
| `dom/webidl/HTMLTableCaptionElement.webidl` | webidl | 21 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLTableCaptionElement: <caption> table caption DOM surface with the obsolete align attribute. |
| `dom/webidl/HTMLTableCellElement.webidl` | webidl | 54 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLTableCellElement: <td>/<th> table cell DOM surface with colSpan/rowSpan/headers/cellIndex plus obsolete presentation attrib… |
| `dom/webidl/HTMLTableColElement.webidl` | webidl | 32 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLTableColElement: <col>/<colgroup> column group DOM surface with span and obsolete column attributes. |
| `dom/webidl/HTMLTableElement.webidl` | webidl | 63 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLTableElement: <table> element DOM surface with caption/tHead/tFoot/tBodies/rows management and obsolete presentation attrib… |
| `dom/webidl/HTMLTableRowElement.webidl` | webidl | 38 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLTableRowElement: <tr> table row DOM surface with rowIndex/cells/insertCell/deleteCell plus obsolete attributes. |
| `dom/webidl/HTMLTableSectionElement.webidl` | webidl | 33 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLTableSectionElement: <tbody>/<thead>/<tfoot> table section DOM surface with rows/insertRow/deleteRow plus obsolete attribut… |
| `dom/webidl/HTMLTemplateElement.webidl` | webidl | 31 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLTemplateElement: <template> element DOM surface with the inert content fragment and declarative shadow root attributes. |
| `dom/webidl/HTMLTextAreaElement.webidl` | webidl | 102 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLTextAreaElement: <textarea> multiline text control DOM surface with value/selection API, constraint validation, and chrome … |
| `dom/webidl/HTMLTimeElement.webidl` | webidl | 15 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLTimeElement: <time> element DOM surface with the dateTime attribute. |
| `dom/webidl/HTMLTitleElement.webidl` | webidl | 15 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLTitleElement: <title> element DOM surface with the text attribute. |
| `dom/webidl/HTMLTrackElement.webidl` | webidl | 33 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLTrackElement: <track> text track element DOM surface with kind/src/srclang/label/default, readyState, and track. |
| `dom/webidl/HTMLUListElement.webidl` | webidl | 27 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLUListElement: <ul> unordered list DOM surface with obsolete compact/type attributes. |
| `dom/webidl/HTMLVideoElement.webidl` | webidl | 112 | HTML WebIDL Interfaces | WebIDL interface definition for HTMLVideoElement: <video> element DOM surface with width/height/videoWidth/videoHeight/poster, frame statistics, picture-in-pic… |

## 8. Layout Boundary, geckolib & Tag List — 28 files

### layout/base/ (2)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `layout/base/nsCSSFrameConstructor.cpp` | cpp | 11483 | Layout & Display-List Boundary | Implementation of the style-to-frame bridge: builds the frame tree from content and computed style, handling insertion/removal, generated content, tables, inli… |
| `layout/base/nsCSSFrameConstructor.h` | c | 2131 | Layout & Display-List Boundary | Declares nsCSSFrameConstructor (extending nsFrameManager), the API content mutations call to keep the frame tree in sync with the DOM and computed style. |

### layout/generic/ (10)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `layout/generic/nsBlockFrame.cpp` | cpp | 9636 | Layout & Display-List Boundary | Implementation of block-level frame reflow: line box management, float handling, inline/block line layout, and block display-list building. |
| `layout/generic/nsBlockFrame.h` | c | 1345 | Layout & Display-List Boundary | Declares nsBlockFrame, the block-level container frame class that manages child frames as line boxes and implements block reflow and display-list building. |
| `layout/generic/nsContainerFrame.cpp` | cpp | 2934 | Layout & Display-List Boundary | Implementation of the container-frame base: child reflow helpers (ReflowChild/FinishReflowChild), overflow and continuation management, and container display-l… |
| `layout/generic/nsContainerFrame.h` | c | 1102 | Layout & Display-List Boundary | Declares nsContainerFrame (extending nsSplittableFrame), the base class for frames with children, including overflow-container lists and continuation plumbing. |
| `layout/generic/nsIFrame.cpp` | cpp | 12769 | Layout & Display-List Boundary | Implementation of the frame base class: display-list building entry points (BuildDisplayListForStackingContext/ForChild), geometry, transforms, size computatio… |
| `layout/generic/nsIFrame.h` | c | 5992 | Layout & Display-List Boundary | Declares nsIFrame, the abstract base class of every layout frame; its BuildDisplayList contract is how each frame contributes to the display list. |
| `layout/generic/nsImageFrame.cpp` | cpp | 3065 | Layout & Display-List Boundary | Implementation of image frames: reacting to imgINotificationObserver callbacks, image reflow, painting via PaintImage, and event/cursor handling. |
| `layout/generic/nsImageFrame.h` | c | 493 | Layout & Display-List Boundary | Declares nsImageFrame (extending nsAtomicContainerFrame) and the nsDisplayImage display item used to paint image content. |
| `layout/generic/nsTextFrame.cpp` | cpp | 12200 | Layout & Display-List Boundary | Implementation of text frames: glyph run configuration, line-layout driven ReflowText, text painting with selection decorations, and intrinsic width computatio… |
| `layout/generic/nsTextFrame.h` | c | 1218 | Layout & Display-List Boundary | Declares nsTextFrame, the frame class rendering runs of text content, including paint-text parameters and selection painting helpers. |

### layout/painting/ (8)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `layout/painting/nsCSSRendering.cpp` | cpp | 4969 | Layout & Display-List Boundary | Implementation of CSS background/border/box-shadow painting primitives used by frame display-list items, including background frame resolution and border radii. |
| `layout/painting/nsCSSRendering.h` | c | 930 | Layout & Display-List Boundary | Declares the nsCSSRendering struct of static painting helpers (backgrounds, borders, box shadows, decoration lines) plus supporting parameter structs and nsCon… |
| `layout/painting/nsDisplayItemTypes.h` | c | 71 | Layout & Display-List Boundary | Defines the DisplayItemType enum and flags for all display item classes, generated from nsDisplayItemTypesList.inc for type identification and matching. |
| `layout/painting/nsDisplayList.cpp` | cpp | 9068 | Layout & Display-List Boundary | Implementation of the core display-list machinery and the biggest concrete display items (background images, borders, text, shadows, transforms, layers) |
| `layout/painting/nsDisplayList.h` | c | 6989 | Layout & Display-List Boundary | Declares nsDisplayListBuilder, nsDisplayList, and the full hierarchy of display item classes (nsDisplayItem, nsPaintedDisplayItem, nsDisplayBackgroundImage, ns… |
| `layout/painting/nsDisplayListInvalidation.h` | c | 233 | Layout & Display-List Boundary | Geometry snapshot classes (nsDisplayItemGeometry and subclasses for background, border, box-shadow, filters) used to compute invalidation regions when display … |
| `layout/painting/nsImageRenderer.cpp` | cpp | 1124 | Layout & Display-List Boundary | Implements nsImageRenderer, the shared engine that prepares and draws any CSS image (raster, SVG, gradient, element) for backgrounds, borders (border-image com… |
| `layout/painting/nsImageRenderer.h` | c | 312 | Layout & Display-List Boundary | Declares nsImageRenderer and its enums, including nsStyleStruct.h to work directly with nsStyleImage/nsStyleBackground layer data |

### parser/htmlparser/ (2)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `parser/htmlparser/nsElementTable.cpp` | cpp | 205 | HTML Parser & Element Creation | Legacy HTML parser element-properties table: defines the HTMLElement struct and the static gHTMLElements[] array (one ELEM row per eHTMLTag_ value) recording w… |
| `parser/htmlparser/nsHTMLTagList.inc` | inc | 204 | HTML Parser & Element Creation | Canonical X-macro list of all HTML tags: each entry is an HTML_TAG (or HTML_HTMLELEMENT_TAG/HTML_OTHER) macro row giving the tag name, the NS_New*Element creat… |

### servo/ports/geckolib/ (6)

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `servo/ports/geckolib/Cargo.toml` | toml | 36 | Gecko↔Stylo FFI Bridge | Manifest of the geckoservo crate, the Rust static library embedding Servo's style system into Gecko |
| `servo/ports/geckolib/cbindgen.toml` | toml | 1387 | Gecko↔Stylo FFI Bridge | cbindgen configuration that generates the C++ headers (mozilla/ServoStyleConsts.h and ServoBindings) from Rust type definitions so Gecko's C++ style system can… |
| `servo/ports/geckolib/error_reporter.rs` | rust | 445 | Gecko↔Stylo FFI Bridge | CSS error reporting glue: an ErrorReporter implementing the style crate's ParseErrorReporter trait that forwards parse errors to Gecko's console service via Ge… |
| `servo/ports/geckolib/glue.rs` | rust | 11751 | Gecko↔Stylo FFI Bridge | THE C-ABI implementation of every Servo_* function the C++ style system calls: CSS parsing, selector matching, style traversal, computed values, animation valu… |
| `servo/ports/geckolib/lib.rs` | rust | 23 | Gecko↔Stylo FFI Bridge | Crate root of geckoservo: declares the glue, error_reporter, and stylesheet_loader modules and links the style crate with #[macro_use] |
| `servo/ports/geckolib/stylesheet_loader.rs` | rust | 182 | Gecko↔Stylo FFI Bridge | Sheet loading glue: StylesheetLoader and AsyncStylesheetParser implement the style crate's StylesheetLoader trait, delegating @import child-sheet loads to Geck… |

## 9. Docs & Build Config — 1 files

| File | Lang | Lines | Layer | Role |
|---|---|---|---|---|
| `README.md` | markdown | 18 | Project Documentation | Top-level Firefox repository readme: short project description, contribution quick-reference link, Bugzilla issue-tracker note, and links to Firefox Source Doc… |

## Excluded files — by category, with reasons

| Category | Files | Reason | Examples |
|---|---|---|---|
| Test suites — layout/style/test + crashtests | 750 | Test fixtures; not part of the production call graph | `layout/style/crashtests/1017798-1.css`, `layout/style/crashtests/1017798-1.html`, `layout/style/crashtests/1028514-1.html`, `layout/style/crashtests/105619-1.html`, … |
| Test suites — dom/html test/crashtest/reftests/gtest | 848 | Test fixtures and reftest HTML/JS; analyzed graph excludes tests by design | `dom/html/reftests/41464-1-ref.html`, `dom/html/reftests/41464-1a.html`, `dom/html/reftests/41464-1b.html`, `dom/html/reftests/468263-1a.html`, … |
| Parser test data & Java generator sources | 4 | crashtest data + the Java translator that generated nsHtml5 C++ (C++ already analyzed) | `parser/html/java/Makefile`, `parser/html/java/README.txt`, `parser/html/java/manifest.txt`, `parser/html/java/named-character-references.html` |
| dom/base remainder (beyond 20-file curated core) | 470 | DOM features unrelated to the CSS-property/HTML-element chains (windows, events, clipboard, storage…) | `dom/base/AbstractRange.cpp`, `dom/base/AbstractRange.h`, `dom/base/AncestorIterator.h`, `dom/base/AnimationFrameProvider.cpp`, … |
| layout/base remainder (beyond frame constructor) | 106 | PresShell-adjacent plumbing (refresh driver, pres context) — beyond the display-list boundary | `layout/base/AccessibleCaret.cpp`, `layout/base/AccessibleCaret.h`, `layout/base/AccessibleCaretEventHub.cpp`, `layout/base/AccessibleCaretEventHub.h`, … |
| layout/generic remainder (beyond 9 frame files) | 150 | Other frame classes (scroll/canvas/subdocument frames) — boundary covered by nsIFrame + representative frames | `layout/generic/AbsoluteContainingBlock.cpp`, `layout/generic/AbsoluteContainingBlock.h`, `layout/generic/AnonymousContentKey.h`, `layout/generic/AspectRatio.cpp`, … |
| layout/painting remainder (beyond 7 boundary files) | 27 | Layer builder / compositor glue — beyond the display-list boundary by definition | `layout/painting/ActiveLayerTracker.cpp`, `layout/painting/ActiveLayerTracker.h`, `layout/painting/BorderCache.h`, `layout/painting/BorderConsts.h`, … |
| dom/animation (optional — excluded by default) | 49 | DOM-side animation objects; style-side animation managers ARE in scope | `dom/animation/Animation.cpp`, `dom/animation/Animation.h`, `dom/animation/AnimationComparator.h`, `dom/animation/AnimationEffect.cpp`, … |
| layout/forms frames (optional — excluded) | 26 | Form-control frames — boundary chosen without table/form frames | `layout/forms/ButtonControlFrame.cpp`, `layout/forms/ButtonControlFrame.h`, `layout/forms/InputButtonControlFrame.cpp`, `layout/forms/ListMutationObserver.cpp`, … |
| layout/tables frames (optional — excluded) | 26 | Table frames — same boundary decision | `layout/tables/BasicTableLayoutStrategy.cpp`, `layout/tables/BasicTableLayoutStrategy.h`, `layout/tables/FixedTableLayoutStrategy.cpp`, `layout/tables/FixedTableLayoutStrategy.h`, … |
| dom/svg + dom/mathml (locked out of DB scope) | 295 | SVG/MathML elements out of the HTML+CSS-only scope decision | `dom/mathml/MathMLAnchorElement.cpp`, `dom/mathml/MathMLAnchorElement.h`, `dom/mathml/MathMLElement.cpp`, `dom/mathml/MathMLElement.h`, … |

**Excluded total: 2751 files.** Everything else in the 480,512-file tree (browser/, toolkit/, js/, gfx/, netwerk/, …) is out of project scope by definition — not CSS/HTML-related.

Reconciliation: 1099 in scope + 2751 excluded + ~450k out-of-project + binaries/default-ignores = 480,512 tracked files.

### Known cosmetic note

81 graph nodes carry non-canonical `type` labels (`method`/`enum`) from two analyzer outputs; their IDs are canonical `function:`/`class:` ids so all edges resolve. Fix scheduled in the Phase C preflight.
