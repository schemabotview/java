import type { Scene } from '@graphlearning/flow'

// §8 type-erasure — the single fact that explains every generics restriction in the language. The
// type argument exists for javac and is GONE in the bytecode: one compiled class serves every
// instantiation. Drawn as the compile boundary, with the consequences hanging off the far side,
// because "why can't I do X with generics" always resolves to "X needs the type at run time".
export const erasure: Scene = {
  id: 'erasure',
  padding: 0.09,
  nodes: [
    {
      id: 'boundary',
      label: 'The type argument does not survive javac',
      pattern: 'group',
      icon: 'scale',
      flow: 'TB',
      children: [
        {
          id: 'src',
          label: 'What you wrote',
          pattern: 'service',
          icon: 'filecode',
          cols: 2,
          children: [
            { id: 's1', label: 'List<Order>', pattern: 'service', icon: 'boxes', sub: 'checked here, thoroughly' },
            { id: 's2', label: 'List<String>', pattern: 'service', icon: 'boxes', sub: 'a different type, to javac' },
          ],
        },
        { id: 'erased', label: 'What the JVM sees', pattern: 'external', icon: 'binary', sub: 'List — both of them. One class, one Box.class.' },
        {
          id: 'costs',
          label: 'Everything erasure forbids',
          pattern: 'warn',
          icon: 'bell',
          cols: 2,
          children: [
            { id: 'c1', label: 'new T()  ·  new T[n]', pattern: 'warn', icon: 'crop', sub: 'no type at run time to instantiate' },
            { id: 'c2', label: 'x instanceof List<Order>', pattern: 'warn', icon: 'search', sub: 'only the raw List can be tested' },
            { id: 'c3', label: 'catch (MyEx<T> e)', pattern: 'warn', icon: 'bell', sub: 'dispatch is by runtime type' },
            { id: 'c4', label: 'List<int>', pattern: 'warn', icon: 'calculator', sub: 'erases to Object — so boxing (course 2 §2)' },
          ],
        },
        { id: 'why', label: 'Why: compatibility', pattern: 'network', icon: 'clock', sub: 'in 2004, every old .class file had to keep running' },
      ],
      edges: [
        { source: 'src', target: 'erased', label: 'javac erases' },
        { source: 'erased', target: 'costs' },
        { source: 'costs', target: 'why' },
      ],
    },
  ],
  edges: [],
}
