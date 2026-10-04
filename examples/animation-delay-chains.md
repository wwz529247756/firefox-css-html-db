# Chain Trees — `animation-delay`

Generated: 2026-10-03 · Source pinned: Firefox 157.0.1 @ 47c5f402c8d3a5369f1fb1b6cd61b0bb92725af1 (branch release)

**Record:** longhand · style_struct: `ui` · gecko_ffi_name: `mAnimationDelay` · initial: `computed::Time::zero()` · animatable: no · spec: https://drafts.csswg.org/css-animations/#propdef-animation-delay

## Anchors (10)

| Role | Symbol | Status |
|---|---|---|
| cascade | `function:firefox/servo/components/style/properties/cascade.rs:cascade` | in-graph |
| cascade | `file:firefox/servo/components/style/properties/gecko.mako.rs` | in-graph |
| codegen | `file:firefox/servo/components/style/properties/properties.mako.rs` | in-graph |
| codegen | `file:firefox/servo/components/style/properties/data.py` | in-graph |
| codegen | `file:firefox/servo/components/style/properties/build.py` | in-graph |
| define | `config:firefox/servo/components/style/properties/longhands.toml` | in-graph |
| expose | `servo-serialized (Servo_DeclarationBlock_SerializePropertyValue)` | in-graph |
| ffi | `function:firefox/servo/ports/geckolib/glue.rs:Servo_ParseProperty` | in-graph |
| parse | `function:file:firefox/servo/components/style/properties/properties.mako.rs:longhands::animation_delay::parse_d` | recorded (derived) |
| store | `class:firefox/layout/style/nsStyleStruct.h:nsStyleUi` | recorded |

## Chain trees (8)

### codegen (15 nodes, reaches display-list boundary)

```text
`-- properties.mako.rs  @ properties.mako.rs:1
    `-- gecko.mako.rs  @ gecko.mako.rs:1
        `-- nsStyleStruct.h (cross-batch)  @ nsStyleStruct.h:1  [branch: style struct member]
            |-- nsIFrame.h  @ nsIFrame.h:1  <<== BOUNDARY
            |-- nsCSSRendering.h  @ nsCSSRendering.h:1  <<== BOUNDARY
            |-- nsDisplayList.h  @ nsDisplayList.h:1  <<== BOUNDARY
            |-- nsDisplayList.cpp  @ nsDisplayList.cpp:1  <<== BOUNDARY
            |-- nsImageRenderer.h  @ nsImageRenderer.h:1  <<== BOUNDARY
            |-- nsImageRenderer.cpp  @ nsImageRenderer.cpp:1  <<== BOUNDARY
            |-- nsBlockReflowContext.cpp  @ nsBlockReflowContext.cpp:1  <<== BOUNDARY
            |-- nsBlockReflowContext.h  @ nsBlockReflowContext.h:1  <<== BOUNDARY
            |-- nsLineBox.h  @ nsLineBox.h:1  <<== BOUNDARY
            |-- TextOverflow.cpp  @ TextOverflow.cpp:1  <<== BOUNDARY
            |-- TextOverflow.h  @ TextOverflow.h:1  <<== BOUNDARY
            `-- ReflowInput.h  @ ReflowInput.h:1  <<== BOUNDARY
```

### codegen (1 node)

```text
`-- data.py  @ data.py:1
```

### codegen (1 node)

```text
`-- build.py  @ build.py:1
```

### cascade (15 nodes, reaches display-list boundary)

```text
`-- cascade  @ cascade.rs:79
    `-- gecko.mako.rs  @ gecko.mako.rs:1
        `-- nsStyleStruct.h (cross-batch)  @ nsStyleStruct.h:1  [branch: style struct member]
            |-- nsIFrame.h  @ nsIFrame.h:1  <<== BOUNDARY
            |-- nsCSSRendering.h  @ nsCSSRendering.h:1  <<== BOUNDARY
            |-- nsDisplayList.h  @ nsDisplayList.h:1  <<== BOUNDARY
            |-- nsDisplayList.cpp  @ nsDisplayList.cpp:1  <<== BOUNDARY
            |-- nsImageRenderer.h  @ nsImageRenderer.h:1  <<== BOUNDARY
            |-- nsImageRenderer.cpp  @ nsImageRenderer.cpp:1  <<== BOUNDARY
            |-- nsBlockReflowContext.cpp  @ nsBlockReflowContext.cpp:1  <<== BOUNDARY
            |-- nsBlockReflowContext.h  @ nsBlockReflowContext.h:1  <<== BOUNDARY
            |-- nsLineBox.h  @ nsLineBox.h:1  <<== BOUNDARY
            |-- TextOverflow.cpp  @ TextOverflow.cpp:1  <<== BOUNDARY
            |-- TextOverflow.h  @ TextOverflow.h:1  <<== BOUNDARY
            `-- ReflowInput.h  @ ReflowInput.h:1  <<== BOUNDARY
```

### cascade (14 nodes, reaches display-list boundary)

```text
`-- gecko.mako.rs  @ gecko.mako.rs:1
    `-- nsStyleStruct.h (cross-batch)  @ nsStyleStruct.h:1  [branch: style struct member]
        |-- nsIFrame.h  @ nsIFrame.h:1  <<== BOUNDARY
        |-- nsCSSRendering.h  @ nsCSSRendering.h:1  <<== BOUNDARY
        |-- nsDisplayList.h  @ nsDisplayList.h:1  <<== BOUNDARY
        |-- nsDisplayList.cpp  @ nsDisplayList.cpp:1  <<== BOUNDARY
        |-- nsImageRenderer.h  @ nsImageRenderer.h:1  <<== BOUNDARY
        |-- nsImageRenderer.cpp  @ nsImageRenderer.cpp:1  <<== BOUNDARY
        |-- nsBlockReflowContext.cpp  @ nsBlockReflowContext.cpp:1  <<== BOUNDARY
        |-- nsBlockReflowContext.h  @ nsBlockReflowContext.h:1  <<== BOUNDARY
        |-- nsLineBox.h  @ nsLineBox.h:1  <<== BOUNDARY
        |-- TextOverflow.cpp  @ TextOverflow.cpp:1  <<== BOUNDARY
        |-- TextOverflow.h  @ TextOverflow.h:1  <<== BOUNDARY
        `-- ReflowInput.h  @ ReflowInput.h:1  <<== BOUNDARY
```

### store (13 nodes, reaches display-list boundary)

```text
`-- nsStyleStruct.h (cross-batch)  @ nsStyleStruct.h:1  [branch: style struct member]
    |-- nsIFrame.h  @ nsIFrame.h:1  <<== BOUNDARY
    |-- nsCSSRendering.h  @ nsCSSRendering.h:1  <<== BOUNDARY
    |-- nsDisplayList.h  @ nsDisplayList.h:1  <<== BOUNDARY
    |-- nsDisplayList.cpp  @ nsDisplayList.cpp:1  <<== BOUNDARY
    |-- nsImageRenderer.h  @ nsImageRenderer.h:1  <<== BOUNDARY
    |-- nsImageRenderer.cpp  @ nsImageRenderer.cpp:1  <<== BOUNDARY
    |-- nsBlockReflowContext.cpp  @ nsBlockReflowContext.cpp:1  <<== BOUNDARY
    |-- nsBlockReflowContext.h  @ nsBlockReflowContext.h:1  <<== BOUNDARY
    |-- nsLineBox.h  @ nsLineBox.h:1  <<== BOUNDARY
    |-- TextOverflow.cpp  @ TextOverflow.cpp:1  <<== BOUNDARY
    |-- TextOverflow.h  @ TextOverflow.h:1  <<== BOUNDARY
    `-- ReflowInput.h  @ ReflowInput.h:1  <<== BOUNDARY
```

### expose (16 nodes, reaches display-list boundary)

```text
`-- Servo_ParseProperty  @ glue.rs:5142
    `-- properties.mako.rs  @ properties.mako.rs:1
        `-- gecko.mako.rs  @ gecko.mako.rs:1
            `-- nsStyleStruct.h (cross-batch)  @ nsStyleStruct.h:1  [branch: style struct member]
                |-- nsIFrame.h  @ nsIFrame.h:1  <<== BOUNDARY
                |-- nsCSSRendering.h  @ nsCSSRendering.h:1  <<== BOUNDARY
                |-- nsDisplayList.h  @ nsDisplayList.h:1  <<== BOUNDARY
                |-- nsDisplayList.cpp  @ nsDisplayList.cpp:1  <<== BOUNDARY
                |-- nsImageRenderer.h  @ nsImageRenderer.h:1  <<== BOUNDARY
                |-- nsImageRenderer.cpp  @ nsImageRenderer.cpp:1  <<== BOUNDARY
                |-- nsBlockReflowContext.cpp  @ nsBlockReflowContext.cpp:1  <<== BOUNDARY
                |-- nsBlockReflowContext.h  @ nsBlockReflowContext.h:1  <<== BOUNDARY
                |-- nsLineBox.h  @ nsLineBox.h:1  <<== BOUNDARY
                |-- TextOverflow.cpp  @ TextOverflow.cpp:1  <<== BOUNDARY
                |-- TextOverflow.h  @ TextOverflow.h:1  <<== BOUNDARY
                `-- ReflowInput.h  @ ReflowInput.h:1  <<== BOUNDARY
```

### ffi (16 nodes, reaches display-list boundary)

```text
`-- Servo_ParseProperty  @ glue.rs:5142
    `-- properties.mako.rs  @ properties.mako.rs:1
        `-- gecko.mako.rs  @ gecko.mako.rs:1
            `-- nsStyleStruct.h (cross-batch)  @ nsStyleStruct.h:1  [branch: style struct member]
                |-- nsIFrame.h  @ nsIFrame.h:1  <<== BOUNDARY
                |-- nsCSSRendering.h  @ nsCSSRendering.h:1  <<== BOUNDARY
                |-- nsDisplayList.h  @ nsDisplayList.h:1  <<== BOUNDARY
                |-- nsDisplayList.cpp  @ nsDisplayList.cpp:1  <<== BOUNDARY
                |-- nsImageRenderer.h  @ nsImageRenderer.h:1  <<== BOUNDARY
                |-- nsImageRenderer.cpp  @ nsImageRenderer.cpp:1  <<== BOUNDARY
                |-- nsBlockReflowContext.cpp  @ nsBlockReflowContext.cpp:1  <<== BOUNDARY
                |-- nsBlockReflowContext.h  @ nsBlockReflowContext.h:1  <<== BOUNDARY
                |-- nsLineBox.h  @ nsLineBox.h:1  <<== BOUNDARY
                |-- TextOverflow.cpp  @ TextOverflow.cpp:1  <<== BOUNDARY
                |-- TextOverflow.h  @ TextOverflow.h:1  <<== BOUNDARY
                `-- ReflowInput.h  @ ReflowInput.h:1  <<== BOUNDARY
```

## Evidence notes

- **expose**: no dedicated DoGet getter; generic Servo serialization
- **parse**: longhands.toml name: animation-delay
- **store**: TOML struct field: ui -> member mAnimationDelay
