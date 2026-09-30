import type { Section } from '../types'

export const completableFuture: Section = {
  id: 'completable-future',
  title: 'CompletableFuture',
  scene: 'async',
  slide: `## Compose instead of blocking

\`\`\`java
supplyAsync(() -> fetchUser(id))
    .thenApply(User::name)            // map
    .thenCompose(n -> fetchOrders(n)) // flatMap
    .exceptionally(e -> FALLBACK)     // catch
    .orTimeout(2, SECONDS);
\`\`\`
If that looks like course 8 §11, exactly so — \`map\`, \`flatMap\` and recovery over a **container of one, later**.

### Two things that catch people
- **\`thenApply\` vs \`thenApplyAsync\`** — the non-async form may run on **whatever thread completed the previous stage**. Never block in a stage.
- The default executor is the **common ForkJoinPool** — course 8 §10's trap again. **Pass your own.**

### The real problem
The graph has **no lifetime**. One branch fails and the others **keep running**, unowned. **§7 is the fix** — and §5 removed most of the reason to be here.`,
  narration:
    "Future dot get blocks, and blocking a thread to wait for a result is exactly what we're trying to avoid. CompletableFuture lets you describe what should happen when a result arrives, without anyone waiting. And if the method names look familiar, they should. ThenApply is map — take the result and transform it. ThenCompose is flatMap — take the result and produce another CompletableFuture, without ending up with a future of a future. ThenCombine takes two futures and merges them when both complete. Exceptionally is a catch: if anything upstream failed, produce a fallback instead. That's course eight section eleven's Optional, and course eight's Stream, applied to a container holding one value that will exist later. Same three operations, third container. Once you see that, the API stops being forty confusing method names. Two things catch people out, and both cost real production incidents. First: thenApply versus thenApplyAsync. The plain version may execute on whatever thread happened to complete the previous stage — which could be an I/O callback thread, or a thread from someone else's pool. So if you block inside a non-async stage, you're blocking a thread you don't own and didn't think about. The rule is never block inside a stage; if a stage does blocking work, use the Async variant and pass your own executor. Second: if you don't pass an executor, the default is the common ForkJoinPool. That is exactly course eight section ten's trap — one shared pool for the whole JVM, so one blocking stage starves every parallel stream and every other CompletableFuture in the process. Always pass your own executor for anything that might block. And then the real problem, which is structural rather than a gotcha. A CompletableFuture graph has no lifetime. You fire off three stages, and if one of them fails, the other two carry on running. Nobody owns them, nobody is waiting on them, and nothing will cancel them. If the method that started them has already returned, those tasks are orphans doing work whose result will be discarded. That's not a bug in your code, it's a property of the model — and it's the thing structured concurrency was invented to fix, which is the next section. One honest note to end on. Since section five, for the common case of several blocking calls you need the results of, virtual threads plus structured concurrency give you the same concurrency with ordinary readable code. CompletableFuture is still the right tool for genuine event-driven composition. It is no longer the default answer to \"I want to do two things at once\".",
}
