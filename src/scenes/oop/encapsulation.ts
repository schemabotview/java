import type { Scene } from '@graphlearning/flow'

// §5 encapsulation — visibility drawn as four concentric reaches, because the modifiers ARE a
// containment hierarchy and a four-row table makes them look like unrelated options. `protected`
// sits in the odd place people misremember: wider than package-private, not narrower.
export const encapsulation: Scene = {
  id: 'encapsulation',
  padding: 0.12,
  nodes: [
    {
      id: 'reach',
      label: 'Four reaches, widest to narrowest',
      pattern: 'group',
      icon: 'shield',
      flow: 'TB',
      children: [
        { id: 'pub', label: 'public', pattern: 'warn', icon: 'globe', sub: 'anyone, anywhere — a promise you must keep' },
        { id: 'prot', label: 'protected', pattern: 'network', icon: 'gitbranch', sub: 'the package AND every subclass, anywhere' },
        { id: 'pkg', label: 'package-private', pattern: 'network', icon: 'package', sub: 'no modifier at all — the same package. The sane default.' },
        { id: 'priv', label: 'private', pattern: 'service', icon: 'lock', sub: 'this class only — free to change tomorrow' },
      ],
      edges: [
        { source: 'pub', target: 'prot', label: 'narrows to' },
        { source: 'prot', target: 'pkg' },
        { source: 'pkg', target: 'priv' },
      ],
    },
    {
      id: 'rule',
      kind: 'code',
      filename: 'Leaks.java',
      hug: true,
      label: [
        'private final List<Order> lines;',
        '',
        'List<Order> getLines() { return lines; }',
        '// private — and yet caller.getLines().clear()',
        '// just emptied it. A getter that returns the',
        '// live object leaks the field.',
        '',
        'List<Order> getLines() {',
        '    return List.copyOf(lines);   // or unmodifiable',
        '}',
      ].join('\n'),
    },
  ],
  edges: [{ source: 'reach', target: 'rule', label: 'private is not enough' }],
}
