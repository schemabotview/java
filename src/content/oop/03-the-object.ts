import type { Section } from '../types'

export const theObject: Section = {
  id: 'the-object',
  title: 'The object — an instance',
  scene: 'class-and-object',
  slide: `## \`new\` allocates. The variable holds an address.

\`\`\`java
Account a = new Account("A-1", 250);
Account b = a;    // SAME object — address copied
Account c = new Account("A-1", 250);  // different
\`\`\`
\`a == b\` is \`true\`; \`a == c\` is \`false\` though they're identical. That's §10's problem.

### What \`new\` does
**Allocates** and **zeroes** every field → runs the **constructor chain** (§4) → returns the **address**.

### \`null\` is not an object
It's the absence of one. Since 14, **helpful messages** name the link: \`Cannot invoke "Order.qty()" because "o" is null\`.

### Lifetime isn't yours
No \`free\`, no \`delete\`. An object lives while something can **reach** it. So a "leak" in Java is never forgotten memory — it's a **reference you forgot to drop**: a static map, a listener never removed, a cache with no eviction.`,
  narration:
    "So the class is the definition. New is what makes one. Account a equals new Account of A-1 and two-fifty. Three things happen, in order. The JVM allocates a block of memory on the heap big enough for this class's instance fields, and it zeroes all of them — numbers to zero, booleans to false, references to null. Then it runs the constructor chain, which is the next section. Then it hands back the address, and that address is what gets stored in the variable a. Which means a is not the account. A is a slot on the stack holding a number that says where the account is. This is the picture from course two section two, and it produces the behaviour in the middle of the slide. Account b equals a copies the address, so a and b point at the same single object; a double-equals b is true. But account c equals new Account with exactly the same id and balance creates a second object with identical contents, and a double-equals c is false, because double-equals asks are these the same object, not do these look the same. That gap between same object and same contents is the whole subject of section ten. Now null. Null is not an object and it is not zero — it's the absence of an object, a reference pointing nowhere. Call a method through it and you get a NullPointerException, which is far and away the most common runtime failure in Java. One genuinely useful improvement: since Java 14, helpful NullPointerException messages are on by default, and instead of a bare line number you get the exact link that was null — cannot invoke Order dot qty because o is null. In a chained expression that saves real time. Finally, lifetime, and this is different from C or C-plus-plus. You never free an object. There is no delete. An object lives for exactly as long as something can still reach it — a local variable, a field of a reachable object, a static field. Once nothing can, the garbage collector will eventually reclaim it, and you have no say in when. Which reframes what a memory leak is in Java. It is never forgotten memory, because the collector cannot forget. It is a reference you forgot to drop: a static map that only ever grows, a listener you registered and never removed, a cache with no eviction policy. The object is still reachable, so the collector correctly keeps it, forever.",
}
