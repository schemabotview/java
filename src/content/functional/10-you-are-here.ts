import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here — and when not to',
  scene: 'functions-as-values',
  slide: `## Functional style has three real costs

**1. Checked exceptions don't fit.** \`Function.apply\` declares none, so a lambda calling anything that throws \`IOException\` needs a try-catch **inside the lambda** — or your own interface (§6). Java's genuinely unsolved rough edge.

**2. Stack traces get worse** — \`lambda$process$3\` and deep library frames between your code and the failure.

**3. Debuggability** — no easy breakpoint mid-chain.

### So
Reach for it when the code says **what**, not **how**. Keep a loop when the body is long, throws, or mutates several things. **A three-line lambda wants to be a method** — then it has a name.

### The course
**§1** a lambda is an instance of a one-method interface · **§2–3** target typing, four references · **§4–6** four shapes, two questions · **§7** captured by value · **§8–9** composition

### Next
Course 8 — **streams**, written in this vocabulary.`,
  narration:
    "Let's close honestly, because functional style in Java has real costs and they're not usually stated. The first is the big one: checked exceptions don't fit. Function dot apply declares no exceptions. Neither does Predicate dot test or Consumer dot accept. So the moment your lambda body calls something that throws IOException — reading a file, making a request — you cannot simply let it propagate. You either wrap it in a try-catch inside the lambda, which is ugly and buries the error handling in the middle of a pipeline, or you declare your own functional interface whose method throws, which works but means you can't use the standard library's methods with it. There's no clean answer, every codebase invents its own wrapper, and this is genuinely Java's unsolved rough edge in this area. Second, stack traces get worse. When something throws inside a stream pipeline, the trace is full of frames called lambda-dollar-process-dollar-three and a dozen lines of internal stream machinery between your code and the actual failure. It's readable with practice, but it is strictly harder than a trace through a plain loop. Third, debuggability. Stepping through a long chained expression in a debugger is more awkward than stepping through statements, because there's nowhere obvious to put a breakpoint in the middle. So, when to reach for it. Use functional style when the code is saying what rather than how — filtering, mapping, composing, deferring. Those read better as a pipeline than as a loop with an accumulator. Keep a plain loop when the body is long, when it throws checked exceptions, when it mutates several things at once, or when you'll want to step through it. And one rule that resolves most cases: a lambda longer than about three lines wants to be a method. Extract it, give it a name, and pass a method reference. Now you have the readability and the debuggability and the name. So, the course. Section one: a lambda is an instance of an interface with one abstract method, and that single fact makes everything else legible. Two and three: the syntax, target typing, and the four method-reference forms. Four to six: the four shapes, named by two questions — does it take a value, does it return one — plus writing your own. Seven: captured by value, which is why the compiler insists on effectively final. Eight and nine: composition, and taking or returning behaviour. Next is course eight, streams — which is what all of this was built for, and which is written entirely in the vocabulary you now have.",
}
