import type { Scene } from '@graphlearning/flow'

// §8 arrays — the fixed-size container, and the one place Java's type system knowingly lies. Array
// covariance (Object[] may hold a String[]) was a 1995 concession made because generics did not
// exist yet; it moves a type error from compile time to run time, and ArrayStoreException is the
// noise it makes. Worth a section because it is the exact defect generics were designed to fix,
// which is the argument course 6 opens with.
export const arrayCovariance: Scene = {
  id: 'array-covariance',
  title: 'Arrays — fixed size, and a hole in the type system',
  padding: 0.14,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Arrays.java',
      label: [
        'int[] counts = new int[3];       // {0, 0, 0} — zeroed, never null',
        'String[] ids = {"A-1", "A-2"};   // literal form',
        'ids.length                       // a FIELD, not a method',
        'ids[2]                           // ArrayIndexOutOfBoundsException',
        '',
        '// Size is fixed at creation. Growing means copying.',
        'ids = Arrays.copyOf(ids, 4);     // or just use a List',
        '',
        'Arrays.toString(ids)   // ids.toString() prints [Ljava.lang.String;@1b',
        'int[][] grid = new int[3][4];    // an array OF arrays, not a matrix',
        '',
        '// The hole: arrays are COVARIANT. This compiles.',
        'Object[] objs = ids;             // String[] IS-A Object[]  (!)',
        'objs[0] = 42;                    // compiles fine...',
        '// => ArrayStoreException at RUNTIME',
        '',
        '// A List refuses the same thing at COMPILE time:',
        '// List<Object> l = listOfStrings;   // will not compile',
        '// That refusal is what generics exist for — course 6.',
      ].join('\n'),
    },
  ],
  edges: [],
}
