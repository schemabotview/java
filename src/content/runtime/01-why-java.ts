import type { Section } from '../types'

export const whyJava: Section = {
  id: 'why-java',
  title: 'Why Java',
  scene: 'java-reach',
  slide: `## Compile once, run anywhere

Java's 1995 bet: don't compile to **this machine's** instructions — compile to a **fictional machine's**, then ship a program that imitates it anywhere. That's the **JVM**.

### What the bet bought
- One \`.jar\` of **bytecode** runs unchanged on Linux, macOS, Windows, ARM, x86
- The JVM became a **platform** — Kotlin, Scala and Clojure compile to the same bytecode
- **Backward compatibility**: code from 2005 still runs on Java 21

### Why it still matters
- **Where the money is** — banking, insurance, airlines, retail
- **Where the data is** — Spark, Kafka, Flink, Cassandra, Elasticsearch are JVM programs
- **Static types + the JIT** — the compiler catches bugs before they ship; long-running services run near C
- **The trade**: verbosity and startup. Java 21 fixed the first; the second is why a 50ms CLI belongs elsewhere`,
  narration:
    "Every language makes one central bet, and Java's was made in 1995. At the time, if you wanted a program to run on a different kind of computer, you recompiled it for that computer — different chip, different instructions, different binary. Java's designers asked a stranger question. What if we compile to a machine that doesn't exist? Invent an idealised computer, define its instruction set precisely, compile every Java program down to that. Then, to run anywhere, you only need one thing: a small program on each real machine that knows how to imitate the imaginary one. That imitator is the Java Virtual Machine, and those idealised instructions are called bytecode. So a Java program compiles once, into a jar file of bytecode, and that same file runs unchanged on a Linux server, on your Mac, on a Windows laptop, on an ARM chip or an Intel one. Write once, run anywhere — the slogan is old and slightly worn, but the mechanism underneath it is exactly what it says. That bet paid off in ways the designers didn't plan for. Because the JVM is a well-specified machine, other languages started targeting it too: Kotlin, Scala, Clojure, Groovy all compile to the same bytecode and run on the same runtime. Java stopped being just a language and became a platform. And a promise was kept that almost no other ecosystem kept — code compiled in 2005 still runs on Java 21 today. Which brings us to now. Why learn this in 2026? Two answers. The first is where the money is: banking, insurance, airlines, retail, government — the large systems that absolutely must not fall over are overwhelmingly Java, and they are not being rewritten. The second is where the data is: Spark, Kafka, Flink, Cassandra, Elasticsearch — the backbone of modern data infrastructure is JVM software. On top of that you get static types, so the compiler catches a whole family of mistakes before they ever ship, and a runtime whose just-in-time compiler makes long-running services genuinely fast, often close to C. It isn't free. Java is wordier than Python, and it starts slowly, so it is a poor fit for a tiny command-line tool you run fifty times a minute. Java 21 has fixed a great deal of the wordiness, and that is where we're going next.",
}
