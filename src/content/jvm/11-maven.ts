import type { Section } from '../types'

export const maven: Section = {
  id: 'maven',
  title: 'Maven — dependency resolution',
  scene: 'build-tools',
  slide: `## "Nearest wins" is not "newest wins"

Two dependencies pull in a third at different versions. Maven picks by **shortest path** to the root, and on a tie the **first declared**. **Not the highest version** — so you can ship an **older** jar than either asked for, and get a \`NoSuchMethodError\` at run time.

\`\`\`bash
mvn dependency:tree -Dincludes=com.google.guava
\`\`\`

### The fixes
**\`<dependencyManagement>\`** — pin once, wins everywhere, adds nothing · a **BOM** — someone's tested version set · **\`<exclusions>\`** — cut one edge · \`mvn dependency:analyze\` — **used but undeclared** is the fragile one

### Scopes
\`compile\` · \`provided\` · \`runtime\` (a JDBC driver) · \`test\`

**Gradle** resolves conflicts by **highest version** — the opposite default — and is faster incrementally. A build is a program, so debugging one is too.`,
  narration:
    "Course one section seven covered Maven's layout and lifecycle, which is what you need to use it. This is the part that actually goes wrong on real projects. Dependencies are transitive: you declare a library, and you get its dependencies too, and theirs, all the way down. That's wonderful until two of them want different versions of the same third library — which happens constantly, because everyone depends on Guava or Jackson or SLF4J. Maven then has to choose one, and the rule is called nearest wins. It picks the version with the shortest path to the root of your dependency tree. And if two are at the same depth, it takes the one declared first. Read that again, because it's the part people assume wrong: it is not highest version wins. So you can end up running an older version of a library than either of the two that asked for it, chosen by declaration order in your pom. And the symptom appears at run time as a NoSuchMethodError — the class was found, at the wrong version, which is course one section eight's error. Or worse, as subtly different behaviour with no exception at all. The diagnostic is mvn dependency colon tree, and you can filter it with dash D includes to just the library you're chasing, which turns an eight-hundred-line output into ten. Three fixes. DependencyManagement is the main one: a block where you pin a version for a library, and that version wins throughout the tree regardless of what anything asks for. It doesn't add a dependency, it just decides the version if one appears. A BOM — bill of materials — is somebody else's dependencyManagement block that you import, and it gives you a set of versions that have actually been tested together; Spring and Jackson both publish one, and using it removes a whole class of problem. And exclusions let you cut one specific transitive edge when a library drags in something you don't want. One more command worth knowing: mvn dependency colon analyze. It reports two things. Used but undeclared — you're calling a library you never declared, and you're only getting it transitively, so the day that intermediate library drops it your build breaks for no visible reason. And declared but unused, which is just cleanup. Scopes briefly: compile is the default and ships. Provided means it's there at run time but somebody else supplies it, so don't package it. Runtime means it's needed to run but not to compile, which is the classic JDBC driver case. Test means test code only. And Gradle, briefly. It solves exactly the same problems with a programmable DSL in Groovy or Kotlin, and — importantly — its default conflict resolution is highest version wins, which is the opposite of Maven's and generally the more intuitive choice. It's faster on incremental builds because it's properly incremental and has a build cache. The trade is that a Gradle build is a program, so when it misbehaves you're debugging code rather than reading a declaration.",
}
