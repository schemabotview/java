import type { Scene } from '@graphlearning/flow'

// §3–§7 — the operation catalogue on one card, read five times. Kept together because the value is
// in seeing which column an operation sits in: creating, element-wise, stateful, or terminal. The
// stateful column is the one worth being able to name, since those are the operations that cannot
// short-circuit and that change what a parallel stream costs.
export const operations: Scene = {
  id: 'stream-operations',
  title: 'Create · transform · finish',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Operations.java',
      label: [
        '// CREATING',
        'coll.stream()   Arrays.stream(a)   Stream.of(a, b)',
        'IntStream.range(0, 10)        // primitive — no boxing',
        'Files.lines(path)             // lazy, and must be closed',
        'Stream.iterate(1, n -> n * 2) Stream.generate(Math::random)',
        '',
        '// ELEMENT-WISE — one in, zero or more out. Can short-circuit.',
        '.filter(p)      keep the ones that match',
        '.map(f)         change each one',
        '.flatMap(f)     each element becomes a STREAM; they concat',
        '.mapMulti(…)    21+, the non-allocating flatMap',
        '.peek(c)        debugging only — never for side effects',
        '',
        '// STATEFUL — must see more than one element. No short-circuit.',
        '.sorted(cmp)    buffers EVERYTHING before emitting anything',
        '.distinct()     remembers what it has seen (equals/hashCode)',
        '.limit(n)  .skip(n)  .takeWhile(p)  .dropWhile(p)',
        '',
        '// TERMINAL — runs the pipeline, and the stream is spent',
        '.toList()                     // 16+, immutable. Use this.',
        '.collect(toList())            // the older, mutable form',
        '.forEach(c)  .count()  .reduce(…)',
        '.anyMatch(p) .allMatch(p) .noneMatch(p)   // short-circuit',
        '.findFirst() .findAny()       // Optional — course 8 §11',
        '.min(cmp) .max(cmp)  .sum() .average()    // on IntStream',
      ].join('\n'),
    },
  ],
  edges: [],
}
