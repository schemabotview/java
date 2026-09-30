import type { Section } from '../types'

export const parse: Section = {
  id: 'parse',
  title: 'Parsing',
  scene: 'project-model',
  slide: `## A bad line is a **value**, not an exception

\`\`\`java
ParseResult parse(String raw, long n) {
    var m = PATTERN.matcher(raw);
    if (!m.matches())
        return new Bad(n, raw, "no match");
    try {
        return new Ok(new LogEntry(…));
    } catch (DateTimeParseException e) {
        return new Bad(n, raw, e.getMessage());
    }
}
\`\`\`

### Why it returns rather than throws
A malformed line is **expected input** (**c9 §1**). And building an exception **captures a stack trace** — throwing per bad line in a million-line file is a real cost.

### The caller must handle both
A \`switch\` with \`case Ok(LogEntry e)\` and \`case Bad b\`, and **no \`default\`** — \`ParseResult\` is sealed, so add a third outcome and **this stops compiling**.

\`PATTERN\` is \`static final\` — **compile a regex once**.`,
  narration:
    "The parser is where course four's modelling pays off. Look at the method. It returns a ParseResult, never null, and it never throws for a malformed line. If the regex doesn't match, it returns a Bad carrying the line number, the raw text and the reason. If the fields are there but one of them won't parse — a bad timestamp, a negative duration that the compact constructor rejects — it catches that narrowly and also returns a Bad, with the exception's message as the reason. Why not just throw? Three reasons, and they're all from earlier courses. First, course nine section one: exceptions are for exceptional situations. A malformed line in a log file is not exceptional; it's a normal thing that happens to every log file. Throwing would mean the caller wraps every line in a try-catch, which is uglier than a switch. Second, throwing makes it hard to report well. We want the output to say four hundred and twelve lines were rejected, here are the first ten and why — and to do that you need the failures as data you can collect, not as control flow. Third, creating an exception captures a stack trace, which costs real time. On a million-line file with one percent bad lines, that's ten thousand stack traces built and discarded. Note the catch is narrow — DateTimeParseException and IllegalArgumentException, the two things we know can come out of constructing a LogEntry. Not catch Exception, which would swallow a genuine bug in our own code and report it as a bad line. That's course nine section four. Now the payoff, at the bottom. The caller switches on the result, with a record pattern in the Ok case that destructures straight to the entry. There is no default branch and there doesn't need to be one, because ParseResult is sealed and the compiler knows the two cases are all of them — course four sections six and eight. And if someone later adds a third outcome, a Skipped for blank lines say, this switch stops compiling until it's handled. That's the whole argument of course four working on a real function. One small performance note worth stating because it's a classic: the Pattern is a static final field, compiled once. Pattern dot compile inside the method would recompile the regex for every single line, and that is one of the most common quiet performance bugs in Java.",
}
