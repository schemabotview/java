import type { Scene } from '@graphlearning/flow'
import { functionsAsValues } from './functions-as-values'
import { lambdaSyntax } from './lambda-syntax'
import { fourInterfaces } from './four-interfaces'
import { capture } from './capture'
import { composing } from './composing'

// Course 7 (functional) scenes. `lambda-syntax` carries §2/§3, `four-interfaces` carries §4/§5/§6,
// `composing` carries §8/§9. §10 re-runs `functions-as-values`, whose whole point is that a lambda
// is an instance of a one-method interface — the fact that makes every Stream signature readable.
export const functionalScenes: Scene[] = [functionsAsValues, lambdaSyntax, fourInterfaces, capture, composing]
