import type { Course } from '../types'
import { whyJava } from './01-why-java'
import { modernJava } from './02-modern-java'
import { install } from './03-install'
import { theRun } from './04-the-run'
import { jshell } from './05-jshell'
import { jbang } from './06-jbang'
import { maven } from './07-maven'
import { packages } from './08-packages'
import { theJvmSketch } from './09-the-jvm-sketch'
import { youAreHere } from './10-you-are-here'

// Course 1 — the machine, before the language. The spine is §4 (source → javac → bytecode → JVM);
// §3, §5–§8 are each a different way of driving that spine, and §9 goes inside its right-hand box.
// §10 re-runs §4's scene, which is the whole argument of the course.
export const runtime: Course = {
  id: 'runtime',
  title: 'Setup & the runtime',
  sections: [whyJava, modernJava, install, theRun, jshell, jbang, maven, packages, theJvmSketch, youAreHere],
}
