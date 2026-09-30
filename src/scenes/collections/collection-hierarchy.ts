import type { Scene } from '@graphlearning/flow'

// §1 the-hierarchy (reused by §12) — the shape of java.util, and the fact that decides how you read
// every signature in it: Map is NOT a Collection. It sits beside the tree, not in it, which is why
// you cannot pass a Map where a Collection is wanted and why its views (keySet, values, entrySet)
// exist at all.
export const collectionHierarchy: Scene = {
  id: 'collection-hierarchy',
  padding: 0.09,
  nodes: [
    {
      id: 'root',
      label: 'java.util — two trees, not one',
      pattern: 'group',
      icon: 'layers',
      flow: 'LR',
      children: [
        {
          id: 'coll',
          label: 'Iterable → Collection',
          pattern: 'service',
          icon: 'repeat',
          flow: 'TB',
          children: [
            { id: 'iterable', label: 'Iterable<E>', pattern: 'network', icon: 'repeat', sub: 'one method: iterator(). The for-each contract.' },
            { id: 'collection', label: 'Collection<E>', pattern: 'service', icon: 'boxes', sub: 'add · remove · contains · size · stream' },
            {
              id: 'three',
              label: 'The three shapes',
              pattern: 'group',
              icon: 'gitbranch',
              cols: 3,
              children: [
                { id: 'list', label: 'List<E>', pattern: 'storage', icon: 'scroll', sub: 'ordered · indexed · duplicates OK' },
                { id: 'set', label: 'Set<E>', pattern: 'storage', icon: 'filter', sub: 'no duplicates — defined by equals' },
                { id: 'queue', label: 'Queue / Deque<E>', pattern: 'storage', icon: 'waves', sub: 'ends matter: offer · poll · peek' },
              ],
            },
          ],
          edges: [
            { source: 'iterable', target: 'collection', label: 'extends' },
            { source: 'collection', target: 'three' },
          ],
        },
        {
          id: 'maptree',
          label: 'Map — beside the tree, not in it',
          pattern: 'warn',
          icon: 'key',
          flow: 'TB',
          children: [
            { id: 'map', label: 'Map<K,V>', pattern: 'warn', icon: 'key', sub: 'NOT a Collection — it holds pairs, not elements' },
            { id: 'views', label: 'Its three views', pattern: 'network', icon: 'eye', sub: 'keySet() · values() · entrySet()' },
            { id: 'live', label: 'A view is LIVE', pattern: 'service', icon: 'share', sub: 'backed by the map — removing from it removes' },
          ],
          edges: [
            { source: 'map', target: 'views', label: 'exposes' },
            { source: 'views', target: 'live' },
          ],
        },
      ],
      edges: [{ source: 'coll', target: 'maptree', label: 'views ARE Collections' }],
    },
  ],
  edges: [],
}
