import type { Section } from '../types'

export const whyGenerics: Section = {
  id: 'why-generics',
  title: 'Why generics',
  scene: 'why-generics',
  slide: `## The same error, moved to compile time

Before Java 5, a collection held \`Object\`:
\`\`\`java
List os = new ArrayList();
os.add("oops");        // compiles. A String.
Order o = (Order) os.get(0);   // a cast per read
// -> ClassCastException, far from the add
\`\`\`

With a type argument the same mistake **can't be written**:
\`\`\`java
List<Order> os = new ArrayList<>();
os.add("oops");        // compile error, AT the add
Order o = os.get(0);   // no cast
\`\`\`

### What you're buying
- **The error moves to the line that caused it**, at build time
- **The casts disappear** — and the chance of casting wrong
- The type **documents itself**

### The cost
**Erasure** (§8): the argument is checked by \`javac\`, then **thrown away**. Every restriction here traces back to it.`,
  narration:
    "Generics are the angle brackets you've been writing all through course five, and it's worth knowing exactly what they buy, because the answer is precise: they move an error from run time to compile time. Here's the world before Java 5. A List held Object. Any object. So you'd write List os equals new ArrayList, and that list would happily accept an Order, a String, a null, anything at all. Adding a String to your list of orders compiled without a murmur. And every time you read from it you had to cast: open paren Order close paren, os dot get of zero. A cast on every single read, and each one is a bet you're placing at run time. When the bet fails you get a ClassCastException — and note where. Not at the line that put the String in, which might be in a different class written by a different person six months earlier. At the line that read it out. That distance between cause and symptom is what made these bugs expensive. Now the same code with a type argument. List of Order. The element type is now part of the type, so the compiler knows what's in there. Adding a String is a compile error, and it's reported at the add — at the line that was wrong. Reading gives you an Order with no cast at all, because the compiler already knows. And that ClassCastException doesn't happen at run time because the situation that caused it cannot be constructed. So three things you're buying. The error moves to the line that caused it, at build time, before anything ships. The casts disappear, and with them the chance of writing the wrong one. And the type documents itself — Map of String to List of Order tells you the whole shape with no comment, where the old raw Map told you nothing. Now the cost, and it's the thing that makes generics in Java stranger than in C-sharp or C-plus-plus. The type argument is checked thoroughly by javac and then thrown away. It does not exist in the bytecode. That's called erasure, it's section eight, and almost every restriction you'll meet in this course — why you can't write new T, why you can't have a List of int, why two overloads can clash — traces back to that single decision. We'll get there. First, the syntax.",
}
