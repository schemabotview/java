import type { Scene } from '@graphlearning/flow'

// §8 iterating — the enhanced for is an Iterator in disguise, and once that is visible,
// ConcurrentModificationException stops being mysterious: the collection counts its structural
// changes, the iterator remembers the count it started with, and a mismatch is a fail-fast throw.
// Shown as code because the fix (Iterator.remove, removeIf) is syntax, not a concept.
export const iteration: Scene = {
  id: 'iteration',
  title: 'for-each is an Iterator — and why it throws',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Iterating.java',
      label: [
        'for (Order o : orders) { … }',
        '',
        '// ...is compiled to exactly this:',
        'for (Iterator<Order> it = orders.iterator(); it.hasNext(); ) {',
        '    Order o = it.next();',
        '}',
        '// which is why for-each works on any Iterable, and why you',
        '// cannot get at the index inside one.',
        '',
        '// The throw. Every structural change bumps modCount; the',
        '// iterator saved it at creation and compares on every next().',
        'for (Order o : orders) {',
        '    if (o.qty() == 0) orders.remove(o);   // modCount++',
        '}   // next() => ConcurrentModificationException',
        '',
        '// Fail-fast: it is a BUG DETECTOR, not a guarantee. Usually',
        '// nothing to do with threads, despite the name.',
        '',
        'orders.removeIf(o -> o.qty() == 0);   // the answer',
        '',
        'var it = orders.iterator();           // when you need more',
        'while (it.hasNext()) if (it.next().qty() == 0) it.remove();',
        '',
        '// Maps: iterate entrySet(), not keySet() + get() — one pass,',
        '// not two lookups per entry.',
      ].join('\n'),
    },
  ],
  edges: [],
}
