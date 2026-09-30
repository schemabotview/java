import type { Section } from '../types'

export const aggregate: Section = {
  id: 'aggregate',
  title: 'Aggregating',
  scene: 'project-pipeline',
  slide: `## The loop that \`groupingBy\` replaced

\`\`\`java
Map<String, Long> errors = entries.stream()
    .filter(e -> e.level() == Level.ERROR)
    .collect(groupingBy(LogEntry::source, counting()));

Map<Level, IntSummaryStatistics> latency = entries
    .stream().collect(groupingBy(LogEntry::level,
        summarizingInt(LogEntry::millis)));
\`\`\`
\`summarizingInt\` gives **count, min, max, sum and mean in one pass**. The hand-written version is five mutable variables and four chances to get it wrong.

**Filter before you map** — same answer, far less work (**c8 §4**).

### Top-N
\`sorted().limit(10)\` **sorts everything** to give you ten (**c8 §6**). Fine for a few hundred sources; for a million keys, a bounded \`PriorityQueue\`.

### Immutable out
\`Map.copyOf(…)\` — so §8 can pass these between threads with nothing to synchronise.`,
  narration:
    "Aggregation is where course eight earns its place, because the hand-written version of this is genuinely worse. Errors per source: stream the entries, filter to the ERROR level, and collect with groupingBy on the source and counting as the downstream. That's course eight section nine's downstream collector, and it replaces the classic block — declare a map, loop, computeIfAbsent, increment — with one expression that says what it produces. Latency per level is the same shape with a better downstream. SummarizingInt over the millis field gives you an IntSummaryStatistics per level, which carries the count, minimum, maximum, sum and mean — all computed in a single pass over the data. The hand-written equivalent is five mutable variables per level, and four opportunities to get the update wrong, and you'd almost certainly forget that the initial minimum has to be MAX_VALUE. Two things worth noticing about how it's written. The filter comes before anything expensive, which is course eight section four: same answer, far less work, and it costs nothing to order it that way. And the stream is over an already-materialised list, so there's no laziness subtlety to worry about here — we did the streaming at the file boundary in section four. Then top-N, which is where I want to be honest about a trade-off. Sorting the entry set descending by count and taking ten is the obvious and readable version, and it's what the code does. But course eight section six pointed out what that costs: sorted is a stateful operation that buffers everything and sorts the lot, in order to give you ten. For a few hundred distinct sources that's irrelevant and the readable version wins. For a million distinct keys it's wasteful, and a bounded PriorityQueue from course five section seven does it in one pass with ten elements of memory. Knowing which situation you're in is the skill; reaching for the complicated one by default is not. Finally, everything returned from the aggregator is wrapped in Map dot copyOf. That's course five section nine — an independent immutable snapshot. It costs one copy, and it means section eight can pass these maps between threads with no synchronisation at all, because there is nothing to synchronise. Immutability as a concurrency strategy, which is course ten section nine's second answer.",
}
