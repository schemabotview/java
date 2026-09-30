import type { Course } from '../types'
import { theMap } from './01-the-map'
import { values } from './02-values'
import { variables } from './03-variables'
import { expressionsSection } from './04-expressions'
import { strings } from './05-strings'
import { conditionals } from './06-conditionals'
import { loops } from './07-loops'
import { arrays } from './08-arrays'
import { methodsSection } from './09-methods'
import { youAreHere } from './10-you-are-here'

// Course 2 — the language inside a method. §1 draws the file's nesting and the course walks down it;
// §10 re-runs that scene with every layer filled in. Four sections (§2 · §5 · §8 · §9) are secretly
// one question — am I holding the thing or an address to it? — which §10 names as the through-line.
export const syntax: Course = {
  id: 'syntax',
  title: 'Core syntax',
  sections: [theMap, values, variables, expressionsSection, strings, conditionals, loops, arrays, methodsSection, youAreHere],
}
