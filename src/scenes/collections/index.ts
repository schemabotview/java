import type { Scene } from '@graphlearning/flow'
import { collectionHierarchy } from './collection-hierarchy'
import { listSetMap } from './list-set-map'
import { arraylistInternals } from './arraylist-internals'
import { hashmapBuckets } from './hashmap-buckets'
import { iteration } from './iteration'
import { ordering } from './ordering'

// Course 5 (collections) scenes. `list-set-map` carries §2/§4/§5 (one card, three passes, so the
// shapes read by alignment); `ordering` carries §9/§10; `hashmap-buckets` is read again by §11,
// which is the equality contract seen from the map's side. §12 re-runs `collection-hierarchy`.
export const collectionsScenes: Scene[] = [
  collectionHierarchy,
  listSetMap,
  arraylistInternals,
  hashmapBuckets,
  iteration,
  ordering,
]
