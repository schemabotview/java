import type { Section } from '../types'

export const theJvmSketch: Section = {
  id: 'the-jvm-sketch',
  title: 'Where your data lives',
  scene: 'jvm-memory',
  slide: `## Stack, heap, metaspace

Which region a thing sits in answers most of Java's "wait, why did that happen?"

### Stack — one per thread
- A **frame** per call: parameters, locals, where to return
- Pushed on call, **popped on return** — a local can't outlive its method
- **Primitives by value**, objects **by reference**. Runaway recursion ⇒ \`StackOverflowError\`

### Heap — one, shared by every thread
- **Every object lives here.** \`new\` always allocates here
- Reclaimed by the **GC** once nothing can reach it
- Shared ⇒ two threads can touch one object. That's course 10.

### Metaspace
\`Order\` the **class** (fields, methods, bytecode) vs \`Order\` the **object** — different regions. Also the **JIT code cache**.

### The consequence that bites first
\`\`\`java
Order b = a;   // copies the REFERENCE, not the object
\`\`\`
Two stack slots, **one heap object**.`,
  narration:
    "We've followed a program from source to execution. Now, one level down: while it runs, where does its data actually live? There are three regions, and almost every Java question that starts with wait, why did that happen, is answered by knowing which of the three a thing sits in. On the left, the stacks. Each thread gets its own, and it holds frames — one frame per method call in progress. The frame holds that method's parameters, its local variables, and the address to return to when it finishes. Look at the picture: main is at the bottom, it called total, so total's frame sits on top of it. Push on call, pop on return. That popping is why a local variable cannot outlive the method that declared it — the storage is literally gone. The stack is a fixed size, and a runaway recursion that never returns will fill it, which is exactly what StackOverflowError means. In the middle, the heap. There is one heap for the entire JVM and every thread shares it, and here is the rule that matters: every object lives here. Every single one. If you wrote new, the thing you made is on the heap. Nobody frees it by hand — the garbage collector reclaims an object once nothing can reach it any more. And because the heap is shared, two threads can be touching the same object at the same moment, which is the source of every concurrency problem you will ever have, and the subject of a whole course later on. When the heap fills and collection can't free enough, you get OutOfMemoryError, Java heap space. On the right, metaspace, which holds a distinction worth being careful about. There is Order the class — the definition, its field list, its method bytecode — and there is Order the object, an actual order with an id and a quantity. Those are different things in different regions. The class definition is loaded once into metaspace; the objects are made over and over on the heap. Metaspace also holds the JIT code cache, which is where the native code for hot methods goes. Now, the consequence that trips up almost everyone at the start. Look at the code at the bottom of the slide. Order a equals new Order. Then Order b equals a. That second line does not copy the object. There is exactly one Order on the heap, and now two slots on the stack both pointing at it. Change it through b and you have changed what a sees, because they are the same object. Java is always pass-by-value — but when the thing is an object, the value being passed is the reference, not the object. Hold onto that picture; it explains a great deal that is coming.",
}
