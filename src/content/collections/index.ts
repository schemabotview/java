import type { Course } from '../types'
import { theHierarchy } from './01-the-hierarchy'
import { list } from './02-list'
import { arraylistInternals } from './03-arraylist-internals'
import { set } from './04-set'
import { map } from './05-map'
import { hashmapInternals } from './06-hashmap-internals'
import { queueDeque } from './07-queue-deque'
import { iterating } from './08-iterating'
import { immutable } from './09-immutable'
import { sorting } from './10-sorting'
import { equality } from './11-equality'
import { youAreHere } from './12-you-are-here'

// Course 5 — the library you will use most. Two sections (§3, §6) go inside the implementations,
// because the layout IS the cost model: once you can see ArrayList's array and HashMap's four-step
// lookup, every performance question in the course answers itself without a memorised table. §11 is
// course 3 §10 seen from the map's side, and §12 turns the whole thing into four questions.
export const collections: Course = {
  id: 'collections',
  title: 'Collections',
  sections: [
    theHierarchy,
    list,
    arraylistInternals,
    set,
    map,
    hashmapInternals,
    queueDeque,
    iterating,
    immutable,
    sorting,
    equality,
    youAreHere,
  ],
}
