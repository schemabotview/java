import type { Section } from '../types'

export const values: Section = {
  id: 'values',
  title: 'Values — primitives and references',
  scene: 'primitive-vs-reference',
  slide: `## Two kinds of value, and only two

- A **primitive** *is* the bits in the slot. Lowercase, **never \`null\`**, has a **default**.
- **Everything else is a reference** — the slot holds an **address**; the object is on the heap.

### Defaults
\`int\` → **0** · \`boolean\` → **false** · any reference → **\`null\`**. **Fields** get these; **locals don't** — reading an unassigned local is a compile error.

### Boxing — the bridge, and its cost
\`Integer\` is the **object** wrapper for \`int\`. Generics can't hold primitives, so \`List<Integer>\` boxes every element.
\`\`\`java
list.add(3);      // autoboxed
Integer x = null;
int y = x;        // NPE — unboxing null
\`\`\`
- Every \`Integer\` is an **allocation** — a million of them is a million objects
- \`==\` on boxed types compares **identity**, and \`valueOf\` caches **−128…127** — \`true\` for small numbers, \`false\` above. **Always \`.equals()\`.**`,
  narration:
    "Every value in Java is one of exactly two kinds, and almost everything downstream follows from which one you have. The first kind is a primitive, and the table on the left is all eight of them. Boolean, byte, short, char, int, long, float, double. Their names are lowercase, and that lowercase is a signal: these are not objects. A primitive is the bits in the slot. When you write int qty equals two, the variable's storage literally contains the number two. It can never be null, because there is no slot state that means absent — it always holds some number. Two of those eight are the defaults you will use ninety percent of the time: int for whole numbers, double for fractional. A long literal needs an L on the end, a float literal an f, because otherwise the compiler reads them as int and double. The second kind is everything else. Every String, every List, every object you ever write a class for — all of them are references. The slot on the stack does not contain the object; it contains an address, and the object itself lives on the heap. That is the picture on the right, and it is the same picture we drew in course one section nine. Now, defaults. Fields get initialised automatically: an int field starts at zero, a boolean at false, any reference at null. Local variables do not. If you declare a local and read it before assigning it, that is a compile error, not a surprising zero — and that is the compiler doing you a genuine favour. Then boxing, which is the bridge between the two worlds and the source of a couple of real bugs. For each primitive there is a wrapper class — Integer for int, Double for double, Boolean for boolean. You need them because generics cannot hold primitives; there is no List of int, only List of Integer. Java converts for you automatically, which is called autoboxing, and it is invisible until it isn't. Two things to know. First, cost: every Integer is a heap allocation, so a list of a million boxed integers is a million objects, and that is a real difference in a hot loop. Second, and worse: double-equals on boxed types compares identity, not value. And because Integer dot valueOf caches the range minus one twenty-eight to one twenty-seven, comparing two Integers with double-equals returns true for small numbers and false for large ones. That is the worst possible behaviour — it works in your test and fails in production. Always use dot equals. And an Integer can be null, so unboxing one into an int throws a NullPointerException, which is a confusing place to get one.",
}
