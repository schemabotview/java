import type { Scene } from '@graphlearning/flow'

// §4/§5 — the generational hypothesis and what it buys, then the tuning that follows from it. The
// whole design rests on one observed fact: almost every object dies young. So collect the young
// space often and cheaply by copying the few survivors, and touch the old space rarely. Drawn as
// the spaces, because "why is a young GC cheap" is answered by the arrow, not by a definition.
export const gc: Scene = {
  id: 'gc',
  padding: 0.08,
  nodes: [
    {
      id: 'heap',
      label: 'Almost every object dies young — so split the heap',
      pattern: 'group',
      icon: 'database',
      flow: 'TB',
      children: [
        {
          id: 'young',
          label: 'Young generation — collected often, and cheaply',
          pattern: 'service',
          icon: 'zap',
          flow: 'LR',
          children: [
            { id: 'eden', label: 'Eden', pattern: 'service', icon: 'package', sub: 'every new object starts here' },
            { id: 's0', label: 'Survivor', pattern: 'network', icon: 'copy', sub: 'copied here if still reachable' },
            { id: 's1', label: 'Survivor', pattern: 'network', icon: 'copy', sub: 'and again, a few times' },
          ],
          edges: [
            { source: 'eden', target: 's0', label: 'survived' },
            { source: 's0', target: 's1' },
          ],
        },
        { id: 'cheap', label: 'Cost ∝ SURVIVORS', pattern: 'storage', icon: 'gauge', sub: 'copy the few live ones out; the rest are dead at once' },
        { id: 'old', label: 'Old generation', pattern: 'warn', icon: 'database', sub: 'promoted after surviving enough times. Collected rarely.' },
        { id: 'full', label: 'Full GC is the slow one', pattern: 'warn', icon: 'clock', sub: 'repeated full GCs mean a leak — course 1 §9' },
      ],
      edges: [
        { source: 'young', target: 'cheap' },
        { source: 'cheap', target: 'old', label: 'promotion' },
        { source: 'old', target: 'full' },
      ],
    },
  ],
  edges: [],
}
