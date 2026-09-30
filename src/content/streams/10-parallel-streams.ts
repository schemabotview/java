import type { Section } from '../types'

export const parallelStreams: Section = {
  id: 'parallel-streams',
  title: 'Parallel streams',
  scene: 'parallel-streams',
  slide: `## One word, and four things that must be true

\`.parallelStream()\` splits the source, runs on a **ForkJoinPool**, combines the partials. Correct **only if**: the source splits well · the lambdas are **stateless** · the reduction is **associative** · the identity is real (§8).

### The shared pool is the real trap
Every parallel stream in the JVM uses **one** common pool, sized to **cores − 1**. A single **blocking** call in one pipeline **starves every other parallel stream in the process**.

### Splitting depends on the **source**
\`ArrayList\` and arrays halve by index. \`LinkedList\`, \`Stream.iterate\` and \`Files.lines\` **can't split cheaply** — you pay the coordination and get no parallelism.

### It's often slower
It pays on **large N × real per-element work**. **Measure.** For blocking work use an **executor** (course 10), not a stream.`,
  narration:
    "Adding the word parallel to a pipeline is the most tempting one-word change in Java, and it's worth understanding before you use it, because it can be slower, and it can be wrong. What it does: the source is split into chunks, the pipeline runs on several threads in a ForkJoinPool, and the partial results are combined. Look at the diagram — split, apply, combine. It's correct only if four things hold. The source splits well. Your lambdas are stateless, touching nothing outside themselves. Your reduction is associative. And your identity is a genuine identity. Those last two are section eight, and they're why that section spent time on them: sequential execution hides both mistakes perfectly. Now the trap that catches production systems, and it's the middle of the diagram. Every parallel stream in the entire JVM shares one ForkJoinPool — the common pool — and it's sized to the number of cores minus one. Not one pool per stream. One pool, for the whole process. Which means if a single parallel stream anywhere in your application does something blocking — a network call, a database query, waiting on a lock — that thread is parked and unavailable, and every other parallel stream in the process slows down or stalls, including ones inside libraries you didn't write. That's a genuinely nasty failure mode because the symptom appears nowhere near the cause. Then splitting, which depends entirely on your source, not on your pipeline. An ArrayList or an array can be halved by index instantly, so it splits perfectly. A LinkedList has to be walked to find the middle, so splitting is linear and you've lost before you start. Stream dot iterate is inherently sequential — each element depends on the one before it. Files dot lines can't know where the line boundaries are without reading. For all of those you pay the coordination cost and get essentially no parallelism. And the blunt fact: parallel is often slower. Splitting, scheduling threads and merging partial results all cost real time, and for a small collection or a trivial lambda that overhead dwarfs the work. The rough shape of when it pays is large N multiplied by genuine per-element cost — thousands of elements doing real computation each. So the advice is short. Default to sequential. If a pipeline is genuinely hot, try parallel and measure that it helped, on data the size you actually have. And if the work is blocking rather than computational, don't use a parallel stream at all — use an executor, which is course ten, where you control the pool.",
}
