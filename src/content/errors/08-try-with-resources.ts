import type { Section } from '../types'

export const tryWithResourcesSection: Section = {
  id: 'try-with-resources',
  title: 'try-with-resources',
  scene: 'try-with-resources',
  slide: `## Declare it in the parentheses; it closes itself

\`\`\`java
try (var in  = Files.newBufferedReader(src);
     var out = Files.newBufferedWriter(dst)) {
    in.lines().forEach(out::write);
}   // closed in REVERSE order, on every exit path
\`\`\`
Anything **\`AutoCloseable\`**: streams, readers, sockets, JDBC — and **\`Files.lines\`**.

### The bug it retired
With the old \`finally { close(); }\`, if the **body** threw *and* \`close()\` threw, **close's exception replaced the real one**.

try-with-resources **suppresses** instead: the body's propagates, close's is **attached**. That's §7's \`Suppressed:\` section.

### Details
Java 9+ can name an already-final variable · reverse close order, so \`out\` may depend on \`in\` · \`close()\` runs **exactly once**, on every path`,
  narration:
    "Try-with-resources is the construct you should use for anything that needs closing, and it exists to fix a specific, subtle bug in what came before. Syntax first. You declare the resources inside parentheses after try, separated by semicolons, and Java closes them automatically when the block exits — normally, by return, or by exception. Anything implementing AutoCloseable qualifies, which is every stream, reader, writer, socket, JDBC connection, and — from course eight — Files dot lines, which is the one stream you must close. Now the bug it retired, because this is the part worth knowing. The old idiom was to open the resource, work with it in a try, and close it in a finally. That looks correct and mostly is. But consider: the body throws a genuine failure — a parse error, say. The finally block runs and calls close. And close itself throws, because the underlying stream is in a bad state, which is exactly when close is most likely to throw. Now what propagates? Close's exception. It replaces the body's. So the caller sees a meaningless \"stream already closed\" error, and the parse error that actually caused everything is gone forever. That's a genuinely nasty bug and it was common. Try-with-resources handles it differently. The body's exception is the one that propagates — it's the real failure and it wins. Close's exception is suppressed: not discarded, attached to the primary exception, where you can retrieve it with getSuppressed and where it prints under a Suppressed heading. That's the section we saw in the trace last time, and now you know why it exists. Three details. Since Java 9, if you already have a final or effectively-final variable, you can name it directly in the parentheses rather than redeclaring it. Resources are closed in reverse order of declaration, which is what you want when the second one wraps the first — a writer built on a stream gets closed before the stream. And close is called exactly once on every path, which is more than a hand-written finally reliably manages once there are early returns in the body. The practical rule is short: if a type is AutoCloseable, there is no good reason to be closing it by hand. Use the construct.",
}
