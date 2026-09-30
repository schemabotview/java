import type { Scene } from '@graphlearning/flow'

// §5 strings — why `==` on strings sometimes works, which is worse than it never working. The pool
// is the whole explanation: identical literals are interned to ONE object, so `==` on two literals
// is true by accident; anything built at runtime is a fresh object, so the same `==` is false. Drawn
// as sharing, because that is literally what interning is.
export const stringPool: Scene = {
  id: 'string-pool',
  padding: 0.08,
  nodes: [
    {
      id: 'why',
      label: 'Why == on Strings is a trap',
      pattern: 'group',
      icon: 'lightbulb',
      flow: 'LR',
      children: [
        {
          id: 'refs',
          label: 'Four variables',
          pattern: 'network',
          icon: 'layers',
          flow: 'TB',
          children: [
            { id: 'v1', label: 'String a = "A-1"', pattern: 'network', icon: 'tag', sub: 'literal — interned' },
            { id: 'v2', label: 'String b = "A-1"', pattern: 'network', icon: 'tag', sub: 'same literal — same object' },
            { id: 'v3', label: 'String c = "A-" + n', pattern: 'warn', icon: 'zap', sub: 'built at runtime — fresh object' },
            { id: 'v4', label: 'String d = c.intern()', pattern: 'network', icon: 'share', sub: 'asks the pool for the shared one' },
          ],
        },
        {
          id: 'heap',
          label: 'Heap',
          pattern: 'group',
          icon: 'database',
          flow: 'TB',
          children: [
            { id: 'pooled', label: 'String@1a "A-1"', pattern: 'storage', icon: 'database', sub: 'the pooled instance — one copy' },
            { id: 'fresh', label: 'String@7f "A-1"', pattern: 'warn', icon: 'package', sub: 'equal contents, different object' },
          ],
        },
      ],
      edges: [
        { source: 'v1', target: 'pooled' },
        { source: 'v2', target: 'pooled', label: 'a == b is true' },
        { source: 'v3', target: 'fresh', label: 'a == c is false' },
        { source: 'v4', target: 'pooled' },
      ],
    },
  ],
  edges: [],
}
