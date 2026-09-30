import type { Section } from '../types'

export const typeErasure: Section = {
  id: 'type-erasure',
  title: 'Type erasure — what the JVM sees',
  scene: 'erasure',
  slide: `## The type argument is checked, then thrown away

\`javac\` verifies every use, then **deletes** the argument. \`List<Order>\` and \`List<String>\` are both just **\`List\`**, and \`Box<T>\` compiles to **one** \`Box.class\`.

\`\`\`java
new ArrayList<Order>().getClass()
   == new ArrayList<String>().getClass()   // true
\`\`\`

### Why
Java 5 shipped in 2004 into an ecosystem of compiled \`.class\` files that had to **keep running unchanged**. C# chose the other way — and broke its old binaries.

### What it forbids, and why
\`new T()\` / \`new T[n]\` — nothing to construct · \`instanceof List<Order>\` — only raw \`List\` is testable · \`catch (MyEx<T> e)\` — catch dispatches on runtime type · \`List<int>\` — erases to \`Object\`, so primitives **must** box

### What survives
Generic signatures live in **metadata** — so reflection can read a **declared** type, just never a live object's.`,
  narration:
    "This is the section that explains every restriction in the course. Here's the mechanism. Javac checks your generics thoroughly — every add, every get, every assignment, against the type arguments you wrote. And then, having checked, it deletes them. The bytecode contains no type arguments at all. A List of Order and a List of String are both just List once compiled. Box of T compiles to a single Box dot class that serves every instantiation. You can see it directly: new ArrayList of Order dot getClass, double-equals, new ArrayList of String dot getClass, is true. They are literally the same class object. Why on earth would you design it that way? Compatibility. Java 5 shipped in 2004 into an ecosystem with a decade of compiled class files and libraries in it, and Sun made the call that all of it had to keep running unchanged on the new JVM. Erasure was the price: generics became a compile-time feature layered over an unchanged runtime. C-sharp made the opposite choice a couple of years later — it has reified generics, where the type argument really exists at run time — and it broke binary compatibility to get there. Reasonable people still argue about which was right. Now, everything erasure forbids, and each one is the same sentence. You can't write new T, because at run time there is no T to construct. You can't write new T of n for the same reason. You can't write instanceof List of Order, because the only thing the JVM can test is the raw List — the argument isn't there to check. You can't catch a generic exception type, because catch dispatches on the runtime type and the runtime type has no argument. And you can't have a List of int, because erasure replaces the type with Object and a primitive is not an Object — which is exactly why every generic collection boxes, and why that costs what course two section two said it costs. One thing that does survive, and it matters more than people expect. The generic signature is kept in the class file's metadata, as a string, alongside the erased one. That's how javac can type-check your code against a library that was compiled separately — it reads the signature, not the erased bytecode. And it's how reflection can tell you that a field is declared as a List of String. What reflection cannot do is take a live List object and ask what it holds, because the object genuinely does not know. That distinction — declared type yes, live object no — is the practical shape of erasure.",
}
