import type { Section } from '../types'

export const flatmap: Section = {
  id: 'flatmap',
  title: 'flatMap — one in, many out',
  scene: 'stream-operations',
  slide: `## Flattening a level of nesting

\`map\` gives **one** output per input. \`flatMap\` lets each element become a **whole stream**, and concatenates them.

\`\`\`java
.map(Order::lines)     // Stream<List<Line>>  wrong
.flatMap(o -> o.lines().stream())   // Stream<Line>
\`\`\`
The function returns a **\`Stream\`**, not a collection — hence the \`.stream()\` inside.

### Where you'll reach for it
**Nested collections** — every line of every order · **splitting** one element into several · **dropping empties** — \`.flatMap(Optional::stream)\` turns a \`Stream<Optional<T>>\` into a \`Stream<T>\` (§11)

### The rule of thumb
If a \`map\` leaves you holding a \`Stream<List<X>>\` or a \`Stream<Optional<X>>\`, you wanted \`flatMap\`. **The nesting in the type is the signal.**

\`mapMulti\` (16+) does the same with no per-element \`Stream\` — hot code only.`,
  narration:
    "FlatMap is the operation people skip past and then need constantly. Here's the situation. Map gives you exactly one output element for each input element. But sometimes one input naturally produces many outputs — an order has several line items, a line of text has several words. If you use map for that, you get a Stream of List of Line: a stream whose elements are themselves collections, and now every downstream stage has to deal with that nesting. FlatMap fixes it. The function you give flatMap returns a Stream rather than a single value, and flatMap concatenates all those streams into one flat stream. So orders dot stream, dot flatMap of o arrow o dot lines dot stream, gives you a Stream of Line — every line of every order, as one sequence. Note the detail that trips people up: the function has to return a Stream, not a List. That's why there's a dot stream inside the lambda. Three places you'll want it. Nested collections, which is the example we just did. Splitting, where each element becomes several — lines dot flatMap of l arrow Arrays dot stream of l dot split, turns a stream of lines into a stream of words. And dropping empties, which is a lovely idiom: if you have a Stream of Optional of T, then dot flatMap of Optional colon colon stream gives you a Stream of T containing only the values that were actually present. That works because Optional got a stream method in Java 9 that returns either a one-element stream or an empty one. We'll come back to it in section eleven. The rule of thumb is easy to apply. If you wrote a map and you're now holding a Stream of List of something, or a Stream of Optional of something, you wanted flatMap. The nesting in the type is the signal. One modern addition worth a mention. Java 16 added mapMulti, which does the same job differently: instead of returning a Stream for each element, your function receives a consumer and pushes zero or more results into it. The advantage is that no intermediate Stream object is allocated per element, which in a genuinely hot loop over millions of elements is measurable. For ordinary code, flatMap is clearer and you should use it.",
}
