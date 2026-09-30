import type { Section } from '../types'

export const immutable: Section = {
  id: 'immutable',
  title: 'Immutable collections & defensive copies',
  scene: 'ordering',
  slide: `## \`List.of\` is not \`Arrays.asList\`

\`\`\`java
List.of("a", "b")    // immutable — add() throws
Arrays.asList(arr)   // fixed-size VIEW — set() writes
                     // THROUGH to the array
List.copyOf(mutable) // an independent snapshot
\`\`\`

### What the \`of\` factories promise
Immutable · compact · **reject \`null\`** · \`Set.of\`/\`Map.of\` **throw on duplicates**. That null rejection catches bugs and surprises people migrating.

### \`unmodifiableList\` is a **view**
It wraps the original. Whoever still holds that list keeps changing it — and your "unmodifiable" list changes too. **\`copyOf\` copies.**

### The rule
**Copy on the way in, copy on the way out.** Course 3 §5's leaking getter and course 4 §5's compact constructor — same defect, both directions.

### Why bother
Thread-safe for free · safe as a **map key** · shareable with no defensive copy at every hop.`,
  narration:
    "There are several ways to get a collection you can't modify, and they are not the same thing, which causes real bugs. List dot of, Set dot of and Map dot of were added in Java 9 and they give you genuinely immutable collections. Call add and you get an UnsupportedOperationException. They're also compact — the implementation special-cases small sizes rather than allocating a full array-backed list — so they're cheap for the constants and small literals you use them for. Two behaviours to know. They reject null, both when you create them and when you call contains or get with null. And Set dot of and Map dot of throw at creation time if you pass duplicate elements or keys. Those are deliberate: they catch bugs. They also surprise people moving from the older idiom, which is Arrays dot asList. Arrays dot asList is a different thing entirely. It gives you a fixed-size view over the array you handed it. You can't add or remove, because the size is fixed — but you can call set, and that writes through to the underlying array. So it's not immutable, it's just not resizable, and it's coupled to an array someone else may still be holding. Then there's Collections dot unmodifiableList, and this is the one that catches experienced people. It returns a wrapper around your existing list. The wrapper refuses modification. But it does not copy anything, so whoever still holds the original list can carry on adding to it, and your supposedly unmodifiable view changes underneath you. If you want a snapshot, List dot copyOf actually copies. So the rule, and you've now seen it three times in three courses: copy on the way in, copy on the way out. Course three section five was a getter handing out the live list and letting a caller clear your field. Course four section five was a record holding a list the caller could still mutate. This is the same defect in collection form. Copy at the boundary. Why is it worth the effort? Three reasons. An immutable collection is thread-safe for nothing — no synchronisation, no copying, because there is no write. It's safe as a map key, which a mutable collection emphatically is not, because its hashCode changes when its contents do. And it can be passed around freely without every layer making a defensive copy just in case, which in a deep call stack is the copying you actually wanted to avoid.",
}
