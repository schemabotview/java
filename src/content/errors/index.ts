import type { Course } from '../types'
import { whyExceptions } from './01-why-exceptions'
import { throwableHierarchySection } from './02-throwable-hierarchy'
import { checkedVsUnchecked } from './03-checked-vs-unchecked'
import { tryCatchFinally } from './04-try-catch-finally'
import { throwing } from './05-throwing'
import { chaining } from './06-chaining'
import { readingAStackTrace } from './07-reading-a-stack-trace'
import { tryWithResourcesSection } from './08-try-with-resources'
import { nioPath } from './09-nio-path'
import { filesReadWrite } from './10-files-read-write'
import { youAreHere } from './11-you-are-here'

// Course 9 — failure, and the files that cause most of it. §7 exists because reading a stack trace
// is the single most-used debugging skill in a working job and is essentially never taught; it gets
// a real annotated trace rather than a description. §4–§6 are framed as "three ways to destroy the
// evidence", since every one of those defects compiles, runs, and costs someone an hour later.
export const errors: Course = {
  id: 'errors',
  title: 'Exceptions, files & I/O',
  sections: [
    whyExceptions,
    throwableHierarchySection,
    checkedVsUnchecked,
    tryCatchFinally,
    throwing,
    chaining,
    readingAStackTrace,
    tryWithResourcesSection,
    nioPath,
    filesReadWrite,
    youAreHere,
  ],
}
