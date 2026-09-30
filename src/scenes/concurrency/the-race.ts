import type { Scene } from '@graphlearning/flow'

// §8 shared-mutable-state — the race, shown failing rather than described. `count++` is three
// separate operations, and the interleaving that loses an update is the entire concept. Everything
// in §9-§11 is a different way of making those three steps indivisible, so this scene is the one
// they all refer back to.
export const theRace: Scene = {
  id: 'the-race',
  padding: 0.08,
  nodes: [
    {
      id: 'race',
      label: 'count++ is three operations, not one',
      pattern: 'group',
      icon: 'bell',
      flow: 'TB',
      children: [
        {
          id: 'steps',
          label: 'What the JVM actually does',
          pattern: 'network',
          icon: 'binary',
          flow: 'LR',
          children: [
            { id: 's1', label: '1. READ count', pattern: 'network', icon: 'eye', variant: 'tile' },
            { id: 's2', label: '2. ADD one', pattern: 'network', icon: 'calculator', variant: 'tile' },
            { id: 's3', label: '3. WRITE it back', pattern: 'network', icon: 'edit', variant: 'tile' },
          ],
          edges: [
            { source: 's1', target: 's2' },
            { source: 's2', target: 's3' },
          ],
        },
        {
          id: 'interleave',
          label: 'Two threads, and one update disappears',
          pattern: 'warn',
          icon: 'gitmerge',
          flow: 'LR',
          children: [
            { id: 'a1', label: 'A reads 7', pattern: 'warn', icon: 'eye', sub: 'then the OS suspends A' },
            { id: 'b1', label: 'B reads 7', pattern: 'warn', icon: 'eye', sub: 'the write has not happened yet' },
            { id: 'ab', label: 'Both write 8', pattern: 'warn', icon: 'edit', sub: 'two increments, one result' },
          ],
          edges: [
            { source: 'a1', target: 'b1' },
            { source: 'b1', target: 'ab' },
          ],
        },
        { id: 'worse', label: 'And it passes your tests', pattern: 'warn', icon: 'clock', sub: 'rare, timing-dependent, and worse under load' },
      ],
      edges: [
        { source: 'steps', target: 'interleave' },
        { source: 'interleave', target: 'worse' },
      ],
    },
  ],
  edges: [],
}
