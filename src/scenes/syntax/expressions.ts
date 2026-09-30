import type { Scene } from '@graphlearning/flow'

// §4 expressions — the distinction (an expression HAS a value, a statement DOES something) plus the
// three arithmetic surprises that catch everyone exactly once: silent int overflow, integer
// division truncating, and binary floating point not holding 0.1. All three are shown with their
// real output, because being told is not the same as seeing 2147483647 + 1 come back negative.
export const expressions: Scene = {
  id: 'expressions',
  title: 'Expressions have values. Statements do things.',
  padding: 0.14,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Expressions.java',
      label: [
        'int a = 2 + 3 * 4;       // expression: 14. Precedence: * before +',
        'boolean ok = a > 10 && name != null;   // && short-circuits',
        'String s = ok ? "yes" : "no";          // ternary IS an expression',
        '',
        'if (ok) { }              // statement: no value, cannot be assigned',
        'count++;                 // statement — but ++ is also an expression',
        '',
        '// 1. int overflow is SILENT — it wraps, it does not throw',
        'int max = Integer.MAX_VALUE;   // 2147483647',
        'max + 1                        // => -2147483648',
        'Math.addExact(max, 1)          // => throws ArithmeticException',
        '',
        '// 2. int / int is integer division — the remainder is dropped',
        '7 / 2        // => 3      (not 3.5)',
        '7 % 2        // => 1      remainder',
        '7 / 2.0      // => 3.5    one double promotes the whole expression',
        '',
        '// 3. double is binary — it cannot hold 0.1 exactly',
        '0.1 + 0.2    // => 0.30000000000000004',
        '// money: use BigDecimal, or count in whole pence as a long',
      ].join('\n'),
    },
  ],
  edges: [],
}
