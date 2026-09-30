import type { Section } from '../types'

export const jbang: Section = {
  id: 'jbang',
  title: 'jbang — one file, one program',
  scene: 'jbang-script',
  slide: `## The gap between a REPL and a project

A jshell session can't be saved as a program; a Maven project is a directory and a build. **jbang** is the middle: **one \`.java\` file that runs**, dependencies included.

\`\`\`bash
jbang wordcount.java access.log
\`\`\`

### What makes it self-contained
- \`//DEPS group:artifact:version\` — jbang **fetches the jar**. No \`pom.xml\`.
- \`//JAVA 21\` — pins the version, and **downloads that JDK** if it's missing
- The \`///usr/bin/env jbang\` line makes the file itself **executable**
- Compiled output is **cached** — the second run starts instantly

### Java 21 makes it readable
\`void main(String[] args)\` — **no class, no \`static\`, no \`public\`**. Running a bare \`.java\` file has worked since 11; \`//DEPS\` is what unblocked scripting.

### When
Throwaway tools, bug reproductions, scheduled jobs. **More than one file ⇒ Maven.**`,
  narration:
    "So jshell is where you try things, and it can't keep them. At the other end sits a real project — a directory tree, a pom dot xml, a build tool — which is the right answer for anything substantial and a ridiculous amount of apparatus for a thirty-line tool. jbang fills the gap between them. The idea is one file that runs. Look at the script on the left: this counts word frequencies in a file, and the entire program, dependencies included, is what you see. Walk down it. The first line looks like a shell shebang and is a clever trick — it makes the java file itself executable, so you can chmod plus x it and run it as a command like any script. Then slash slash JAVA 21, which pins the version; if you don't have a Java 21 on the machine, jbang will download one. Then the important line: slash slash DEPS, org dot apache dot commons, colon, commons-lang3, colon, the version. That is a Maven coordinate, and jbang will fetch that jar and put it on the classpath for you. That is the thing that was actually missing. Launching a bare java file directly has worked since Java 11 — you can type java wordcount dot java and it runs — but the moment you needed a library, you were back to building a project. jbang removes that wall. Below the header it is ordinary Java: read the lines of a file, split each on non-word characters, drop the blanks, group by the lowercase word and count. And notice the method signature — void main, String array args. No class wrapping it, no public, no static. In Java 21 a single-file program can be written that way, which removes the last bit of ceremony from a script. Run it with jbang wordcount dot java access dot log. There is no pom, no mvn, no target directory. The compiled result is cached, so the first run pays for a compile and every run after it starts instantly. Use this for the things that deserve to exist but don't deserve a project: throwaway tools, a minimal reproduction to attach to a bug report, a small scheduled job, teaching examples. The rule of thumb is simple. One file, jbang. More than one file, and you want a real project — which is where we go next.",
}
