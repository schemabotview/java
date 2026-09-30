import type { Section } from '../types'

export const queueDeque: Section = {
  id: 'queue-deque',
  title: 'Queue & Deque',
  scene: 'list-set-map',
  slide: `## Collections where the **ends** are the point

\`\`\`java
Deque<Task> d = new ArrayDeque<>();
d.addLast(t);  d.pollFirst();   // FIFO — a queue
d.addFirst(t); d.pollFirst();   // LIFO — a stack
\`\`\`

### Two method families — pick one
**Throws**: \`add\` · \`remove\` · \`element\`  **Sentinel**: \`offer\` · \`poll\` · \`peek\`
Mixing them is how a fine-looking loop throws \`NoSuchElementException\`.

### \`ArrayDeque\` is the default
A **circular array** — no node objects, no pointer chasing. Beats \`LinkedList\` at both ends.

### Don't use \`Stack\`
\`java.util.Stack\` extends \`Vector\`: **synchronized** on every call, and being a \`List\` it lets you index into the middle. Course 3 §11's mistake, in the standard library.

### \`PriorityQueue\`
A binary heap — \`poll()\` gives the smallest, O(log n). **Iteration order is not sorted.**`,
  narration:
    "Queues and deques are collections where the ends are what matter. A Queue adds at one end and removes from the other. A Deque — double-ended queue, pronounced deck — lets you do both at both ends, which means one interface gives you a queue and a stack. Add at the end and poll from the front and you have first-in-first-out. Add at the front and poll from the front and you have last-in-first-out. Now, a detail that catches everyone once: there are two parallel families of methods and they differ in how they fail. Add, remove and element throw an exception when the queue is full or empty. Offer, poll and peek return a sentinel instead — false, or null. Neither is wrong, but you should pick one style per piece of code and stay in it, because mixing them is exactly how you get a NoSuchElementException from a loop that looked perfectly reasonable. Most code wants the offer-poll-peek family, because an empty queue is a normal condition rather than an error. For the implementation, ArrayDeque is your default. It's a circular array, so there's no per-element node object and no pointer chasing, and it's faster than LinkedList at both ends despite LinkedList being the one people reach for. It's the right answer both for a queue and for a stack. Which brings us to the thing not to use. Java has a class called java dot util dot Stack, and you should not use it. It extends Vector, which means every single method is synchronized whether you need that or not, and it means a Stack is a List — so a caller can index into the middle of your stack and destroy the invariant. That is precisely the mistake we drew in course three section eleven, sitting in the standard library since 1995 and kept for compatibility. The modern answer is a Deque. Finally, PriorityQueue, which is a different animal. It's a binary heap, and poll always gives you the smallest element according to compareTo or a Comparator you supply, in logarithmic time. That's what you want for a scheduler, a top-n, or a shortest-path algorithm. One trap: only polling is ordered. If you iterate a PriorityQueue or print it, you get the heap's internal array order, which is not sorted and looks wrong. If you want them in order, poll them out.",
}
