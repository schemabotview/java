import type { Section } from '../types'

export const modellingWithTypes: Section = {
  id: 'modelling-with-types',
  title: 'Modelling data with the right type',
  scene: 'type-choice',
  slide: `## Ask what the value can **be**, not what it does

Course 3 built types that **guard a rule**. Most types in a real program have no rule to guard — they're **data**.

### The four declarations
- **\`enum\`** — a fixed **list**. \`NEW · PAID · SHIPPED\`
- **\`record\`** — a fixed **shape**. \`Order(id, qty)\`
- **\`sealed\`** — a closed **family**. An \`Event\` is a \`Placed\` or a \`Shipped\`, and nothing else
- **\`class\`** — state **plus an invariant**. Course 3's \`Account\`

### Why it's worth the care
\`enum\` and \`sealed\` are **exhaustive**: a \`switch\` needs no \`default\`, and when someone adds a constant next year **every switch stops compiling until it's handled**.

The alternative — \`String status\`, \`int kind\` — makes every illegal state **representable** and pushes the check to run time.

> **Make illegal states unrepresentable.** That's the whole course.`,
  narration:
    "Course three was about types that guard a rule — an Account that will not let its balance go negative. But if you look at a real program, most of its types have no rule to guard at all. They are data. An order has an id and a quantity. An event happened at a time. For years Java made you write forty lines of ceremony to say that, and people quite reasonably concluded that Java was verbose. Java 21 has much better answers, and this course is about choosing between them. The question that picks one is at the top of the diagram, and it is deliberately not the question people usually ask. Don't ask what does this type do. Ask what can this value be. There are four answers. If the value is one of a fixed list known when you compile — a status is NEW or PAID or SHIPPED — that is an enum. If the value is a fixed shape, a bundle of fields with nothing hidden and no rule to enforce, that is a record. If the value is one of a closed family of shapes — an Event is a Placed or a Paid or a Shipped, and there will never be another kind — that is a sealed hierarchy. And if the value has state plus an invariant that has to be defended, that is a class, and that was course three. Now, why is it worth being careful about this rather than just using a String? Because of the word exhaustive. Enums and sealed types have a property nothing else in Java has: the compiler knows the complete list of possibilities. Which means a switch over them needs no default branch — the compiler can prove you covered everything. And far more valuably, when somebody adds a fourth status next year, every switch in the codebase that doesn't handle it stops compiling. That is not an inconvenience. That is the compiler walking you to every place that needs updating, at build time, for free. Compare the alternative. If status is a String, then every illegal state is representable — a caller can pass the word banana, or misspell shipped, and nothing notices until run time, in production, probably in a log file nobody reads. If kind is an int, the same. So the sentence to carry through the whole course is this one: make illegal states unrepresentable. Not caught, not validated — unrepresentable, so the thought cannot be expressed. Everything that follows is a tool for doing that.",
}
