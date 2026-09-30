import type { Section } from '../types'

export const install: Section = {
  id: 'install',
  title: 'Installing the JDK',
  scene: 'jdk-anatomy',
  slide: `## JDK ⊃ JRE ⊃ JVM

Three names, three sizes of one box. **You install the JDK.**

- **JVM** — loads and executes bytecode. Just the engine.
- **JRE** — JVM **+ class library** (\`java.lang\`, \`java.util\`, \`java.nio\`). Enough to *run*, not to build.
- **JDK** — JRE **+ tools**: \`javac\`, \`jshell\`, \`jar\`, \`jcmd\`. Since Java 11 there's no separate JRE download.

### Installing 21
\`\`\`bash
brew install --cask temurin@21
java -version    # openjdk 21.0.5
javac -version   # javac 21.0.5
\`\`\`
- **Temurin** is the free, TCK-certified build; Oracle's own carries licence terms
- Both must answer, and **agree**. \`java\` without \`javac\` is a runtime, not a JDK.

### Several JDKs
\`JAVA_HOME\` is what Maven, Gradle and your IDE read — and it can disagree with \`java -version\`. Use **SDKMAN!**`,
  narration:
    "Installing Java means understanding three acronyms that people use interchangeably and that are not the same size. Look at the nesting on the left, because the nesting is the whole explanation. Innermost is the JVM — the Java Virtual Machine. That is the engine: the thing that loads bytecode, verifies it, and executes it. On its own it is not useful, because a real program needs library code. Wrap the JVM together with the class library — java.lang, java.util, java.nio, the thousands of classes every Java program assumes exist — and you have the JRE, the Java Runtime Environment. The JRE can run a Java program. It cannot build one, because it has no compiler. Wrap the JRE together with the developer tools — javac the compiler, jshell the REPL, jar the bundler, jcmd and jfr for inspecting a live process — and you have the JDK, the Java Development Kit. That is the outermost box, and that is the one you install. Since Java 11 there is no separate JRE to download at all, so the decision is made for you: take the JDK. Which JDK? Java is a specification with several implementations. The one most people use is Temurin, from Eclipse Adoptium — free, certified against the official test suite, no licensing strings. On a Mac, brew install cask temurin at 21. Oracle publishes its own build with its own licence terms; you do not need it. Then verify, and verify both halves. Java dash version should say openjdk twenty-one. Javac dash version should also say twenty-one. If java answers but javac does not, you have installed a runtime and not a development kit, and nothing in this course will compile. If they answer with different versions, you have two installations fighting, and that will bite you later in a confusing way. One last thing, which matters the moment you have more than one project. The command line and your tools do not necessarily agree. Maven, Gradle and your IDE read an environment variable called JAVA_HOME, and that can point somewhere entirely different from whatever java dash version reports. Rather than editing your PATH by hand, install SDKMAN and switch with sdk use java 21-tem — it sets both, together, and you can move a shell between versions in one command.",
}
