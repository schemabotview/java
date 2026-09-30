import type { Scene } from '@graphlearning/flow'

// §8 concurrency — the capstone's one genuinely concurrent step, and it is deliberately the SIMPLE
// version: one virtual thread per file inside a scope. The whole point of course 10 §5 and §7 was
// that this is now both the readable answer and the fast one, so the capstone should not reach for
// a pool, a CompletableFuture graph, or a parallel stream.
export const concurrency: Scene = {
  id: 'project-concurrency',
  padding: 0.09,
  nodes: [
    {
      id: 'many',
      label: 'Many files at once — the simple version is the fast one',
      pattern: 'group',
      icon: 'zap',
      flow: 'TB',
      children: [
        { id: 'scope', label: 'One scope owns the work', pattern: 'service', icon: 'shield', sub: 'StructuredTaskScope — c10 §7. Nothing outlives it.' },
        {
          id: 'forks',
          label: 'fork() per file — one virtual thread each',
          pattern: 'group',
          icon: 'layers',
          cols: 3,
          children: [
            { id: 'f1', label: 'app-01.log', pattern: 'network', icon: 'scroll', sub: 'blocked on I/O — and the carrier is free' },
            { id: 'f2', label: 'app-02.log', pattern: 'network', icon: 'scroll', sub: 'thousands of these is fine' },
            { id: 'f3', label: 'app-03.log', pattern: 'network', icon: 'scroll', sub: 'no pool, no sizing arithmetic' },
          ],
        },
        { id: 'join', label: 'join() · throwIfFailed()', pattern: 'service', icon: 'gitmerge', sub: 'one file fails ⇒ the rest are cancelled, and you are told' },
        { id: 'merge', label: 'Merge the partial counts', pattern: 'storage', icon: 'copy', sub: 'each thread returns its OWN map — nothing shared, c10 §9' },
      ],
      edges: [
        { source: 'scope', target: 'forks' },
        { source: 'forks', target: 'join' },
        { source: 'join', target: 'merge' },
      ],
    },
  ],
  edges: [],
}
