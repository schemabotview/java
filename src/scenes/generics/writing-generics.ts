import type { Scene } from '@graphlearning/flow'

// §2–§5 — using, declaring, generic methods and bounds, on one card read four times. They belong
// together because the syntax is the same mechanism at four scales, and the only genuinely new
// piece at each rung is where the type parameter is DECLARED: on the class, on the method, or
// bounded so the body may call something.
export const writingGenerics: Scene = {
  id: 'writing-generics',
  title: 'Where the type parameter is declared',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Generics.java',
      label: [
        '// USING — the diamond infers the right-hand side',
        'Map<String, List<Order>> byId = new HashMap<>();',
        'var os = new ArrayList<Order>();      // var: name it on the right',
        '',
        '// DECLARING — <T> after the class name scopes T to the class',
        'final class Box<T> {',
        '    private final T value;',
        '    Box(T value) { this.value = value; }',
        '    T get() { return value; }',
        '    <R> Box<R> map(Function<T, R> f) {   // R is this METHOD’s',
        '        return new Box<>(f.apply(value));',
        '    }',
        '}',
        '// T E K V R — the conventions: Type, Element, Key, Value, Return',
        '',
        '// A GENERIC METHOD declares its own <T>, before the return type.',
        'static <T> List<T> firstTwo(List<T> src) { … }',
        '// Static methods MUST: a static method cannot see a class T.',
        '',
        '// BOUNDED — <T extends Comparable<T>> is a PROMISE about T,',
        '// and it is what lets the body call compareTo at all.',
        'static <T extends Comparable<T>> T max(List<T> xs) {',
        '    T best = xs.get(0);',
        '    for (T x : xs) if (x.compareTo(best) > 0) best = x;',
        '    return best;',
        '}',
        '// Several bounds: <T extends Number & Comparable<T>> (class first)',
      ].join('\n'),
    },
  ],
  edges: [],
}
