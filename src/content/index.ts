import { runtime } from './runtime'
import { syntax } from './syntax'
import { oop } from './oop'
import { types } from './types-course'
import { collections } from './collections'
import { generics } from './generics'
import { functional } from './functional'
import { streams } from './streams'
import { errors } from './errors'
import { concurrency } from './concurrency'
import { jvm } from './jvm'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored:
// runtime · syntax · oop · types · collections · generics · functional · streams · errors ·
// concurrency · jvm · project.
export const COURSES: Record<string, Course> = {
  [runtime.id]: runtime,
  [syntax.id]: syntax,
  [oop.id]: oop,
  [types.id]: types,
  [collections.id]: collections,
  [generics.id]: generics,
  [functional.id]: functional,
  [streams.id]: streams,
  [errors.id]: errors,
  [concurrency.id]: concurrency,
  [jvm.id]: jvm,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract the recorder drives, so it cannot be a per-repo decision. Re-exported here because
// this module is what the app and the scripts already import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
