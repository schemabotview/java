import type { Scene } from '@graphlearning/flow'

// §5 jshell — a real transcript, because the thing worth showing is that the ceremony is gone: no
// class, no main, no compile step, and every expression names and prints its own result. A single
// standalone code card, so NO `hug` — it IS the scene, and the width floor is what makes its type
// render at the deck-wide size.
export const jshellSession: Scene = {
  id: 'jshell-session',
  title: 'jshell — Java without the ceremony',
  padding: 0.16,
  nodes: [
    {
      id: 'session',
      kind: 'code',
      filename: 'jshell',
      label: [
        '$ jshell',
        '|  Welcome to JShell -- Version 21.0.5',
        '',
        'jshell> 2 + 3 * 4',
        '$1 ==> 14                  // every result is named',
        '',
        'jshell> var name = "Ada"',
        'name ==> "Ada"             // var works here too',
        '',
        'jshell> name.toUpperCase()',
        '$3 ==> "ADA"',
        '',
        'jshell> record Point(int x, int y) {}',
        '|  created record Point   // declarations are fine',
        '',
        'jshell> new Point(3, 4)',
        '$5 ==> Point[x=3, y=4]     // toString for free',
        '',
        'jshell> /vars              // what is in scope',
        '|    String name = "ADA"',
        '',
        'jshell> /exit',
      ].join('\n'),
    },
  ],
  edges: [],
}
