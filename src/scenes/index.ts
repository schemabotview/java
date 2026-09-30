import type { Scene } from '@graphlearning/flow'
import { runtimeScenes } from './runtime'
import { syntaxScenes } from './syntax'
import { oopScenes } from './oop'
import { typesScenes } from './types'
import { collectionsScenes } from './collections'
import { genericsScenes } from './generics'
import { functionalScenes } from './functional'
import { streamsScenes } from './streams'
import { errorsScenes } from './errors'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored (runtime · syntax · oop · types ·
// collections · generics · functional · streams · errors · concurrency · jvm · project).
const ALL: Scene[] = [...runtimeScenes, ...syntaxScenes, ...oopScenes, ...typesScenes, ...collectionsScenes, ...genericsScenes, ...functionalScenes, ...streamsScenes, ...errorsScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
