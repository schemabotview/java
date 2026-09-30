import type { Section } from '../types'

export const whatIsAThread: Section = {
  id: 'what-is-a-thread',
  title: 'What is a thread?',
  scene: 'thread-model',
  slide: `## One heap, many stacks

Course 1 §9 drew it: **one heap, shared**; **one stack per thread**, private. Threads share all the same objects — which is both the point and the whole problem.

### Concurrency ≠ parallelism
**Concurrency** is *dealing with* many things at once — structure. **Parallelism** is *doing* many at once — hardware. One core runs concurrent code fine, by interleaving.

### Two reasons to want them
- **Throughput on I/O** — 1000 requests each waiting 50 ms. One thread does 20/sec; a thousand waiting threads do far more, and the CPU is idle throughout
- **CPU parallelism** — split real computation across cores

### Why a platform thread is expensive
**1 : 1 with an OS thread**: ~**1 MB of stack**, and a context switch costing microseconds. A few thousand, not a million — and that cap **is** your concurrency ceiling. Hence pools.

**Java 21 changes that number** (§5).`,
  narration:
    "Everything in this course so far has quietly assumed one thread. Here's what changes. A thread is an independent path of execution through your program, and the picture is the one from course one section nine: one heap, shared by every thread, and one stack per thread, private to it. So each thread has its own local variables and its own call stack, and they all reach the same objects on the heap. That sharing is exactly why threads are useful and exactly why they're difficult. Two terms worth separating, because they're used interchangeably and they aren't the same. Concurrency is about structure: dealing with many things at once, whether or not they're literally simultaneous. Parallelism is about hardware: doing many things at once, on several cores. A single-core machine runs concurrent code perfectly well by interleaving — it just isn't parallel. You want concurrency for structure, and parallelism for speed. Two reasons you actually need threads. The first, and by far the more common in server software, is throughput on I/O. Imagine a thousand incoming requests, each of which spends fifty milliseconds waiting for a database. One thread handles twenty requests a second, and spends essentially all of its time doing nothing. A thousand threads, each waiting, get you enormously more throughput — and the CPU is idle the whole time. That's not parallelism, it's just not wasting the waiting. The second reason is genuine CPU work: splitting a computation across cores, which is what parallel streams in course eight were doing. Now, the constraint that shaped all of Java's concurrency design until very recently. A Java thread — what we now call a platform thread — is one-to-one with an operating system thread. Creating one asks the OS for a thread, and that reserves around a megabyte of stack space. Switching between them goes through the kernel scheduler and costs microseconds. So you can have a few thousand, not a million, and that number is a hard ceiling on how many things you can have in flight at once. Every pooling and reuse mechanism in Java exists because of that one fact. And Java 21 changes the number — which is section five, and which is why this course is worth relearning if you last looked at it a few years ago.",
}
