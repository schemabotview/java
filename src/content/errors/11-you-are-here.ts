import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here — directories & serialization',
  scene: 'nio-files',
  slide: `## Walking a tree

\`\`\`java
try (var paths = Files.walk(root)) {   // lazy
    paths.filter(Files::isRegularFile)
         .forEach(this::importFile);
}
\`\`\`
\`list\` is one level · \`walk\` recurses · \`find\` takes a matcher. All **lazy streams**, so all need closing.

### Serialization — one honest note
Java's \`Serializable\` is **effectively deprecated in practice**: a **remote-code-execution** vector, it makes every field API forever, and \`serialVersionUID\` breaks compatibility unpredictably. **Use JSON, protobuf or Avro.**

### The course
**§1–3** the tree **is** the rule · **§4–6** three ways to destroy the evidence · **§7** read the **last \`Caused by\`** · **§8** suppressed, not replaced · **§9–10** \`Path\` names, \`Files\` acts

### Next
Course 10 — everything so far assumed **one thread**.`,
  narration:
    "Two things to finish with, then the course. First, directories. Files dot list gives you the immediate contents of one directory. Files dot walk recurses through the whole tree from a root, optionally with a maximum depth. Files dot find does the same with a matcher applied as it goes, which is more efficient than walking everything and filtering afterwards. All three return lazy streams, which means all three hold directory handles, which means all three need a try-with-resources. That's easy to forget because the code reads like a plain collection. The example on the slide is a real shape you'll write: walk a tree, keep the regular files, keep the ones ending in dot csv, import each one — four lines, and it composes with everything from course eight. Second, serialization, and I'm going to be blunt rather than complete. Java has a built-in serialization mechanism: implement Serializable and an object can be written to a byte stream and read back. You will meet it in old code. You should not use it in new code. Three reasons. It is a remote code execution vulnerability — the incoming bytes decide which classes get constructed, so deserializing untrusted data can run arbitrary code, and this has been the root cause of some of the most severe vulnerabilities in the Java ecosystem. It makes every private field part of your public API forever, because the serialized form depends on them, so you can never refactor freely. And serialVersionUID governs compatibility in ways that break in production and not in testing. Java's own architects have said publicly that it was a mistake. Use an explicit format — JSON, protocol buffers, Avro — where the wire format is something you designed rather than something derived from your field layout. So, the course. Sections one to three: the Throwable tree is literally the checked-versus-unchecked rule, and the line that works is whether the caller can plausibly do something. Four to six: the syntax, and the three ways people destroy the evidence — swallowing, catching too wide, and returning from finally — plus chaining, where one omitted argument loses the original trace. Seven: reading a trace, go to the last Caused by and find the first frame in your own package. Eight: try-with-resources, which suppresses rather than replaces, and that's why a Suppressed section exists. Nine and ten: Path names, Files acts, and be explicit about the charset. Next is course ten, concurrency — and everything in the course so far has quietly assumed there was only one thread.",
}
