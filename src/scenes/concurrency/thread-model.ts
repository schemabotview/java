import type { Scene } from '@graphlearning/flow'

// §1 what-is-a-thread and §5 virtual-threads — one scene, read twice. The whole of Java 21's
// concurrency story is in the difference between the two halves: a platform thread is a 1:1 wrapper
// around an OS thread (expensive, so you pool it), a virtual thread is a heap object the JVM mounts
// onto a carrier and unmounts when it blocks (cheap, so you don't). Same picture, two costs.
export const threadModel: Scene = {
  id: 'thread-model',
  padding: 0.08,
  nodes: [
    {
      id: 'two',
      label: 'Two kinds of thread, and the cost is the whole story',
      pattern: 'group',
      icon: 'scale',
      flow: 'TB',
      children: [
        {
          id: 'platform',
          label: 'Platform thread — 1 : 1 with an OS thread',
          pattern: 'warn',
          icon: 'cpu',
          flow: 'LR',
          children: [
            { id: 'p1', label: 'new Thread()', pattern: 'warn', icon: 'zap', sub: '~1 MB of stack, reserved up front' },
            { id: 'p2', label: 'The OS schedules it', pattern: 'warn', icon: 'gears', sub: 'a context switch costs microseconds' },
            { id: 'p3', label: 'Blocking wastes it', pattern: 'warn', icon: 'lock', sub: 'parked on I/O, and the OS thread is idle too' },
          ],
          edges: [
            { source: 'p1', target: 'p2' },
            { source: 'p2', target: 'p3' },
          ],
        },
        { id: 'pool', label: 'So you POOL them', pattern: 'network', icon: 'boxes', sub: 'a few hundred at most — that cap is your throughput ceiling' },
        {
          id: 'virtual',
          label: 'Virtual thread (21) — a heap object the JVM schedules',
          pattern: 'service',
          icon: 'zap',
          flow: 'LR',
          children: [
            { id: 'v1', label: 'Thread.ofVirtual()', pattern: 'service', icon: 'zap', sub: 'a few hundred bytes — millions are fine' },
            { id: 'v2', label: 'MOUNTED on a carrier', pattern: 'service', icon: 'plug', sub: 'a platform thread from a small pool' },
            { id: 'v3', label: 'Blocking UNMOUNTS it', pattern: 'service', icon: 'share', sub: 'the stack moves to the heap; the carrier is freed' },
          ],
          edges: [
            { source: 'v1', target: 'v2' },
            { source: 'v2', target: 'v3' },
          ],
        },
        { id: 'so', label: 'So you DON’T pool them', pattern: 'storage', icon: 'circlecheck', sub: 'one virtual thread per task — the simple code is the fast code' },
      ],
      edges: [
        { source: 'platform', target: 'pool' },
        { source: 'pool', target: 'virtual', label: 'versus' },
        { source: 'virtual', target: 'so' },
      ],
    },
  ],
  edges: [],
}
