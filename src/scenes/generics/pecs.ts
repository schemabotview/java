import type { Scene } from '@graphlearning/flow'

// §6/§7 wildcards and PECS — the part of generics people give up on, and it becomes obvious once
// the question is framed as direction of flow rather than as subtyping. `? extends T` is a source
// you may only READ from; `? super T` is a sink you may only WRITE to. Drawn as two pipes, because
// the restriction in each case is what makes the other end safe.
export const pecs: Scene = {
  id: 'pecs',
  padding: 0.09,
  nodes: [
    {
      id: 'flow',
      label: 'PECS — Producer Extends, Consumer Super',
      pattern: 'group',
      icon: 'waves',
      flow: 'TB',
      children: [
        {
          id: 'prod',
          label: 'Producer — you READ from it',
          pattern: 'service',
          icon: 'share',
          flow: 'LR',
          children: [
            { id: 'p1', label: 'List<? extends Number>', pattern: 'service', icon: 'boxes', sub: 'List<Integer> · List<Double> · List<Number>' },
            { id: 'p2', label: 'Number n = list.get(0)', pattern: 'service', icon: 'circlecheck', sub: 'safe — whatever it holds IS a Number' },
            { id: 'p3', label: 'list.add(1) refused', pattern: 'warn', icon: 'lock', sub: 'it might be a List<Double>' },
          ],
          edges: [
            { source: 'p1', target: 'p2', label: 'read' },
            { source: 'p2', target: 'p3' },
          ],
        },
        {
          id: 'cons',
          label: 'Consumer — you WRITE to it',
          pattern: 'network',
          icon: 'plug',
          flow: 'LR',
          children: [
            { id: 'q1', label: 'List<? super Integer>', pattern: 'network', icon: 'boxes', sub: 'List<Integer> · List<Number> · List<Object>' },
            { id: 'q2', label: 'list.add(1)', pattern: 'service', icon: 'circlecheck', sub: 'safe — an Integer fits any of them' },
            { id: 'q3', label: 'get gives Object', pattern: 'warn', icon: 'crop', sub: 'that is all they have in common' },
          ],
          edges: [
            { source: 'q1', target: 'q2', label: 'write' },
            { source: 'q2', target: 'q3' },
          ],
        },
        { id: 'rule', label: 'Both? Use plain T', pattern: 'storage', icon: 'scale', sub: 'a parameter you read AND write takes no wildcard' },
      ],
      edges: [
        { source: 'prod', target: 'cons' },
        { source: 'cons', target: 'rule' },
      ],
    },
  ],
  edges: [],
}
