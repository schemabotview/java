import type { Section } from '../types'

export const theBrief: Section = {
  id: 'the-brief',
  title: 'The brief',
  scene: 'the-brief',
  slide: `## One program that needs all eleven courses

**\`loganalyse\`** — a CLI that reads log files and reports on them.

\`\`\`bash
java -jar loganalyse.jar --level ERROR logs/*.log
\`\`\`

### Requirements, and what each one forces
- **Files of any size** ⇒ stream them, constant memory (**c9**)
- **Malformed lines are normal** ⇒ report, never crash (**c4, c9**)
- **Group and summarise** (**c5, c8**)
- **Many files at once**, without a thread pool (**c10**)
- **Tested**, and **one runnable jar** (**c11**)

### The constraint that matters
**Plain Java 21. No frameworks.** Everything from the standard library — which makes the eleven courses **visible** rather than hidden behind someone's annotations.

### The arc
§2 structure · §3 model · §4 read · §5 parse · §6 aggregate · §7 the generic seam · §8 concurrency · §9 test · §10 package`,
  narration:
    "Eleven courses of pieces. This one builds a program, and the requirements are chosen so that each of them forces you to use something you've learned rather than to hear about it again. The program is called loganalyse. It's a command-line tool that reads log files and reports on them: how many errors per source, latency statistics per level, the slowest operations, and which lines it couldn't understand. Run it with java dash jar, a few options, and a list of files. Now look at the requirements, because each one is there for a reason. It must handle files of any size — which rules out reading them into memory and forces a stream, from course nine. Malformed lines are normal, not exceptional — a real log file has truncated lines and lines from a different format, and the tool must report them and carry on rather than crashing on line four hundred thousand. That's course four's modelling and course nine's judgement about what an exception is for. It must group and summarise, which is course five's collections and course eight's collectors. It must process many files at once without you sizing a thread pool, which is course ten's virtual threads and structured concurrency. And it must be tested and packaged as a single runnable jar, which is course eleven. One constraint, and it's deliberate: plain Java 21, no frameworks. No Spring, no Guava, no Apache Commons. Everything comes from the standard library. That's not because frameworks are bad — it's because a framework would hide exactly the things this capstone exists to make visible. If dependency injection is an annotation, you don't see the object graph. If the CSV parsing is a library call, you don't see the sealed result type. Doing it by hand is the point. The arc over the next ten sections follows the program's own structure. Section two is the project layout. Three is the domain model. Four reads. Five parses. Six aggregates. Seven pulls out the one abstraction that earned itself. Eight makes it concurrent. Nine tests it. Ten packages it. And eleven looks back at what got used. Along the way, watch for the references — every section names which course each decision came from, because the argument of this capstone is that those eleven courses were one subject.",
}
