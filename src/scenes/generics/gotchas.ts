import type { Scene } from '@graphlearning/flow'

// §9 gotchas — every one of these is erasure (§8) showing through somewhere, collected so the
// reader can recognise the shape rather than memorise a list. The raw-type line is the one that
// matters most in real code: a single raw variable disables generic checking for everything it
// touches, and the only symptom is a warning nobody reads.
export const gotchas: Scene = {
  id: 'gotchas',
  title: 'Every one of these is erasure showing through',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Gotchas.java',
      label: [
        '// 1. Generics are INVARIANT. This is the fix for course 2 §8.',
        'List<Object> l = listOfStrings;   // will not compile',
        '// Arrays were covariant and threw at run time instead.',
        '',
        '// 2. You cannot make an array of a type parameter',
        'T[] a = new T[n];                 // no type at run time',
        '@SuppressWarnings("unchecked")    // the standard workaround',
        'T[] a = (T[]) new Object[n];      // keep it private!',
        '',
        '// 3. Overloads that erase to the same signature clash',
        'void f(List<String> s) { }',
        'void f(List<Integer> i) { }       // same erasure: f(List)',
        '',
        '// 4. Raw types poison everything they touch',
        'List raw = new ArrayList<Order>();',
        'raw.add("nonsense");              // warning only',
        '// A single raw variable disables generic checking for EVERY',
        '// generic call on it — not just the one you meant.',
        '',
        '// 5. Generic varargs: the array is unchecked',
        '@SafeVarargs                      // "I do not store or expose it"',
        'static <T> List<T> listOf(T... xs) { … }',
        '',
        '// 6. Need the type at run time? Pass it explicitly.',
        '<T> T read(String json, Class<T> type)   // the type token',
      ].join('\n'),
    },
  ],
  edges: [],
}
