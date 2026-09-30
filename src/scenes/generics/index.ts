import type { Scene } from '@graphlearning/flow'
import { whyGenerics } from './why-generics'
import { writingGenerics } from './writing-generics'
import { pecs } from './pecs'
import { erasure } from './erasure'
import { gotchas } from './gotchas'

// Course 6 (generics) scenes. `writing-generics` carries §2–§5 (one card, four passes — the syntax
// is one mechanism at four scales, and only the DECLARATION SITE changes); `pecs` carries §6/§7.
// §10 re-runs `why-generics`, which is the course's whole argument.
export const genericsScenes: Scene[] = [whyGenerics, writingGenerics, pecs, erasure, gotchas]
