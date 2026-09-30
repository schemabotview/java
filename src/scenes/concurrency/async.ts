import type { Scene } from '@graphlearning/flow'

// §6/§7 — CompletableFuture and structured concurrency, the two ways to run several things at once
// and wait for them properly. They are on one card because §7 is the answer to §6's real problem:
// a CompletableFuture graph has no lifetime, so an error in one branch leaves the others running.
export const async: Scene = {
  id: 'async',
  title: 'Composable async, and giving it a lifetime',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Async.java',
      label: [
        '// Future.get() BLOCKS. CompletableFuture composes instead.',
        'CompletableFuture.supplyAsync(() -> fetchUser(id))',
        '    .thenApply(User::name)          // map — course 7 again',
        '    .thenCompose(n -> fetchOrders(n))   // flatMap',
        '    .thenCombine(other, (a, b) -> merge(a, b))',
        '    .exceptionally(e -> FALLBACK)   // catch',
        '    .orTimeout(2, SECONDS)',
        '    .join();',
        '// thenApply vs thenApplyAsync: the first may run on whatever',
        '// thread completed the stage. Never block inside a stage.',
        '',
        '// The problem: this graph has no LIFETIME. If one branch',
        '// fails, the others keep running, unowned and unwatched.',
        '',
        '// STRUCTURED CONCURRENCY (21, preview) — a scope IS the lifetime',
        'try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {',
        '    var user   = scope.fork(() -> fetchUser(id));',
        '    var orders = scope.fork(() -> fetchOrders(id));',
        '    scope.join();                 // wait for both',
        '    scope.throwIfFailed();        // ...or cancel the other',
        '    return render(user.get(), orders.get());',
        '}   // nothing outlives this block. Ever.',
        '',
        '// Subtasks are virtual threads, so forking thousands is fine.',
      ].join('\n'),
    },
  ],
  edges: [],
}
