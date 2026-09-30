import type { Section } from '../types'

export const thePipeline: Section = {
  id: 'the-pipeline',
  title: 'The pipeline',
  scene: 'stream-pipeline',
  slide: `## Source → intermediates → terminal

\`\`\`java
orders.stream()                 // source
      .filter(o -> o.qty() > 0) // intermediate
      .map(Order::customer)     // intermediate
      .toList();                // terminal — runs it
\`\`\`

- **Intermediate** — returns a **new Stream** and **does nothing**. You're building a recipe.
- **Terminal** — the **only** thing that makes anything happen, and it **consumes** the stream

### A stream is **not** a collection
It holds no elements. It's a **plan for a traversal** over a source that lives elsewhere — so it's **single-use**, and a second terminal throws \`IllegalStateException\`.

### What you're buying
The loop said **how**. The pipeline says **what** — and because the library owns the traversal, it can fuse the stages, short-circuit, and parallelise. Your loop couldn't, because the loop **was** the traversal.`,
  narration:
    "Streams are what lambdas were built for, and the shape is always the same three parts. A source, some intermediate operations, and exactly one terminal operation. Look at the code. Orders dot stream is the source — it doesn't copy the list, it creates a view over it. Filter and map are intermediate operations. Each one returns a new Stream, and — this is the part to hold onto — each one does absolutely nothing when you call it. You're not filtering. You're describing a filter. And toList is the terminal operation, and it is the only thing in that whole expression that causes any work to happen. Now the sentence that clears up most confusion: a stream is not a collection. It holds no elements. It has no size. It stores nothing. It is a plan for traversing a source that lives somewhere else. Which explains a behaviour that catches everyone once — a stream is single use. Call a second terminal operation on the same stream object and you get an IllegalStateException saying the stream has already been operated upon or closed. That isn't a limitation of the implementation; it's what it means to be a traversal rather than a container. Look at the bottom of the diagram, because the execution model is the next section but it's worth seeing now. It is not stage by stage. It does not filter the whole list, build an intermediate list, then map that whole list. One element goes all the way down the chain — filter, then map, then into the result — and then the next element starts. There is no intermediate collection at any point. So what are you buying? A loop tells the computer how: declare an accumulator, set up an index, check a condition, branch, append. Almost all of that is bookkeeping, and the one line you care about is buried in it. A pipeline says what: keep these, turn them into those, collect them. But it's more than readability, and this is the part that justifies the whole feature. Because the library owns the traversal instead of you, it can do things your loop couldn't. It can fuse the stages so there's no intermediate storage. It can stop early when the answer is already known. And it can split the work across threads without you rewriting anything. A hand-written loop gives the library none of those opportunities, because the loop is the traversal.",
}
