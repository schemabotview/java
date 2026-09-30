import type { Section } from '../types'

export const virtualThreads: Section = {
  id: 'virtual-threads',
  title: 'Virtual threads — Java 21',
  scene: 'thread-model',
  slide: `## The expensive number stopped being expensive

A **virtual thread** is a **heap object** scheduled by the **JVM**, not the OS. A few hundred bytes instead of a megabyte — so **millions** are fine.

\`\`\`java
try (var ex = Executors
        .newVirtualThreadPerTaskExecutor()) {
    requests.forEach(r -> ex.submit(() -> handle(r)));
}
\`\`\`

### Mount and unmount
It runs **mounted** on a **carrier** — a real platform thread. When it **blocks**, the JVM **copies its stack to the heap and unmounts it**, freeing the carrier. The blocking call *looks* blocking and **costs nothing**.

### What it's for
**Thread-per-request, at scale.** The readable blocking code now scales like the reactive version.

### The rules
**Don't pool them.** A blocking \`synchronized\` block **pins** the carrier — use a \`ReentrantLock\`. **CPU-bound work gains nothing.**`,
  narration:
    "This is the most significant change to Java concurrency in twenty years, and it arrived in Java 21. Recall the constraint from section one: a platform thread is one-to-one with an OS thread, costs about a megabyte of stack, and so you can have a few thousand. Everything else in this course — pools, queues, futures, reactive callbacks — exists to work around that number. A virtual thread is a Java object on the heap, scheduled by the JVM rather than by the operating system. It costs a few hundred bytes. So you can have millions of them, and that changes what designs are possible. The mechanism is mounting. A virtual thread doesn't run by itself — it runs mounted on a carrier thread, which is a real platform thread from a small pool, typically sized to your core count. It executes normally. And then it hits a blocking call — reading a socket, waiting on a lock, sleeping. At that point the JVM copies its stack out to the heap and unmounts it from the carrier, and the carrier immediately picks up a different virtual thread. When the I/O completes, the virtual thread is remounted, possibly on a different carrier, and carries on from exactly where it was. The crucial part: your code looks like ordinary blocking code. There is no async, no callback, no await keyword. You write in dot read, and it costs essentially nothing to be waiting there. Which is what this is actually for: thread-per-request, at scale. For twenty years the advice for a high-throughput server was to abandon the readable blocking style and go reactive — callbacks, event loops, CompletableFuture chains — precisely because you couldn't afford a thread per request. With virtual threads you can. The plain, obvious, debuggable, easily-stack-traced version now scales like the clever version. The reason to reach for CompletableFuture just got a great deal narrower. Three rules. Do not pool virtual threads. Pooling exists to amortise an expensive creation, and creation is now cheap; one virtual thread per task is the whole idiom, which is what newVirtualThreadPerTaskExecutor gives you. Don't pool the things they use either — a connection pool of ten in front of ten thousand virtual threads just moves the bottleneck. And one sharp edge: a virtual thread that blocks inside a synchronized block pins its carrier, meaning the carrier can't be reused, which defeats the point. On hot paths use a ReentrantLock instead, which doesn't pin. Finally, the honest limit. Virtual threads do nothing for CPU-bound work. If your task is computing rather than waiting, you're still limited by cores, and a fixed pool is still right. This is a fix for blocking.",
}
