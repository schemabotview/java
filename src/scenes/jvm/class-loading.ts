import type { Scene } from '@graphlearning/flow'

// §4 class-loading (and §5 modules) — the delegation chain, because it explains both the security
// property and the two errors that otherwise look identical. Parent-first delegation is why nobody
// can substitute their own java.lang.String, and the load/link/initialise split is why a static
// initialiser runs when it does rather than at startup.
export const classLoading: Scene = {
  id: 'class-loading',
  padding: 0.09,
  nodes: [
    {
      id: 'load',
      label: 'Parent first — and the order is the security model',
      pattern: 'group',
      icon: 'dooropen',
      flow: 'TB',
      children: [
        {
          id: 'chain',
          label: 'Every request goes UP before anything is searched',
          pattern: 'network',
          icon: 'gitbranch',
          flow: 'LR',
          children: [
            { id: 'app', label: 'Application loader', pattern: 'network', icon: 'filecode', sub: 'your classpath — asked LAST' },
            { id: 'plat', label: 'Platform loader', pattern: 'network', icon: 'layers', sub: 'the non-core JDK modules' },
            { id: 'boot', label: 'Bootstrap loader', pattern: 'external', icon: 'cpu', sub: 'java.base — tries FIRST' },
          ],
          edges: [
            { source: 'app', target: 'plat', label: 'delegates' },
            { source: 'plat', target: 'boot', label: 'delegates' },
          ],
        },
        { id: 'why', label: 'Nothing can shadow String', pattern: 'service', icon: 'shieldcheck', sub: 'a java.lang.String on your classpath is never reached' },
        {
          id: 'phases',
          label: 'Three phases, and the last one is lazy',
          pattern: 'group',
          icon: 'layers',
          cols: 3,
          children: [
            { id: 'p1', label: 'Load', pattern: 'network', icon: 'scroll', sub: 'find the bytes, make a Class object' },
            { id: 'p2', label: 'Link', pattern: 'network', icon: 'check', sub: 'verify · prepare statics · resolve references' },
            { id: 'p3', label: 'Initialise', pattern: 'service', icon: 'zap', sub: 'static blocks run — at FIRST USE, not at startup' },
          ],
        },
      ],
      edges: [
        { source: 'chain', target: 'why' },
        { source: 'why', target: 'phases' },
      ],
    },
  ],
  edges: [],
}
