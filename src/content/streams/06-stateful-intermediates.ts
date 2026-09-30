import type { Section } from '../types'

export const statefulIntermediates: Section = {
  id: 'stateful-intermediates',
  title: 'Stateful operations',
  scene: 'stream-operations',
  slide: `## The ones that have to remember

\`filter\` and \`map\` see **one element at a time**. These can't:

- **\`sorted()\`** — **buffers everything** before emitting anything. O(n) memory and a **full barrier**. Never on an infinite stream.
- **\`distinct()\`** — remembers what it has seen, via **\`equals\`/\`hashCode\`** (course 3 §10 again)
- **\`limit\`** / **\`skip\`** — cheap, but they count
- **\`takeWhile\`** / **\`dropWhile\`** — stop at the **first** failure. On a **sorted** stream \`takeWhile\` short-circuits where \`filter\` would scan it all

### Why knowing which matters
A stateful op **can't short-circuit** and **costs memory**. \`sorted().limit(3)\` sorts the whole stream to give you three.

### Ordering
An ordered source preserves encounter order, and that costs coordination in parallel. \`.unordered()\` releases it.`,
  narration:
    "Filter and map are stateless: each element is decided on its own, with no memory of the others. Some operations can't work that way, and it's worth knowing which, because they behave differently in three ways that matter. Sorted is the extreme case. To emit the smallest element, it has to have seen every element — so it buffers the entire stream before it can produce anything at all. That's two consequences. It costs order-n memory, which for a large source is real. And it's a full barrier: nothing downstream of a sorted runs until the source is completely exhausted, which kills short-circuiting through that point. And obviously you can never sort an infinite stream; it will simply consume memory until it dies. Distinct has to remember every element it has seen, in a set, which means it depends on equals and hashCode — course three section ten turning up again, and a broken hashCode here means duplicates get through. Limit and skip are stateful in a mild way: they just count, so they're cheap, but they are order-dependent. Then takeWhile and dropWhile, added in Java 9, and these are worth distinguishing from filter carefully because people conflate them. Filter tests every element and keeps the matches. TakeWhile takes elements while the predicate holds and stops completely at the first one that fails — it never looks at the rest. So on a sorted stream, takeWhile of quantity less than a hundred short-circuits the moment it passes a hundred, where filter would scan every remaining element pointlessly. DropWhile is the mirror: skip elements while the predicate holds, then emit everything from the first failure onwards. Why does the distinction matter in practice? Because a stateful operation cannot short-circuit and it costs memory. The classic example is sorted followed by limit three. That sorts the entire stream — potentially millions of elements — in order to hand you three. A bounded priority queue would do it in one pass with three elements of memory. Streams won't work that out for you. One last thing, about ordering. If the source is ordered — a List, say — the stream preserves encounter order all the way through, and maintaining that guarantee costs real coordination in a parallel stream. If you genuinely don't care about order, calling unordered releases the guarantee and can let the implementation go faster.",
}
