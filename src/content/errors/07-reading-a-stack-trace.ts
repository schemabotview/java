import type { Section } from '../types'

export const readingAStackTrace: Section = {
  id: 'reading-a-stack-trace',
  title: 'Reading a stack trace',
  scene: 'stack-trace',
  slide: `## Four rules, and it stops being a wall of text

**1. Go to the LAST \`Caused by\`.** That's what actually failed. The first line is the **outermost wrapper** — usually the least informative thing in the trace.

**2. Find the first frame in *your* package.** Everything above it is library code doing what you asked.

**3. \`... N more\`** = N frames identical to the block above. Deduplication, not truncation.

**4. Top frame = where it was thrown. Bottom = where the thread started.**

### Suppressed
An exception thrown by \`close()\` during try-with-resources (§8) — **attached**, not allowed to replace the real one.

### Missing frames
The JIT elides traces for a hot repeated exception. \`-XX:-OmitStackTraceInFastThrow\` while debugging.

**Don't \`printStackTrace()\`** — \`stderr\`, unbuffered, no context. Log it.`,
  narration:
    "Reading a stack trace is a skill, it's the one you'll use most often in a real job, and nobody teaches it. Four rules and it stops being a wall of text. Rule one, and it's the big one: go to the last Caused by. Java prints the chain outermost first, so the very first line is the wrapper your own code added — import failed, or operation failed — which is almost always the least informative sentence available. Scroll down past every Caused by until you reach the last one. That's the original failure, the thing that actually went wrong. On the slide, that's the NumberFormatException for input string x. Everything above it is packaging. Rule two: within that block, find the first frame that's in your own package. Look at the example — the top frame is java dot base, Integer dot parseInt. That's not a bug in the JDK; parseInt is correctly refusing to parse the letter x. The next line down is com dot graphl dot Parser dot parse at line 85, and that is your line. That's where you passed it something you shouldn't have. As a general habit: the topmost frame is where it was thrown, but the topmost frame in your own code is where it's your fault. Rule three: dot dot dot N more. That means N frames identical to the corresponding block above, and it's deduplication rather than truncation. Nothing is being hidden from you; those frames are printed higher up. Rule four: within a single block, read top to bottom as a chronology in reverse. The top frame is where it was thrown, each line below is the caller of the one above, and the bottom is where the thread started — usually main. Two extras worth recognising. A section labelled Suppressed is an exception thrown by a close method during try-with-resources, which is the next section. It's attached to the real exception rather than being allowed to replace it, which is precisely the bug that construct fixed. And occasionally you'll get an exception with no stack trace at all — just the type and a message. That's the JIT: when the same exception is thrown from the same place very often, the compiler optimises away the trace construction. It's a performance feature and it's maddening while you're debugging, so pass minus X X colon minus OmitStackTraceInFastThrow and it comes back. Last thing. Don't call e dot printStackTrace. It writes to standard error, unbuffered, with no timestamp, no thread name, no context, and in a server it's frequently nowhere anyone will look. Pass the exception to your logger instead.",
}
