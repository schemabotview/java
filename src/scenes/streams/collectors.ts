import type { Scene } from '@graphlearning/flow'

// §9 collectors — the one terminal that is itself extensible, and the reason `groupingBy` reads
// like SQL. The downstream argument is the idea worth drawing out: a Collector can take another
// Collector, so grouping composes to any depth, which is what turns a five-line loop with a
// computeIfAbsent into one expression.
export const collectors: Scene = {
  id: 'collectors',
  title: 'Collectors — and the downstream argument',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Collecting.java',
      label: [
        '.collect(toList())   toSet()   toUnmodifiableList()',
        '.collect(toMap(Order::id, o -> o))',
        '// toMap THROWS on a duplicate key. Pass a merge function:',
        '.collect(toMap(Order::id, o -> o, (a, b) -> b))',
        '',
        '.collect(joining(", ", "[", "]"))     // one StringBuilder',
        '.collect(counting())  summingInt(…)  averagingInt(…)',
        '',
        '// GROUPING — the one that replaces a whole loop',
        'Map<String, List<Order>> byCust =',
        '    orders.collect(groupingBy(Order::customer));',
        '',
        '// ...and the second argument is ANOTHER collector, so it nests',
        'Map<String, Long> countPer =',
        '    orders.collect(groupingBy(Order::customer, counting()));',
        '',
        'Map<String, Map<Status, List<Order>>> twoDeep =',
        '    orders.collect(groupingBy(Order::customer,',
        '                   groupingBy(Order::status)));',
        '',
        'partitioningBy(p)   // groupingBy for a boolean: always 2 keys',
        'teeing(c1, c2, merge)   // 12+: two collectors, one pass',
        '',
        '// A Collector is (supplier, accumulator, combiner, finisher).',
        '// The combiner is why a parallel stream can collect at all.',
      ].join('\n'),
    },
  ],
  edges: [],
}
