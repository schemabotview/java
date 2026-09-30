import type { Scene } from '@graphlearning/flow'

// §10 parallel-streams — drawn as the split-apply-combine it actually is, with the shared pool at
// the centre, because the two things people get wrong are both visible there: the work is split by
// a Spliterator (so a LinkedList splits badly), and every parallel stream in the JVM shares ONE
// common ForkJoinPool (so one blocking task starves everything else).
export const parallel: Scene = {
  id: 'parallel-streams',
  padding: 0.12,
  nodes: [
    {
      id: 'par',
      label: 'parallelStream() — split, apply, combine',
      pattern: 'group',
      icon: 'gitbranch',
      flow: 'TB',
      children: [
        { id: 'split', label: 'Spliterator splits it', pattern: 'network', icon: 'crop', sub: 'an ArrayList halves cheaply; a LinkedList cannot' },
        {
          id: 'pool',
          label: 'ONE common ForkJoinPool — shared by the whole JVM',
          pattern: 'warn',
          icon: 'cpu',
          cols: 4,
          children: [
            { id: 'w1', label: 'worker 1', pattern: 'service', icon: 'zap', variant: 'tile' },
            { id: 'w2', label: 'worker 2', pattern: 'service', icon: 'zap', variant: 'tile' },
            { id: 'w3', label: 'worker 3', pattern: 'service', icon: 'zap', variant: 'tile' },
            { id: 'blocked', label: 'one blocking call', pattern: 'warn', icon: 'bell', variant: 'tile' },
          ],
        },
        { id: 'combine', label: 'Combine the partials', pattern: 'service', icon: 'gitmerge', sub: 'reduce needs associativity; collect needs a combiner' },
        { id: 'verdict', label: 'Worth it when?', pattern: 'storage', icon: 'gauge', sub: 'big N, per-element cost, splittable source, no shared state' },
      ],
      edges: [
        { source: 'split', target: 'pool' },
        { source: 'pool', target: 'combine' },
        { source: 'combine', target: 'verdict' },
      ],
    },
  ],
  edges: [],
}
