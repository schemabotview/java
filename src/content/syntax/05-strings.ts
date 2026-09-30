import type { Section } from '../types'

export const strings: Section = {
  id: 'strings',
  title: 'Strings & text blocks',
  scene: 'string-pool',
  slide: `## Immutable, pooled, never compared with \`==\`

A \`String\` **cannot be changed**. \`s.toUpperCase()\` returns a **new** one. Every "modification" is an allocation.

### Why \`==\` is a trap
Identical **literals** are **interned** to **one** pooled object, so \`==\` is \`true\`. Anything built at **runtime** is a fresh object, so the same \`==\` is \`false\`.
\`\`\`java
"A-1" == "A-1"        // true  — same object
("A-" + n) == "A-1"   // false — built at runtime
\`\`\`
It works by accident, then fails in production. **Always \`.equals()\`** — \`Objects.equals(a, b)\` when either may be null.

### Building
\`+\` in a **loop** allocates every round. Use **\`StringBuilder\`** or \`String.join\`.

### Text blocks (15+)
A \`"""\`-delimited literal: no escaping, no \`\\n\`, no trailing \`+\`. Incidental indentation is stripped relative to the **closing** delimiter's position.`,
  narration:
    "Strings. Three things matter, and the second one is a genuine trap. First: a String is immutable. It cannot be changed, at all, ever. When you call s dot toUpperCase, you do not modify s — you get back a brand new String, and the original is exactly as it was. Every apparent modification is an allocation. That immutability is what makes Strings safe to share between threads and safe to use as map keys, and it is also why concatenating in a loop is expensive, which we will come back to. Second, and this is the trap: never compare Strings with double-equals. Look at the diagram. Double-equals asks are these the same object, and for Strings the answer is maddeningly inconsistent. Identical string literals in your source get interned — the compiler puts one copy in a pool and points every occurrence of that literal at it. So quote A dash one quote double-equals quote A dash one quote is true, because they really are the same object. But build the same text at runtime — quote A dash quote plus n — and you get a fresh object with identical contents, so the same double-equals is now false. That is worse than if it never worked, because it works in your unit test with literals and then fails in production with data read from a file. Always use dot equals, which compares contents. And when either side might be null, Objects dot equals of a and b handles that for you without throwing. There is also dot intern, which asks the pool for the shared instance, but you will almost never need it. Third, building strings. Because every String is immutable, writing s equals s plus x inside a loop allocates a new String every single round, and for a thousand iterations that is a thousand throwaway objects and quadratic copying. Use StringBuilder, which has a growable buffer and one append per round. A single plus outside a loop is fine — the compiler turns that into a StringBuilder for you. And for joining a collection, String dot join or Collectors dot joining says what you mean. Finally, text blocks, which arrived in Java 15 and are a real quality-of-life change. Three double-quotes, a newline, then your content, then three more double-quotes. No escaping of embedded quotes, no backslash-n, no plus at the end of every line. SQL, JSON and HTML in Java source were genuinely painful before this. One subtle rule worth knowing: the incidental indentation is stripped, and the amount stripped is measured relative to the position of the closing delimiter — so move the closing triple-quote and you change how much leading whitespace survives.",
}
