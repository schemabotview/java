import type { Scene } from '@graphlearning/flow'

// §3/§5 — the domain and the parser. One card, because the sealed ParseResult is the reason the
// parser has no nulls, no exceptions for expected failures, and no logging buried in it: a bad line
// is a VALUE, returned like any other, and the caller decides. That is course 4's "make illegal
// states unrepresentable" applied to a real function.
export const model: Scene = {
  id: 'project-model',
  title: 'A bad line is a value, not an exception',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'LogEntry.java',
      label: [
        'record LogEntry(Instant at, Level level, String source,',
        '                int millis, String message) {',
        '    LogEntry {                          // compact — course 4 §5',
        '        Objects.requireNonNull(at);',
        '        if (millis < 0) throw new IllegalArgumentException();',
        '    }',
        '}',
        'enum Level { DEBUG, INFO, WARN, ERROR }   // course 4 §2',
        '',
        '// The parser cannot fail "somehow". It returns one of two.',
        'sealed interface ParseResult {',
        '    record Ok(LogEntry entry)              implements ParseResult {}',
        '    record Bad(long line, String raw, String why)',
        '                                           implements ParseResult {}',
        '}',
        '',
        '// So the caller handles BOTH, and the compiler checks it:',
        'switch (parse(line, n)) {',
        '    case Ok(LogEntry e) -> accept(e);       // record pattern',
        '    case Bad b          -> rejected.add(b);',
        '}                       // no default. Add a case and this breaks.',
        '',
        '// A malformed line is EXPECTED input, not an exceptional event',
        '// — course 9 §1. Exceptions stay for what actually cannot work.',
      ].join('\n'),
    },
  ],
  edges: [],
}
