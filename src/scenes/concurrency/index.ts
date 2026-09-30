import type { Scene } from '@graphlearning/flow'
import { threadModel } from './thread-model'
import { executors } from './executors'
import { async } from './async'
import { theRace } from './the-race'
import { locksAndAtomics } from './locks-and-atomics'
import { memoryModel } from './memory-model'

// Course 10 (concurrency) scenes. `thread-model` carries §1 and §5 (and §12) — the platform/virtual
// contrast IS the course's arc, so it is deliberately the same picture twice. `executors` carries
// §2–§4, `async` carries §6/§7, `locks-and-atomics` carries §9/§10. §8's race scene is what §9–§11
// all refer back to.
export const concurrencyScenes: Scene[] = [threadModel, executors, async, theRace, locksAndAtomics, memoryModel]
