import type { Scene } from '@graphlearning/flow'

// §2 enums and §3 enums-with-behaviour — read twice. An enum constant is a real object, and that is
// the fact people miss: it can carry fields, implement an interface, and override a method PER
// CONSTANT, which turns a switch over a status into behaviour attached to the status itself.
export const enums: Scene = {
  id: 'enums',
  title: 'An enum constant is an object',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Status.java',
      label: [
        'enum Status { NEW, PAID, SHIPPED }        // the simple form',
        '',
        '// Type-safe: Status.NEW is not an int and not a String, so',
        '// no caller can pass "shiped". The compiler catches it.',
        '// Each constant is a singleton — == is correct, and safe.',
        '',
        'enum Status {',
        '    NEW(false), PAID(false), SHIPPED(true);   // arguments!',
        '',
        '    private final boolean terminal;           // fields',
        '    Status(boolean t) { this.terminal = t; }  // private ctor',
        '    boolean isTerminal() { return terminal; }',
        '}',
        '',
        '// Behaviour PER CONSTANT — each one overrides the method.',
        'enum Op {',
        '    PLUS  { int apply(int a, int b) { return a + b; } },',
        '    TIMES { int apply(int a, int b) { return a * b; } };',
        '    abstract int apply(int a, int b);',
        '}',
        '',
        'Status.values()  Status.valueOf("PAID")  s.ordinal()',
        '// EnumMap / EnumSet: array-backed, far faster than HashMap',
      ].join('\n'),
    },
  ],
  edges: [],
}
