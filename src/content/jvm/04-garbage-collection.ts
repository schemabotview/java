import type { Section } from '../types'

export const garbageCollection: Section = {
  id: 'garbage-collection',
  title: 'Garbage collection',
  scene: 'gc',
  slide: `## Almost every object dies young

That one observation is the whole design. New objects go in **Eden**; a young collection **copies the few survivors out** and declares the rest dead **in one step**.

> **Cost is proportional to what SURVIVES, not to what's garbage.**

So allocating a million short-lived objects is nearly free — which is why §3's advice holds.

### Reachability, not counting
An object lives while reachable from a **GC root**. Reference counting can't collect a cycle; **tracing can**. A "leak" is always a **root you forgot to drop**.

### The collectors
**G1** (default) — regions, **pause-target** driven. Good general choice.
**ZGC** — **sub-millisecond** pauses on huge heaps; pay a little throughput.
**Parallel** — best raw **throughput**, longer pauses. Batch jobs.

**Choose by pause vs throughput, then measure.**`,
  narration:
    "Garbage collection in Java rests on one empirical observation, and once you have it, the design is obvious. The observation is called the weak generational hypothesis: almost every object dies young. In a typical program the overwhelming majority of objects become garbage almost immediately — a temporary in a loop, a string built for a log line, the intermediate result of a calculation. A small minority survive and tend to survive for a long time. So the heap is split. New objects are allocated in a region called Eden, which is a simple bump-the-pointer allocation and is genuinely fast. When Eden fills, a young collection runs — and here's the important part. It does not look for garbage. It finds the objects that are still reachable, copies them out into a survivor space, and then declares the entire remaining region free in one operation. So the cost is proportional to what survives, not to what's garbage. Collecting a region where ninety-nine percent of objects are dead is cheap in direct proportion. That is why allocating a million short-lived objects is nearly free, and it's the mechanism behind the advice in the last section. An object that survives several young collections is eventually promoted to the old generation, which is collected rarely and expensively. Now, reachability. Java does not count references. It traces: starting from a set of GC roots — the local variables in every live stack frame, static fields, active threads — it walks the object graph and marks everything it can reach. Whatever isn't marked is garbage. That's why Java can collect a cycle of objects that point at each other, where a reference-counting scheme cannot. And it's why a leak in Java is always the same thing: a root you forgot to drop. A static map that only grows, a listener never unregistered, a cache with no eviction. The object is reachable, so the collector correctly keeps it. Which collector? G1 is the default and a good general choice — it divides the heap into regions and works to a pause-time target you set, so you tell it how long a pause you can tolerate and it adapts. ZGC gives sub-millisecond pauses even on very large heaps by doing nearly everything concurrently with your application, at some cost in throughput; if tail latency matters, that's the one. The parallel collector gives the best raw throughput with longer stop-the-world pauses, which is right for batch work where nobody is waiting. And Serial is for tiny heaps and single-core containers. Choose on the pause-versus-throughput axis, and then measure — not the other way round.",
}
