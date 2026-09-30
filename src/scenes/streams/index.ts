import type { Scene } from '@graphlearning/flow'
import { streamPipeline } from './stream-pipeline'
import { laziness } from './laziness'
import { operations } from './operations'
import { collectors } from './collectors'
import { parallel } from './parallel'
import { optional } from './optional'

// Course 8 (streams) scenes. `stream-operations` carries §3–§7 as one catalogue read five times —
// the value is in seeing which COLUMN an operation is in (element-wise, stateful, terminal), and
// splitting it across five cards would lose exactly that. §11 re-runs `stream-pipeline`.
export const streamsScenes: Scene[] = [streamPipeline, laziness, operations, collectors, parallel, optional]
