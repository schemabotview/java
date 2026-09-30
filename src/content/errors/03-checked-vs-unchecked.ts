import type { Section } from '../types'

export const checkedVsUnchecked: Section = {
  id: 'checked-vs-unchecked',
  title: 'Checked vs unchecked',
  scene: 'throwable-hierarchy',
  slide: `## The compiler forces one and ignores the other

**Checked** ⇒ every caller must \`catch\` it or **declare \`throws\`** — so it's part of your **signature**, and your **API**.
**Unchecked** ⇒ the compiler says nothing.

### Java is almost alone in having them
C#, Kotlin, Scala and Python all looked and **didn't**. The case against is real: \`throws\` **leaks upward** through every caller · it **doesn't survive lambdas** (course 7 §10) · and the pressure to just make it compile produces \`catch (Exception e) { }\` — **worse than no checking at all**.

### The line that works
> **Checked** when the caller can plausibly **do** something — retry, fall back.
> **Unchecked** when they can't, or when it's a **bug**.

For your own exceptions, **unchecked is the sane default**. Reach for checked deliberately, not by habit.`,
  narration:
    "Here's what checked actually means, mechanically. If a method can throw a checked exception, every caller has to do one of two things: catch it, or declare throws in its own signature and pass the problem upward. The compiler enforces that, and there's no way around it. Unchecked exceptions get none of this — the compiler says nothing, and if you want callers to know, you document it. Now, the debate, because you should know it's a debate. Java is almost alone in having checked exceptions. C-sharp considered them and deliberately left them out. Kotlin, which otherwise stays close to Java, doesn't enforce them. Scala doesn't. Python doesn't. Twenty-five years on, essentially no new language has adopted the idea, and that's evidence worth weighing. The arguments against are genuine. First, throws leaks upward through your whole architecture. If a method five layers down adds a checked exception, every method between it and a handler has to change its signature, and now a low-level implementation detail is visible in high-level APIs. Second, checked exceptions don't survive lambdas — Function dot apply declares nothing, so as course seven section ten said, a checked exception simply cannot escape a standard functional interface, and the workarounds are all ugly. Third, and most damning in practice: the pressure to make it compile produces catch Exception, empty braces. Someone in a hurry swallows it, and now you have code that is worse than if there had been no checking at all, because the failure is silently discarded and the compiler believes it was handled. The argument for is also real, though. A checked exception is documentation the compiler enforces. When you call a method that reads a file, you cannot forget that files fail. That genuinely prevents a class of oversight. So here's the line that works in practice. Make it checked when the caller can plausibly do something about it — retry, fall back to a cached value, prompt the user again. Make it unchecked when they can't, or when it indicates a bug. And for your own exception types, unchecked is the sane default. Extend RuntimeException unless you have a specific reason not to. Reach for a checked exception deliberately, in the small number of cases where recovery is genuinely expected — not out of habit.",
}
