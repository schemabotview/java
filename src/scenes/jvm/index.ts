import type { Scene } from '@graphlearning/flow'
import { jitTiers } from './jit-tiers'
import { gc } from './gc'
import { classLoading } from './class-loading'
import { reflection } from './reflection'
import { buildTools } from './build-tools'
import { testing } from './testing'

// Course 11 (jvm) scenes. §1 and §6 reuse course 1's `jvm-memory` and `java-pipeline` — the point
// of the course is that those two diagrams were true and shallow, and now get opened up. `jit-tiers`
// carries §2/§3, `gc` carries §4/§5, `class-loading` carries §7/§8, `reflection` carries §9/§10,
// `testing` carries §12/§13.
export const jvmScenes: Scene[] = [jitTiers, gc, classLoading, reflection, buildTools, testing]
