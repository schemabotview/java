import type { Scene } from '@graphlearning/flow'

// §9 methods — signature, overloading and the pass-by-value question, which is the single most
// argued-about sentence in Java. It is settled by the §2 picture: the ARGUMENT is always copied;
// when the argument is a reference, the copy points at the same object, so the callee can mutate
// what it sees but can never rebind the caller's variable. Both halves are shown, because seeing
// only one of them is how the myth survives.
export const methods: Scene = {
  id: 'methods',
  title: 'Methods — and what "pass by value" really means',
  padding: 0.14,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Methods.java',
      label: [
        '//  modifiers   return   name    parameters',
        'public static  int     total(List<Order> os) { return …; }',
        '// The SIGNATURE is name + parameter types. Return type is NOT',
        '// part of it — two methods differing only by return will not compile.',
        '',
        '// Overloading: same name, different parameter types.',
        'void log(String s)  { }',
        'void log(int i)     { }',
        'void log(Object o)  { }',
        'log(42);        // picks log(int): exact match beats widening',
        '                // beats boxing beats varargs, in that order',
        '',
        'int sum(int... ns) { }     // varargs: really an int[]',
        'sum(); sum(1); sum(1, 2);  // all legal — mind the empty call',
        '',
        '// Java is pass-by-value. Always. The VALUE of a reference',
        '// is the address, so a copy of it points at the same object.',
        'void rename(Order o) { o.setId("B-9"); }  // caller SEES this',
        'void swap(Order o)   { o = new Order(); } // caller does NOT',
      ].join('\n'),
    },
  ],
  edges: [],
}
