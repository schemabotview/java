import type { Section } from '../types'

export const tryCatchFinally: Section = {
  id: 'try-catch-finally',
  title: 'try / catch / finally',
  scene: 'try-catch',
  slide: `## The syntax, and three ways to lose the evidence

\`\`\`java
try { return parse(line); }
catch (NumberFormatException | DateTimeParseEx e) {
    throw new BadRecord(line, e);   // e = CAUSE
} finally { … }        // success, throw AND return
\`\`\`
Catches are tried **top down**, so a **subclass must come first** — otherwise it's unreachable, and that's a compile error.

### 1. Swallowing
\`catch (IOException e) { }\` — **nobody will ever know**. \`log.error("failed")\` without \`e\` is the same bug with a receipt.

### 2. Catching too wide
\`catch (Exception e)\` also catches your \`NullPointerException\`s — turning **your bugs** into "handled" conditions.

### 3. \`return\` inside \`finally\`
It **discards the in-flight exception**. \`try { throw … } finally { return 1; }\` returns 1.`,
  narration:
    "The syntax first, then the three ways people destroy the information they'll need later. Try wraps the code that might fail. Catch handles a type. Finally always runs — on success, on an exception, and even when the try block returns. Since Java 7 there's multi-catch: one catch block listing several types separated by a pipe. That's for when two different failures deserve the same response, and it saves duplicating the handler. Two details about it: the variable is implicitly final, and its static type is the nearest common supertype of the listed types. Catch blocks are checked top to bottom, first match wins, which means a subclass has to come before its superclass. Put catch Exception above catch IOException and the IOException block is unreachable, and that's a compile error rather than a silent oddity. Now the three failures, and all three compile and run perfectly. One: swallowing. Catch IOException, empty braces. The failure happened, and nobody will ever know. This is how a system ends up with missing records and no explanation. And a slightly better-looking version is the same bug: log dot error of the string \"failed\", with no exception passed. You've logged that something went wrong and thrown away everything that would tell you what. Always pass the exception to the logger — it's what makes the stack trace appear. If you genuinely mean to ignore something, catch it, comment why, and make the emptiness deliberate. Two: catching too wide. Catch Exception feels safe and isn't. It catches IOException, yes — and also every NullPointerException and IllegalStateException in the block, which are your bugs. So a genuine coding error gets logged as a handled condition and the program carries on with wrong state. Catch Throwable is worse still, because it adds the Errors. Catch what you can actually handle, and let the rest propagate. Three: return inside finally. This one is genuinely startling the first time. If the try block throws and the finally block returns, the exception is discarded entirely — not logged, not chained, just gone, and the method returns normally as though nothing happened. The code on the slide throws an IOException and returns one. The rule is absolute: never return from a finally block, and never throw from one either, for the same reason. Which is a good part of why the next construct we'll look at exists.",
}
