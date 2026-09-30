import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here',
  scene: 'java-pipeline',
  slide: `## One spine, eight sections hanging off it

The diagram is §4's, deliberately.

- **§3 install** — the JDK is this pipeline in a box: \`javac\` left, JVM right
- **§4 the-run** — the spine. \`javac\` ahead of time, the JVM at run time
- **§5 jshell · §6 jbang** — the same spine at a prompt, then in one file
- **§7 maven** — industrialises the left half: fixed layout, cumulative lifecycle
- **§8 packages** — how the **class loader**, the JVM's front door, finds anything
- **§9 memory** — what the right-hand box does while it runs

### You can now
Try an idea in \`jshell\`, keep it as a \`jbang\` script, grow it into a Maven project — and read a \`ClassNotFoundException\` knowing where to look.

### You can't yet
**Write Java** — you've met the machine, not the language. Course 2 starts it.`,
  narration:
    "Let's close the loop. The diagram on the left is the one from section four, and it is back on purpose, because every section in this course was a piece of it. Start at section three, the install. What you downloaded was this entire pipeline packaged into one box: javac sits on the left of it, the JVM and the class library sit on the right, and JDK is just the name for having both. Section four was the spine itself — two stages, javac ahead of time producing portable bytecode, and the JVM at run time, loading it, verifying it, interpreting it and then JIT-compiling whatever turns out to be hot. Section five, jshell, collapses that spine down to a prompt. The compile step still happens, you just never see it, and there's no file at all. Section six, jbang, put the file back but kept everything else away: one java file is the whole program, and the DEPS line is doing the one job a build tool was really needed for — putting jars on the classpath. Section seven, Maven, industrialises the left half of the picture. A fixed directory layout that every Java project shares, and a cumulative lifecycle — validate, compile, test, package — where naming a phase runs everything before it, and a jar comes out the far end. Section eight was about the class loader, which is the JVM's front door on this diagram. A package name is a path, the classpath is the list of roots that path is searched under, and the four errors we looked at are four different points in that search failing. And section nine went inside the box on the right: stacks per thread holding frames, one shared heap holding every object, metaspace holding the class definitions and the JIT's compiled code. So what can you do now? You can install a JDK and prove it's the right one. You can try an idea at a REPL, save it as a single-file script when it turns out to be worth keeping, and grow it into a real project when it outgrows one file. And when something fails to resolve, you can read the error and know which part of this diagram to go and look at. What you cannot do yet is write Java. That's the honest summary of this course: you have met the machine, not the language. So next, course two, we start on the language itself — values and types, var and type inference, expressions, control flow, and methods.",
}
