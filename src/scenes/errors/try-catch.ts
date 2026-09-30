import type { Scene } from '@graphlearning/flow'

// §4/§5/§6 — the syntax, and the three ways people lose information with it. Every one of the bad
// lines here compiles and runs; each one destroys something the person debugging at 3am needed.
// That is why they are shown as code rather than described: the defect is a line you can recognise.
export const tryCatch: Scene = {
  id: 'try-catch',
  title: 'The three ways to destroy the evidence',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Catching.java',
      label: [
        'try {',
        '    return parse(line);',
        '} catch (NumberFormatException | DateTimeParseException e) {',
        '    // multi-catch: e is effectively final, and its type is',
        '    // the nearest common supertype',
        '    throw new BadRecord(line, e);   // e is the CAUSE',
        '} finally {',
        '    // runs on success, on throw, and on return',
        '}',
        '',
        '// 1. Swallowing. The failure happened and nobody will know.',
        'catch (IOException e) { }',
        'catch (IOException e) { log.error("failed"); }  // no e',
        '',
        '// 2. Losing the cause. The stack trace now starts HERE.',
        'catch (IOException e) { throw new AppException("boom"); }',
        'catch (IOException e) { throw new AppException("boom", e); }  // ok',
        '',
        '// 3. finally with a return: it DISCARDS the exception',
        'try { throw new IOException(); } finally { return 1; }',
        '// returns 1. The IOException is gone. Never return in finally.',
        '',
        '// Order matters: subclass first, or it is unreachable code.',
        'catch (Exception e)     // catching this catches your bugs too',
        'catch (Throwable t)     // ...and OutOfMemoryError. Almost never.',
      ].join('\n'),
    },
  ],
  edges: [],
}
