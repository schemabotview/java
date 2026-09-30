import type { Section } from '../types'

export const callableFuture: Section = {
  id: 'callable-future',
  title: 'Callable & Future',
  scene: 'executors',
  slide: `## A handle to a result that doesn't exist yet

\`Callable<V>\` is \`Runnable\` with both limits removed: it **returns a \`V\`** and **can \`throw\`**.

\`\`\`java
Future<Integer> f = pool.submit(() -> count(p));
int n = f.get();       // BLOCKS until done
\`\`\`
\`isDone()\` · \`cancel(mayInterrupt)\` · \`get(2, SECONDS)\` — always the timeout version for anything external.

### Exceptions move
A task's exception is **captured** and rethrown from \`get()\` as an **\`ExecutionException\`**, with the original as its \`cause\`. **Unwrap it.**

> A \`Future\` you never call \`get()\` on **swallows its exception entirely** — that's how tasks silently stop running.

### \`get()\` is the limitation
It blocks, so ten tasks fetched in order cost the **slowest**. \`invokeAll\` waits for all; \`invokeAny\` takes the first success. **§6 is the non-blocking answer.**`,
  narration:
    "Runnable had two limitations: no return value, and no checked exceptions. Callable of V removes both — its call method returns a V and declares throws Exception. So a task that computes something, or that does I/O, is a Callable. Submit a Callable to an executor and you get back a Future of V. And the key idea is in the name: a Future is a handle to a result that doesn't exist yet. Not the value — a claim ticket for it. You can ask isDone without blocking. You can cancel it, with a flag saying whether to interrupt it if it's already running. And you can call get, which blocks until the result is ready. There's also get with a timeout, which throws TimeoutException, and in any code that talks to the outside world you should essentially always use the timeout version. Now, something important about exceptions, because it changes where you find your failures. If a task throws, that exception does not propagate up its own thread's stack — there's nothing above it to catch it. Instead the executor captures it and stores it in the Future. It is then rethrown when you call get, wrapped in an ExecutionException, with your original exception as the cause. So when you catch an ExecutionException, always unwrap it with getCause — otherwise your logs are full of a wrapper that tells you nothing, which is course nine section six again. And the consequence people get bitten by: if you submit a task and never call get on the Future, and that task throws, the exception is stored in an object nobody ever looks at. Nothing is logged. Nothing is thrown. The task simply stopped doing its job, silently, forever. If you're submitting fire-and-forget work, either check the Futures or wrap the task body in a try-catch that logs. Two batch methods worth knowing. InvokeAll submits a collection of tasks and blocks until all have completed, returning all the Futures. InvokeAny returns the result of the first one to succeed and cancels the rest — which is exactly what you want when you're querying three replicas and any answer will do. Finally, the limitation that motivates the next few sections. Get blocks. So if you submit ten tasks and then get them in order, you've spent a thread waiting, and the total is bounded by the slowest. And there's no way to say when this finishes, do that, without a thread sitting there. CompletableFuture, in section six, is the non-blocking answer.",
}
