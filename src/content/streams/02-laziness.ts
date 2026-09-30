import type { Section } from '../types'

export const lazinessSection: Section = {
  id: 'laziness',
  title: 'Laziness — and what it buys',
  scene: 'laziness',
  slide: `## Print the order and the model is obvious

Put a \`println\` in the \`filter\` and the \`map\`, build the pipeline, and **nothing prints**. Add the terminal, and you get:

\`\`\`
filter A-1   map A-1   filter A-2   map A-2
\`\`\`
**Interleaved.** One element all the way down, then the next — **not** filter-everything-then-map-everything. There's no intermediate list at any stage.

### Three things that follows
- **Short-circuiting.** \`.filter(big).findFirst()\` stops at the **first match**; the rest of the list is never touched. Same for \`anyMatch\`, \`limit\`, \`takeWhile\`.
- **Infinite sources work.** \`Stream.iterate(1, n -> n * 2).limit(10)\` terminates, because \`limit\` stops asking.
- **No intermediate allocation.** Three chained \`map\`s allocate no lists at all.

### Underneath: \`Spliterator\`
The source's \`trySplit\` and \`tryAdvance\` are what the terminal pulls on — and why splitting well (§10) depends on the **source**, not the pipeline.`,
  narration:
    "Laziness is the idea people nod along to and then get wrong when it matters, and there's a two-minute experiment that settles it permanently. Put a println inside the filter and another inside the map. Build the pipeline — source, filter, map — and assign it to a variable. Run it. Nothing prints. Nothing at all. You have built a recipe and not cooked anything. Now call toList, and watch the order that comes out. Filter A-1, map A-1, filter A-2, map A-2. Interleaved. That is the evidence. If streams worked stage by stage, you'd see filter A-1, filter A-2, filter A-3, and then all the maps. You don't. Each element is pulled all the way down the chain before the next one begins, and there is no intermediate list at any point. Hold that picture; it explains everything that follows. Three consequences, and each is worth something real. First, short-circuiting. Filter followed by findFirst stops the moment it finds a match. Not at the end of the list — at the first match. The remaining elements are never filtered, never mapped, never touched. Same for anyMatch, allMatch, noneMatch, limit and takeWhile. In a loop you'd write a break; in a pipeline it's free, and it works through however many stages you've chained. Second, infinite sources are fine. Stream dot iterate starting at one and doubling forever, dot limit of ten, terminates immediately and gives you ten numbers. The source is genuinely unbounded and it doesn't matter, because limit stops asking for more. That's only possible because nothing is computed until it's demanded. Third, no intermediate allocation. Three chained maps over a million elements allocate zero lists. The equivalent written as three loops with three temporary lists allocates three million objects and touches them all three times. Underneath all this is an interface called Spliterator, and it's worth knowing the name. A Spliterator is the source's answer to two questions: give me the next element, and can you split yourself in half? The terminal operation pulls on tryAdvance to get elements one at a time. And trySplit is what a parallel stream uses to divide the work — which is why, in section ten, whether parallelism helps depends on what your source is rather than on what your pipeline does.",
}
