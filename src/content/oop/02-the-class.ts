import type { Section } from '../types'

export const theClass: Section = {
  id: 'the-class',
  title: 'The class — a definition',
  scene: 'class-and-object',
  slide: `## Loaded once. Instantiated many times.

\`\`\`java
public class Account {
    private final String id;   // one slot PER instance
    private long balance;
    static final String BANK = "GraphL";  // ONE slot
}
\`\`\`

### What lives where
- The **class** loads **once** into **metaspace** — field *shape*, method *bytecode*, statics
- Each **instance** gets its **own copy of the instance fields**, on the heap
- Method code is **not** copied per object. \`this\` is how one body serves every instance

### \`static\` means "belongs to the class"
One copy, no object needed, and **no \`this\`** — so it can't touch instance fields. Constants are \`static final\`; a factory like \`Account.open(…)\` is static because there's no object yet.

### \`this\`
The object the method was called on. Needed to **disambiguate** (\`this.id = id\`) and to **pass yourself** (\`ledger.record(this)\`).`,
  narration:
    "A class is a definition. It is not a thing — it's the description of a kind of thing, and the distinction matters more in Java than it does in a language where classes are themselves objects. Look at the top half of the diagram. When the class loader reads Account dot class, it loads that definition once, into metaspace, which is the region we drew in course one section nine. What gets stored there is three things: the shape of the fields — that an Account has a String called id and a long called balance — the bytecode of every method, and the actual storage for any static fields. Now the bottom half. Every time you write new Account, the JVM allocates a fresh object on the heap and gives it its very own copy of the instance fields. Two accounts, two balance slots, completely independent. What is not copied is the method code. There is exactly one copy of the withdraw bytecode no matter how many accounts exist, and this is how a single method body can serve every instance — the object it's working on arrives as this. That brings us to static, and the one-line definition is: static means it belongs to the class rather than to any instance. A static field is one slot, shared by everything. A static method needs no object to be called — you write Account dot open, not someAccount dot open — and because there's no object, there's no this, which means a static method cannot read or write instance fields. The compiler enforces that. You'll use static for three things mainly: constants, written static final and in screaming snake case; utility methods that don't need state; and factory methods, which are static precisely because they run before any object exists. And then this. This is the object the current method was called on. Two places you need it explicitly. First, disambiguation: when a constructor parameter has the same name as the field, this dot id equals id assigns the parameter to the field, and without the this you'd be assigning the parameter to itself, which compiles and does nothing. Second, passing yourself — ledger dot record of this hands your own object to a collaborator. Everywhere else, this is implicit: writing balance inside a method already means this dot balance. Now, a class defines. It doesn't exist. To get an actual account we have to make one, which is the next section.",
}
