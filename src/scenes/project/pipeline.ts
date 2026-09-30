import type { Scene } from '@graphlearning/flow'

// §4/§6/§7 — reading, aggregating, and the generic seam. On one card because the generic Stage is
// only justified by seeing the three concrete stages it abstracts: course 6's advice was to prefer
// a generic METHOD until a generic type earns itself, and this is what earning it looks like.
export const pipeline: Scene = {
  id: 'project-pipeline',
  title: 'Read, aggregate, and the one abstraction that earned itself',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Pipeline.java',
      label: [
        '// READ — constant memory, whatever the file size (course 9 §10)',
        'try (var lines = Files.lines(path, UTF_8)) {',
        '    return lines.map(l -> parse(l, counter.incrementAndGet()));',
        '}   // closed on every path. Files.lines is the one you must.',
        '',
        '// AGGREGATE — the loop that groupingBy replaced (course 8 §9)',
        'Map<String, Long> errorsBySource = entries',
        '        .filter(e -> e.level() == Level.ERROR)',
        '        .collect(groupingBy(LogEntry::source, counting()));',
        '',
        'Map<Level, IntSummaryStatistics> latency = entries',
        '        .collect(groupingBy(LogEntry::level,',
        '                 summarizingInt(LogEntry::millis)));',
        '// count, min, max, sum and mean — in ONE pass.',
        '',
        '// THE GENERIC SEAM — three stages had the same shape, so:',
        'interface Stage<I, O> {                   // course 6 §3',
        '    Stream<O> apply(Stream<I> in);',
        '    default <R> Stage<I, R> then(Stage<? super O, R> next) {',
        '        return in -> next.apply(apply(in));   // PECS — c6 §7',
        '    }',
        '}',
        '// One abstract method ⇒ a lambda IS a Stage (course 7 §1).',
      ].join('\n'),
    },
  ],
  edges: [],
}
