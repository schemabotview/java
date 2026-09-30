import type { Section } from '../types'

export const mapFilter: Section = {
  id: 'map-filter',
  title: 'map & filter',
  scene: 'stream-operations',
  slide: `## The two that do most of the work

\`\`\`java
.filter(o -> o.qty() > 0)   // Predicate — keep matches
.map(Order::customer)       // Function — change each
\`\`\`
Course 7's four shapes, showing up where you'd expect.

### \`map\` changes the stream's **type**
\`Stream<Order>\` → \`Stream<Customer>\`. The compiler tracks it, so a wrong step is a **compile error**, not a surprise downstream.

### Order matters — for cost, not correctness
\`\`\`java
.filter(cheap).map(expensive)   // only survivors
.map(expensive).filter(cheap)   // everything
\`\`\`
Same answer, very different work. **Filter early.**

### Keep the lambdas pure
A side-effecting \`map\` is a loop in a costume — and a **data race** the moment the stream goes parallel (§10). \`peek\` is **for debugging only**.`,
  narration:
    "Map and filter do most of the work in most pipelines, and having done course seven, their signatures should read immediately. Filter takes a Predicate — a question about each element — and keeps the ones where the answer is true. Map takes a Function and replaces each element with the result of applying it. Those are two of the four shapes from course seven, showing up exactly where you'd expect. The important structural thing about map is that it changes the stream's type. A Stream of Order, mapped through Order colon colon customer, becomes a Stream of Customer. Map through Customer colon colon email and it becomes a Stream of String. The type moves with every stage, the compiler tracks it precisely, and that means a mistake in the middle of a long chain is a compile error at the exact stage where the type stopped making sense — not a ClassCastException somewhere downstream. That's generics from course six doing quiet work. Now a point about ordering that costs nothing and matters. Filter then map, versus map then filter. Where both are valid, they give the same answer — but they do very different amounts of work. If you filter first, the expensive mapping only runs on the elements that survived. If you map first, it runs on everything and then you throw most of it away. So: filter early, and cheaply. Put the cheapest, most selective predicate first. Since the pipeline is lazy and fused, that ordering is the whole optimisation, and it's just moving a line. And then the discipline point, which becomes a correctness point in section ten. Keep your lambdas pure. A map's function should take an element and return a value, and touch nothing else. No adding to a list declared outside, no incrementing a counter, no writing a field. There are two reasons. First, a map that works by side effect is a loop wearing a costume, and it's harder to read than the loop was. Second, and more seriously: the moment somebody adds the word parallel to that pipeline, every one of those side effects becomes a data race, and the failure will be intermittent and awful. Related: there is an operation called peek, which lets you look at each element as it goes by. It exists for debugging — printing what's flowing through a stage. It is not a place to do work, and in some pipelines it may not even run, because the implementation is allowed to skip it when the result isn't needed.",
}
