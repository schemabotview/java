import type { Scene } from '@graphlearning/flow'

// §6 inheritance and §7 polymorphism — one hierarchy, read twice. As a hierarchy it shows what is
// inherited and where `Object` sits (everything descends from it, which is why every object has
// equals/hashCode/toString to override in §10). As dispatch it shows that the CALL is written
// against the top box and the METHOD that runs is chosen by the object at the bottom.
export const hierarchy: Scene = {
  id: 'hierarchy',
  padding: 0.1,
  nodes: [
    {
      id: 'tree',
      label: 'One hierarchy, and how a call finds its method',
      pattern: 'group',
      icon: 'gitbranch',
      flow: 'TB',
      children: [
        { id: 'obj', label: 'Object', pattern: 'external', icon: 'boxes', sub: 'every class extends it — equals, hashCode, toString' },
        { id: 'acct', label: 'Account', pattern: 'service', icon: 'database', sub: 'protected long balance; withdraw(long)' },
        {
          id: 'subs',
          label: 'The subclasses override withdraw',
          pattern: 'group',
          icon: 'copy',
          cols: 2,
          children: [
            { id: 'sav', label: 'Savings', pattern: 'service', icon: 'lock', sub: 'refuses below the minimum' },
            { id: 'chk', label: 'Checking', pattern: 'service', icon: 'zap', sub: 'allows an agreed overdraft' },
          ],
        },
        { id: 'call', label: 'Account a = new Savings()', pattern: 'network', icon: 'search', sub: 'declared Account — IS a Savings' },
        { id: 'run', label: 'a.withdraw(50)', pattern: 'warn', icon: 'repeat', sub: 'Savings.withdraw runs — chosen at RUN time' },
      ],
      edges: [
        { source: 'obj', target: 'acct', label: 'extends' },
        { source: 'acct', target: 'subs', label: 'extends' },
        { source: 'subs', target: 'call', label: 'assigned up' },
        { source: 'call', target: 'run', label: 'dispatch' },
      ],
    },
  ],
  edges: [],
}
