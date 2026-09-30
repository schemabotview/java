import type { Scene } from '@graphlearning/flow'

// §7 effectively-final — the restriction people meet as an error message and never get explained.
// A lambda CAPTURES BY VALUE: the variable is copied into the instance when the lambda is created.
// If the original could still change, the copy would silently diverge — so Java forbids the change
// rather than letting the two drift. The scene shows the copy, because the copy is the reason.
export const capture: Scene = {
  id: 'capture',
  padding: 0.09,
  nodes: [
    {
      id: 'why',
      label: 'Why "must be final or effectively final"',
      pattern: 'group',
      icon: 'lock',
      flow: 'TB',
      children: [
        {
          id: 'create',
          label: 'At creation, the value is COPIED in',
          pattern: 'service',
          icon: 'copy',
          flow: 'LR',
          children: [
            { id: 'local', label: 'int limit = 100', pattern: 'network', icon: 'calculator', sub: 'a local — it lives on the stack frame' },
            { id: 'lam', label: 'o -> o.qty() > limit', pattern: 'storage', icon: 'zap', sub: 'an object, on the heap, holding a copy' },
          ],
          edges: [{ source: 'local', target: 'lam', label: 'copied' }],
        },
        { id: 'outlive', label: 'It outlives the frame', pattern: 'warn', icon: 'clock', sub: 'the method returns; its stack frame is gone' },
        { id: 'rule', label: 'So it may not change', pattern: 'service', icon: 'shieldcheck', sub: 'two copies that could diverge would be a silent bug' },
        {
          id: 'escape',
          label: 'What you may still mutate',
          pattern: 'group',
          icon: 'dooropen',
          cols: 2,
          children: [
            { id: 'fields', label: 'Fields — not captured', pattern: 'network', icon: 'database', sub: 'this is captured; the field is read live' },
            { id: 'contents', label: 'The object’s contents', pattern: 'network', icon: 'package', sub: 'a final List can still be added to' },
          ],
        },
      ],
      edges: [
        { source: 'create', target: 'outlive' },
        { source: 'outlive', target: 'rule' },
        { source: 'rule', target: 'escape' },
      ],
    },
  ],
  edges: [],
}
