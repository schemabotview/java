import type { Section } from '../types'

export const reduce: Section = {
  id: 'reduce',
  title: 'reduce — and why the combiner exists',
  scene: 'stream-operations',
  slide: `## Fold a stream down to one value

\`\`\`java
.reduce((a, b) -> a + b)      // Optional<T>
.reduce(0, (a, b) -> a + b)   // T — never empty
.reduce(0, (a, b) -> a + b.qty(), Integer::sum)
\`\`\`

### The identity must be a real identity
\`identity op x\` must equal \`x\`. Get it wrong and **parallel** is wrong — each split starts from it, so a "seed" of 1 for \`+\` adds 1 **per chunk**.

### The operator must be **associative**
Parallel splits and combines in an **unspecified grouping**. Sequential hides this completely.

### That's what the **third** argument is for
Two-arg folds \`T\` with \`T\`. Three-arg folds a \`U\` **accumulator** with a \`T\` element — so it needs a way to merge two \`U\`s. The combiner is **only ever called in parallel**.

Most reductions already have names: \`sum\`, \`count\`, \`min\`, \`joining\`.`,
  narration:
    "Reduce folds a whole stream down to a single value, and it has three forms that people find confusing until you see what the extra arguments are for. The one-argument form takes a binary operator and returns an Optional, because if the stream is empty there's genuinely nothing to return. The two-argument form takes an identity value first, so there's always an answer and you get a plain T back. Now, the identity. It is not a starting value or a seed — it must be a genuine identity for your operation, meaning identity combined with any x gives back x unchanged. Zero for addition. One for multiplication. The empty string for concatenation. Why does that matter so much? Because in a parallel stream, the work is split into chunks and every chunk starts from the identity. So if you pass 1 as the identity for addition, thinking of it as a seed, you don't add one — you add one per chunk, and the answer changes depending on how many cores the machine has. That's a bug that passes every test on your laptop. Second requirement: the operator must be associative. A combined with b, then with c, must equal a combined with the result of b and c. Addition is. Multiplication is. Min and max are. Subtraction is not, and neither is division. And again, in a sequential stream you'll never notice, because it folds strictly left to right. Parallel splits and recombines in an unspecified grouping, so a non-associative operator gives you a different answer on different runs. Now the three-argument form, which is the one that looks mysterious. Notice what's different about it: the two-argument version folds a T together with another T. The three-argument version folds a U accumulator together with a T element — different types. So the accumulator can be a running total while the elements are Orders. But if the types differ, the binary operator can't be used to merge two partial results, because those are both Us. Hence the third argument, the combiner: it takes two Us and merges them. And here's the useful fact — the combiner is only ever called in a parallel stream. Sequentially it's dead code. If you've ever wondered why it exists, that's the answer: it's the parallel merge step, and it must be there even when you're not using it. Last, practical advice. Most reductions already have names. Sum, count, min, max, joining, averagingInt are all reductions someone wrote for you, and they're clearer at the call site. Reach for raw reduce when your operation doesn't have a name.",
}
