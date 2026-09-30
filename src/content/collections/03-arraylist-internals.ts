import type { Section } from '../types'

export const arraylistInternals: Section = {
  id: 'arraylist-internals',
  title: 'Inside ArrayList',
  scene: 'arraylist-internals',
  slide: `## An array plus a size. That's the whole class.

\`\`\`java
transient Object[] elementData;   // capacity
private int size;                 // how many are used
\`\`\`
**Capacity ≠ size.** The array is usually bigger than the list.

### Growth
Full on \`add\`? Allocate a **new array 1.5×** the old, **copy**, drop the old. So \`add\` is **amortised O(1)** — cheap almost always, occasionally a full copy. \`new ArrayList<>(expectedSize)\` skips all of it.

### Costs, straight off the picture
\`get(i)\` **O(1)** · \`add\` at the end **amortised O(1)** · \`add\`/\`remove\` in the middle **O(n)** — everything after shifts · \`contains\` **O(n)**, a linear scan calling \`equals\`

### Two notes
- \`remove\` **nulls the vacated slot** — otherwise the array holds a dead reference and leaks
- **It never shrinks.** A list that peaked at a million keeps that array until \`trimToSize()\``,
  narration:
    "ArrayList is about a hundred lines of interesting code, and knowing what's in it means you never have to memorise a performance table. There are two fields. An Object array called elementData, and an int called size. That's the class. And the first thing to separate is capacity from size. The array's length is the capacity — how many elements there's room for. Size is how many are actually in use. They're usually different: a list with three elements might sit in an array of ten, with seven null slots at the end. That's what the diagram shows. Now growth. When you add and the array is full, ArrayList allocates a new array one and a half times the old length, copies everything across with a fast system-level array copy, and abandons the old one. So an add is usually just a write and an increment — constant time — and occasionally it's a full copy. That's what amortised constant time means: cheap almost always, and the occasional expensive one is paid for by all the cheap ones. Concretely: adding a million elements to a default-sized list does about forty reallocations and copies roughly two million references in total across the run. That's fine, and it's also completely avoidable — if you know roughly how many elements you'll have, pass it to the constructor, new ArrayList of expectedSize, and none of that happens. Now read the costs straight off the picture. Get at an index is one offset: constant. Add at the end is amortised constant. Add or remove in the middle is linear, because every element after the insertion point has to shift by one — the array is contiguous, so there's no way around that. And contains is linear, because there's no index; it walks the array calling equals on each element. If you find yourself calling contains inside a loop over another collection, that's quadratic, and a HashSet is the fix — which is the next few sections. Two small details worth knowing. When you remove an element, ArrayList explicitly nulls the vacated slot. It has to: otherwise the array would go on holding a reference to an object nobody wants, and the garbage collector couldn't reclaim it. That's a deliberate leak fix inside the class. And second: an ArrayList never shrinks on its own. A list that once held a million elements is still holding a million-element array after you clear it. If that matters, trimToSize is the method, but usually the honest answer is to let the whole list go.",
}
