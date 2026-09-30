import type { Course } from '../types'
import { whatIsAThread } from './01-what-is-a-thread'
import { rawThreads } from './02-raw-threads'
import { executorsSection } from './03-executors'
import { callableFuture } from './04-callable-future'
import { virtualThreads } from './05-virtual-threads'
import { completableFuture } from './06-completable-future'
import { structuredConcurrency } from './07-structured-concurrency'
import { sharedMutableState } from './08-shared-mutable-state'
import { locks } from './09-locks'
import { atomicsAndConcurrentCollections } from './10-atomics-and-concurrent-collections'
import { memoryModelSection } from './11-memory-model'
import { youAreHere } from './12-you-are-here'

// Course 10 — two halves that are usually taught as one. §1–§7 are about RUNNING things at once and
// the arc is the cost of a thread: §1 sets the expensive number, §5 removes it, §6–§7 show what
// that makes possible. §8–§11 are about SHARING, and §11 is the half people never meet until it
// bites — §8's race is atomicity, §11 is visibility, and they need different fixes.
export const concurrency: Course = {
  id: 'concurrency',
  title: 'Concurrency & virtual threads',
  sections: [
    whatIsAThread,
    rawThreads,
    executorsSection,
    callableFuture,
    virtualThreads,
    completableFuture,
    structuredConcurrency,
    sharedMutableState,
    locks,
    atomicsAndConcurrentCollections,
    memoryModelSection,
    youAreHere,
  ],
}
