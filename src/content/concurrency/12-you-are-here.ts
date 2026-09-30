import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here — sizing, and what changed',
  scene: 'thread-model',
  slide: `## Sizing a pool — if you still need one

**CPU-bound**: threads ≈ **cores**. More just adds context switches.
**I/O-bound**: \`cores × (1 + wait/compute)\` — 90% waiting wants ~10× cores. **Guess, then measure.**
**Mixed**: two pools. One slow task in a shared pool ruins the fast ones.

### What virtual threads changed
For **blocking** work, don't size a pool — **don't have one**. Sizing math is now for **CPU-bound** pools and **bounded resources**.

### The course
**§1** one heap, many stacks · **§2–4** task, pool, handle · **§5** the expensive number stopped being expensive · **§6–7** compose, then give it a **lifetime** · **§8** \`count++\` is three operations · **§9–10** the four answers · **§11** visibility, not just atomicity

### The order to reach in
**Don't share → share immutable → use the library → then a lock.** Most concurrency bugs are a design that shared something it needn't have.`,
  narration:
    "Let's close with the practical question people actually ask — how many threads? — and then what's changed. For CPU-bound work, the answer is close to your core count. Runtime dot getRuntime dot availableProcessors gives you that number. More threads than cores does not do more work; it just adds context switches, and each one costs. For I/O-bound work, the classic formula is cores multiplied by one plus the ratio of waiting time to compute time. So a task that spends ninety percent of its life waiting wants roughly ten times your core count. Treat that as a starting guess and then measure, because the formula assumes a uniformity real systems don't have. And for mixed workloads: use two pools. If you put a slow I/O task and a fast CPU task in the same pool, the slow one occupies threads and the fast ones queue behind it — and that's the same shared-pool problem we saw with parallel streams in course eight and with CompletableFuture in section six. Now, what virtual threads changed about all of that. For blocking work, you don't size a pool — you don't have a pool. One virtual thread per task, created freely. The sizing arithmetic still matters in two places: CPU-bound pools, where cores are a genuine limit, and bounded resources, because a connection pool of ten in front of ten thousand virtual threads is still a queue of ten, and pretending otherwise just moves where the waiting happens. So, the course. Section one: one heap, many stacks, and a platform thread costs about a megabyte. Two to four: the task, the pool, and the handle to the result — and a Future nobody calls get on swallows its exception. Five: the expensive number stopped being expensive, and thread-per-request came back. Six and seven: composing asynchronous work, and then giving it a lifetime so nothing outlives the block that started it. Eight: count plus plus is three operations, and the race passes your tests. Nine and ten: the four answers, in order. Eleven: visibility, which is a whole second problem, and happens-before is the only thing you can rely on. And the order to reach in, which is the thing to carry out of here. Don't share. If you must share, share something immutable. If it must be mutable, use the concurrent library, which has already got the hard parts right. And only then write a lock yourself. Most concurrency bugs I've seen are not subtle failures of a lock — they're a design that shared something it never needed to share. Next is course eleven: inside the JVM. The JIT, garbage collection, class loading, reflection, and the tools that let you see what a running program is actually doing.",
}
