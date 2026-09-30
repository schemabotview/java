import type { Course } from '../types'
import { insideTheJvm } from './01-inside-the-jvm'
import { jit } from './02-jit'
import { escapeAnalysis } from './03-escape-analysis'
import { garbageCollection } from './04-garbage-collection'
import { gcTuning } from './05-gc-tuning'
import { profiling } from './06-profiling'
import { classLoadingSection } from './07-class-loading'
import { modules } from './08-modules'
import { annotations } from './09-annotations'
import { reflectionSection } from './10-reflection'
import { maven } from './11-maven'
import { junit5 } from './12-junit5'
import { youAreHere } from './13-you-are-here'

// Course 11 — course 1's two diagrams, opened up. §1 and §6 deliberately re-run `jvm-memory` and
// `java-pipeline`: the point is that those pictures were true and shallow, and the course is what
// they were hiding. §9–§10 are the hinge for everything else the reader will meet — three lines of
// reflection over a RUNTIME-retained annotation is every framework in the ecosystem.
export const jvm: Course = {
  id: 'jvm',
  title: 'The JVM, build & testing',
  sections: [
    insideTheJvm,
    jit,
    escapeAnalysis,
    garbageCollection,
    gcTuning,
    profiling,
    classLoadingSection,
    modules,
    annotations,
    reflectionSection,
    maven,
    junit5,
    youAreHere,
  ],
}
