import type { Scene } from '@graphlearning/flow'

// §8 abstract-classes — the template-method shape, which is the honest reason abstract classes
// still exist alongside interfaces: a partially-built thing that owns STATE and a fixed algorithm,
// leaving named holes for subclasses. Shown as one card so the fixed part and the holes sit
// adjacent; split across two boxes the reader loses which lines the subclass may not touch.
export const abstractClass: Scene = {
  id: 'abstract-class',
  title: 'Abstract — a half-built class with named holes',
  padding: 0.14,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Abstract.java',
      label: [
        'abstract class Account {',
        '    protected long balance;          // STATE — interfaces',
        '                                     // cannot have this',
        '    // the fixed algorithm — subclasses may not reorder it',
        '    final void withdraw(long n) {',
        '        if (n <= 0) throw new IllegalArgumentException();',
        '        if (!allowed(n)) throw new InsufficientFunds(id, n);',
        '        balance -= n;',
        '        audit("withdraw", n);',
        '    }',
        '',
        '    // the hole. No body. Subclasses MUST fill it.',
        '    protected abstract boolean allowed(long n);',
        '}',
        '',
        'class Savings extends Account {',
        '    protected boolean allowed(long n) { return balance >= n; }',
        '}',
        '',
        '// new Account(...)  -> will not compile: it is abstract.',
        '// A class with one abstract method is abstract; a class with',
        '// none may still be declared abstract to forbid instantiation.',
      ].join('\n'),
    },
  ],
  edges: [],
}
