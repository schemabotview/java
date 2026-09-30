import type { Section } from '../types'

export const set: Section = {
  id: 'set',
  title: 'Set',
  scene: 'list-set-map',
  slide: `## No duplicates — and "duplicate" means \`equals\`

\`\`\`java
Set<String> ids = new HashSet<>();
ids.add("A-1");   // false if it was already there
\`\`\`
\`add\` returning **\`false\`** is the cheapest "have I seen this?" in Java.

### Three implementations, three promises
- **\`HashSet\`** — O(1), **no order at all**. The default.
- **\`LinkedHashSet\`** — O(1), **insertion order**. Worth it whenever output order is user-visible
- **\`TreeSet\`** — O(log n), **sorted**. Uses \`compareTo\`, **not \`equals\`** (§11)

### Why \`Set\` exists
\`list.contains(x)\` is **O(n)**; \`set.contains(x)\` is **O(1)**. A \`contains\` inside a loop is **O(n·m)** — putting one side in a \`HashSet\` first makes it **O(n+m)**. That fixes more real slowness than any other trick here.

A \`HashSet\` **is** a \`HashMap\` with a dummy value — so §11 applies.`,
  narration:
    "A Set is a collection with no duplicates, and the word duplicate has a precise meaning: two elements are duplicates if equals says they are. That's the first link back to course three section ten, and it's not optional — a Set built on a type with a broken equals is simply broken. Look at the return value of add, because it's underused. Add returns a boolean: true if the element was new, false if the set already had it. That's the cheapest have-I-seen-this-before check in the language, and it's a nice way to detect duplicates in a stream of input in one line. Three implementations, and the difference is entirely about what order they promise. HashSet promises nothing at all. Iteration order is arbitrary, it can change between runs, and you must never rely on it. In exchange, everything is constant time. That's your default. LinkedHashSet keeps insertion order by threading a linked list through the entries. Lookups are still constant time; you pay a little memory and a little insert cost. Reach for it whenever the order is going to be seen by a human — output, a report, anything where an arbitrary shuffle looks like a bug. TreeSet keeps elements sorted. It's a red-black tree, so operations are logarithmic rather than constant, and it uses compareTo or a Comparator rather than equals — which is a trap we'll come back to in section eleven. What you get for the log n is a navigable set: first, last, headSet, tailSet, ceiling, floor. If you need range queries, that's the one. Now the reason Set exists at all, and this is the single most valuable performance idea in the course. List dot contains is linear — it walks the whole list calling equals. Set dot contains is constant — it hashes and looks in one bucket. So if you have a loop over n things that calls contains on a collection of m things, using a list makes that n times m. Put the m things in a HashSet first and it becomes n plus m. On a few thousand elements that's the difference between milliseconds and minutes, and it's a two-line change. When something is mysteriously slow, look for a contains inside a loop. One last structural fact: HashSet is literally a HashMap underneath, with your element as the key and a shared dummy object as the value. Which means everything section six says about HashMap is true of HashSet too, including the requirement that your elements implement both equals and hashCode.",
}
