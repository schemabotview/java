import type { Course } from '../types'
import { modellingWithTypes } from './01-modelling-with-types'
import { enumsSection } from './02-enums'
import { enumsWithBehaviour } from './03-enums-with-behaviour'
import { recordsSection } from './04-records'
import { recordValidation } from './05-record-validation'
import { sealedTypes } from './06-sealed-types'
import { instanceofPatterns } from './07-instanceof-patterns'
import { switchPatterns } from './08-switch-patterns'
import { recordPatterns } from './09-record-patterns'
import { annotationsSection } from './10-annotations'

// Course 4 — types that are DATA, as opposed to course 3's types that guard a rule. The arc is one
// argument: sealed says which alternatives, record says what shape, pattern switch takes them apart
// exhaustively. §1 poses the framing question and §10 answers it.
//
// The folder is `types-course/` because `types.ts` (the Section/Course alias) already occupies
// `src/content/types`.
export const types: Course = {
  id: 'types',
  title: 'Modern types & data modelling',
  sections: [
    modellingWithTypes,
    enumsSection,
    enumsWithBehaviour,
    recordsSection,
    recordValidation,
    sealedTypes,
    instanceofPatterns,
    switchPatterns,
    recordPatterns,
    annotationsSection,
  ],
}
