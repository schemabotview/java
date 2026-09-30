import type { Section } from '../types'

export const extendsWildcard: Section = {
  id: 'extends-wildcard',
  title: 'Wildcards — ? extends T',
  scene: 'pecs',
  slide: `## The producer: you may **read**, not write

Invariance (§2) makes this too rigid:
\`\`\`java
double sum(List<Number> xs)  // refuses List<Integer>
double sum(List<? extends Number> xs)   // accepts it
\`\`\`
\`? extends Number\` means **some specific unknown subtype** — \`List<Integer>\`, \`List<Double>\`, \`List<Number>\` all fit.

### Why reading is safe, writing isn't
Whatever it holds **is a \`Number\`**, so \`get\` is fine. \`xs.add(1)\` is **refused** — it might be a \`List<Double>\`.

> The **only** thing you can add to a \`List<? extends T>\` is \`null\`.

### The rule
Put \`? extends\` on any parameter you **only read from**. It costs the body nothing and accepts a whole family instead of one type.

\`Collections.copy\` takes both wildcards — read the source, write the destination.`,
  narration:
    "Section two said generics are invariant: a List of Integer is not a List of Number, and that refusal is necessary. But it's also, sometimes, far too rigid. Suppose you write a method double sum, taking a List of Number, and it just adds everything up. That method cannot be called with a List of Integer. Which is absurd — an Integer is a Number, and sum only ever reads. Wildcards are how you loosen exactly that, without losing safety. Write List of question mark extends Number. Read that as: a list of some specific unknown subtype of Number. Not a list of mixed Numbers — a list of one particular type that happens to be a subtype of Number, and the compiler doesn't know which. Now a List of Integer, a List of Double and a List of Number all fit the parameter. Now, why can you read from it and not write to it? Reading is safe because whatever the unknown type is, it's a Number. So Number n equals xs dot get of zero is always sound — you might be getting an Integer or a Double, but either way it's a Number and that's all you claimed. Writing is unsafe for the mirror-image reason. If you write xs dot add of one, the compiler has to ask: is an Integer acceptable here? And it genuinely doesn't know, because the list might be a List of Double, and putting an Integer into it would break it for everyone else holding it as a List of Double. So it refuses. In fact the only thing you can ever add to a List of question mark extends T is null, because null is a legal value of every reference type. That's a useful sentence to remember — it tells you immediately what a question-mark-extends parameter is for. So the rule. Any method parameter you only read from should be declared with question mark extends. It costs the method absolutely nothing — the body is unchanged — and it turns a method that accepts exactly one list type into one that accepts a whole family. That's why you see it all over the standard library. Look at the last line on the slide, from Collections dot copy: destination is a List of question mark super T, source is a List of question mark extends T. You read from the source, you write to the destination, and the signature says so precisely. Question mark super is the next section, and then that signature will read like a sentence.",
}
