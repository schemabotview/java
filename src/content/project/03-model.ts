import type { Section } from '../types'

export const model: Section = {
  id: 'model',
  title: 'The model',
  scene: 'project-model',
  slide: `## Make illegal states unrepresentable

\`\`\`java
record LogEntry(Instant at, Level level, String source,
                int millis, String message) {
    LogEntry {                   // compact — c4 §5
        Objects.requireNonNull(at);
        if (millis < 0) throw new IllegalArgEx();
    }
}
enum Level { DEBUG, INFO, WARN, ERROR }
\`\`\`
A **record** because it's data with nothing to hide — and \`equals\`/\`hashCode\` come out correct, so it's safe as a map key (**c3 §10, c5 §11**).

An **enum**, not a \`String\`: \`"WARNING"\` **can't compile**, and a \`switch\` is **exhaustive**.

### The parse result is a **sealed** pair
\`Ok(LogEntry)\` or \`Bad(line, raw, why)\`. Two outcomes, no third, **no \`null\`** — and every caller is forced to handle both.`,
  narration:
    "The model is three declarations, and each one is a decision from course four. LogEntry is a record. Why a record rather than a class? Because it's data with no invariant to hide — a log entry is a timestamp, a level, a source, a duration and a message, and every one of those is something the rest of the program legitimately needs to read. There's nothing to encapsulate. And in exchange for that one line you get correct equals, hashCode and toString, which matters immediately because these end up as map keys in the aggregation, and course three section ten and course five section eleven both told you what happens when those are wrong. It does have a compact constructor, because there is one rule: a negative duration is nonsense, and a null timestamp would blow up later somewhere confusing. Validating in the compact constructor means no LogEntry with a negative duration has ever existed anywhere in the program — that's course four section five, and course three section four's argument about constructors establishing invariants. Level is an enum, not a String. The difference is concrete. With a String, someone writes WARNING instead of WARN and it compiles fine and silently never matches. With an enum it's a compile error. Double-equals is correct and null-safe. And a switch over it is exhaustive, so if we ever add a TRACE level, every switch that doesn't handle it stops compiling and walks us to each place that needs updating. That's course four section two. Now the third declaration, which is the one that shapes the whole program. Parsing a line can fail, and the question is how to represent that. The options were: return null, which pushes a null check onto every caller and tells them nothing about why. Throw an exception, which is wrong because a malformed line in a log file is expected input, not an exceptional condition — that's course nine section one. Or return a value that says which of the two things happened. So ParseResult is a sealed interface with exactly two records: Ok carrying an entry, and Bad carrying the line number, the raw text and why it failed. Two outcomes, no third, no null anywhere. And because it's sealed, the compiler can prove a switch over it is complete, which is the next thing we use.",
}
