import type { Scene } from '@graphlearning/flow'

// §1 modelling-with-types (reused by §10) — the course's frame, and a decision procedure rather
// than a feature list. Java 21 gives four ways to declare a type and they are not interchangeable:
// the question that picks one is what the data can BE, not what it does.
export const typeChoice: Scene = {
  id: 'type-choice',
  padding: 0.1,
  nodes: [
    {
      id: 'pick',
      label: 'Four declarations — the question that chooses',
      pattern: 'group',
      icon: 'scale',
      flow: 'TB',
      children: [
        { id: 'q', label: 'What can this value BE?', pattern: 'user', icon: 'lightbulb', sub: 'not: what does it do' },
        {
          id: 'answers',
          label: 'The four answers',
          pattern: 'group',
          icon: 'layers',
          cols: 2,
          children: [
            { id: 'enum', label: 'enum — a fixed LIST', pattern: 'service', icon: 'tag', sub: 'NEW · PAID · SHIPPED. Known at compile time.' },
            { id: 'record', label: 'record — a fixed SHAPE', pattern: 'storage', icon: 'package', sub: 'Order(id, qty). Data with no invariant to hide.' },
            { id: 'sealed', label: 'sealed — a closed FAMILY', pattern: 'network', icon: 'gitbranch', sub: 'Event is Placed or Shipped. Nothing else.' },
            { id: 'class', label: 'class — state + a rule', pattern: 'warn', icon: 'shield', sub: 'Account guards its balance. Course 3.' },
          ],
        },
        { id: 'payoff', label: 'switch sees every case', pattern: 'service', icon: 'circlecheck', sub: 'enum and sealed are EXHAUSTIVE — the compiler checks' },
      ],
      edges: [
        { source: 'q', target: 'answers' },
        { source: 'answers', target: 'payoff', label: 'enum · sealed' },
      ],
    },
  ],
  edges: [],
}
