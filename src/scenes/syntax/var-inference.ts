import type { Scene } from '@graphlearning/flow'

// §3 variables — `var` is where Java's reputation for noise actually got fixed, and where people
// then over-apply it. The card is split down the middle by comment: what it infers, and the five
// places it is a compile error. The refusals are the teaching half — every one of them is a case
// where the compiler has nothing on the right-hand side to infer FROM.
export const varInference: Scene = {
  id: 'var-inference',
  title: 'var — inferred, still static',
  padding: 0.14,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Variables.java',
      label: [
        'final int MAX = 100;        // final: reassignment is an error',
        'int count = 0;              // mutable local',
        '',
        '// var infers the type from the initialiser — it is NOT dynamic.',
        'var name  = "Ada";          // String',
        'var total = 0;              // int   (not long, not Integer)',
        'var orders = new ArrayList<Order>();  // ArrayList<Order>',
        'var entry = Map.entry(1, "a");        // names the unnameable',
        '',
        'for (var o : orders) { }    // idiomatic',
        '',
        '// Five refusals — each one has nothing to infer FROM:',
        'var x;                      // no initialiser',
        'var y = null;               // null has no type',
        'var f = () -> 1;            // lambda needs a target type',
        'var a = { 1, 2, 3 };        // array initialiser has none either',
        'class C { var field; }      // fields and parameters: never',
        '',
        '// The trap: var hides the type from the READER, not the compiler.',
        'var result = svc.process(in);   // what is result? unreadable',
      ].join('\n'),
    },
  ],
  edges: [],
}
