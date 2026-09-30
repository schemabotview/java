import type { Scene } from '@graphlearning/flow'

// §11 memory-model — the second half of the concurrency problem, and the one people never meet
// until it bites. §8's race was about ATOMICITY; this is about VISIBILITY: a write by one thread
// may simply never become visible to another, because the compiler, the CPU and the caches are all
// permitted to reorder and to keep values in registers. Drawn as the barrier, since that is the fix.
export const memoryModel: Scene = {
  id: 'memory-model',
  padding: 0.09,
  nodes: [
    {
      id: 'vis',
      label: 'The other half: a write may never be SEEN',
      pattern: 'group',
      icon: 'eye',
      flow: 'TB',
      children: [
        {
          id: 'allowed',
          label: 'Three layers, all allowed to reorder',
          pattern: 'warn',
          icon: 'layers',
          cols: 3,
          children: [
            { id: 'jit', label: 'The JIT', pattern: 'warn', icon: 'zap', sub: 'hoists a loop-invariant read into a register' },
            { id: 'cpu', label: 'The CPU', pattern: 'warn', icon: 'cpu', sub: 'executes out of order' },
            { id: 'cache', label: 'The cache', pattern: 'warn', icon: 'database', sub: 'a write sits in a store buffer' },
          ],
        },
        { id: 'bug', label: 'while (!stop) { }', pattern: 'warn', icon: 'repeat', sub: 'a plain boolean — this loop can spin forever' },
        {
          id: 'fix',
          label: 'Anything that establishes happens-before',
          pattern: 'service',
          icon: 'shieldcheck',
          cols: 2,
          children: [
            { id: 'vol', label: 'volatile', pattern: 'service', icon: 'share', sub: 'visibility and ordering — but NOT atomicity' },
            { id: 'sync', label: 'synchronized / Lock', pattern: 'service', icon: 'lock', sub: 'visibility AND atomicity' },
            { id: 'fin', label: 'final fields', pattern: 'service', icon: 'circlecheck', sub: 'safely published once the constructor returns' },
            { id: 'lib', label: 'The concurrent library', pattern: 'service', icon: 'boxes', sub: 'queues, atomics, executors — all documented' },
          ],
        },
      ],
      edges: [
        { source: 'allowed', target: 'bug' },
        { source: 'bug', target: 'fix', label: 'fixed by' },
      ],
    },
  ],
  edges: [],
}
