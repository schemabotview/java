import type { Scene } from '@graphlearning/flow'

// §1 why-generics (reused by §10) — the course's frame, and the argument is historical: before
// 2004 a collection held Object, so every read was a cast and every cast was a runtime bet. The
// diagram puts the two timelines side by side so the move is visible: the SAME error, relocated
// from run time to compile time. That relocation is the entire value proposition.
export const whyGenerics: Scene = {
  id: 'why-generics',
  padding: 0.1,
  nodes: [
    {
      id: 'shift',
      label: 'The same error, moved',
      pattern: 'group',
      icon: 'scale',
      cols: 2,
      children: [
        {
          id: 'before',
          label: 'Java 1.4 — a collection of Object',
          pattern: 'warn',
          icon: 'bell',
          flow: 'TB',
          children: [
            { id: 'b1', label: 'List os = new ArrayList()', pattern: 'warn', icon: 'boxes', sub: 'holds anything at all' },
            { id: 'b2', label: 'os.add("oops")', pattern: 'warn', icon: 'edit', sub: 'compiles — a String in your order list' },
            { id: 'b3', label: '(Order) os.get(0)', pattern: 'warn', icon: 'crop', sub: 'a cast on every single read' },
            { id: 'b4', label: 'ClassCastException', pattern: 'warn', icon: 'bell', sub: 'at RUN time, far from the add' },
          ],
          edges: [
            { source: 'b1', target: 'b2' },
            { source: 'b2', target: 'b3' },
            { source: 'b3', target: 'b4' },
          ],
        },
        {
          id: 'after',
          label: 'Java 5+ — a collection of Order',
          pattern: 'service',
          icon: 'shieldcheck',
          flow: 'TB',
          children: [
            { id: 'a1', label: 'List<Order> os = …', pattern: 'service', icon: 'boxes', sub: 'the element type is part of the type' },
            { id: 'a2', label: 'os.add("oops")', pattern: 'service', icon: 'circlecheck', sub: 'will not compile. Caught at the add.' },
            { id: 'a3', label: 'Order o = os.get(0)', pattern: 'service', icon: 'key', sub: 'no cast — the compiler already knows' },
            { id: 'a4', label: 'Nothing to throw', pattern: 'service', icon: 'circlecheck', sub: 'the failure no longer exists at run time' },
          ],
          edges: [
            { source: 'a1', target: 'a2' },
            { source: 'a2', target: 'a3' },
            { source: 'a3', target: 'a4' },
          ],
        },
      ],
    },
  ],
  edges: [],
}
