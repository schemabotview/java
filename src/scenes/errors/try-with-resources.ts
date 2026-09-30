import type { Scene } from '@graphlearning/flow'

// §8 try-with-resources — the construct, and the specific bug it retired. The old finally-close
// idiom had a genuine defect: if the body threw AND close threw, close's exception replaced the
// real one. try-with-resources closes in reverse order and SUPPRESSES rather than replaces, which
// is why the suppressed section in §7's trace exists at all.
export const tryWithResources: Scene = {
  id: 'try-with-resources',
  padding: 0.09,
  nodes: [
    {
      id: 'compare',
      label: 'What try-with-resources actually fixed',
      pattern: 'group',
      icon: 'scale',
      flow: 'TB',
      children: [
        {
          id: 'old',
          label: 'The old finally idiom',
          pattern: 'warn',
          icon: 'bell',
          flow: 'LR',
          children: [
            { id: 'o1', label: 'body throws BadRecord', pattern: 'warn', icon: 'zap', sub: 'the real failure' },
            { id: 'o2', label: 'finally calls close()', pattern: 'warn', icon: 'dooropen', sub: 'and close() throws too' },
            { id: 'o3', label: 'BadRecord is lost', pattern: 'warn', icon: 'crop', sub: 'close’s exception REPLACED it' },
          ],
          edges: [
            { source: 'o1', target: 'o2' },
            { source: 'o2', target: 'o3' },
          ],
        },
        {
          id: 'twr',
          label: 'try (var r = open()) { … }',
          pattern: 'service',
          icon: 'shieldcheck',
          flow: 'LR',
          children: [
            { id: 't1', label: 'body throws BadRecord', pattern: 'service', icon: 'zap', sub: 'the real failure' },
            { id: 't2', label: 'close() runs, then throws', pattern: 'service', icon: 'dooropen', sub: 'reverse order of declaration' },
            { id: 't3', label: 'BadRecord propagates', pattern: 'service', icon: 'circlecheck', sub: 'close’s is SUPPRESSED, and attached to it' },
          ],
          edges: [
            { source: 't1', target: 't2' },
            { source: 't2', target: 't3' },
          ],
        },
        { id: 'iface', label: 'Anything AutoCloseable', pattern: 'network', icon: 'plug', sub: 'streams, sockets, JDBC — and Files.lines (course 8 §3)' },
      ],
      edges: [
        { source: 'old', target: 'twr', label: 'replaced by' },
        { source: 'twr', target: 'iface' },
      ],
    },
  ],
  edges: [],
}
