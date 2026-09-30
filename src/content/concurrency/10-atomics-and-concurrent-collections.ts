import type { Section } from '../types'

export const atomicsAndConcurrentCollections: Section = {
  id: 'atomics-and-concurrent-collections',
  title: 'Atomics & concurrent collections',
  scene: 'locks-and-atomics',
  slide: `## Lock-free, on one variable

\`\`\`java
count.incrementAndGet();        // indivisible
count.updateAndGet(n -> n * 2); // CAS, and retry
\`\`\`
Underneath is **compare-and-set**: write *only if* the value is still what you read; fail ⇒ **retry**. No blocking, no deadlock — and **no fairness**.

**\`LongAdder\`** beats \`AtomicLong\` for hot counters.

### Concurrent collections
**\`ConcurrentHashMap\`** — locks **per bin**, so most reads are lock-free, and \`computeIfAbsent\`/\`merge\` are **atomic** (course 5 §5 gains a guarantee).
**\`CopyOnWriteArrayList\`** — every write copies. Perfect for listeners, catastrophic otherwise.
**\`BlockingQueue\`** — the hand-off **and** the back-pressure.

### The trap
**Atomic operations don't compose.** Two atomic calls in a row are **not** atomic together.`,
  narration:
    "For a single variable you don't need a lock. The atomic classes give you read-modify-write as one indivisible operation. AtomicInteger dot incrementAndGet does exactly what count plus plus failed to do in section eight, atomically. UpdateAndGet takes a function, so you can do arbitrary arithmetic. How? Underneath is a CPU instruction called compare-and-set. You read the current value, compute the new one, and then say to the hardware: write this new value, but only if the current value is still the one I read. If another thread got in first, the write doesn't happen, and Java retries the whole thing in a loop. So it's called lock-free, and that's a real advantage: no thread ever blocks, so there is no deadlock possible and no context switching. The trade-off is fairness — under heavy contention a particular thread can keep losing the race and retrying, so throughput is good but individual latency isn't guaranteed. One practical tip: if you have a genuinely hot counter with many threads hammering it, LongAdder beats AtomicLong. It spreads the count across several internal cells to reduce contention, and sums them when you read. Slightly slower to read, much faster to write. Then the concurrent collections, which are the ready-made answers for the common cases. ConcurrentHashMap is the one you'll use most. It doesn't lock the whole map — it locks per bin, so operations on different keys usually don't contend at all, and most reads take no lock whatsoever. And here's something that pays back course five section five: computeIfAbsent and merge are atomic on a ConcurrentHashMap. The four-line get-check-put version was a check-then-act race; computeIfAbsent is a single atomic operation. That's a real correctness difference, not a convenience. CopyOnWriteArrayList makes a complete copy of the backing array on every single write. That sounds terrible and is exactly right for one shape: a list that is read constantly and written almost never, like a set of registered listeners. Iteration takes no lock at all and never throws ConcurrentModificationException. Use it for that, and never for anything write-heavy. And BlockingQueue, which is the classic hand-off between producers and consumers. Put blocks when it's full, take blocks when it's empty, and that blocking is the back-pressure — a fast producer is automatically slowed to the consumer's rate. Finally, the trap that catches people who've learned all of the above. Atomic operations do not compose. Two atomic calls in a row are not atomic together. Checking map dot containsKey and then calling map dot put are each individually atomic, and the sequence is still exactly section eight's race. If two operations must be indivisible, you need one operation that does both — which is what merge and computeIfAbsent are for — or a lock.",
}
