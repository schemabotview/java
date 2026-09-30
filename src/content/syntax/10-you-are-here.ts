import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here',
  scene: 'java-file-anatomy',
  slide: `## The map, now filled in

Same diagram as §1. The course walked **down** it.

- **§2 values** — **primitive** = the bits; **everything else** = a reference
- **§3 variables** — \`final\` locks the **binding**; \`var\` infers the **type**, statically
- **§4 expressions** — what has a value, and three arithmetic surprises
- **§5 strings** — immutable and **pooled**, so \`==\` works by accident
- **§6–§7** — two switches, four loops
- **§8 arrays** — fixed size, and the covariance hole
- **§9 methods** — overload order, and **pass-by-value, always**

### The through-line
Four sections were **one question**: *am I holding the thing, or an address to it?* §2 · §5 · §8 · §9. Get that picture right and much stops being surprising.

### Next
You can write a method; you can't design a **type**. Course 3 — classes, inheritance, interfaces, and the \`equals\`/\`hashCode\` contract.`,
  narration:
    "Back to the map from section one, with every layer now filled in. We walked down it. Section two was the bottom layer, values, and the split that everything else rests on: a primitive is the bits in the slot, and everything else in the language is a reference to an object on the heap. Section three was naming a value — declarations, final, which locks the binding and not the object, and var, which infers the type from the initialiser and does not make Java dynamic. Section four was expressions and operators, the distinction between having a value and doing something, plus the three arithmetic surprises: silent int overflow, integer division truncating, and binary doubles not holding zero point one. Section five was Strings, immutable and pooled, and why double-equals on them works by accident with literals and fails with runtime data. Sections six and seven were the statements that do things — the two switches, and why the arrow form is strictly better, and the four loop forms with the question that chooses between them. Section eight was arrays, the one fixed-size container, and the covariance hole that lets a type error survive to runtime. And section nine was methods: the signature, how overload resolution picks, and pass-by-value. Now, the through-line, because four of those sections were secretly the same question. Am I holding the thing, or an address to it? That is section two's primitive versus reference. It is section five's double-equals on Strings, where two variables can hold different addresses to equal contents. It is section eight's ArrayStoreException, where the address says Object array but the object knows it is a String array. And it is section nine's rename versus swap, where mutating through the address is visible and rebinding the address is not. If you take one picture out of this course, take that one, because a great deal of Java stops being surprising once it is clear. So where does that leave you? You can now read and write the inside of a method. You can declare variables, branch, loop, call things, and reason about what gets copied. What you cannot do yet is design a type — decide what a class should hold, what it should expose, how it should relate to other types, and what it means for two instances to be equal. That is course three: classes and objects, constructors, inheritance and polymorphism, abstract classes and interfaces, and the equals and hashCode contract that the collections in course five quietly depend on.",
}
