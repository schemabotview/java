import type { Section } from '../types'

export const generics: Section = {
  id: 'generics',
  title: 'The one abstraction that earned itself',
  scene: 'project-pipeline',
  slide: `## Three stages had the same shape

\`\`\`java
interface Stage<I, O> {
    Stream<O> apply(Stream<I> in);

    default <R> Stage<I,R> then(Stage<? super O,R> n) {
        return in -> n.apply(apply(in));
    }
}
\`\`\`

### Every line is a course
**\`<I, O>\`** belongs to the type (**c6 §3**) · **\`<R>\`** is the **method's** (**c6 §4**) · **\`? super O\`** — \`then\` only **feeds** values to \`n\`, so PECS says \`super\` (**c6 §7**) · **one abstract method** ⇒ a lambda **is** a \`Stage\` (**c7 §1**) · \`then\` is a \`default\`, so it comes free (**c3 §9**)

### Why this one and not five more
Course 6 §4: **prefer a generic method until a generic type earns itself.** This one did — three concrete stages, one shape.

> **The abstractions you didn't write are the ones that cost nothing.**`,
  narration:
    "This section is about restraint as much as about generics. While building the pipeline, three stages turned out to have exactly the same shape: take a stream of one thing, produce a stream of another. Read produces entries from paths. Parse produces results from lines. Filter produces entries from entries. Same shape, three times — and that's the threshold at which an abstraction has earned itself. So: interface Stage of I and O, with one method that takes a Stream of I and returns a Stream of O. And a default method, then, that composes two stages into one. Now walk the declaration, because almost every line of it is a course. The angle bracket I comma O sits on the interface, because those parameters describe the type as a whole — course six section three. The angle bracket R sits on the then method, because R is that method's own parameter and has nothing to do with the Stage's I or O — course six section four, and it's the same shape as Optional dot map. The question mark super O on the next parameter is PECS: then only feeds values into next, so next is a consumer of O, so super — course six section seven. And that matters concretely: it means a Stage declared over Object can be chained onto a Stage producing LogEntry, which is exactly the flexibility you want from a general-purpose stage. The interface has one abstract method, which by course seven section one means a lambda is a Stage — so nobody ever writes a class implementing this. And then is a default method, which by course three section nine means every implementor gets composition for free without writing anything. Now the restraint. Course six section four said prefer a generic method until a generic type earns itself. Three concrete uses and a composition operator worth having is earning it. What I did not write: a generic Repository, a generic Result of T, a generic pipeline builder with a fluent DSL. Every one of those was tempting while building this, and every one would have been an abstraction over a single use — which is not an abstraction, it's an indirection. The sentence to take away: the abstractions you didn't write are the ones that cost nothing.",
}
