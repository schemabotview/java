import type { Scene } from '@graphlearning/flow'

// §3 arraylist-internals — the one picture that makes every List performance question answerable
// without memorising a table. An ArrayList is an array plus a size, so index is a single offset and
// growth is a copy; a LinkedList is nodes, so index is a walk. Drawn as the two memory layouts,
// because the layout IS the cost model.
export const arraylistInternals: Scene = {
  id: 'arraylist-internals',
  padding: 0.09,
  nodes: [
    {
      id: 'two',
      label: 'The layout IS the cost model',
      pattern: 'group',
      icon: 'gauge',
      flow: 'TB',
      children: [
        {
          id: 'al',
          label: 'ArrayList — one contiguous array + a size',
          pattern: 'storage',
          icon: 'database',
          flow: 'LR',
          children: [
            { id: 'e0', label: '[0] A-1', pattern: 'storage', icon: 'package', variant: 'tile' },
            { id: 'e1', label: '[1] A-2', pattern: 'storage', icon: 'package', variant: 'tile' },
            { id: 'e2', label: '[2] A-3', pattern: 'storage', icon: 'package', variant: 'tile' },
            { id: 'e3', label: '[3] null', pattern: 'external', icon: 'crop', variant: 'tile' },
            { id: 'e4', label: '[4] null', pattern: 'external', icon: 'crop', variant: 'tile' },
          ],
        },
        { id: 'grow', label: 'Full? allocate 1.5× and copy', pattern: 'warn', icon: 'copy', sub: 'amortised O(1) — but one add pays for it all' },
        {
          id: 'll',
          label: 'LinkedList — separate nodes, each a heap object',
          pattern: 'warn',
          icon: 'share',
          flow: 'LR',
          children: [
            { id: 'n0', label: 'Node A-1', pattern: 'warn', icon: 'package', sub: 'prev · value · next' },
            { id: 'n1', label: 'Node A-2', pattern: 'warn', icon: 'package', sub: 'three words of overhead each' },
            { id: 'n2', label: 'Node A-3', pattern: 'warn', icon: 'package', sub: 'scattered — every hop a cache miss' },
          ],
          edges: [
            { source: 'n0', target: 'n1', bidirectional: true },
            { source: 'n1', target: 'n2', bidirectional: true },
          ],
        },
        { id: 'verdict', label: 'get(i): offset vs walk', pattern: 'service', icon: 'circlecheck', sub: 'ArrayList O(1) · LinkedList O(n). Use ArrayList.' },
      ],
      edges: [
        { source: 'al', target: 'grow' },
        { source: 'grow', target: 'll', label: 'versus' },
        { source: 'll', target: 'verdict' },
      ],
    },
  ],
  edges: [],
}
