import type { Scene } from '@graphlearning/flow'
import { theBrief } from './the-brief'
import { model } from './model'
import { pipeline } from './pipeline'
import { concurrency } from './concurrency'

// Course 12 (project) scenes. `the-brief` is labelled with the course each piece comes from and is
// re-run by §11 — the capstone's argument is that the eleven courses were one subject, and the only
// way to show that is to make the dependencies visible on a single diagram. `project-model` carries
// §3/§5, `project-pipeline` carries §4/§6/§7. §2, §9 and §10 reuse earlier courses' scenes.
export const projectScenes: Scene[] = [theBrief, model, pipeline, concurrency]
