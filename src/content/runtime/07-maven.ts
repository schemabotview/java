import type { Section } from '../types'

export const maven: Section = {
  id: 'maven',
  title: 'Maven — the real project',
  scene: 'maven-project',
  slide: `## A convention plus a lifecycle

Maven's gift isn't the XML — it's that **every Java project has the same shape**.

| path | holds |
|---|---|
| \`pom.xml\` | the project, declared |
| \`src/main/java\` | your code |
| \`src/main/resources\` | config, on the classpath |
| \`src/test/java\` | your tests |
| \`target/\` | **generated** — never committed |

### The lifecycle is cumulative
Name the **phase to reach**; Maven runs every phase before it. \`mvn package\` running your tests isn't a surprise — it's the definition.

### The pom declares, it doesn't script
- \`groupId\`+\`artifactId\`+\`version\` — the **coordinate**, for this project and every dependency
- \`maven.compiler.release\` = **21** makes it a Java 21 project
- Dependencies are **transitive** — \`mvn dependency:tree\` when versions collide`,
  narration:
    "Maven is the build tool most Java projects use, and people tend to describe it by its XML, which is the least interesting thing about it. Its real gift is on the left of the screen: a convention, so rigid that every Java project you will ever open has the same shape, and you can find your way around a repository you have never seen before in about ten seconds. Learn this layout once and you get it back for the rest of your career. Pom dot xml sits at the root and declares the project. Source lives under src, slash, main, slash, java — and inside that, the directory structure mirrors your package names. Non-code files that need to ship with the program — configuration, templates, a properties file — go in src, main, resources, and they end up on the classpath. Tests live in src, test, java, in a mirror of the same package structure. And then target, which holds everything Maven generates: the compiled dot class files, and the packaged jar. Target is generated output. It is never committed, and it is in the gitignore of every Java project in existence. On the right is the pom. Notice that it declares rather than scripts. There is no sequence of build steps in there. It says: this project's coordinate is com dot graphl, orders, version one point zero — that triple of groupId, artifactId and version names this project, and it is the same triple you use to name every dependency you pull in. The compiler release property is set to twenty-one, and that single line is what makes it a Java 21 project. And then a dependencies block, which lists what you need by coordinate. Those dependencies are transitive: ask for one library and you get the libraries it needs too, automatically, which is wonderful until two of them want different versions of the same thing, at which point mvn dependency colon tree is the command that shows you why. Now the lifecycle, along the bottom. Validate, compile, test, package. The thing to understand is that it is cumulative and ordered. You do not run a phase; you name the phase you want to reach, and Maven runs every phase up to and including it. So mvn package runs validate, then compile, then your tests, then builds the jar. People are sometimes surprised that packaging ran their test suite. It isn't a surprise — it is the definition. And mvn clean package puts a delete of the target directory in front of all of it, which is what you reach for when a build is behaving strangely.",
}
