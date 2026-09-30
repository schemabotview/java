import type { Course } from '../types'
import { theBrief } from './01-the-brief'
import { structure } from './02-structure'
import { model } from './03-model'
import { read } from './04-read'
import { parse } from './05-parse'
import { aggregate } from './06-aggregate'
import { generics } from './07-generics'
import { concurrency } from './08-concurrency'
import { test } from './09-test'
import { packageSection } from './10-package'
import { shipped } from './11-shipped'

// Course 12 — the capstone. Its argument is that the eleven courses were one subject, so every
// section names which course each decision came from, and §11 collects them. Several sections reuse
// earlier courses' scenes on purpose (§2 maven-project, §9 testing, §10 build-tools): seeing the
// same diagram again, now with a program hanging off it, is the point.
export const project: Course = {
  id: 'project',
  title: 'Capstone project',
  sections: [theBrief, structure, model, read, parse, aggregate, generics, concurrency, test, packageSection, shipped],
}
