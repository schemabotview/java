import type { Scene } from '@graphlearning/flow'

// §2 the-class and §3 the-object — one scene, used twice with the narration pointing at a different
// half. The class is a definition loaded ONCE into metaspace; `new` stamps instances onto the heap.
// Drawn with two instances rather than one, because "each object gets its own copy of the fields,
// and all of them share one copy of the class and one copy of any static field" is the whole idea.
export const classAndObject: Scene = {
  id: 'class-and-object',
  padding: 0.1,
  nodes: [
    {
      id: 'stamp',
      label: 'One definition, many instances',
      pattern: 'group',
      icon: 'copy',
      flow: 'TB',
      children: [
        {
          id: 'definition',
          label: 'class Account — loaded once, in metaspace',
          pattern: 'external',
          icon: 'braces',
          flow: 'LR',
          children: [
            { id: 'decl-fields', label: 'private long balance', pattern: 'external', icon: 'database', sub: 'the SHAPE — one slot per instance' },
            { id: 'decl-static', label: 'static String BANK', pattern: 'warn', icon: 'tag', sub: 'static: ONE slot, shared by all' },
            { id: 'decl-methods', label: 'withdraw(long)', pattern: 'external', icon: 'repeat', sub: 'bytecode — stored once, not per object' },
          ],
        },
        {
          id: 'instances',
          label: 'new Account(…) — on the heap',
          pattern: 'storage',
          icon: 'database',
          cols: 2,
          children: [
            { id: 'a1', label: 'Account@1f3a', pattern: 'storage', icon: 'package', sub: 'balance = 250 — its own slot' },
            { id: 'a2', label: 'Account@7b2c', pattern: 'storage', icon: 'package', sub: 'balance = 900 — a different slot' },
          ],
        },
        { id: 'ref', label: 'Account a = …', pattern: 'network', icon: 'share', sub: 'a stack slot holding one address' },
      ],
      edges: [
        { source: 'definition', target: 'instances', label: 'new stamps' },
        { source: 'instances', target: 'ref', label: 'reached through' },
      ],
    },
  ],
  edges: [],
}
