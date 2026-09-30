import type { Section } from '../types'

export const jit: Section = {
  id: 'jit',
  title: 'The JIT — tiered compilation',
  scene: 'jit-tiers',
  slide: `## A method gets faster the more it runs

**Interpreter** → **C1** (fast to compile, keeps profiling) → **C2** (slow to compile, near-optimal). The JVM **counts invocations and loop iterations**.

### Why this beats ahead-of-time
C2 optimises on **facts only knowable at run time** — which branch is taken, which concrete type arrives. An AOT compiler must assume the general case; **C2 knows**.

### Inlining is the enabling one
Copy a small method into its caller, and then constants propagate, branches fold, and **escape analysis** (§3) can see the whole object lifetime. **This is why small methods are not slower in Java.**

### Deoptimisation makes it safe
C2's best work is **speculative** — "only \`Savings\` has ever arrived here". A \`Checking\` appears ⇒ **throw the code away**, fall back, recompile.

**Warm-up is real.** A benchmark's first second measures the interpreter. Use **JMH**.`,
  narration:
    "Course one said the JIT compiles hot methods to native code. Here's the actual pipeline, and it's cleverer than that summary. Every method starts in the interpreter, which begins executing instantly with no compilation delay — that's why Java starts reasonably fast despite being compiled. While interpreting, the JVM counts: how many times has this method been invoked, how many times has this loop gone round. Cross a threshold and it's queued for C1, the quick compiler. C1 produces native code fast, optimises lightly, and — importantly — keeps collecting profile data. Cross a higher threshold and it goes to C2, which is slow to compile and produces near-optimal code using everything C1 learned. Now, why is this better than compiling everything ahead of time, like C does? Because C2 optimises using facts that are only knowable at run time. Which branch is actually taken in practice. Which concrete type actually shows up at this call site. How big this array typically is. An ahead-of-time compiler has to generate code that's correct for every possible case. C2 generates code that's optimal for the case that's actually happening. That's a genuine advantage, and it's why a long-running Java service can match or beat C on some workloads. The enabling optimisation is inlining — copying a small method's body directly into its caller. On its own that just saves a call. But it's the gateway to everything else: once the bodies are merged into one, constants propagate across what used to be a boundary, conditions fold away because the compiler can see the argument is always true, and escape analysis can see an object's entire lifetime in one place. This is why the usual advice about small methods being slower is simply wrong in Java. Write the small method; the JIT will merge it. Then deoptimisation, which is the part that makes the whole speculative approach safe. C2's most valuable optimisations are bets. Only Savings has ever arrived at this call site, so compile a direct call and skip the virtual dispatch entirely. That's enormous — and it's only valid while the assumption holds. So C2 inserts a guard, and if a Checking ever turns up, the JVM throws away the compiled code, falls back to the interpreter mid-method, and recompiles without that assumption. That's deoptimisation, and it's why the JVM can be so aggressive: it's always allowed to change its mind. One practical consequence. Warm-up is real. A benchmark's first second is measuring the interpreter and the compilation queue, not your code. If you're measuring Java performance, use JMH, which handles warm-up, dead-code elimination and the other ways naive benchmarks lie to you.",
}
