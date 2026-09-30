import type { Scene } from '@graphlearning/flow'

// §11 optional — a container of zero or one, and the point is that it composes: map and flatMap
// work on it exactly as they do on a Stream, so an absent value flows through a chain without a
// single null check. Shown as code because the anti-patterns are syntactic, and they are most of
// what goes wrong with Optional in real codebases.
export const optional: Scene = {
  id: 'optional',
  title: 'Optional — a stream of zero or one',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Optionals.java',
      label: [
        'Optional<Order> found = orders.stream().filter(big).findFirst();',
        '',
        '// It composes — map and flatMap, exactly as on a Stream.',
        'String name = repo.findById(id)          // Optional<Order>',
        '        .map(Order::customer)            // Optional<Customer>',
        '        .flatMap(Customer::email)        // returns an Optional',
        '        .map(String::toLowerCase)',
        '        .orElse("unknown");',
        '// Absent at ANY step and the whole chain is absent. No nulls.',
        '',
        'found.ifPresent(o -> …);  found.ifPresentOrElse(o -> …, () -> …);',
        'found.orElseGet(() -> expensive());   // lazy — course 7 §5',
        'found.orElseThrow(() -> new NotFound(id));',
        'found.stream()            // 9+: drop empties inside a flatMap',
        '',
        '// THE ANTI-PATTERNS',
        'if (o.isPresent()) { use(o.get()); }  // a null check, wordier',
        'Optional<Order> field;    // NOT Serializable; use null in a field',
        'void f(Optional<X> x)     // a parameter: now callers pass empty',
        'o.orElse(new Order())     // eager — builds it every time',
        '',
        '// It is a RETURN type, for "this may legitimately find nothing".',
      ].join('\n'),
    },
  ],
  edges: [],
}
