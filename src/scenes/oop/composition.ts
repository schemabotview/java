import type { Scene } from '@graphlearning/flow'

// §11 composition — the closer, and the one piece of judgement this course exists to hand over.
// `extends` is the tightest coupling Java offers: it inherits the parent's whole surface including
// the parts that make no sense, and a change to the parent changes you. The card shows the textbook
// counter-example rather than arguing in the abstract.
export const composition: Scene = {
  id: 'composition',
  title: 'Composition over inheritance',
  padding: 0.14,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Composition.java',
      label: [
        '// Inheritance says IS-A, and it inherits EVERYTHING.',
        'class Stack extends ArrayList<String> { }',
        '// ...and now a Stack has add(int, e), remove(0), set(3, x).',
        '// You cannot take them away. The invariant is gone.',
        '',
        '// Composition says HAS-A. You choose the surface.',
        'final class Stack {',
        '    private final List<String> items = new ArrayList<>();',
        '',
        '    void push(String s) { items.add(s); }',
        '    String pop() { return items.remove(items.size() - 1); }',
        '    boolean isEmpty() { return items.isEmpty(); }',
        '    // no add(int, e). No set. Nothing can violate LIFO.',
        '}',
        '',
        '// Use extends when: it is genuinely a subtype, the parent was',
        '// DESIGNED for it (documented, non-final hooks), and you want',
        '// every future parent method too. Otherwise: hold a field.',
        '',
        '// A non-static inner class holds a hidden reference to its',
        '// outer instance — which keeps the outer alive. Prefer static.',
      ].join('\n'),
    },
  ],
  edges: [],
}
