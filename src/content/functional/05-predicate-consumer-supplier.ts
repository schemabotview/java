import type { Section } from '../types'

export const predicateConsumerSupplier: Section = {
  id: 'predicate-consumer-supplier',
  title: 'Predicate, Consumer & Supplier',
  scene: 'four-interfaces',
  slide: `## The other three corners

### \`Predicate<T>\` — \`boolean test(T)\`
A **question** about a value. Behind \`filter\`, \`removeIf\`, \`anyMatch\`, \`takeWhile\`. Composes: \`and\` · \`or\` · \`negate\` · \`Predicate.not(…)\` for a method reference.

### \`Consumer<T>\` — \`void accept(T)\`
Takes a value, returns **nothing** — so it exists **only** for its side effect. Behind \`forEach\` and \`ifPresent\`. \`andThen\` runs two in order.

### \`Supplier<T>\` — \`T get()\`
Takes nothing, produces a value — and the point is **deferral**. The difference is real:
\`\`\`java
orElse(expensive())         // ALWAYS evaluated
orElseGet(() -> expensive())   // only if empty
\`\`\`
Same for \`orElseThrow\`, \`Objects.requireNonNull(x, msg)\` vs the \`Supplier\` form, and every logger's lazy overload.

### The axes
**Takes a value?** **Returns one?** Those two questions name all four. Everything else in \`java.util.function\` is this grid × arity × primitives.`,
  narration:
    "Three more corners of the grid. Predicate of T has one method, boolean test of T. It's a question about a value — does this match? It's what filter takes, what removeIf takes, what anyMatch and allMatch and takeWhile take. And it composes: big dot and of paid, big dot or of urgent, big dot negate. There's also a static Predicate dot not, which exists because you cannot call dot negate on a method reference directly — not of Order colon colon isPaid is how you say that. Consumer of T has void accept of T. It takes a value and returns nothing, which means it exists purely for its side effect — printing, storing, sending. That's what forEach takes, and what Optional dot ifPresent takes. It has andThen too, which runs two consumers in order on the same value. Supplier of T is the mirror: nothing in, a T out. And the important thing about Supplier is not that it produces a value, it's that it produces the value later. Deferral is the whole point, and the difference is genuinely visible. Look at the two lines. Optional dot orElse of expensive: that calls expensive immediately, every time, before orElse even runs, because it's just an argument being evaluated. Even when the Optional has a value and the default is thrown away. Optional dot orElseGet taking a lambda only calls it when the Optional is actually empty. On a cheap default that's nothing; on a database call or an object allocation in a hot path, it's the difference between fine and not. And you'll see the same pairing all over the library. OrElseThrow takes a Supplier of the exception, so you don't build a stack trace you're not going to use. Objects dot requireNonNull has both a String overload and a Supplier overload for exactly this reason. Every serious logging API has a lazy overload so you don't concatenate a debug message that never gets printed. So: four interfaces, named by two questions. Does it take a value? Does it return one? Function yes and yes. Predicate yes, and returns a boolean specifically. Consumer yes and no. Supplier no and yes. Everything else in that package is this grid multiplied by how many arguments, and by which primitives you want to avoid boxing.",
}
