import type { Scene } from '@graphlearning/flow'

// §9/§10 — immutability and ordering. One card: the factories and the two ways to order, because
// in practice they are the same decision ("what does this collection promise the caller?") and the
// compareTo/equals consistency trap belongs next to both.
export const ordering: Scene = {
  id: 'ordering',
  title: 'Immutable factories · Comparable · Comparator',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Ordering.java',
      label: [
        'List.of("a", "b");  Set.of(1, 2);  Map.of("k", v);',
        '// truly immutable — add() throws UnsupportedOperation.',
        '// They REJECT null, and Set.of/Map.of reject duplicates',
        '// at runtime. Arrays.asList is NOT this: fixed-size, but',
        '// set() works and it writes THROUGH to the array.',
        'List.copyOf(mutable);   // an independent snapshot',
        '',
        '// Comparable — the type has ONE natural order',
        'record Order(String id, int qty) implements Comparable<Order> {',
        '    public int compareTo(Order o) { return id.compareTo(o.id); }',
        '}',
        '',
        '// Comparator — any number of other orders, made outside',
        'var byQty = Comparator.comparingInt(Order::qty)',
        '        .reversed()',
        '        .thenComparing(Order::id);',
        'orders.sort(byQty);',
        'Comparator.nullsFirst(byQty);',
        '',
        '// sort() is STABLE: equal elements keep their relative order,',
        '// which is what makes chained sorts work.',
        '// TreeSet/TreeMap use compareTo, NOT equals. If the two',
        '// disagree, the set silently drops "duplicates" that are not.',
      ].join('\n'),
    },
  ],
  edges: [],
}
