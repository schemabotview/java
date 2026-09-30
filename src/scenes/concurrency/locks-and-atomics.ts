import type { Scene } from '@graphlearning/flow'

// §9/§10 — the four answers to §8's race, in ascending order of how much you have to think. The
// ordering is the advice: don't share, then share something immutable, then an atomic, then a lock.
// A lock is last because it is the only one that can deadlock, and the lock-ordering rule is the
// only reliable cure.
export const locksAndAtomics: Scene = {
  id: 'locks-and-atomics',
  title: 'Four answers, easiest first',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Sharing.java',
      label: [
        '// 1. DO NOT SHARE. A local, or a value confined to one thread,',
        '//    cannot race. Always try this first.',
        '',
        '// 2. SHARE SOMETHING IMMUTABLE. A record, a List.of, a String:',
        '//    nothing to interleave. Courses 4 and 5 were preparation.',
        '',
        '// 3. ATOMIC — lock-free, one variable, backed by a CAS',
        'AtomicInteger count = new AtomicInteger();',
        'count.incrementAndGet();          // the three steps, indivisible',
        'count.updateAndGet(n -> n * 2);   // compare-and-set, retried',
        'LongAdder busy = new LongAdder(); // better under high contention',
        '',
        '// 4. LOCK — when the invariant spans MORE THAN ONE field',
        'synchronized (this) { from -= n; to += n; }   // both, or neither',
        '// Every object has a monitor. It is REENTRANT: the holder may',
        '// re-enter. Lock the SMALLEST block that keeps the invariant.',
        '',
        'ReentrantLock lock = new ReentrantLock();',
        'lock.lock();  try { … } finally { lock.unlock(); }   // ALWAYS',
        'lock.tryLock(1, SECONDS)   // a timeout — synchronized has none',
        '',
        '// DEADLOCK: A holds x wanting y, B holds y wanting x. The cure',
        '// is a rule, not a trick — acquire locks in ONE global order.',
      ].join('\n'),
    },
  ],
  edges: [],
}
