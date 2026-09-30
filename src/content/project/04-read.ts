import type { Section } from '../types'

export const read: Section = {
  id: 'read',
  title: 'Reading',
  scene: 'project-pipeline',
  slide: `## Constant memory, whatever the file size

\`\`\`java
try (var lines = Files.lines(path, UTF_8)) {
    return lines.map(l -> parse(l, n.incrementAndGet()))
                .toList();
}
\`\`\`

### Three decisions in four lines
- **\`Files.lines\`, not \`readAllLines\`** — a lazy stream, so a 2 GB log uses the same memory as a 2 KB one (**c9 §10**). \`readAllLines\` would be an \`OutOfMemoryError\`.
- **try-with-resources** — it holds a **file handle**, and it's the one stream you must close (**c8 §3, c9 §8**)
- **\`UTF_8\` explicitly** — the default only became UTF-8 in Java 18, and a silently corrupted accent is a bad bug (**c9 §10**)

### The one that looks wrong and isn't
\`toList()\` **materialises**. Returning the lazy stream would push closing the file onto the caller, and the \`try\` block would have already closed it — a stream over a **closed file**. **Consume inside the \`try\`, or return a list.**

Line numbers come from an \`AtomicInteger\` so §8 can parallelise without changing this.`,
  narration:
    "Four lines, and three of them are decisions you've seen argued for. First, Files dot lines rather than readAllLines. Files dot lines returns a lazy stream that reads one line at a time, so memory is constant regardless of file size. A two-gigabyte log costs the same as a two-kilobyte one. ReadAllLines would build a List with every line in it, and on a large log that is an OutOfMemoryError — course nine section ten. Second, try-with-resources, because Files dot lines holds an open file handle. This is the one stream in the library you genuinely must close, which courses eight and nine both flagged, and forgetting leaks file descriptors until the process can't open any more — a failure that appears hours later as something completely unrelated. Third, the charset spelled out. The platform default only became UTF-8 in Java 18, and before that the same code read a file correctly on Linux and corrupted accented characters on Windows, silently. Two extra characters remove that entirely. Now the line that looks wrong and isn't: toList at the end. Why materialise, when the whole argument was about laziness? Because of a genuine trap. If this method returned the lazy stream instead, the try-with-resources block would close the file the moment the method returned — before the caller had read anything. The caller then gets a stream over a closed file, and the error is baffling. So the rule is: either consume the stream inside the try block, or return something already materialised. Here, returning a List is fine because the per-file result after parsing is small. If it weren't, the shape would be to pass a function into this method and apply it inside the try — which is course seven section nine's higher-order method, doing exactly the job it's for. One small thing about line numbers. We're counting with an AtomicInteger rather than an ordinary int, partly because a lambda can't mutate a local — course seven section seven — and partly because section eight is going to run several files concurrently and we don't want to revisit this code then.",
}
