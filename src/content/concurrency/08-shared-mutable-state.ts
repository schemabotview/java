import type { Section } from '../types'

export const sharedMutableState: Section = {
  id: 'shared-mutable-state',
  title: 'The race',
  scene: 'the-race',
  slide: `## \`count++\` is three operations, not one

**READ** \`count\` → **ADD** one → **WRITE** it back. Two threads can interleave between any two of them.

\`\`\`
A reads 7 … (suspended) … B reads 7 … both write 8
\`\`\`
**Two increments, one result.** Nothing threw. Nothing logged. The number is just wrong.

### Why it's worse than an ordinary bug
It's **timing-dependent**, so it's **rare** — it passes your tests, passes review, and then appears **under load**, in production, and won't reproduce on your laptop.

### It isn't only \`++\`
Any **check-then-act** has the same shape: \`if (!map.containsKey(k)) map.put(k, v)\` · lazy init · \`if (balance >= n) balance -= n\`. The gap between the check and the act is where the other thread gets in.

### The definition
> A **data race** is two threads accessing the same memory, at least one **writing**, with **no synchronisation** between them.

**Remove any one of those three** and the race is gone — which is exactly the list in §9.`,
  narration:
    "Here is the fundamental problem that every mechanism in the rest of this course exists to solve, and it's smaller than people expect. Take count plus plus. One character of source. It looks atomic, and it isn't. The JVM does three separate things: read the current value of count from memory, add one to it, write the result back. Three operations, and between any two of them the operating system can suspend your thread and run another one. So: thread A reads count and gets seven. Before A can write, it's suspended. Thread B reads count and also gets seven, because A hasn't written yet. B adds one and writes eight. A resumes, adds one to the seven it's holding, and writes eight. Two increments happened. The counter went from seven to eight. One update vanished. And notice what didn't happen. Nothing threw. Nothing was logged. No assertion failed. The program continued perfectly happily with a number that is simply wrong, and every computation downstream of it is now wrong too. That's why this class of bug is worse than an ordinary one. It depends on exact timing, so it's rare — it might happen once in ten thousand operations. Which means it passes your unit tests. It passes code review, because the line looks fine. It survives staging. And then it appears in production under real load, intermittently, and it will not reproduce on your machine. And it isn't only increment. Any check-then-act sequence has exactly the same shape. If the map doesn't contain the key, put it — and between the check and the put, another thread put it. If the instance is null, create it — and now you have two instances. If the balance is at least the amount, subtract it — and two withdrawals both passed the check. Every one of those is the same gap. So here's the definition, and it's precise and worth memorising. A data race is two threads accessing the same memory location, where at least one of them is writing, with no synchronisation ordering the accesses. Three conditions. And the useful thing about stating it that way is that removing any one of the three removes the race. Don't share the memory. Don't write to it. Or synchronise. That is exactly the list in the next section, in exactly that order of preference.",
}
