import type { Course } from '../types'
import { whyGenerics } from './01-why-generics'
import { usingGenericTypes } from './02-using-generic-types'
import { genericClass } from './03-generic-class'
import { genericMethods } from './04-generic-methods'
import { boundedTypes } from './05-bounded-types'
import { extendsWildcard } from './06-extends-wildcard'
import { superWildcardAndPecs } from './07-super-wildcard-and-pecs'
import { typeErasure } from './08-type-erasure'
import { gotchas } from './09-gotchas'
import { youAreHere } from './10-you-are-here'

// Course 6 — the angle brackets course 5 was written in. §1's argument (the same error, moved to
// compile time) is the course's whole thesis and §10 closes on it by reading a real library
// signature. §8 (erasure) is the hinge: every restriction in §3, §9 and half of §5 traces back to
// the type argument not surviving javac.
export const generics: Course = {
  id: 'generics',
  title: 'Generics',
  sections: [
    whyGenerics,
    usingGenericTypes,
    genericClass,
    genericMethods,
    boundedTypes,
    extendsWildcard,
    superWildcardAndPecs,
    typeErasure,
    gotchas,
    youAreHere,
  ],
}
