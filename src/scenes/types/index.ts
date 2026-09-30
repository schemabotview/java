import type { Scene } from '@graphlearning/flow'
import { typeChoice } from './type-choice'
import { enums } from './enums'
import { records } from './records'
import { sealed } from './sealed'
import { patterns } from './patterns'
import { annotations } from './annotations'

// Course 4 (types) scenes. Three are read more than once: `enums` carries §2/§3, `records` carries
// §4/§5, and `patterns` carries §7/§8/§9 as four rungs of one ladder — the progression only reads
// as a progression if the rungs stay on the same card. §10 re-runs `type-choice` alongside
// `annotations`.
export const typesScenes: Scene[] = [typeChoice, enums, records, sealed, patterns, annotations]
