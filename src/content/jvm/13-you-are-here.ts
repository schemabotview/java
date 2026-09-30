import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here — Mockito, and the whole machine',
  scene: 'testing',
  slide: `## Mockito — and where to stop

\`\`\`java
var repo = mock(OrderRepository.class);
when(repo.findById("A-1")).thenReturn(Optional.of(o));
verify(repo).save(any());
\`\`\`
It generates a subclass at run time — **§10 again**.

### The judgement
**Mock what you don't own and can't run**: a gateway, a clock, something slow. **Use the real thing everywhere else.**

> **Mock everything and the test passes while the system is broken** — you've asserted your code calls the methods you expected, which is a restatement, not a check.

### The course
**§1** what's outside \`-Xmx\` · **§2–3** speculative, deoptimising, and the allocation that never happens · **§4–5** cost ∝ survivors · **§6** measure · **§7–8** parent-first, lazy init, a fifth visibility · **§9–10** three lines that are every framework · **§11–13** nearest wins

### Next
Course 12 — the **capstone**.`,
  narration:
    "Mockito replaces a collaborator with a stand-in you control. Mock of the class gives you an object where every method returns a default — null, zero, false. When of a call, then return, tells it what to answer. And verify checks that something was called. Mechanically it generates a subclass at run time and overrides the methods, which is section ten's reflection again, and it's why you can't mock a final class or a static method without an extension. Now the judgement, because this is where test suites go wrong. Mock things you don't own and can't run: a payment gateway, a third-party API, a clock — you really do want to control what time it is. Mock things that are slow or non-deterministic. Use the real thing for everything else. A real ArrayList, a real value object, a real in-memory implementation of your own repository interface. And here's why that matters. If you mock everything your class touches, your test asserts that your code called exactly the methods you thought it would, in the order you thought. That is a restatement of the implementation, not a check of the behaviour. Refactor the class without changing what it does, and the test breaks. Break what it does while calling the same methods, and the test passes. That's the worst of both: a test that resists change and doesn't catch bugs. A useful instinct: if a test needs five mocks, the class under test probably has five responsibilities. And prefer verifying outcomes over verifying calls, wherever you can. So, the whole course. Section one: the memory regions in detail, and the sentence worth keeping — thread stacks, metaspace, the code cache and direct buffers are all outside minus X m x, which is why containers get OOM-killed with a healthy heap. Two and three: tiered compilation, speculative optimisation and deoptimisation, and escape analysis, which is why an allocation can cost nothing at all. Four and five: collection cost is proportional to what survives, and read the GC log before you touch a flag. Six: measure, don't guess, with tools that already ship. Seven and eight: parent-first delegation, lazy initialisation, class identity, and modules as a fifth visibility level. Nine and ten: three lines of reflection that are every framework you've ever used. Eleven to thirteen: nearest wins is not newest wins, parameterised tests, and where to stop mocking. Which is the whole machine. You have the language, the library, the runtime and the tools. Next is course twelve, the capstone — one real program that forces all eleven of these together.",
}
