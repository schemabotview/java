import type { Scene } from '@graphlearning/flow'

// §7 loops — four forms, and the rule for choosing between them is mechanical: do you need the
// index? The enhanced for is the default and the one people skip past; the classic for is for when
// the index is genuinely part of the problem. The labelled break is included because it is the one
// piece of Java loop syntax most developers have never seen and reach for a flag variable instead.
export const loopForms: Scene = {
  id: 'loop-forms',
  title: 'Four loops, one question: do you need the index?',
  padding: 0.14,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Loops.java',
      label: [
        '// 1. enhanced for — the default. No index, no off-by-one.',
        'for (Order o : orders) {',
        '    total += o.qty();',
        '}',
        '',
        '// 2. classic for — when the index IS part of the problem',
        'for (int i = 0; i < orders.size(); i++) {',
        '    System.out.println(i + ": " + orders.get(i));',
        '}',
        '',
        '// 3. while — the count is not known up front',
        'while ((line = reader.readLine()) != null) { parse(line); }',
        '',
        '// 4. do-while — runs at least once. Rare; usually a prompt.',
        'do { choice = prompt(); } while (!valid(choice));',
        '',
        '// break leaves the loop; continue skips to the next round.',
        '// A LABEL breaks the OUTER loop — the alternative is a flag.',
        'search:',
        'for (var row : grid) {',
        '    for (var cell : row) {',
        '        if (cell == target) break search;',
        '    }',
        '}',
      ].join('\n'),
    },
  ],
  edges: [],
}
