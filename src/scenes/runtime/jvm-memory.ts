import type { Scene } from '@graphlearning/flow'

// §9 the-jvm-sketch (reused and deepened in the `jvm` course) — where a running program's data
// actually lives. The split that matters on day one: the STACK is per-thread and holds frames and
// primitive locals; the HEAP is shared by every thread and holds every object; metaspace holds the
// class definitions themselves. Almost every Java memory question ("is this copied?", "why is this
// null?", "what leaks?") is answered by knowing which of the three a thing sits in.
//
// Laid out as two rows rather than three columns: the two live-data regions side by side, the
// class-definition region beneath them. Three columns fits the pane by WIDTH and leaves most of its
// height empty, which shrinks every glyph in the scene.
//
// Edge labels are kept to one word — between two wide containers a longer pill lands on a border
// rather than in the gap.
export const jvmMemory: Scene = {
  id: 'jvm-memory',
  padding: 0.08,
  nodes: [
    {
      id: 'process',
      label: 'One JVM process',
      pattern: 'group',
      icon: 'cpu',
      flow: 'TB',
      children: [
        {
          id: 'live',
          label: 'Live data',
          pattern: 'group',
          icon: 'activity',
          flow: 'LR',
          children: [
            {
              id: 'stacks',
              label: 'Stacks · one per thread',
              pattern: 'network',
              icon: 'layers',
              flow: 'TB',
              children: [
                { id: 'frame2', label: 'total(items)', pattern: 'network', icon: 'braces', sub: 'locals: int sum, Order o' },
                { id: 'frame1', label: 'main(String[])', pattern: 'network', icon: 'braces', sub: 'locals: args, List orders' },
              ],
              edges: [{ source: 'frame1', target: 'frame2', label: 'calls' }],
            },
            {
              id: 'heap',
              label: 'Heap · shared by every thread',
              pattern: 'storage',
              icon: 'database',
              cols: 2,
              children: [
                { id: 'o1', label: 'Order@1f3a', pattern: 'storage', icon: 'package', sub: 'id="A-1", qty=2' },
                { id: 'o2', label: 'Order@7b2c', pattern: 'storage', icon: 'package', sub: 'id="A-2", qty=5' },
                { id: 'list', label: 'ArrayList@44e1', pattern: 'storage', icon: 'boxes', sub: 'holds references, not objects' },
                { id: 'str', label: 'String@0c9d', pattern: 'storage', icon: 'tag', sub: '"A-1" — objects too' },
              ],
            },
          ],
          edges: [{ source: 'stacks', target: 'heap', label: 'references' }],
        },
        {
          id: 'meta',
          label: 'Metaspace · the classes themselves',
          pattern: 'external',
          icon: 'binary',
          flow: 'LR',
          children: [
            { id: 'klass', label: 'class Order', pattern: 'external', icon: 'braces', sub: 'fields, methods, bytecode' },
            { id: 'code', label: 'JIT code cache', pattern: 'external', icon: 'zap', sub: 'native code for hot methods' },
          ],
        },
      ],
      edges: [{ source: 'live', target: 'meta', label: 'typed by' }],
    },
  ],
  edges: [],
}
