import type { Section } from '../types'

export const creatingStreams: Section = {
  id: 'creating-streams',
  title: 'Creating streams',
  scene: 'stream-operations',
  slide: `## Where a pipeline starts

\`\`\`java
coll.stream()   Arrays.stream(a)   Stream.of(a, b)
IntStream.range(0, 10)     // primitive — no boxing
Files.lines(path)          // lazy — and must be CLOSED
Stream.iterate(1, n -> n * 2)   Stream.generate(…)
\`\`\`

### Primitive streams aren't a detail
\`Stream<Integer>\` **boxes every element**. \`IntStream\` doesn't — and it adds \`sum()\`, \`average()\` and \`summaryStatistics()\`, which \`Stream<T>\` has no equivalent of.
\`\`\`java
orders.stream().mapToInt(Order::qty).sum();
\`\`\`
Cross back with \`boxed()\` or \`mapToObj(…)\`.

### \`Files.lines\` needs closing
It holds a **file handle**. Use **try-with-resources** (course 9 §8) — it's the one stream you must close.

### \`iterate\`/\`generate\` are **infinite**
Always pair with \`limit\` or \`takeWhile\`. Forget, and it hangs rather than crashing.`,
  narration:
    "Every pipeline starts with a source, and there are more of them than people use. The common one is collection dot stream, which every Collection has since Java 8 — that's the default method we discussed in course three section nine. Arrays dot stream for an array. Stream dot of when you have a handful of values to hand. Now, the group that matters more than it looks: the primitive streams. If you write Stream of Integer, every single element is a boxed Integer object, with the allocation cost from course two section two. IntStream, LongStream and DoubleStream hold primitives directly — no boxing at all. And they're not just faster, they have methods that Stream of T simply does not have: sum, average, max, min and summaryStatistics, which gives you count, sum, min, max and average in one pass. So the idiomatic way to total a field is orders dot stream, dot mapToInt of Order colon colon qty, dot sum. MapToInt crosses from the object stream into the primitive one. Coming back the other way is boxed, or mapToObj when you're producing something. IntStream dot range and rangeClosed give you a stream of indices, which is occasionally exactly what you want. Then Files dot lines, which is genuinely lovely and has one trap. It reads a file lazily, line by line, so you can process a file larger than memory with a pipeline. But it holds an open file handle, so it must be closed. Stream implements AutoCloseable, and Files dot lines is essentially the only stream where that matters — so wrap it in a try-with-resources, which is course nine section eight. Forget, and you leak file descriptors until the process runs out. Finally, the infinite sources. Stream dot iterate takes a seed and a function and produces seed, f of seed, f of f of seed, forever. Stream dot generate takes a Supplier and calls it forever. Both are unbounded, both are perfectly usable, and both must be paired with something that stops asking — limit, or takeWhile. If you forget, the program hangs rather than crashing, which is worse. There's also a three-argument iterate, taking a seed, a condition and a next function, which is literally a for loop expressed as a stream and is often the clearest of the lot.",
}
