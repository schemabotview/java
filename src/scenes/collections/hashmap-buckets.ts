import type { Scene } from '@graphlearning/flow'

// §6 hashmap-internals (and referenced again by §11) — the mechanism the whole course rests on.
// hash → spread → index → bucket → chain, and treeify past a threshold. Drawn as the pipeline the
// lookup actually walks, because "O(1) average" means nothing until you can see which step degrades
// and why: every step is constant EXCEPT the last, and the last is where a bad hashCode lands you.
export const hashmapBuckets: Scene = {
  id: 'hashmap-buckets',
  padding: 0.08,
  nodes: [
    {
      id: 'lookup',
      label: 'map.get(key) — every step but the last is constant',
      pattern: 'group',
      icon: 'search',
      flow: 'TB',
      children: [
        {
          id: 'index',
          label: 'Finding the bucket',
          pattern: 'service',
          icon: 'calculator',
          flow: 'LR',
          children: [
            { id: 'h', label: 'key.hashCode()', pattern: 'network', icon: 'key', sub: 'yours — 32 bits, any value' },
            { id: 'spread', label: 'h ^ (h >>> 16)', pattern: 'network', icon: 'zap', sub: 'mixes the HIGH bits down' },
            { id: 'idx', label: 'h & (n - 1)', pattern: 'service', icon: 'filter', sub: 'n is a power of 2, so this is h % n' },
          ],
          edges: [
            { source: 'h', target: 'spread' },
            { source: 'spread', target: 'idx' },
          ],
        },
        {
          id: 'table',
          label: 'The table — an array of buckets',
          pattern: 'storage',
          icon: 'database',
          cols: 4,
          children: [
            { id: 'b0', label: '[0] empty', pattern: 'external', icon: 'crop', variant: 'tile' },
            { id: 'b1', label: '[1] one entry', pattern: 'storage', icon: 'package', variant: 'tile' },
            { id: 'b2', label: '[9] a chain', pattern: 'warn', icon: 'share', variant: 'tile' },
            { id: 'b3', label: '[9] treeified', pattern: 'warn', icon: 'gitbranch', variant: 'tile' },
          ],
        },
        { id: 'chain', label: 'Walk the bucket', pattern: 'warn', icon: 'repeat', sub: 'calling equals — the only non-constant step' },
        { id: 'resize', label: 'Resize & rehash', pattern: 'service', icon: 'copy', sub: 'at 0.75 load the table doubles' },
      ],
      edges: [
        { source: 'index', target: 'table', label: 'index into' },
        { source: 'table', target: 'chain' },
        { source: 'chain', target: 'resize' },
      ],
    },
  ],
  edges: [],
}
