import type { Scene } from '@graphlearning/flow'

// §7 instanceof-patterns, §8 switch-patterns, §9 record-patterns — one card read three times, each
// pass one rung further up. The progression is the content: test-and-cast becomes test-and-bind,
// becomes a total switch over a sealed family, becomes destructuring that names the parts. Keeping
// it on one card lets the reader see rung n+1 as a compression of rung n.
export const patterns: Scene = {
  id: 'patterns',
  title: 'Four rungs: cast → bind → switch → destructure',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Patterns.java',
      label: [
        '// 1. Before 16 — name the type three times, and cast',
        'if (o instanceof Order) {',
        '    Order ord = (Order) o;',
        '    total += ord.qty();',
        '}',
        '',
        '// 2. Type pattern (16+) — test and BIND in one step.',
        '// `ord` is in scope exactly where the test passed.',
        'if (o instanceof Order ord && ord.qty() > 0) total += ord.qty();',
        'if (!(o instanceof Order ord)) return;   // and after this,',
        'total += ord.qty();                      // ord is in scope',
        '',
        '// 3. Pattern switch (21) over a SEALED family — no default,',
        '//    and a new permitted type breaks this until handled.',
        'String describe(Event e) {',
        '    return switch (e) {',
        '        case Placed p  -> "placed "  + p.id();',
        '        case Paid pd when pd.amount() > 1000 -> "big sale";',
        '        case Paid pd   -> "paid " + pd.amount();',
        '        case Shipped s -> "shipped " + s.carrier();',
        '    };',
        '}',
        '',
        '// 4. Record pattern — destructure, and nest',
        'case Placed(String id, Customer(String name, var tier))',
        '        -> id + " for " + name + " (" + tier + ")";',
        '// case null is now writable; otherwise switch still throws NPE',
      ].join('\n'),
    },
  ],
  edges: [],
}
