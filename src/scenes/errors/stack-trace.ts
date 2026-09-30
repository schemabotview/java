import type { Scene } from '@graphlearning/flow'

// §7 reading-a-stack-trace — the debugging skill itself, and one nobody is taught. A real trace,
// annotated: the top frame is where it was THROWN, the bottom is where it started, "Caused by"
// sections read in reverse chronological order, and the lowest Caused by is the original failure.
// Shown as a trace because recognising the shape is the whole lesson.
export const stackTrace: Scene = {
  id: 'stack-trace',
  title: 'Read it bottom-up, and find the last "Caused by"',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'stderr',
      label: [
        'Exception in thread "main" com.graphl.AppException: import failed',
        '    at com.graphl.Importer.run(Importer.java:41)   <- thrown HERE',
        '    at com.graphl.Main.main(Main.java:12)          <- started here',
        'Caused by: com.graphl.BadRecord: line 3: "qty=x"',
        '    at com.graphl.Parser.parse(Parser.java:88)',
        '    at com.graphl.Importer.run(Importer.java:38)',
        '    ... 1 more                    <- frames identical to above',
        'Caused by: java.lang.NumberFormatException: For input string: "x"',
        '    at java.base/java.lang.Integer.parseInt(Integer.java:652)',
        '    at com.graphl.Parser.parse(Parser.java:85)   <- THE REAL CAUSE',
        '    ... 2 more',
        '',
        '// How to read it:',
        '// 1. Go to the LAST "Caused by". That is what actually failed.',
        '// 2. Find the first frame in YOUR package. That is your line.',
        '// 3. "... N more" means N frames identical to the block above.',
        '// 4. The first line is the OUTERMOST wrapper — usually the',
        '//    least informative thing in the whole trace.',
        '',
        '// Suppressed: thrown by close() during try-with-resources,',
        '// attached rather than allowed to replace the real exception.',
      ].join('\n'),
    },
  ],
  edges: [],
}
