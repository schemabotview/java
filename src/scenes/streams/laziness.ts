import type { Scene } from '@graphlearning/flow'

// §2 laziness — the trace, because this is one of those ideas that a sentence cannot deliver and a
// printed execution order settles instantly. The interleaved output is the evidence that elements
// are pulled one at a time, and the short-circuit line is the payoff: filter never even looks at
// the rest of the list.
export const laziness: Scene = {
  id: 'laziness',
  title: 'Print the order and the model is obvious',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Laziness.java',
      label: [
        'Stream<Order> s = orders.stream()',
        '        .filter(o -> { println("filter " + o.id()); return …; })',
        '        .map(o    -> { println("map "    + o.id()); return …; });',
        '',
        '// Nothing has printed. Nothing has run. s is a RECIPE.',
        '',
        's.toList();     // now it runs',
        '',
        '// filter A-1     <- element A-1 goes all the way down,',
        '// map A-1        <-   THEN element A-2 starts',
        '// filter A-2',
        '// map A-2',
        '//',
        '// NOT: filter A-1, filter A-2, ..., then map A-1, map A-2',
        '// There is no intermediate list. Ever.',
        '',
        '// Which is what makes short-circuiting possible:',
        'orders.stream().filter(big).findFirst();',
        '// stops at the first match — the rest are never touched.',
        '',
        'Stream.iterate(1, n -> n * 2).limit(10)   // infinite source,',
        '// perfectly fine, because limit stops asking for more.',
        '',
        '// A stream is single-use. Reuse it: IllegalStateException.',
      ].join('\n'),
    },
  ],
  edges: [],
}
