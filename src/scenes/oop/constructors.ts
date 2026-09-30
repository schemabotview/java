import type { Scene } from '@graphlearning/flow'

// §4 constructors — the initialisation ORDER, which is where the genuinely surprising bug lives:
// a superclass constructor runs before the subclass's fields are assigned, so an overridden method
// called from a constructor sees null. Shown as a numbered chain because the order is the content.
export const constructors: Scene = {
  id: 'constructors',
  title: 'Construction order — and why it bites',
  padding: 0.14,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Construction.java',
      label: [
        'class Account {',
        '    private final String id;',
        '    private long balance;',
        '',
        '    Account(String id, long opening) {',
        '        if (opening < 0) throw new IllegalArgumentException();',
        '        this.id = id;          // this. disambiguates field/param',
        '        this.balance = opening;',
        '    }',
        '    Account(String id) { this(id, 0); }   // delegate: FIRST line',
        '}',
        '',
        '// No constructor written? You get a no-arg default.',
        '// Write ANY constructor and that default disappears.',
        '',
        '// Order when you call new Savings("A-1"):',
        '//   1. super(...)        parent constructor, all the way to Object',
        '//   2. field initialisers + instance blocks, top to bottom',
        '//   3. this constructor body',
        '',
        '// The trap: 1 runs BEFORE 2. A method the parent calls and the',
        '// child overrides will see the child fields still null / zero.',
      ].join('\n'),
    },
  ],
  edges: [],
}
