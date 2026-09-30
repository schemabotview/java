import type { Section } from '../types'

export const enumsSection: Section = {
  id: 'enums',
  title: 'Enums — a fixed set of constants',
  scene: 'enums',
  slide: `## A type whose values you can list

\`\`\`java
enum Status { NEW, PAID, SHIPPED }
\`\`\`
That's a **class**, and each constant is a **singleton instance** created once when the enum loads.

### What you get over \`String\` or \`int\`
- **Type safety** — \`"shiped"\` **can't compile**
- **\`==\` is correct and safe** — one instance per constant, and no NPE
- **Exhaustive \`switch\`** — adding a constant **breaks** every switch that ignores it
- \`values()\` · \`valueOf("PAID")\` · \`name()\` · \`ordinal()\`

### Two cautions
**Never persist \`ordinal()\`** — it's the declaration position, so reordering silently rewrites your stored data. Persist \`name()\`. And \`valueOf\` throws on an unknown name.

### Use \`EnumMap\` / \`EnumSet\`
Backed by an **array** and a **bitset** indexed by ordinal — no hashing at all, and iteration in declaration order.`,
  narration:
    "An enum is a type whose values you can list. Enum Status, open brace, NEW, PAID, SHIPPED. That single line does considerably more than it looks. What you've actually declared is a class — enums are classes — and each of those three names is a singleton instance of it, constructed once when the enum is first loaded and never again. Now compare that with the two things people use instead. If status is a String, then any string is a valid status. A caller can pass the empty string, or misspell shipped as s-h-i-p-e-d, and the compiler is perfectly happy; you find out in production. If status is an int, same problem plus you can't read it in a debugger. With an enum, Status dot NEW is the only way to produce one, and anything else is a compile error. Three more things you get. Because each constant is a singleton, double-equals is the correct comparison — you do not need dot equals, and unlike dot equals, double-equals doesn't throw if the reference is null. Because the compiler knows the full list, a switch over an enum is exhaustive: you don't need a default branch, and if somebody adds a CANCELLED constant next year, every switch that doesn't handle it stops compiling. And you get the built-in statics: values returns an array of all of them, valueOf parses a name back into a constant, name gives you the declared name and ordinal gives you its position. Two cautions about that last pair. Never, ever persist ordinal — not in a database, not in a file, not over the wire. Ordinal is just the position in the source file, so the day someone inserts a constant in the middle or reorders them alphabetically, every stored value silently means something different. Persist name, which is stable because it's the identifier. And valueOf throws IllegalArgumentException when the name doesn't match, so if the input came from outside your program, wrap it and decide what an unknown value should mean. Last, a performance note worth knowing because it's free. When an enum is your map key or your set element, use EnumMap and EnumSet rather than HashMap and HashSet. They're backed by a plain array indexed by ordinal — EnumSet is a single bitset — so there's no hashing at all, and they iterate in declaration order. Meaningfully faster, and it says more clearly what you meant.",
}
