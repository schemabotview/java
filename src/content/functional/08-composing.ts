import type { Section } from '../types'

export const composingSection: Section = {
  id: 'composing',
  title: 'Composing',
  scene: 'composing',
  slide: `## Building behaviour out of behaviour

\`\`\`java
trim.andThen(len)  // trim FIRST — reads left to right
len.compose(trim)  // the SAME thing, backwards
\`\`\`
**Use \`andThen\`.** \`compose\` follows the maths convention (*f ∘ g* is *g* first) and is the one everybody gets backwards once.

### Predicates
\`\`\`java
big.and(paid)   big.or(paid)   big.negate()
Predicate.not(Order::isPaid)   // for a method ref
\`\`\`
\`and\` and \`or\` **short-circuit**, like \`&&\` and \`||\`.

### You've been doing this since course 5
\`Comparator.comparing(…).thenComparing(…)\` was composition all along.

### Why it justifies the *types*
\`big.and(paid)\` builds a **new** \`Predicate\` from two existing ones, and **neither knows the other exists** — so rules can be assembled at **run time**, from configuration.`,
  narration:
    "Composition is where these interfaces stop being a convenient way to pass a block of code and start being worth having as types. Every Function has two composition methods. AndThen: trim dot andThen of len means run trim first, then feed its result to len. It reads left to right in the order things happen, which is how you want to read code. Compose is the same operation written backwards: len dot compose of trim also means trim first, then len. Why does that exist? Because in mathematics, f composed with g conventionally means apply g first. So compose follows the maths and andThen follows reading order. Use andThen. Compose is the one everybody gets backwards exactly once, usually in a code review. Predicates compose too, with and, or and negate. Big dot and of paid gives you a new Predicate that's true when both are. And those short-circuit in the same way double-ampersand and double-pipe do in course two section four — if the first predicate says false, the second is never evaluated. There's also a static Predicate dot not, which exists to solve a small syntactic problem: you can't write Order colon colon isPaid dot negate, because a method reference isn't an expression you can call methods on. Predicate dot not of Order colon colon isPaid is how you say that. Now, you've already been composing for two courses without the word. Look at the Comparator line: Comparator dot comparing of Order colon colon qty, dot thenComparing of Order colon colon id. That's course five section ten, and it's exactly this pattern — building a bigger comparator out of smaller ones, each unaware of the others. And the last point is the important one, which is why composition justifies the whole design. If a lambda were just syntax for a block of code, you could pass it around and that's all. Because it's an object implementing an interface, you can combine two of them into a third at run time. Big dot and of paid produces a brand new Predicate, and neither of the two originals knows the other exists. Which means you can assemble behaviour from configuration — read a list of rule names from a file, look up a Predicate for each, fold them together with and, and you have a composite rule that nobody wrote. That is a genuinely different capability from a block of code, and it's the reason these are types.",
}
