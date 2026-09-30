import type { Section } from '../types'

export const profiling: Section = {
  id: 'profiling',
  title: 'Profiling — measure, don\'t guess',
  scene: 'java-pipeline',
  slide: `## The tools are in the JDK already

\`\`\`bash
jcmd <pid> VM.flags        # what is it running with?
jcmd <pid> Thread.print    # deadlocks are reported
jcmd <pid> GC.heap_dump filename=h.hprof
jcmd <pid> JFR.start duration=60s filename=r.jfr
\`\`\`
**\`jcmd\` is the one command worth memorising.**

### Java Flight Recorder
Always-on, **~1% overhead** — designed to run in **production**, which is the only place your real workload exists. Mission Control gives you hot methods, **allocation by site**, GC, lock contention and I/O on one timeline.

### Why guessing fails
An O(n²) \`contains\` in a loop · a query inside a loop · a log line building a string that's never printed. Invisible by inspection, obvious in a profile.

> **Measure, change one thing, measure again.** And warm up first (§2).`,
  narration:
    "The rule for performance work is short: measure, don't guess. And the reason it needs stating is that intuition about performance is reliably wrong, including for experienced people. The bottleneck is almost never where it feels like it should be. The good news is that the tools ship with the JDK, so there is nothing to install. Jps lists the Java processes on the machine with their process ids. Jcmd is the one command worth memorising — it talks to a running JVM and does a dozen useful things. Jcmd VM dot flags tells you what the JVM is actually running with, which is frequently not what you think, especially with ergonomic defaults. Jcmd Thread dot print dumps every thread's stack, and it detects and reports deadlocks for you, which makes it the first thing to run when an application has stopped responding. Jcmd GC dot heap underscore info for a quick look, and GC dot heap underscore dump when you need to investigate a leak properly. Then Java Flight Recorder, which is the one to really know. JFR is an always-on, event-based recorder built into the JVM with roughly one percent overhead. That number is the point: it's designed to be left running in production, and production is the only place your real workload exists. Profiling a synthetic benchmark on your laptop tells you about your laptop. Start a recording with jcmd, collect the file, and open it in JDK Mission Control. What you get is hot methods, allocation broken down by the line that allocated, GC activity, lock contention showing which monitors threads are waiting on, file and socket I/O, and exception rates — all on one timeline so you can correlate a latency spike with what else was happening. Why does guessing fail? Because the expensive things don't look expensive. A contains inside a loop is quadratic — course five section twelve — and it looks like two ordinary lines. A database query inside a loop is one line that becomes a thousand round trips. A log statement that builds a string with concatenation before checking whether debug logging is even enabled. Every one of those is invisible reading the code and unmistakable in a profile. So: measure, change exactly one thing, measure again. Two cautions. The observer effect is real — instrumenting profilers that rewrite bytecode can change what you're measuring, particularly by preventing inlining; sampling profilers like JFR perturb far less. And warm up first, for the reason section two gave: measuring the first second measures the interpreter.",
}
