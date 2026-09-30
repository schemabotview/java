import type { Scene } from '@graphlearning/flow'

// §1 the-brief (reused by §11) — the capstone's architecture, and it is deliberately labelled with
// the course each piece comes from. The point of a capstone is not a new topic; it is that the
// eleven courses were one subject, and the only way to show that is to make the dependency visible
// on one diagram.
export const theBrief: Scene = {
  id: 'the-brief',
  padding: 0.09,
  nodes: [
    {
      id: 'app',
      label: 'loganalyse — one program, eleven courses',
      pattern: 'group',
      icon: 'filecode',
      flow: 'TB',
      children: [
        { id: 'cli', label: 'CLI · args, exit codes', pattern: 'user', icon: 'terminal', sub: 'course 2 — the boundary that validates' },
        {
          id: 'pipe',
          label: 'The pipeline',
          pattern: 'group',
          icon: 'waves',
          flow: 'LR',
          children: [
            { id: 'read', label: 'Read', pattern: 'network', icon: 'scroll', sub: 'c9 — Files.lines, closed' },
            { id: 'parse', label: 'Parse', pattern: 'network', icon: 'braces', sub: 'c4 — sealed result, no nulls' },
            { id: 'agg', label: 'Aggregate', pattern: 'service', icon: 'filter', sub: 'c5, c8 — groupingBy' },
            { id: 'report', label: 'Report', pattern: 'service', icon: 'eye', sub: 'c8 — sorted, limited' },
          ],
          edges: [
            { source: 'read', target: 'parse' },
            { source: 'parse', target: 'agg' },
            { source: 'agg', target: 'report' },
          ],
        },
        {
          id: 'model',
          label: 'The domain — records and a sealed family',
          pattern: 'storage',
          icon: 'package',
          cols: 2,
          children: [
            { id: 'entry', label: 'record LogEntry', pattern: 'storage', icon: 'package', sub: 'c4 — immutable, validated once' },
            { id: 'result', label: 'sealed ParseResult', pattern: 'storage', icon: 'gitbranch', sub: 'c4 — Ok or Bad, nothing else' },
          ],
        },
        { id: 'conc', label: 'Many files at once', pattern: 'warn', icon: 'zap', sub: 'c10 — one virtual thread per file, a scope owns them' },
        { id: 'test', label: 'Tests and a runnable jar', pattern: 'service', icon: 'shieldcheck', sub: 'c11 — JUnit 5, Maven shade' },
      ],
      edges: [
        { source: 'cli', target: 'pipe' },
        { source: 'pipe', target: 'model', label: 'over' },
        { source: 'model', target: 'conc' },
        { source: 'conc', target: 'test' },
      ],
    },
  ],
  edges: [],
}
