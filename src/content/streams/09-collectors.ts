import type { Section } from '../types'

export const collectorsSection: Section = {
  id: 'collectors',
  title: 'Collectors',
  scene: 'collectors',
  slide: `## The terminal that's itself extensible

\`\`\`java
.collect(joining(", ", "[", "]"))
.collect(toMap(Order::id, o -> o))  // THROWS on a dup
.collect(toMap(Order::id, o -> o, (a, b) -> b))
\`\`\`

### \`groupingBy\` replaces a whole loop
\`\`\`java
orders.collect(groupingBy(Order::customer));
\`\`\`
That's course 5 §5's \`computeIfAbsent(…).add(…)\` block, as one expression.

### The **downstream** argument is the good part
The second argument is **another Collector**, so grouping **composes**: \`counting()\` for a count per key, a nested \`groupingBy\` for two levels, \`mapping(…)\` to transform each group. It reads like SQL because it **is** a \`GROUP BY\`.

### Also
\`partitioningBy\` — always **two keys**, even when one is empty. \`teeing\` — two collectors, **one pass**.`,
  narration:
    "Collect is the general-purpose terminal operation, and the thing that makes it powerful is that it's parameterised by an object — a Collector — so it's the one terminal you can extend. Start with the simple ones. Joining concatenates a stream of strings, and with three arguments it takes a separator, a prefix and a suffix, so you get a formatted list in one call — and it uses a single StringBuilder internally, which the plus-in-a-loop version from course two section five does not. ToMap builds a map from two functions: one for the key, one for the value. And there's a trap in toMap worth knowing before you hit it: if two elements produce the same key, toMap throws IllegalStateException with a message about a duplicate key. That's deliberate — it's telling you your key isn't unique. If duplicates are expected, pass a third argument, a merge function, that says what to do when two values collide: keep the first, keep the last, add them together, whatever's right. Now groupingBy, which is the one that replaces entire loops. Orders dot collect of groupingBy of Order colon colon customer gives you a Map from customer to the List of their orders. That is exactly the computeIfAbsent-then-add block from course five section five, written as one expression, and it's usually the moment people decide streams are worth learning. But the really good part is the second argument. GroupingBy optionally takes a downstream collector — another Collector that decides what to do with each group instead of just listing it. So groupingBy customer with counting gives you a map from customer to how many orders they placed. GroupingBy customer with groupingBy status gives you a two-level nested map. GroupingBy customer with mapping — extract a field first, then collect — gives you a map from customer to their order ids rather than the whole objects. And because the downstream is itself a collector, this nests to any depth. If it reads like SQL, that's not a coincidence: groupingBy with a downstream is a GROUP BY with an aggregate. Two more worth knowing. PartitioningBy is groupingBy on a boolean predicate, and its useful property is that it always returns both keys — true and false — even when one side is empty, which a groupingBy would simply omit. And teeing, added in Java 12, runs two collectors over the same stream in a single pass and merges their results, so you can get the count and the sum without traversing twice. Underneath, a Collector is four things: a supplier that makes the container, an accumulator that adds one element, a combiner that merges two containers, and a finisher. And you now know why the combiner has to be there — it's the parallel merge, exactly as in the last section.",
}
