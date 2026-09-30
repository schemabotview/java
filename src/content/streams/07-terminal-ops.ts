import type { Section } from '../types'

export const terminalOps: Section = {
  id: 'terminal-ops',
  title: 'Terminal operations',
  scene: 'stream-operations',
  slide: `## The one that runs it — and spends it

\`\`\`java
.toList()           // 16+, IMMUTABLE. The default.
.collect(toList())  // older; mutable, unspecified
.collect(toCollection(TreeSet::new))
\`\`\`

### Getting one element out
\`findFirst()\` · \`findAny()\` — both return an **\`Optional\`** (§11). \`findAny\` lets a **parallel** stream return whatever it reaches first.

### Asking a question
\`anyMatch\` · \`allMatch\` · \`noneMatch\`, all **short-circuiting**. Note the vacuous case: on an **empty** stream \`allMatch\` is **\`true\`**.

### \`forEach\` — usually the wrong answer
The **escape hatch back to side effects**. Collecting into a list inside one means you wanted \`toList\`.

### On primitive streams
\`sum()\` · \`average()\` · \`summaryStatistics()\` — count, sum, min, max and mean in **one pass**.`,
  narration:
    "The terminal operation is the one that makes the pipeline run, and it consumes the stream — after it, that stream object is spent. Start with collecting into a list, because it's the most common and because the right answer changed recently. Since Java 16, Stream has a toList method directly. It returns an immutable list, it's shorter, and it should be your default. The older form, dot collect of Collectors dot toList, is still everywhere and still works — but note the difference: it returns a mutable list, of an unspecified implementation type. If you need a specific type, collect with toCollection and a constructor reference, like TreeSet colon colon new, which gives you a sorted set in one step. Getting a single element out: findFirst and findAny. Both return an Optional, and that's not defensive programming, it's honest — the stream might be empty, so there might be nothing to return. Why two methods? FindFirst promises the first element in encounter order, which in a parallel stream requires coordination. FindAny says any element will do, which lets a parallel stream return whatever it happens to reach first. In a sequential stream they behave the same. Asking a yes-or-no question: anyMatch, allMatch, noneMatch. All three short-circuit, so anyMatch stops at the first success and allMatch stops at the first failure. One detail worth knowing because it surprises people and it's mathematically correct: on an empty stream, allMatch returns true and noneMatch returns true. That's vacuous truth — every element of an empty set satisfies any predicate, because there are none to violate it. It's right, and it will still catch you out once. Then forEach, and I want to be blunt about it. ForEach is the escape hatch back to side effects. It returns nothing, so everything it does is a side effect, and that's exactly what the rest of this course has been steering away from. The test is simple: if you find yourself declaring a list before the pipeline and adding to it inside a forEach, you wanted toList or a collector. Occasionally forEach is genuinely right — printing, sending each element somewhere — and then use it. There's also forEachOrdered, which guarantees encounter order and costs real coordination in a parallel stream. And finally, on the primitive streams from section three: sum, average, max, min, and summaryStatistics — which gives you count, sum, min, max and average in a single pass over the data, in one object, and is the neatest thing in the whole API.",
}
