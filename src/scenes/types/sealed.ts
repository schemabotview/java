import type { Scene } from '@graphlearning/flow'

// §6 sealed-types — the hierarchy you are allowed to CLOSE, and why closing it is what makes a
// switch total. Drawn as a family with a wall around it: the value of `permits` is not what it
// allows but what it forbids, and the compiler's exhaustiveness check is the dividend.
export const sealed: Scene = {
  id: 'sealed',
  padding: 0.1,
  nodes: [
    {
      id: 'family',
      label: 'sealed — a hierarchy with a wall around it',
      pattern: 'group',
      icon: 'shield',
      flow: 'TB',
      children: [
        { id: 'top', label: 'sealed interface Event', pattern: 'service', icon: 'gitbranch', sub: 'permits Placed, Paid, Shipped' },
        {
          id: 'members',
          label: 'The whole family — and there will never be more',
          pattern: 'group',
          icon: 'layers',
          cols: 3,
          children: [
            { id: 'placed', label: 'record Placed', pattern: 'storage', icon: 'package', sub: 'final — the usual leaf' },
            { id: 'paid', label: 'record Paid', pattern: 'storage', icon: 'package', sub: 'each permitted type must say how it closes' },
            { id: 'shipped', label: 'record Shipped', pattern: 'storage', icon: 'package', sub: 'final · sealed · or non-sealed' },
          ],
        },
        { id: 'outside', label: 'class Rogue implements Event', pattern: 'warn', icon: 'bell', sub: 'compile error — not in the permits list' },
        { id: 'total', label: 'switch needs no default', pattern: 'service', icon: 'circlecheck', sub: 'the compiler knows the cases are all of them' },
      ],
      edges: [
        { source: 'top', target: 'members', label: 'permits' },
        { source: 'top', target: 'outside', label: 'refused' },
        { source: 'members', target: 'total', label: 'exhaustive' },
      ],
    },
  ],
  edges: [],
}
