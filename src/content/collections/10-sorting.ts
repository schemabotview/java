import type { Section } from '../types'

export const sorting: Section = {
  id: 'sorting',
  title: 'Sorting — Comparable & Comparator',
  scene: 'ordering',
  slide: `## One natural order, any number of others

**\`Comparable\`** — the type's **own** order, implemented **inside** it. One per type; what \`TreeSet\` and \`sort()\` use by default.
**\`Comparator\`** — an order defined **outside**. As many as you like.

\`\`\`java
var byQty = Comparator.comparingInt(Order::qty)
        .reversed()
        .thenComparing(Order::id);
\`\`\`
\`comparingInt\` avoids boxing every extracted key. Composable, and far safer than a hand-written \`compareTo\`.

### The contract
Antisymmetric, transitive, consistent. **Never \`return a.qty - b.qty\`** — it **overflows** (course 2 §4) and silently inverts. Use \`Integer.compare\`.

### \`sort\` is **stable**
Equal elements keep their order — which is what makes chained sorts work.

**\`TreeSet\` uses \`compareTo\`, not \`equals\`.** If they disagree it silently drops non-duplicates (§11).`,
  narration:
    "Two interfaces for two different situations. Comparable is implemented by the type itself, and it defines that type's one natural order — the order it has when nobody says otherwise. String's natural order is alphabetical, Integer's is numeric. You implement compareTo, which returns a negative number, zero, or a positive number depending on whether this is less than, equal to, or greater than the argument. A type gets exactly one of these, and it's what a plain sort, a TreeSet and a TreeMap will use. Comparator is a separate object that defines an order from outside. You can have as many as you like, and you use them when there's no single obvious order, or when you want a different one for a particular purpose. Before Java 8, writing a comparator meant an anonymous class and a compareTo full of if statements. Now they compose, and this is one of the nicest APIs in the library. Comparator dot comparingInt of Order colon colon qty builds a comparator that orders by quantity. Dot reversed flips it. Dot thenComparing of Order colon colon id breaks ties by id. That reads top to bottom as an English sentence describing the sort, and it is much harder to get wrong than a hand-written compareTo. Use comparingInt, comparingLong or comparingDouble rather than plain comparing when the key is a primitive — plain comparing boxes every key it extracts, and in a sort that's n log n allocations for nothing. Now the contract, and the classic bug. The rule is that the sign of a compareTo b must be the opposite of the sign of b compareTo a, and the whole thing must be transitive and consistent. The classic bug is writing return a dot qty minus b dot qty. That looks fine and is correct for small numbers. But subtraction of two ints can overflow — course two section four — so for large values the result wraps to the wrong sign, your comparator silently inverts for those pairs, and either your sort is subtly wrong or, in newer Javas, TimSort detects the inconsistency and throws IllegalArgumentException with a message about the comparison method violating its general contract. Use Integer dot compare, which cannot overflow. One property worth relying on: Java's sort is stable. Equal elements keep their relative order. That's what lets you sort by one key and then by another and get a sensible result, and it's guaranteed for objects — though not for primitive arrays, which use a different algorithm. And finally, the trap that section eleven picks up. TreeSet and TreeMap decide whether two elements are duplicates using compareTo, not equals. If those two disagree, a TreeSet will silently drop elements that aren't duplicates at all.",
}
