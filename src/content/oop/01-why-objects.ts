import type { Section } from '../types'

export const whyObjects: Section = {
  id: 'why-objects',
  title: 'Why objects',
  scene: 'why-objects',
  slide: `## Where does the rule live?

An account's balance may **never go negative**. That's an **invariant** — and this course is about where it gets enforced.

### Left: data, rules scattered across callers
\`balance\` is a plain writable field. Every caller must **remember** the check. One won't — and the bug surfaces as **corrupt data far from the code that caused it**.

### Right: one object that owns both
The field is **\`private\`**. The only way in is \`withdraw(…)\`, which **cannot be bypassed**. The rule holds by construction, not by discipline.

> An **object** is **state** plus the **behaviour that guards it**, bound so the state can't be reached except through the behaviour.

### The four ideas, and what each buys
- **Encapsulation** (§5) — the invariant has somewhere to live
- **Inheritance** (§6) — share what's common
- **Polymorphism** (§7) — vary behaviour without the caller knowing
- **Abstraction** (§8–9) — depend on a **contract**`,
  narration:
    "Course two left you able to write a method. This course is about designing a type, and the whole thing turns on one question. Take a rule: an account's balance may never go negative. In the jargon that is called an invariant — something that must be true about a piece of data at all times. The question is: where does that rule live? Look at the left half of the diagram. Here the balance is just a field, a plain number that anything can write to. The rule lives in the callers. The teller code remembers to check before subtracting. The batch job was written by someone else six months later and forgot. And somewhere there's a line that just does balance minus-equals n inline with no check at all. Now, none of that code looks wrong when you read it. That's the problem. The failure shows up much later as a negative balance in the database, and nothing in the stack trace tells you which of the three callers did it. The rule was never in one place, so it could never be enforced. Now the right half. One object, Account. The balance field is private, which means genuinely unreachable from outside the class — not by convention, by the compiler. The only way to change it is to call withdraw, and withdraw checks. There's no other door. The rule now holds by construction rather than by everyone remembering, and if you want to know how a balance could possibly have gone negative, there is exactly one method to read. So here's the definition to hold onto for the rest of the course. An object is state plus the behaviour that guards it, bound together so that the state cannot be reached except through the behaviour. Not data with functions attached — the binding is the point. Four ideas follow from that, and each buys something specific. Encapsulation, section five, is what gives the invariant somewhere to live. Inheritance, section six, lets related types share what's common. Polymorphism, section seven, lets behaviour vary without the caller knowing or caring which variant it holds. And abstraction, sections eight and nine, lets you depend on a contract rather than on an implementation. One honest caveat before we start. Objects are not the only good way to design software, and Java itself has moved towards immutable data and functions over it — course four is largely about that. But for anything that has a rule about its own data, this is the tool that makes the rule stick.",
}
