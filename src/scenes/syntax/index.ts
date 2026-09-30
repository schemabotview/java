import type { Scene } from '@graphlearning/flow'
import { javaFileAnatomy } from './java-file-anatomy'
import { primitiveVsReference } from './primitive-vs-reference'
import { varInference } from './var-inference'
import { expressions } from './expressions'
import { stringPool } from './string-pool'
import { switchForms } from './switch-forms'
import { loopForms } from './loop-forms'
import { arrayCovariance } from './array-covariance'
import { methods } from './methods'

// Course 2 (syntax) scenes. §10 you-are-here re-runs `java-file-anatomy`: the course walked down
// that nesting one layer at a time, so the closer is the opener with every layer now filled in.
export const syntaxScenes: Scene[] = [
  javaFileAnatomy,
  primitiveVsReference,
  varInference,
  expressions,
  stringPool,
  switchForms,
  loopForms,
  arrayCovariance,
  methods,
]
