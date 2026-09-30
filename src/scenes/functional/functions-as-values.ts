import type { Scene } from '@graphlearning/flow'

// §1 functions-as-values (reused by §10) — the course's frame. The lambda is not a new kind of
// thing in Java: it is an implementation of a one-method interface, written without the ceremony.
// Drawn as the same object arrived at three ways, because that identity is what makes the rest of
// the course (and every Stream signature) legible instead of magical.
export const functionsAsValues: Scene = {
  id: 'functions-as-values',
  padding: 0.09,
  nodes: [
    {
      id: 'same',
      label: 'Three ways to write the SAME thing',
      pattern: 'group',
      icon: 'copy',
      flow: 'TB',
      children: [
        { id: 'iface', label: 'interface Predicate<T>', pattern: 'service', icon: 'braces', sub: 'ONE abstract method: boolean test(T t)' },
        {
          id: 'three',
          label: 'Every one of these implements it',
          pattern: 'group',
          icon: 'layers',
          cols: 3,
          children: [
            { id: 'named', label: 'A named class', pattern: 'external', icon: 'filecode', sub: 'class Big implements Predicate<Order>' },
            { id: 'anon', label: 'An anonymous class', pattern: 'network', icon: 'package', sub: 'new Predicate<>() { public boolean test… }' },
            { id: 'lambda', label: 'A lambda', pattern: 'storage', icon: 'zap', sub: 'o -> o.qty() > 100' },
          ],
        },
        { id: 'obj', label: 'One object, at run time', pattern: 'storage', icon: 'boxes', sub: 'the lambda is not a function — it is an instance' },
        { id: 'use', label: 'orders.removeIf(big)', pattern: 'service', icon: 'filter', sub: 'behaviour, passed as an argument' },
      ],
      edges: [
        { source: 'iface', target: 'three', label: 'implemented by' },
        { source: 'three', target: 'obj' },
        { source: 'obj', target: 'use' },
      ],
    },
  ],
  edges: [],
}
