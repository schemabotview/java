import type { Scene } from '@graphlearning/flow'
import { whyObjects } from './why-objects'
import { classAndObject } from './class-and-object'
import { constructors } from './constructors'
import { encapsulation } from './encapsulation'
import { hierarchy } from './hierarchy'
import { abstractClass } from './abstract-class'
import { interfaces } from './interfaces'
import { equalsContract } from './equals-contract'
import { composition } from './composition'

// Course 3 (oop) scenes. Two are shared inside the course: `class-and-object` carries both §2 and
// §3 (definition half, then instance half), and `hierarchy` carries both §6 and §7 (what is
// inherited, then which method a call actually reaches). §11 re-runs `why-objects`.
export const oopScenes: Scene[] = [
  whyObjects,
  classAndObject,
  constructors,
  encapsulation,
  hierarchy,
  abstractClass,
  interfaces,
  equalsContract,
  composition,
]
