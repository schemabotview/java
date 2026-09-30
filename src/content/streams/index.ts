import type { Course } from '../types'
import { thePipeline } from './01-the-pipeline'
import { lazinessSection } from './02-laziness'
import { creatingStreams } from './03-creating-streams'
import { mapFilter } from './04-map-filter'
import { flatmap } from './05-flatmap'
import { statefulIntermediates } from './06-stateful-intermediates'
import { terminalOps } from './07-terminal-ops'
import { reduce } from './08-reduce'
import { collectorsSection } from './09-collectors'
import { parallelStreams } from './10-parallel-streams'
import { optionalSection } from './11-optional'

// Course 8 — what course 7's vocabulary was built for. §2 gets its own section because laziness is
// the model everything else follows from, and a printed execution order settles it where a sentence
// does not. §8 and §10 are deliberately adjacent: identity and associativity look like trivia until
// §10 shows that sequential execution hides both mistakes perfectly.
export const streams: Course = {
  id: 'streams',
  title: 'Streams & Optional',
  sections: [
    thePipeline,
    lazinessSection,
    creatingStreams,
    mapFilter,
    flatmap,
    statefulIntermediates,
    terminalOps,
    reduce,
    collectorsSection,
    parallelStreams,
    optionalSection,
  ],
}
