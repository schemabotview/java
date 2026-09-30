import type { Course } from '../types'
import { functionsAsValues } from './01-functions-as-values'
import { lambdas } from './02-lambdas'
import { methodReferences } from './03-method-references'
import { functionBifunction } from './04-function-bifunction'
import { predicateConsumerSupplier } from './05-predicate-consumer-supplier'
import { yourOwnFunctionalInterface } from './06-your-own-functional-interface'
import { effectivelyFinal } from './07-effectively-final'
import { composingSection } from './08-composing'
import { higherOrderMethods } from './09-higher-order-methods'
import { youAreHere } from './10-you-are-here'

// Course 7 — the vocabulary course 8 is written in. §1's claim (a lambda is an INSTANCE of a
// one-method interface, not a function) is what makes every later Stream signature readable rather
// than magical, so §10 returns to it. §10 also states the three real costs plainly — checked
// exceptions, stack traces, debuggability — because the depth contract means saying when not to.
export const functional: Course = {
  id: 'functional',
  title: 'Functional Java',
  sections: [
    functionsAsValues,
    lambdas,
    methodReferences,
    functionBifunction,
    predicateConsumerSupplier,
    yourOwnFunctionalInterface,
    effectivelyFinal,
    composingSection,
    higherOrderMethods,
    youAreHere,
  ],
}
