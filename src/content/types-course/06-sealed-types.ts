import type { Section } from '../types'

export const sealedTypes: Section = {
  id: 'sealed-types',
  title: 'Sealed types — a closed family',
  scene: 'sealed',
  slide: `## A hierarchy you're allowed to close

\`\`\`java
sealed interface Event permits Placed, Paid, Shipped {}
record Placed(String id) implements Event {}
record Paid(String id, long amt) implements Event {}
\`\`\`
\`class Rogue implements Event\` — **compile error**. Not in the list.

### The rules
Every permitted type declares how **it** closes: **\`final\`** (records are), **\`sealed\`** again, or **\`non-sealed\`** to reopen that branch. Same package; omit \`permits\` and the compiler infers it from the **same file**.

### Why closing it buys anything
Normal inheritance is **open**, so a \`switch\` can never be proved complete and always needs a \`default\` — and \`default\` is where a forgotten case hides.

**Sealed + \`switch\` = exhaustiveness.** A fourth event **breaks every switch until it's handled**.

**\`sealed\` + \`record\`** is Java's **algebraic data type**.`,
  narration:
    "Sealed types arrived in Java 17 and they are the piece that makes everything else in this course click together. Here's the idea. Normal inheritance in Java is open. If you declare an interface, anybody anywhere — in your codebase, in a library, in code written three years from now — can implement it, and there is nothing you can do about that. Usually that's the point. But sometimes it's exactly wrong. An order event is a Placed, a Paid or a Shipped. That is the complete list. It is not extensible; a fourth kind would be a change to the domain, not a plugin point. Sealed lets you say that. Sealed interface Event permits Placed, Paid, Shipped. And now if someone writes class Rogue implements Event, that is a compile error. Not a warning, not a runtime check — the compiler refuses. A few rules. Every permitted type has to declare how it closes, because otherwise the seal leaks one level down. It can be final, which records are automatically, so records are the natural leaf. It can be sealed itself, giving you a deeper closed tree. Or it can be explicitly non-sealed, which deliberately reopens that one branch for extension. The permitted types have to live in the same package, or the same module if you're using modules. And there's a nice shorthand: if all the permitted types are in the same file, you can leave out the permits clause entirely and the compiler works it out. Now, why is closing it worth anything? Because of what the compiler can then prove. Over an open hierarchy, a switch can never be complete — there might always be a subtype the compiler has never seen — so you're forced to write a default branch. And default is precisely where a forgotten case goes to hide: it compiles, it runs, and it silently does the wrong thing for the case you didn't think about. Over a sealed hierarchy, the compiler knows the whole list. So a switch that covers all of them is exhaustive, needs no default, and — this is the payoff — the day someone adds Cancelled to the permits clause, every switch in the codebase that doesn't handle Cancelled stops compiling. You get a complete list of the places that need attention, at build time. And this is why sealed and record are introduced together in this course. Sealed says here are the alternatives; record says here is the shape of each one. Together that is what other languages call an algebraic data type, or a sum of products, and Java now has it. Sections seven through nine are how you take one apart.",
}
