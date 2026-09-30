import type { Section } from '../types'

export const list: Section = {
  id: 'list',
  title: 'List',
  scene: 'list-set-map',
  slide: `## Ordered, indexed, duplicates allowed

\`\`\`java
List<Order> os = new ArrayList<>();
os.add(o); os.get(0); os.set(0, o2); os.remove(0);
\`\`\`

### \`ArrayList\` is the answer ~99% of the time
Backed by one **contiguous array**: \`get(i)\` is a single offset, and iteration is **cache-friendly** because the elements sit next to each other in memory (§3).

### \`LinkedList\` almost never is
It's a doubly-linked chain, so **\`get(i)\` walks** — O(n) — and every element is a separate heap object with three words of overhead. Even "fast insert in the middle" loses, because you had to *find* the middle first. If you want a queue, declare a **\`Deque\`** and use \`ArrayDeque\`.

### Two traps
- \`remove(int)\` removes by **index**; \`remove(Object)\` by **value**. For a \`List<Integer>\`, \`remove(1)\` picks the **index** overload — course 2 §9's resolution order. Use \`remove(Integer.valueOf(1))\`.
- \`subList\` is a **live view**, not a copy — and it throws once the backing list is structurally changed`,
  narration:
    "A List is an ordered sequence: elements have positions, you can ask for the element at index three, and duplicates are fine. Two implementations matter, and one of them is almost always right. ArrayList is backed by a single contiguous array. That gives you two things. Get at an index is a single arithmetic offset — constant time, and genuinely fast, not just theoretically. And iteration is cache-friendly, because the elements sit next to each other in memory, so the CPU's prefetcher can see what's coming. That second property is invisible in a Big-O table and enormous in practice. LinkedList is a doubly-linked chain of separate node objects. Textbooks like it because inserting in the middle is constant time once you're there. In real code it almost always loses, for three reasons. Get at an index has to walk the chain from one end, so it's linear. Every single element is a separate heap object carrying a previous pointer, a next pointer and a reference — three extra words each. And those nodes are scattered across the heap, so every hop is potentially a cache miss. The classic argument for it — fast insertion in the middle — usually evaporates because you had to find the middle first, and finding it was linear. Section three draws both layouts side by side, because once you can see them you can answer performance questions about lists without memorising anything. The practical rule: use ArrayList. If you genuinely need to add and remove at both ends, don't reach for LinkedList — declare a Deque and construct an ArrayDeque, which is faster at that too. Two traps worth knowing now. First, remove is overloaded: remove of an int removes by index, remove of an Object removes by value. That's fine until you have a List of Integer, where remove of one is ambiguous to a human and completely unambiguous to the compiler — it picks the index overload, because exact match beats boxing, which is course two section nine. So list dot remove of one removes the second element rather than the element whose value is one. Write remove of Integer dot valueOf of one when you mean the value. Second, subList returns a live view onto the original list, not a copy. Writing through it writes through to the original, and once you structurally change the backing list, the view throws ConcurrentModificationException. If you want a copy, wrap it in a new ArrayList.",
}
