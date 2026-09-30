import type { Scene } from '@graphlearning/flow'

// §1 the-pipeline (reused by §11) — source → intermediates → terminal, drawn as a PULL rather than
// a conveyor. That direction is the whole of §2: nothing moves until the terminal asks, and then
// each element is pulled all the way down the chain before the next one starts. Drawing it as a
// left-to-right conveyor would teach the wrong model (stage-at-a-time over the whole collection).
export const streamPipeline: Scene = {
  id: 'stream-pipeline',
  padding: 0.09,
  nodes: [
    {
      id: 'pipe',
      label: 'A pipeline is a recipe. The terminal runs it.',
      pattern: 'group',
      icon: 'waves',
      flow: 'TB',
      children: [
        { id: 'source', label: 'Source', pattern: 'storage', icon: 'database', sub: 'orders.stream() — a Spliterator over the list' },
        {
          id: 'mid',
          label: 'Intermediate — each returns a new Stream, runs nothing',
          pattern: 'network',
          icon: 'filter',
          flow: 'LR',
          children: [
            { id: 'f', label: 'filter(p)', pattern: 'network', icon: 'filter', sub: 'keeps some' },
            { id: 'm', label: 'map(f)', pattern: 'network', icon: 'repeat', sub: 'changes each' },
            { id: 's', label: 'sorted()', pattern: 'warn', icon: 'scale', sub: 'STATEFUL — must see them all' },
          ],
          edges: [
            { source: 'f', target: 'm' },
            { source: 'm', target: 's' },
          ],
        },
        { id: 'term', label: 'Terminal — toList()', pattern: 'service', icon: 'circlecheck', sub: 'the only thing that makes anything happen' },
        { id: 'pull', label: 'One element at a time', pattern: 'service', icon: 'zap', sub: 'all the way down, then the next — never stage by stage' },
      ],
      edges: [
        { source: 'source', target: 'mid' },
        { source: 'mid', target: 'term', label: 'builds a recipe' },
        { source: 'term', target: 'pull', label: 'pulls' },
      ],
    },
  ],
  edges: [],
}
