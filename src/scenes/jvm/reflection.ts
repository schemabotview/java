import type { Scene } from '@graphlearning/flow'

// §9/§10 — annotations and reflection, together, because the pair IS the bridge every framework
// crosses. The three-line loop at the bottom is the entire mechanism behind dependency injection,
// JSON binding, JPA and test runners; seeing it once removes most of the magic from every framework
// the reader will ever use.
export const reflection: Scene = {
  id: 'reflection',
  title: 'Code as data — how every framework works',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Reflection.java',
      label: [
        'Class<?> c = order.getClass();      // or Order.class',
        'c.getName()  c.getDeclaredFields()  c.getDeclaredMethods()',
        '',
        'Method m = c.getDeclaredMethod("total", int.class);',
        'm.setAccessible(true);      // ignores private — if the module',
        'Object r = m.invoke(order, 100);   //   opens the package',
        '',
        'Constructor<?> ctor = c.getDeclaredConstructor();',
        'Object fresh = ctor.newInstance();   // frameworks live on this',
        '',
        '// AND THIS IS THE WHOLE TRICK. Every framework you have used:',
        'for (Method m : c.getDeclaredMethods())',
        '    if (m.isAnnotationPresent(Audited.class))',
        '        wrap(m, m.getAnnotation(Audited.class).value());',
        '// Scan the classes. Find the annotated members. Do something.',
        '// Spring, JPA, Jackson and JUnit are all that loop.',
        '// It needs @Retention(RUNTIME) — course 4 §10.',
        '',
        '// THE COSTS',
        '// - No compile-time checking. A renamed method fails at STARTUP.',
        '// - Slower: no inlining across an invoke() the JIT cannot see.',
        '// - It defeats encapsulation, which is why modules push back.',
        '// Use it to BUILD a framework. Rarely in application code.',
      ].join('\n'),
    },
  ],
  edges: [],
}
