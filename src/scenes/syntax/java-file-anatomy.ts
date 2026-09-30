import type { Scene } from '@graphlearning/flow'

// §1 the-map (reused by §10 you-are-here) — the course's frame: a Java file is four nested things,
// and every later section of this course names one layer of it. Drawn as nesting rather than as a
// code card on purpose — the containment is the lesson, and a listing shows order, not containment.
//
// Shape: the two header lines share a row, the type's three member kinds stack, and the method's
// own innards run LEFT TO RIGHT. Nesting everything top-to-bottom gives a 0.2:1 ribbon that fitView
// scales down until the type is unreadable — a tall scene needs `flow: 'LR'` somewhere in it. It
// goes on the DEEPEST container: putting it on the members row instead leaves that row half-empty
// beside one very tall child.
export const javaFileAnatomy: Scene = {
  id: 'java-file-anatomy',
  padding: 0.11,
  nodes: [
    {
      id: 'file',
      label: 'Order.java — one public type per file',
      pattern: 'group',
      icon: 'filecode',
      flow: 'TB',
      children: [
        {
          id: 'head',
          label: 'The file header',
          pattern: 'network',
          icon: 'tag',
          cols: 2,
          children: [
            { id: 'pkg', label: 'package com.graphl;', pattern: 'network', icon: 'tag', sub: 'the type’s real name — and its path' },
            { id: 'imports', label: 'import java.util.List;', pattern: 'network', icon: 'search', sub: 'shorthand only — loads nothing' },
          ],
        },
        {
          id: 'type',
          label: 'class Order { … } — state, birth, behaviour',
          pattern: 'service',
          icon: 'braces',
          flow: 'TB',
          children: [
            { id: 'fields', label: 'Fields · state', pattern: 'storage', icon: 'database', sub: 'String id;  int qty;' },
            { id: 'ctor', label: 'Constructor · birth', pattern: 'service', icon: 'zap', sub: 'Order(String id, int qty)' },
            {
              id: 'method',
              label: 'Methods · behaviour',
              pattern: 'service',
              icon: 'repeat',
              flow: 'LR',
              children: [
                { id: 'decl', label: 'int total(int price)', pattern: 'network', icon: 'braces', sub: 'signature: name + parameter types' },
                { id: 'stmts', label: 'Statements · do things', pattern: 'service', icon: 'scroll', sub: 'if, for, return — §4, §6, §7' },
                { id: 'exprs', label: 'Expressions · are values', pattern: 'storage', icon: 'calculator', sub: 'qty * price — every one has a type' },
              ],
              edges: [
                { source: 'decl', target: 'stmts', label: 'body' },
                { source: 'stmts', target: 'exprs', label: 'built from' },
              ],
            },
          ],
          edges: [
            { source: 'fields', target: 'ctor' },
            { source: 'ctor', target: 'method' },
          ],
        },
      ],
      edges: [{ source: 'head', target: 'type' }],
    },
  ],
  edges: [],
}
