import type { Section } from '../types'

export const concurrency: Section = {
  id: 'concurrency',
  title: 'Many files at once',
  scene: 'project-concurrency',
  slide: `## The simple version **is** the fast one now

\`\`\`java
try (var scope = new ShutdownOnFailure()) {
    var tasks = paths.stream()
            .map(p -> scope.fork(() -> analyse(p)))
            .toList();
    scope.join();
    scope.throwIfFailed(IOException::new);
    return merge(tasks);
}   // nothing outlives this block
\`\`\`

### Why this, and not the three temptations
**Not a pool** — the work is **blocking I/O**, and a virtual thread per file costs nothing (**c10 §5**).
**Not \`parallelStream()\`** — blocking I/O on the **common ForkJoinPool** starves the whole process (**c8 §10**).
**Not \`CompletableFuture\`** — that graph has **no lifetime** (**c10 §6**).

### No shared mutable state
Each task returns **its own** immutable maps; \`merge\` runs **after** \`join()\`. Nothing shared ⇒ **nothing to lock** — course 10 §9's **first** answer, not its fourth.`,
  narration:
    "One file at a time is fine for a handful of logs and wrong for a directory of two hundred. So: many at once. And the shape of this section is really about the three things it's deliberately not. The code opens a StructuredTaskScope with the ShutdownOnFailure policy, forks one task per file, joins, checks for failure, and merges. That's course ten section seven, and the key property is in the comment: nothing outlives the block. If one file fails, every other task is cancelled and you get the exception. If the whole operation is cancelled from outside, that reaches every child. And when the block ends, there are no threads still running, guaranteed by close rather than by hope. Now the alternatives, because each one is a real temptation and each is wrong for a specific reason you've already met. Not a thread pool. The work here is blocking file I/O — each task spends nearly all its time waiting on the disk. A fixed pool of eight would cap you at eight files in flight while the CPU sits idle, and picking the number would be guesswork. Virtual threads make one per file free, so the natural structure is also the fastest one — course ten section five. Not parallelStream. It's tempting because it's one word. But it would run blocking I/O on the common ForkJoinPool, which is shared by the entire JVM, and one slow file would starve every other parallel stream in the process — course eight section ten, the trap that produces production incidents nobody can explain. Not CompletableFuture. It composes nicely, but the graph has no lifetime: if one file's chain fails, the others keep running, unowned, doing work whose result will be thrown away — course ten section six. And then the design decision that matters more than any of that. There is no shared mutable state anywhere in this. Each task analyses its own file and returns its own immutable maps — the Map dot copyOf from section six. Nothing is written by two threads. Merge runs after join, on one thread, combining maps that are already finished. So there is no lock, no atomic, no synchronized block, and no memory-model reasoning to do. That's course ten section nine's first answer, which was don't share, rather than its fourth, which was take a lock. Almost every concurrency bug I've seen came from reaching for the fourth when the first was available.",
}
