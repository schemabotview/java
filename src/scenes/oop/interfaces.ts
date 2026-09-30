import type { Scene } from '@graphlearning/flow'

// §9 interfaces — a contract with no state, and the two additions that changed what an interface is
// for. `default` let existing interfaces grow methods without breaking every implementor (which is
// exactly how Collection got stream() in Java 8 without a single caller changing), and that in turn
// created the only inheritance conflict Java admits, which the compiler makes you resolve by hand.
export const interfaces: Scene = {
  id: 'interfaces',
  title: 'Interface — a contract, and no state',
  padding: 0.14,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Interfaces.java',
      label: [
        'interface Auditable {',
        '    String id();                 // implicitly public abstract',
        '',
        '    // default: a BODY. Implementors inherit it for free —',
        '    // which is how Collection gained stream() in Java 8',
        '    // without breaking a single existing implementor.',
        '    default String tag() { return "audit:" + id(); }',
        '',
        '    static Auditable of(String s) { return () -> s; }',
        '',
        '    int LIMIT = 100;   // fields are public static final. Always.',
        '}',
        '',
        '// A class extends ONE class and implements MANY interfaces.',
        'class Savings extends Account implements Auditable, Comparable<…>',
        '',
        '// Two defaults with the same signature? The compiler refuses',
        '// to guess. You override and pick:',
        '//     public String tag() { return Auditable.super.tag(); }',
      ].join('\n'),
    },
  ],
  edges: [],
}
