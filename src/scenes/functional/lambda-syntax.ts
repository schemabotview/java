import type { Scene } from '@graphlearning/flow'

// §2 lambdas and §3 method-references — one card, two passes. The four method-reference forms are
// the part people half-know: three of them are obvious and the fourth (an instance method OF an
// arbitrary object of the type) is the one that makes String::toUpperCase legal as a Function, and
// it is worth naming rather than absorbing by pattern-matching.
export const lambdaSyntax: Scene = {
  id: 'lambda-syntax',
  title: 'Lambdas, and the four method-reference forms',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Lambdas.java',
      label: [
        '(Order o) -> { return o.qty() > 100; }   // the full form',
        'o -> o.qty() > 100     // types inferred, braces+return dropped',
        '() -> log.info("hi")                     // no parameters',
        '(a, b) -> a + b                          // two',
        '(var a, var b) -> a + b   // var, if you want an annotation',
        '',
        '// TARGET TYPING: the lambda has no type of its own. The type',
        '// it is ASSIGNED to decides what it means. Identical text,',
        '// two different interfaces:',
        'Predicate<Order> p = o -> o.qty() > 100;',
        'Function<Order, Boolean> f = o -> o.qty() > 100;',
        '',
        '// METHOD REFERENCES — four forms',
        'System.out::println     // 1. bound: THIS object’s method',
        'Integer::parseInt       // 2. static',
        'String::toUpperCase     // 3. unbound: the RECEIVER becomes',
        '                        //    the first parameter',
        'ArrayList::new          // 4. constructor',
        '',
        '// Form 3 is the one people half-know. As a Function<String,',
        '// String>, s -> s.toUpperCase() and String::toUpperCase are',
        '// the same thing: the argument supplies the receiver.',
      ].join('\n'),
    },
  ],
  edges: [],
}
