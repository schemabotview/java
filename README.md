# Java — a GraphL concept app

Video-first Java, built as scenes and slides. **Core Java 21 and its runtime — no Spring.**

Each **section** is one `(scene, slide, narration)` triple and one video segment: a react-flow
diagram or a code card on the left, a markdown slide on the right, a spoken script underneath.
Scenes are declarative — an author lists nodes and edges, and `@graphlearning/flow` computes every
position, so layout is deterministic and screenshots reproduce.

## The arc

12 courses, 131 sections:

`runtime · syntax · oop · types · collections · generics · functional · streams · errors ·
concurrency · jvm · project`

The aim is expertise rather than a tour, so sections explain mechanism — how a `HashMap` bucket
treeifies, how a virtual thread unmounts from its carrier, why erasure makes `new T[]` illegal —
and the places expertise is actually tested get sections of their own. `project` is the capstone: a
log-analysis CLI that forces every prior course to be used together.

**Currently authored:** course 1, `runtime` (10 sections).

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
```

The catalog is at `#/`; a section is at `#/<courseId>-<sectionId>`, e.g. `#/runtime-the-run`.

## Verify a change

```bash
npm run build        # must stay clean
npm run check        # tsc --noEmit + the scene text linter
npm run frames       # renders every section, measures slide overflow
```

Then **look at the frames** in `frames/`. The first three commands pass on a slide that is wrong;
only the rendered frame shows an edge label sitting on a card.

## Structure

```
src/content/    courses → sections (one file per section) + registry
src/scenes/     hand-authored scenes + registry
src/main.tsx    mounts <ConceptApp> from @graphlearning/shell
src/theme.css   --brand / --brand-hover / --accent-2 — this repo's whole design surface
scripts/        concept.json · lint-scenes.mjs · frames.mjs
public/audio/<course>/   narration wavs (generated from .tts via Colab)
```

The render engine (`@graphlearning/flow`) and the app shell (`@graphlearning/shell`) are consumed
as published packages, pinned by version — not as workspace symlinks.
