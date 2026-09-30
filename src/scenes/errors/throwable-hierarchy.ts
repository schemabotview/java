import type { Scene } from '@graphlearning/flow'

// §1/§2/§3 — the hierarchy, and the one branch in it that decides everything else. Checked vs
// unchecked is not a property of the situation, it is a property of WHERE YOU SIT IN THE TREE:
// anything under RuntimeException or Error is unchecked, everything else under Exception is
// checked. Drawn as the tree because that is literally the rule.
export const throwableHierarchy: Scene = {
  id: 'throwable-hierarchy',
  padding: 0.1,
  nodes: [
    {
      id: 'tree',
      label: 'Where you sit in the tree IS the rule',
      pattern: 'group',
      icon: 'gitbranch',
      flow: 'TB',
      children: [
        { id: 'throwable', label: 'Throwable', pattern: 'external', icon: 'boxes', sub: 'the only thing throw and catch accept' },
        {
          id: 'split',
          label: 'Two children, and they mean different things',
          pattern: 'group',
          icon: 'scale',
          cols: 2,
          children: [
            { id: 'error', label: 'Error', pattern: 'warn', icon: 'bell', sub: 'the JVM is in trouble. UNCHECKED. Do not catch.' },
            { id: 'exception', label: 'Exception', pattern: 'service', icon: 'shield', sub: 'your program is. CHECKED — unless…' },
          ],
        },
        { id: 'runtime', label: 'RuntimeException', pattern: 'warn', icon: 'zap', sub: 'the one exempt branch. UNCHECKED — a bug, not a condition.' },
        {
          id: 'leaves',
          label: 'The ones you actually meet',
          pattern: 'group',
          icon: 'layers',
          cols: 3,
          children: [
            { id: 'oom', label: 'OutOfMemoryError', pattern: 'warn', icon: 'database', sub: 'under Error — nothing you can do' },
            { id: 'io', label: 'IOException', pattern: 'service', icon: 'plug', sub: 'checked — the disk really can be full' },
            { id: 'npe', label: 'NullPointer · IllegalArg', pattern: 'warn', icon: 'crop', sub: 'unchecked — you wrote it wrong' },
          ],
        },
      ],
      edges: [
        { source: 'throwable', target: 'split' },
        { source: 'split', target: 'runtime', label: 'Exception ⊃' },
        { source: 'runtime', target: 'leaves' },
      ],
    },
  ],
  edges: [],
}
