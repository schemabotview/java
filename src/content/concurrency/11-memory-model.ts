import type { Section } from '../types'

export const memoryModelSection: Section = {
  id: 'memory-model',
  title: 'volatile & the memory model',
  scene: 'memory-model',
  slide: `## The other half: a write may never be **seen**

§8 was **atomicity**. This is **visibility**.

\`\`\`java
private boolean stop = false;   // plain field
while (!stop) { … }             // can spin FOREVER
\`\`\`
Not a bug — **permitted**. The **JIT** hoists the read into a register, the **CPU** reorders, the **cache** holds the write in a store buffer.

### Happens-before is the guarantee
The JMM says nothing about "time". **Only** operations it orders are guaranteed visible.

### What establishes it
**\`volatile\`** — visibility and ordering, **not atomicity**: \`volatile count++\` still races.
**\`synchronized\` / \`Lock\`** — unlock *happens-before* the next lock. **Both** halves.
**\`final\` fields** — safely published once the constructor returns. **Immutability is a concurrency feature.**
**The concurrent library** — all documented.`,
  narration:
    "Section eight was about atomicity — an operation being interrupted half way through. This is the other half of the problem, and it's the half people don't meet until it bites them, because it can't be reasoned about from the source code. It's about visibility: whether a write by one thread is ever seen by another at all. Look at the code. A plain boolean field called stop, and a loop that runs while it's false. Another thread sets stop to true. And this loop can spin forever. Not occasionally — reliably, on a real JVM, once the loop is hot. And this is not a bug in Java. It is explicitly permitted. Three layers are each allowed to do it. The JIT compiler sees that nothing inside the loop writes to stop, so it hoists the read out of the loop into a CPU register and never reads memory again. The CPU executes instructions out of order when it can prove single-threaded equivalence. And the cache means a write may sit in a store buffer on another core and not be published for some time. Every one of those is legal, and each is a huge performance win in single-threaded code, which is almost all code. So the Java Memory Model defines what you can actually rely on. And the key thing is that it says nothing about time. There is no guarantee that a write happening earlier in wall-clock time is visible later. What it defines is a relation called happens-before, and the rule is: only operations ordered by happens-before are guaranteed visible to each other. Everything else is undefined, and undefined includes working perfectly on your laptop for two years. So what establishes happens-before? Four things worth knowing. Volatile: a write to a volatile field happens-before every subsequent read of it, and nothing may be reordered across it. That fixes the stop flag completely. But be precise: volatile gives you visibility and ordering, not atomicity. A volatile count plus plus is still section eight's race, because it's still three operations. Volatile is for flags and for published references, not for counters. Synchronized and Lock: releasing a lock happens-before the next acquisition of it, which means everything a thread did before unlocking is visible to the thread that locks next. So a lock gives you both halves, and that's why it's the general answer. Final fields: once a constructor returns, its final fields are guaranteed visible to any thread that sees the object, with no synchronisation. That's the strongest argument for immutability in this whole course — an immutable object is safely publishable by construction. And the entire java dot util dot concurrent library documents its happens-before guarantees, so putting something into a BlockingQueue makes it visible to whoever takes it. Use the library, and you inherit correctness you didn't have to reason about.",
}
