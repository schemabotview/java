import type { Scene } from '@graphlearning/flow'

// §8/§9 — composition and higher-order methods, on one card. Composition is what makes these
// interfaces worth having as TYPES rather than as syntax: andThen/compose/negate build new
// behaviour out of existing behaviour without either piece knowing. The order trap in `compose`
// is included because it is the one thing everybody gets backwards once.
export const composing: Scene = {
  id: 'composing',
  title: 'Building behaviour out of behaviour',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Composing.java',
      label: [
        'Function<String, String> trim = String::strip;',
        'Function<String, Integer> len = String::length;',
        '',
        'trim.andThen(len)   // trim FIRST, then len. Reads L to R.',
        'len.compose(trim)   // the SAME thing, written backwards.',
        '// Use andThen. compose exists for the maths convention.',
        '',
        'Predicate<Order> big = o -> o.qty() > 100;',
        'Predicate<Order> paid = Order::isPaid;',
        'big.and(paid)   big.or(paid)   big.negate()',
        'Predicate.not(paid)      // for a method reference',
        '',
        'Comparator.comparing(Order::qty).thenComparing(Order::id)',
        '// course 5 §10 was composition all along',
        '',
        '// HIGHER-ORDER: take behaviour, or return it',
        'static <T> List<T> keep(List<T> xs, Predicate<? super T> p)',
        '//                                  ^ PECS — course 6 §7',
        '',
        '// Returning one lets you build a family from a parameter:',
        'static Predicate<Order> minQty(int n) {',
        '    return o -> o.qty() >= n;   // n is captured (§7)',
        '}',
        'orders.removeIf(minQty(100).negate());',
      ].join('\n'),
    },
  ],
  edges: [],
}
