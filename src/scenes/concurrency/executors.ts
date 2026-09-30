import type { Scene } from '@graphlearning/flow'

// §2/§3/§4 — raw threads, executors, Future. One card, three passes, because the progression is the
// point: you almost never write `new Thread` any more, and the reason is that an executor separates
// WHAT to run from WHERE it runs. The shutdown block is included because a non-daemon pool that is
// never shut down keeps the JVM alive, which is a real and confusing production bug.
export const executors: Scene = {
  id: 'executors',
  title: 'Task, pool, and the handle to the result',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Executors.java',
      label: [
        '// RAW — you almost never write this any more',
        'Thread t = new Thread(() -> work());   // Runnable: no result,',
        't.start();                             //   no checked throw',
        't.join();          // start() != run(). run() is just a call.',
        '',
        '// EXECUTOR — separates WHAT to run from WHERE it runs',
        'try (var pool = Executors.newFixedThreadPool(8)) {  // 19+: it',
        '    Future<Integer> f = pool.submit(() -> count(p));// closes',
        '    int n = f.get();     // BLOCKS until done, rethrows as',
        '}                        // ExecutionException(cause)',
        '',
        '// Callable<V> is Runnable with a result AND `throws Exception`',
        '',
        'pool.invokeAll(tasks);   // all of them, blocks for all',
        'pool.invokeAny(tasks);   // the first to succeed, cancels rest',
        '',
        '// Future is a HANDLE, not a value:',
        'f.isDone()   f.cancel(mayInterrupt)   f.get(2, SECONDS)',
        '',
        '// If you do not close it: shutdown() drains, shutdownNow()',
        '// interrupts. A non-daemon pool never shut down KEEPS THE JVM',
        '// ALIVE after main returns — a classic "it will not exit" bug.',
      ].join('\n'),
    },
  ],
  edges: [],
}
