import type { Scene } from '@graphlearning/flow'

// §1 why-objects (reused by §11) — the course's frame. An object is state and the behaviour that
// guards it, bound together; the alternative is data in one place and the rules about it scattered
// across every caller. Drawn as the two designs side by side, because the argument is comparative:
// the left one is not wrong-looking, it is just where the invariant has nowhere to live.
export const whyObjects: Scene = {
  id: 'why-objects',
  padding: 0.1,
  nodes: [
    {
      id: 'compare',
      label: 'Where does the rule live?',
      pattern: 'group',
      icon: 'scale',
      cols: 2,
      children: [
        {
          id: 'scattered',
          label: 'Data + free functions',
          pattern: 'warn',
          icon: 'waves',
          flow: 'TB',
          children: [
            { id: 'rec', label: 'balance: 250', pattern: 'storage', icon: 'database', sub: 'a plain field, writable by anyone' },
            { id: 'c1', label: 'withdraw() in Teller', pattern: 'warn', icon: 'wrench', sub: 'checks funds — remembers to' },
            { id: 'c2', label: 'withdraw() in Batch', pattern: 'warn', icon: 'wrench', sub: 'forgot the check' },
            { id: 'c3', label: 'balance -= n, inline', pattern: 'warn', icon: 'zap', sub: 'no check at all' },
          ],
          edges: [
            { source: 'rec', target: 'c1' },
            { source: 'rec', target: 'c2' },
            { source: 'rec', target: 'c3' },
          ],
        },
        {
          id: 'object',
          label: 'One object that owns both',
          pattern: 'service',
          icon: 'shieldcheck',
          flow: 'TB',
          children: [
            { id: 'api', label: 'Account · the only door', pattern: 'service', icon: 'dooropen', sub: 'deposit · withdraw · balance' },
            { id: 'guard', label: 'The invariant', pattern: 'service', icon: 'shield', sub: 'balance is never negative' },
            { id: 'state', label: 'private long balance', pattern: 'storage', icon: 'lock', sub: 'unreachable from outside' },
          ],
          edges: [
            { source: 'api', target: 'guard', label: 'every path' },
            { source: 'guard', target: 'state' },
          ],
        },
      ],
    },
  ],
  edges: [],
}
