import type { Section } from '../types'

export const shipped: Section = {
  id: 'shipped',
  title: 'Shipped',
  scene: 'the-brief',
  slide: `## Eleven courses, one program

**c1** a runnable jar · **c2** the CLI boundary, validated first · **c3** packages by feature, so most stays package-private · **c4** \`record\` + \`enum\` + \`sealed\` — a bad line is a **value** · **c5** maps, and \`equals\`/\`hashCode\` you didn't write · **c6** one \`Stage<I, O>\` that earned itself · **c7** a lambda **is** a \`Stage\` · **c8** \`groupingBy\` replacing a loop · **c9** \`Files.lines\`, closed, UTF-8 · **c10** a virtual thread per file · **c11** parameterised tests, one jar

### The three that carried the most
**Model so illegal states can't be written** (c4) — the sealed result removed every downstream null check.
**Don't share** (c10 §9) — no lock, because there was nothing to lock.
**Measure** (c11 §6) — \`sorted().limit(10)\` is fine *here*, and knowing why is the skill.

### Next
Spring Boot · JDBC/JPA · Testcontainers · JMH · *Effective Java*

> **You've met the machine and the language. The rest is practice.**`,
  narration:
    "The program is built, tested and packaged. So let's close by naming what it used, because that's the argument this capstone exists to make. Course one: it's a runnable jar, running on a JVM whose memory and startup you now understand. Course two: the CLI is a boundary, and it validates before doing anything. Course three: packages by feature rather than by layer, which is what let most of the implementation stay package-private. Course four did the heaviest lifting — a record for the entry, an enum for the level, and a sealed ParseResult that made a bad line a value rather than an exception or a null. Course five: maps everywhere, with equals and hashCode you didn't have to write and couldn't get wrong. Course six: exactly one generic type, because exactly one shape occurred three times. Course seven: that type has one abstract method, so a lambda is one. Course eight: groupingBy with downstream collectors, replacing loops that would have been five mutable variables each. Course nine: Files dot lines, closed properly, with the charset spelled out. Course ten: one virtual thread per file inside a scope, with nothing shared. Course eleven: parameterised tests over a pure function, and one jar out the end. Of all of that, three ideas carried the most weight. First: model the data so that illegal states cannot be written. The sealed ParseResult is the single decision that removed the most code — every downstream null check, every defensive catch, every is-this-valid flag simply never needed to exist, because the type said which of two things happened and the compiler made sure you handled both. Second: don't share. The concurrency section has no lock in it, not because locking was done carefully but because there was nothing to lock — each task owned its data and merging happened afterwards on one thread. Third: measure. We used sorted-then-limit knowing it sorts everything, because for a few hundred sources that's the right trade. Knowing which situation you're in, rather than applying a rule, is the actual skill. Where next. Spring Boot if you're building services, and you'll recognise that every annotation in it is course eleven's reflection loop. JDBC and JPA for databases. Testcontainers for tests against a real one. JMH if you're measuring. Effective Java, by Joshua Bloch, which is the book to read once you can already write Java — and you now can. And the JEP index, if you want to see what's coming to the language next. You have met the machine and you have met the language. The rest is practice.",
}
