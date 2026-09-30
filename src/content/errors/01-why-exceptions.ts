import type { Section } from '../types'

export const whyExceptions: Section = {
  id: 'why-exceptions',
  title: 'Why exceptions',
  scene: 'throwable-hierarchy',
  slide: `## A return value can be ignored. An exception can't.

The alternative is an error **code**:
\`\`\`c
int rc = parse(line);   // and nobody checks rc
\`\`\`
Three problems: it's **ignorable**, it **collides** with real return values (what does \`-1\` mean for a temperature?), and it has to be **checked and re-propagated at every level**.

### An exception separates two paths
The **happy path** reads as a straight line. The failure path leaves **sideways**, carrying a **type**, a **message** and a **stack trace** — and it **cannot be ignored** by accident.

### It propagates on its own
It travels up the stack until something catches it, **unwinding frames** as it goes. So the five intermediate methods between the failure and the handler need **no error-handling code at all** — a genuinely large reduction in what you write.

### The cost
Building one **captures the stack trace**, which is not free — so exceptions are for the **exceptional**. A loop that throws per element is a performance bug.`,
  narration:
    "Before the syntax, the argument — because Java's approach is a deliberate choice with alternatives, and knowing what it replaced tells you when to use it. The alternative is error codes. A function returns an int: zero for success, something else for a problem. C does this, Go does a version of it, and every operating system API does. Three things go wrong. First, a return value can be ignored, and it routinely is — nobody checks the return of every call, so failures vanish silently. Second, the error code collides with real return values. If parse returns an int, what does minus one mean? It's a plausible temperature, a plausible offset. You end up reserving sentinel values and documenting them, and callers get it wrong. Third, and most tedious, every single level has to check and re-propagate. If the failure happens five frames down, all five intermediate functions need code to notice and pass it on, and every one of them is a chance to forget. An exception fixes all three by separating the two paths. Your method body reads as the happy path — a straight line of what happens when things work. The failure exits sideways, and it carries real information: a type saying what kind of problem, a message saying which specific one, and a stack trace saying exactly where. And crucially, it cannot be ignored by accident. If nobody handles it, the program stops loudly rather than continuing with wrong data, which is almost always the better failure. Then propagation, which is the big practical saving. An exception travels up the call stack on its own, unwinding each frame as it goes, until something catches it or the thread dies. Which means those five intermediate methods need no error-handling code whatsoever. They don't mention the exception, they don't pass anything along. That is a large reduction in the amount of code you write, and it's why the happy path stays readable. One cost, and it matters occasionally. Creating an exception captures the stack trace, which means walking the stack and allocating — it's genuinely not free. So exceptions are for exceptional situations. A loop that throws and catches once per element is a real performance problem, and if a condition is normal and expected — an empty result, a missing key — return an Optional or a boolean instead. Exceptions are for the cases where the method genuinely cannot do its job.",
}
