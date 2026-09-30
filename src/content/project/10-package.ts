import type { Section } from '../types'

export const packageSection: Section = {
  id: 'package',
  title: 'Packaging',
  scene: 'build-tools',
  slide: `## One file you can hand to someone

\`\`\`bash
mvn clean package        # → target/loganalyse.jar
java -jar loganalyse.jar --level ERROR logs/*.log
\`\`\`

### What makes a jar runnable
A \`Main-Class\` entry in \`META-INF/MANIFEST.MF\`, plus **every dependency on the classpath**. Here there are none — so the plain jar already runs. With dependencies, the **shade** plugin merges them in (a "fat jar"), and you must merge \`META-INF/services\` too or \`ServiceLoader\` silently finds nothing.

### The CLI is a boundary — so validate there
Unknown option ⇒ usage and **exit 2**. No files ⇒ **exit 2**. Parse failures present ⇒ still exit **0**; that's **data**, not a program failure. **Exit codes are the API** for whatever runs this.

### Shipping it further
**\`jlink\`** builds a runtime with only the modules used (**c11 §8**) — a much smaller container image. **\`jpackage\`** makes a native installer.

Startup dominated by class loading? **AppCDS** (\`-XX:SharedArchiveFile\`).`,
  narration:
    "The program works. Now make it something you can hand to someone. Mvn clean package builds it, and the lifecycle from course one section seven means that also ran validate, compile and your tests — so a broken test means no jar, which is the behaviour you want. What makes a jar runnable is two things. A Main-Class entry in the manifest, which says which class has the main method. And every dependency available on the classpath at run time. In this project there are no runtime dependencies at all, so the plain jar Maven builds already runs. In a real project you'd use the shade plugin, which unpacks all your dependencies and merges them into one jar — a fat jar or uber jar. One trap with shading, since it bites people: if any of your dependencies use ServiceLoader, they have files under META-INF slash services that all have the same names, and a naive merge overwrites them. The shade plugin has a services-resource transformer for exactly this, and without it your application starts fine and silently can't find any providers. Now the CLI, which is a boundary — and course three's lesson about boundaries is that you validate at them. Unknown option, print usage and exit with code two. No files given, same. A file that doesn't exist, say which one and exit non-zero. But note the distinction: parse failures in the log lines are not a program failure. The program did its job and is reporting on them. That's still exit zero, with the count in the output. Exit codes are the API for whatever runs this — a shell script, a cron job, a CI pipeline — and getting them wrong means an automated system either ignores real failures or alerts on normal operation. Two things for shipping further. Jlink, from course eleven section eight, builds a custom runtime image containing only the modules your program actually uses, which can take a container image from three hundred megabytes to about forty. And jpackage builds a native installer — a dmg, an msi, a deb — for a tool people install rather than run in a container. If startup time matters and profiling says it's dominated by class loading, AppCDS lets you create a shared archive of loaded classes and start from it, which typically takes a meaningful bite out of startup with one flag.",
}
