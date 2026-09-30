import type { Scene } from '@graphlearning/flow'

// §4 records and §5 record-validation — read twice. The first pass is what the compiler generates;
// the second is the compact constructor, which is the only place a record gets to have an opinion.
// Shown as one card because the generated half and the hand-written half belong next to each other:
// the whole point of a record is how little you are allowed to write.
export const records: Scene = {
  id: 'records',
  title: 'record — a name for a shape',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Order.java',
      label: [
        'record Order(String id, int qty) {}',
        '',
        '// The compiler generates, from that one line:',
        '//   private final String id;  private final int qty;',
        '//   Order(String id, int qty)        the canonical ctor',
        '//   id()  qty()                      accessors (no "get")',
        '//   equals  hashCode                 over ALL components',
        '//   toString                         Order[id=A-1, qty=2]',
        '',
        '// It is implicitly final, and it cannot extend anything.',
        '// Shallowly immutable: the FIELDS cannot be reassigned.',
        '',
        'record Order(String id, int qty, List<Tag> tags) {',
        '    Order {                     // COMPACT constructor',
        '        if (qty <= 0) throw new IllegalArgumentException();',
        '        id = id.strip();        // normalise — no this.',
        '        tags = List.copyOf(tags);   // defensive copy',
        '    }',
        '    static Order of(String id) { return new Order(id, 1); }',
        '    int total(int price) { return qty * price; }',
        '}',
        '// Without that copyOf, the caller still holds the list',
        '// and can mutate it. Immutable field, mutable contents.',
      ].join('\n'),
    },
  ],
  edges: [],
}
