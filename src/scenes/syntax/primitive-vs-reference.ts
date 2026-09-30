import type { Scene } from '@graphlearning/flow'

// §2 values — the split that runs through the whole language. A primitive IS the bits in the slot;
// a reference is an arrow to a heap object. Two nodes carry it: the table fixes the eight primitives
// (a reference the slide cannot afford to spell out), and the stack/heap pair shows the difference
// as storage rather than as a rule to memorise.
export const primitiveVsReference: Scene = {
  id: 'primitive-vs-reference',
  padding: 0.08,
  nodes: [
    {
      id: 'split',
      label: 'Two kinds of value, and only two',
      pattern: 'group',
      icon: 'gitbranch',
      flow: 'TB',
      children: [
        {
          id: 'prims',
          kind: 'table',
          label: 'The 8 primitives',
          sub: 'lowercase, not objects, never null',
          pattern: 'storage',
          headers: ['type', 'bits', 'holds'],
          values: [
            ['boolean', '—', 'true / false'],
            ['byte', '8', '−128 … 127'],
            ['short', '16', '±32 thousand'],
            ['char', '16', 'one UTF-16 unit'],
            ['int', '32', '±2.1 billion — the default'],
            ['long', '64', '±9.2 quintillion — 10L'],
            ['float', '32', '~7 digits — 1.5f'],
            ['double', '64', '~15 digits — the default'],
          ],
        },
        {
          id: 'storage',
          label: 'Where each one actually sits',
          pattern: 'group',
          icon: 'layers',
          flow: 'LR',
          children: [
            {
              id: 'stack',
              label: 'Stack frame',
              pattern: 'network',
              icon: 'layers',
              flow: 'TB',
              children: [
                { id: 'qty', label: 'int qty', pattern: 'network', icon: 'calculator', sub: 'the slot holds 2 — the value itself' },
                { id: 'id', label: 'String id', pattern: 'network', icon: 'share', sub: 'the slot holds an address' },
              ],
            },
            {
              id: 'heapobj',
              label: 'Heap',
              pattern: 'storage',
              icon: 'database',
              flow: 'TB',
              children: [
                { id: 'strobj', label: 'String@0c9d', pattern: 'storage', icon: 'tag', sub: 'the characters "A-1" live here' },
                { id: 'boxed', label: 'Integer@3b7f', pattern: 'warn', icon: 'package', sub: 'a boxed int — an object, can be null' },
              ],
            },
          ],
          edges: [{ source: 'stack', target: 'heapobj', label: 'points to' }],
        },
      ],
      edges: [{ source: 'prims', target: 'storage', label: 'everything else is a reference' }],
    },
  ],
  edges: [],
}
