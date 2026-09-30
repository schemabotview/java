import type { Scene } from '@graphlearning/flow'

// §10 object-contract — the single most consequential thing in this course, because course 5's
// collections silently depend on it. The scene shows the FAILURE rather than the rule: an object
// whose hashCode changed after insertion is looked for in the wrong bucket and is not found,
// although it is sitting in the map. That is what "breaking the contract" actually looks like.
export const equalsContract: Scene = {
  id: 'equals-contract',
  padding: 0.09,
  nodes: [
    {
      id: 'law',
      label: 'Equal objects MUST have equal hash codes',
      pattern: 'group',
      icon: 'scale',
      flow: 'LR',
      children: [
        {
          id: 'ok',
          label: 'Contract kept',
          pattern: 'service',
          icon: 'circlecheck',
          flow: 'TB',
          children: [
            { id: 'k1', label: 'new Key("A-1")', pattern: 'service', icon: 'key', sub: 'hashCode() → 4921' },
            { id: 'b1', label: 'bucket 4921 % 16 = 9', pattern: 'storage', icon: 'database', sub: 'stored here' },
            { id: 'f1', label: 'map.get(new Key("A-1"))', pattern: 'service', icon: 'search', sub: 'hashes to 9, equals matches — found' },
          ],
          edges: [
            { source: 'k1', target: 'b1', label: 'put' },
            { source: 'b1', target: 'f1', label: 'get' },
          ],
        },
        {
          id: 'broken',
          label: 'Contract broken',
          pattern: 'warn',
          icon: 'bell',
          flow: 'TB',
          children: [
            { id: 'k2', label: 'key.setId("B-9")', pattern: 'warn', icon: 'edit', sub: 'a MUTABLE field used in hashCode' },
            { id: 'b2', label: 'still in bucket 9', pattern: 'storage', icon: 'database', sub: 'the map was never told' },
            { id: 'f2', label: 'map.get(key)', pattern: 'warn', icon: 'search', sub: 'hashes to 2 now — looks in the wrong bucket' },
            { id: 'r2', label: 'null — a silent leak', pattern: 'warn', icon: 'bell', sub: 'the entry is there and unreachable' },
          ],
          edges: [
            { source: 'k2', target: 'b2' },
            { source: 'b2', target: 'f2' },
            { source: 'f2', target: 'r2' },
          ],
        },
      ],
    },
  ],
  edges: [],
}
