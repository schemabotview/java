import type { Course } from '../types'
import { whyObjects } from './01-why-objects'
import { theClass } from './02-the-class'
import { theObject } from './03-the-object'
import { constructorsSection } from './04-constructors'
import { encapsulation } from './05-encapsulation'
import { inheritance } from './06-inheritance'
import { polymorphism } from './07-polymorphism'
import { abstractClasses } from './08-abstract-classes'
import { interfacesSection } from './09-interfaces'
import { objectContract } from './10-object-contract'
import { compositionSection } from './11-composition'

// Course 3 — designing a type. §1 frames it as "where does the invariant live?" and §11 closes on
// the judgement that follows: extends inherits everything, so HAS-A means a field. Two scenes are
// read twice inside the course (class-and-object for §2/§3, hierarchy for §6/§7).
export const oop: Course = {
  id: 'oop',
  title: 'Objects & classes',
  sections: [
    whyObjects,
    theClass,
    theObject,
    constructorsSection,
    encapsulation,
    inheritance,
    polymorphism,
    abstractClasses,
    interfacesSection,
    objectContract,
    compositionSection,
  ],
}
