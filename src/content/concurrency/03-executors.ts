import type { Section } from '../types'

export const executorsSection: Section = {
  id: 'executors',
  title: 'ExecutorService',
  scene: 'executors',
  slide: `## Separate **what** to run from **where** it runs

\`\`\`java
try (var pool = Executors.newFixedThreadPool(8)) {
    pool.submit(() -> work());
}   // 19+: AutoCloseable, and close() waits
\`\`\`
You hand over tasks; the pool owns the threads, reuses them, and queues the rest. Thread creation stops being your problem.

### The factories
**\`newFixedThreadPool(n)\`** — n threads, an **unbounded queue**. That queue is the trap: under overload it grows to \`OutOfMemoryError\` instead of pushing back.
**\`newSingleThreadExecutor\`** — serialises tasks; a lock you don't have to write.

For real control, build a \`ThreadPoolExecutor\`: **bounded queue** + a rejection policy (\`CallerRunsPolicy\` gives you back-pressure free).

### Shutting down
\`shutdown()\` drains · \`shutdownNow()\` interrupts · then \`awaitTermination\`. **A non-daemon pool never shut down keeps the JVM alive** after \`main\` returns.`,
  narration:
    "Creating a thread per task doesn't scale, for the reason section one gave: threads are expensive and there's a hard ceiling on how many you can have. The executor framework fixes that by separating two things that got tangled together — what to run, and where it runs. You write tasks. The executor owns the threads, reuses them across tasks, and queues the work that doesn't fit. Thread creation stops being your problem entirely. Since Java 19 ExecutorService is AutoCloseable, so you can use try-with-resources from course nine section eight, and close will wait for the tasks to finish. That's much nicer than the shutdown dance people used to write. The factory methods. NewFixedThreadPool of n gives you exactly n threads, and — this is the part to know — an unbounded queue in front of them. Under normal load that's fine. Under overload it's a trap: tasks pile up in the queue, the queue grows without limit, and you get an OutOfMemoryError rather than the system pushing back on whoever is submitting. That's a real production failure mode and the factory method hides it. NewCachedThreadPool is the opposite problem — it creates threads without limit, so under load you get thousands of threads. NewSingleThreadExecutor runs tasks one at a time in order, which is genuinely useful: it's a lock you don't have to write, and it's how you serialise access to something without synchronising. And newVirtualThreadPerTaskExecutor, which is Java 21 and is section five. If you want real control, construct a ThreadPoolExecutor directly. It's more arguments, but you get to choose a bounded queue and a rejection policy — what happens when the queue is full. CallerRunsPolicy is a good default, because it makes the submitting thread run the task itself, which naturally slows down whoever is producing work. That's back-pressure, for free. Finally, shutdown, which is where a specific confusing bug lives. Shutdown stops accepting new tasks and lets the queued ones finish. ShutdownNow interrupts the running ones and returns what was still queued. Either way you then call awaitTermination with a timeout to actually wait. And if you never shut it down at all: pool threads are non-daemon by default, so they keep the JVM alive after main returns. The program finishes its work, prints its output, and simply does not exit — and nothing in the output explains why.",
}
