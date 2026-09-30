import type { Section } from '../types'

export const annotationsSection: Section = {
  id: 'annotations',
  title: 'You are here — and annotations',
  scene: 'annotations',
  slide: `## Annotations are metadata. Something else acts on them.

- **\`@Override\`** — the compiler **checks** it. A typo'd name is otherwise a **new method that silently never runs**
- **\`@Deprecated(since, forRemoval)\`** · **\`@FunctionalInterface\`** (fails the build on a second abstract method) · **\`@SuppressWarnings\`** (narrowest scope)

### Retention decides who can see it
**\`SOURCE\`** javac drops it · **\`CLASS\`** bytecode only (the default) · **\`RUNTIME\`** readable by **reflection**. An annotation **does nothing on its own** — javac, a processor, or a framework at startup must read it. **That's course 11.**

### The course
**§1** what a value can *be* · **§2–3** \`enum\`, and constants are objects · **§4–5** \`record\`, and the compact constructor · **§6** \`sealed\` · **§7–9** patterns take them apart, exhaustively

### Next
Course 5 — **collections**, where course 3 §10's contract stops being theory.`,
  narration:
    "Two things to close the course: annotations, and a look back. Annotations first. An annotation is metadata attached to a declaration, and the single most important thing to understand about them is that an annotation does nothing by itself. It is a label. Something else has to read that label and act on it, and which somethings can read it is decided by the annotation's retention. Take the built-in ones. At-Override is the one you should write reflexively. The compiler checks it: if you say you're overriding and you aren't — wrong name, wrong parameter type — it's an error. Without it, that mistake creates a brand new method that nothing ever calls, and your override silently doesn't happen. At-Deprecated marks something on its way out, and since Java 9 it takes since and forRemoval, so you can say when and whether it's really going. At-FunctionalInterface documents that an interface has exactly one abstract method and fails the build if someone adds a second, which protects every lambda written against it. At-SuppressWarnings turns off a specific warning, and the rule there is to apply it to the smallest possible scope — a single variable, not a whole class. Now your own. When you declare an at-interface, the retention policy decides who can ever see it. SOURCE means javac drops it entirely; it exists only for tools reading your source, like a linter. CLASS means it's in the bytecode but not loaded at run time, and that's the default. RUNTIME means it's kept and readable by reflection, which is what every framework you've ever used depends on — a container starting up, scanning your classes, finding the annotated ones and wiring them together. How that actually works is course eleven, where we do reflection. Now the look back. Section one asked the framing question: what can this value be, rather than what does it do. Sections two and three: an enum is a fixed list, type-safe and exhaustive, and its constants are real objects that can carry data and behaviour. Four and five: a record is a fixed shape, generating everything course three made you write by hand, with the compact constructor as the one place it gets an opinion — and the defensive copy that makes the immutability real. Six: sealed closes a family, which is what lets the compiler prove anything. Seven through nine: patterns take all of it apart, totally, with the compiler checking you covered every case. One sentence to keep: make illegal states unrepresentable. Next, course five — collections. And that's where course three section ten's equals and hashCode contract stops being theory and starts deciding whether your lookups find anything.",
}
