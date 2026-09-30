import type { Section } from '../types'

export const structuredConcurrency: Section = {
  id: 'structured-concurrency',
  title: 'Structured concurrency',
  scene: 'async',
  slide: `## A block scope, for threads

\`\`\`java
try (var scope = new ShutdownOnFailure()) {
    var user   = scope.fork(() -> fetchUser(id));
    var orders = scope.fork(() -> fetchOrders(id));
    scope.join();
    scope.throwIfFailed();
    return render(user.get(), orders.get());
}   // nothing outlives this block. Ever.
\`\`\`

### The idea
The one that made \`goto\` unnecessary: **control flow should follow the block structure.** A forked task **cannot outlive its scope** — \`close()\` guarantees it.

### What you get
**Error propagation** — one fails, the rest are **cancelled** · **cancellation** that reaches every child · **real stack traces** naming the forking line

Subtasks are **virtual threads**, so forking thousands is fine. \`ShutdownOnSuccess\` is the race.

*Preview in 21; the shape is settled.*`,
  narration:
    "Structured concurrency is the answer to section six's real problem, and the idea behind it is genuinely elegant. It's the same idea that made the goto statement unnecessary. In the nineteen-sixties, code could jump anywhere, and programs became impossible to reason about. Structured programming fixed it by saying control flow should follow the block structure of the code — you enter a block at the top and leave at the bottom, and everything inside is contained. Threads, until now, were still in the goto era. You fork a task and it goes off somewhere, with no relationship to the code that started it, outliving its creator, unowned. Structured concurrency applies the same discipline. Look at the code. You open a scope in a try-with-resources. You fork tasks inside it. You join, which waits for them. And when the block ends, it is guaranteed that nothing you forked is still running. Not by convention — the close method enforces it. A subtask cannot outlive the scope that created it, and that single rule gives you three things you had to build by hand before. Error propagation: with ShutdownOnFailure, if any subtask throws, the others are cancelled immediately and the exception surfaces at throwIfFailed. No orphans continuing to do work whose result is already useless. Cancellation that composes: interrupt the thread running the scope, and the cancellation reaches every child, and their children, all the way down. Try arranging that with a CompletableFuture graph. And real stack traces: because the relationship between parent and child is known to the runtime, a subtask's failure can name the line that forked it, rather than starting at some pool worker's run method. Subtasks are virtual threads, which is why this works at all — forking a thousand of them in a scope is completely reasonable, and section five is what made that true. There's a second policy, ShutdownOnSuccess, which is the race: the first subtask to succeed wins, and the rest are cancelled. That's the replica-query pattern from section four's invokeAny, with proper cleanup. One caveat: this is a preview feature in Java 21, so you need the preview flag, and the API has shifted a little between versions. The shape is settled and it is where Java concurrency is going, so it's worth knowing now even if you can't ship it yet.",
}
