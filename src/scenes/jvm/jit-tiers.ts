import type { Scene } from '@graphlearning/flow'

// §2 jit and §3 escape-analysis — one scene. The tiered pipeline is the answer to "why is Java fast
// despite starting in an interpreter", and the deoptimisation arrow is the part that makes the
// model honest: C2's best optimisations are SPECULATIVE, valid only while an assumption holds, and
// it keeps the right to fall back when it stops holding.
export const jitTiers: Scene = {
  id: 'jit-tiers',
  padding: 0.08,
  nodes: [
    {
      id: 'tiers',
      label: 'Tiered compilation — a method gets faster as it runs',
      pattern: 'group',
      icon: 'zap',
      flow: 'TB',
      children: [
        {
          id: 'chain',
          label: 'The pipeline every hot method walks',
          pattern: 'service',
          icon: 'gears',
          flow: 'LR',
          children: [
            { id: 'interp', label: 'Interpreter', pattern: 'network', icon: 'repeat', sub: 'starts instantly, and COUNTS invocations' },
            { id: 'c1', label: 'C1 — quick', pattern: 'service', icon: 'gauge', sub: 'compiles fast, optimises lightly, keeps profiling' },
            { id: 'c2', label: 'C2 — aggressive', pattern: 'service', icon: 'zap', sub: 'slow to compile, near-optimal native code' },
          ],
          edges: [
            { source: 'interp', target: 'c1', label: 'warm' },
            { source: 'c1', target: 'c2', label: 'hot' },
          ],
        },
        {
          id: 'opts',
          label: 'What C2 does with the profile',
          pattern: 'group',
          icon: 'layers',
          cols: 2,
          children: [
            { id: 'inline', label: 'Inlining', pattern: 'storage', icon: 'copy', sub: 'the enabling one — it exposes everything else' },
            { id: 'devirt', label: 'Devirtualisation', pattern: 'storage', icon: 'gitbranch', sub: 'only ONE type ever seen here, so skip the vtable' },
            { id: 'escape', label: 'Escape analysis', pattern: 'storage', icon: 'crop', sub: 'never leaves the method ⇒ no allocation at all' },
            { id: 'loop', label: 'Loop & branch work', pattern: 'storage', icon: 'repeat', sub: 'unrolling, hoisting, dead-code removal' },
          ],
        },
        { id: 'deopt', label: 'Deoptimisation', pattern: 'warn', icon: 'gitmerge', sub: 'a second type appears — throw the code away, fall back, recompile' },
      ],
      edges: [
        { source: 'chain', target: 'opts' },
        { source: 'opts', target: 'deopt', label: 'assumption broken' },
      ],
    },
  ],
  edges: [],
}
