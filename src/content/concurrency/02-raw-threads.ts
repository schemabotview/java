import type { Section } from '../types'

export const rawThreads: Section = {
  id: 'raw-threads',
  title: 'Raw threads',
  scene: 'executors',
  slide: `## The bottom layer — which you'll rarely write

\`\`\`java
Thread t = new Thread(() -> work());
t.start();   // start() spawns. run() is a method call.
t.join();    // block until it finishes
\`\`\`
\`Runnable\` has **no result** and **can't throw checked exceptions** — both are why \`Callable\` exists (§4).

### The classic mistake
**\`t.run()\` runs the body on the current thread.** No new thread, no error, no clue.

### Stopping one
\`Thread.stop()\` was **removed** — it could leave objects half-updated. Cancellation is **cooperative**: \`interrupt()\` sets a **flag**, and blocking calls throw \`InterruptedException\`.

Catch it and either **rethrow** or \`Thread.currentThread().interrupt()\` (course 9 §6). Swallowing it breaks cancellation for everything above you.

### Also
\`setDaemon(true)\` · set an **uncaught exception handler** — otherwise an exception kills the thread silently.`,
  narration:
    "This is the bottom layer of Java's concurrency, and while you'll rarely write it directly, you need it to understand everything above. Create a Thread with a Runnable, call start, and a new thread of execution begins running that Runnable. Call join and the calling thread blocks until it finishes. Runnable is a functional interface — course seven section one — so a lambda works, and it has two limitations that matter: its run method returns nothing, and it cannot throw checked exceptions. Both of those are why Callable exists, in section four. Now the classic mistake, and it's worth saying out loud because it's subtle. If you call t dot run instead of t dot start, it compiles, it runs the body, it produces the right answer — and no new thread is created. The work happens on the calling thread, synchronously. There's no error, no warning, and nothing in the output to tell you. Start spawns; run is just a method call. Stopping a thread. There used to be a Thread dot stop method that killed a thread outright, and it has been removed, because it could stop a thread half way through updating an object and leave it permanently inconsistent with its locks released. There is no safe way to forcibly stop a thread, in any language, for that reason. Java's mechanism is cooperative. You call t dot interrupt, which sets a flag on the thread. If that thread is blocked in something interruptible — sleep, wait, most blocking I/O — that call immediately throws InterruptedException. If it's just computing, it has to check Thread dot interrupted itself, periodically, and choose to stop. The thread has to agree. Which leads to the rule from course nine section six, and I want to repeat it because it's the single most broken piece of concurrency etiquette in Java. If you catch an InterruptedException, catching it has already cleared the interrupt flag. So either rethrow it, or call Thread dot currentThread dot interrupt to set it back. If you swallow it, you have silently broken cancellation for every layer above you, and their shutdown will hang. Two smaller things. SetDaemon true marks a thread as one that should not keep the JVM alive — the process exits when only daemon threads remain. And by default, an uncaught exception in a thread kills that thread and prints to standard error, which in a server frequently means nobody notices. Set an uncaught exception handler.",
}
