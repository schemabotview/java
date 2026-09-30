import type { Scene } from '@graphlearning/flow'

// §11 maven (revisiting course 1 §7 at depth) — dependency resolution, because that is the part
// that actually goes wrong. Maven's "nearest wins" rule is not "highest version wins", and the
// difference is exactly how a project ends up running a version nobody asked for.
export const buildTools: Scene = {
  id: 'build-tools',
  padding: 0.09,
  nodes: [
    {
      id: 'dep',
      label: 'Nearest wins — not newest',
      pattern: 'group',
      icon: 'gitbranch',
      flow: 'TB',
      children: [
        { id: 'you', label: 'your-app', pattern: 'user', icon: 'filecode', sub: 'depends on two libraries' },
        {
          id: 'both',
          label: 'Both pull in the same third library',
          pattern: 'group',
          icon: 'layers',
          cols: 2,
          children: [
            { id: 'a', label: 'lib-a → guava 30', pattern: 'network', icon: 'package', sub: 'depth 2' },
            { id: 'b', label: 'lib-b → guava 33', pattern: 'network', icon: 'package', sub: 'depth 2, but declared later' },
          ],
        },
        { id: 'rule', label: 'Maven picks guava 30', pattern: 'warn', icon: 'scale', sub: 'same depth ⇒ first DECLARED wins. Not the newest.' },
        { id: 'boom', label: 'NoSuchMethodError', pattern: 'warn', icon: 'bell', sub: 'at RUN time — lib-b calls a method guava 30 lacks' },
        { id: 'fix', label: 'mvn dependency:tree', pattern: 'service', icon: 'search', sub: 'then pin it in dependencyManagement' },
      ],
      edges: [
        { source: 'you', target: 'both' },
        { source: 'both', target: 'rule' },
        { source: 'rule', target: 'boom' },
        { source: 'boom', target: 'fix' },
      ],
    },
  ],
  edges: [],
}
