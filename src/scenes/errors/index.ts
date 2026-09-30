import type { Scene } from '@graphlearning/flow'
import { throwableHierarchy } from './throwable-hierarchy'
import { tryCatch } from './try-catch'
import { stackTrace } from './stack-trace'
import { tryWithResources } from './try-with-resources'
import { nioFiles } from './nio-files'

// Course 9 (errors) scenes. `throwable-hierarchy` carries §1–§3 (the tree IS the checked/unchecked
// rule), `try-catch` carries §4–§6, `nio-files` carries §9–§11. §7 gets its own scene because
// reading a trace is a skill and an annotated real trace is the only way to teach it.
export const errorsScenes: Scene[] = [throwableHierarchy, tryCatch, stackTrace, tryWithResources, nioFiles]
