import type { Section } from '../types'

export const throwing: Section = {
  id: 'throwing',
  title: 'Throwing & custom types',
  scene: 'try-catch',
  slide: `## Fail early, and carry the context

\`\`\`java
if (qty <= 0) throw new IllegalArgumentException(
        "qty must be > 0, was " + qty);
Objects.requireNonNull(id, "id");   // returns it
\`\`\`
**Validate at the boundary.** Course 3 §4's constructor argument, generalised: validate on line one and every line after can assume good input.

### Pick from the standard set first
\`IllegalArgumentException\` (bad argument) · \`IllegalStateException\` (bad **time** to call this) · \`UnsupportedOperationException\` · \`NoSuchElementException\`. Everyone already knows them.

### Write your own when the caller must **distinguish** it
And then **the fields are the point** — \`account\`, \`shortfall\`. One carrying only a message is a \`RuntimeException\` with extra typing.

### The message
Include the **values**. \`"was -3"\` saves the round trip \`"invalid qty"\` costs you.`,
  narration:
    "Throwing is one keyword — throw, followed by an instance. The interesting questions are when, and what. When: fail early, at the boundary. The moment a method receives input it can't work with, it should say so, before doing anything else. That's exactly the constructor argument from course three section four, generalised to every method: if you validate on line one, then every line after it can assume the input is good, and you never end up half-way through an operation discovering you can't finish. Objects dot requireNonNull is the neat one-liner for the commonest case — it throws a NullPointerException with your message, and returns the value, so you can use it inline in a field assignment. What to throw: check the standard set first, because there are four that cover most situations and every Java developer already knows exactly what they mean. IllegalArgumentException: you passed me something I can't use. IllegalStateException: the argument is fine but this is the wrong time to call this method — the connection isn't open, the builder has already been built. That distinction between bad argument and bad timing is genuinely useful and people often miss it. UnsupportedOperationException, which is what an immutable collection throws. And NoSuchElementException. Using the standard ones means a reader knows what happened without opening anything. Now, your own. The test for whether to write a custom exception is: does the caller need to distinguish this from other failures and react differently? If yes, it needs its own type, because catch dispatches on type and that's the only way they can. And when you do write one, the fields are the point. Look at InsufficientFunds: it carries the account and the shortfall. That's what makes it useful — the handler can read the shortfall and decide, or put it in a message to the user. A custom exception carrying nothing but a message string is just a RuntimeException with extra ceremony; if you're not adding data or a distinction, don't add a class. Finally, the message itself, and this is a small habit with a large payoff. Include the actual values, not just the complaint. Quote invalid quantity is a message that tells whoever is debugging nothing at all — they now have to reproduce it to find out what the quantity was. Quote qty must be greater than zero, was minus three tells them immediately. Every field you put in the message is a round trip you don't take at three in the morning.",
}
