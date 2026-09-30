import type { Scene } from '@graphlearning/flow'

// §6 conditionals — the old switch and the new one are different constructs wearing one keyword,
// and the differences are exactly the bug classes the old one produced: silent fall-through, no
// value, no exhaustiveness check. Side by side and gridded (peers, not a flow), so the reader can
// run their eye down the two and see what each `break` was defending against.
export const switchForms: Scene = {
  id: 'switch-forms',
  padding: 0.1,
  nodes: [
    {
      id: 'two',
      label: 'One keyword, two constructs',
      pattern: 'group',
      icon: 'gitbranch',
      cols: 2,
      children: [
        {
          id: 'old',
          kind: 'code',
          filename: 'switch statement · pre-14',
          hug: true,
          label: [
            'int days;',
            'switch (month) {',
            '  case 1: case 3: case 5:',
            '    days = 31;',
            '    break;        // forget this and',
            '                  // you fall THROUGH',
            '  case 2:',
            '    days = 28;',
            '    break;',
            '  default:',
            '    days = 30;    // no default? days',
            '}                 // may be unassigned',
            '',
            '// - does not produce a value',
            '// - fall-through is silent',
            '// - no exhaustiveness check',
          ].join('\n'),
        },
        {
          id: 'modern',
          kind: 'code',
          filename: 'switch expression · 14+',
          hug: true,
          label: [
            'int days = switch (month) {',
            '  case 1, 3, 5, 7, 8, 10, 12 -> 31;',
            '  case 2                     -> 28;',
            '  default                    -> 30;',
            '};        // note the semicolon',
            '',
            '// a block arm yields its value',
            'var label = switch (status) {',
            '  case NEW -> "fresh";',
            '  case PAID -> {',
            '    log.info("paid");',
            '    yield "done";',
            '  }',
            '};',
            '',
            '// - IS a value',
            '// - no fall-through, ever',
            '// - over an enum: exhaustive',
          ].join('\n'),
        },
      ],
    },
  ],
  edges: [],
}
