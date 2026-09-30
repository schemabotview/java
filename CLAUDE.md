# CLAUDE.md — java (lean operational pointers)

The **Java** concept app of GraphL. Workspace-wide invariants, content model and working agreement
live in the workspace [`CLAUDE.md`](../CLAUDE.md) — read that first; this file is Java-specific.
The course-by-course plan is [`../JAVA-PLAN.md`](../JAVA-PLAN.md).

## What this is

A standalone concept app: its own scenes + courses. The render engine is **`@graphlearning/flow`**
and the shell is **`@graphlearning/shell`** — both pinned by version, so an engine change never
lands here until this repo upgrades and re-verifies.

Each **section** = `(scene, slide, narration)`; the left scene is a react-flow diagram or a code
snippet, the right slide is markdown. One section = one slide = one video segment.

**Authored fresh.** Two predecessor repos held Java material — `schemabotview/java` (12 notebooks,
core + Spring) and `schemabotview/java-ct` (a 10×10 core-Java content repo for the old
`graphl-movie` runtime). Both were deleted from GitHub on 2026-09-30 at the owner's instruction and
survive only as `~/.archive/java-2026-09-30.bundle` and `~/.archive/java-ct-2026-09-30.bundle`.
Nothing here is ported from either. `schemabotview/java-content` (graphl-ux era) still exists and is
also unused.

## Scope

**Core Java and its runtime. No Spring** — a framework on top of the language is a different
concept, and folding it in here would make one catalog card carry two subjects.

## Course arc (12)

`runtime · syntax · oop · types · collections · generics · functional · streams · errors ·
concurrency · jvm · project` — 131 sections. Played in syllabus order; `project` is the capstone
(a log-analysis CLI) that weaves in every prior course.

**Status**: course 1 (`runtime`, 10 sections) authored and verified. Narration `.tts` not yet
generated — no wavs in `public/audio/` yet.

## The depth contract

The goal is expertise, not a syntax tour, and that decides what a section may be:

- **Mechanism over API.** A section earns its place by explaining what actually happens — how a
  `HashMap` bucket treeifies, how a virtual thread unmounts. A method signature is not a section.
- **Traps get their own sections** — the `equals`/`hashCode` contract, `? super T`,
  effectively-final capture, `volatile` vs `synchronized`.
- **Java 21 idiom first.** Pre-21 style appears only where the contrast is the lesson.
- **Bookends.** Each course opens with a framing section and closes with `you-are-here` — the
  `python` convention. The closer is the digest step, not filler.

## Layout

```
src/scenes/          scenes + registry (a scene can be shared across sections)
src/content/         courses → sections + registry
src/main.tsx         mounts <ConceptApp> — the router, section view, slide panel,
                     catalog and narration are @graphlearning/shell
src/theme.css        this repo's three brand tokens — its entire design surface
scripts/             concept.json (publishing identity) · lint-scenes.mjs · frames.mjs.
                     The record/capture/thumb TOOLS are @graphlearning/shell bins
public/audio/<course>/   narration wavs
```

## Build & verify

- `npm install` → `npm run dev` (port 5173); `npm run build` must stay clean.
- **The bar**: `npm run build` + `npm run check` (tsc + scene linter) + **`npm run frames`** clean,
  AND the frames looked at. The first two pass on a frame that is wrong — `frames.mjs` renders every
  section and measures slide overflow exactly, which is the defect the other two cannot see.
- **Slide budget ~950 characters.** At ~1050 a slide clips off the bottom of the panel; tables cost
  more height per character than bullets. `npm run frames` is the authority.
- **Edge labels must be short.** A pill riding the midpoint between two wide containers lands on a
  border rather than in the gap. Two peers that don't need an arrow should be `cols: 2`, not an
  edged flow — that was the fix on three scenes in course 1.
- Adding a scene: define in `src/scenes/<course>/`, register in that folder's `index.ts`.
- Adding content: add a `Section` under `src/content/<course>/`, list it in that folder's `index.ts`.

## Not yet published

This repo has no git history and no remote. `schemabotview/java` is free (the quarry that held the
name was deleted), and `vite.config.ts` and the Pages workflow already assume `base: /java/`.
