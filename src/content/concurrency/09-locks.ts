import type { Section } from '../types'

export const locks: Section = {
  id: 'locks',
  title: 'Locks — and deadlock',
  scene: 'locks-and-atomics',
  slide: `## Four answers, and a lock is the **last** one

**1. Don't share.** A local can't race. Try this first.
**2. Share something immutable** — a record, a \`List.of\`. Courses 4 and 5 were preparation for this line.
**3. An atomic** — one variable, lock-free (§10).
**4. A lock** — when the invariant spans **more than one field**.

\`\`\`java
synchronized (this) { from -= n; to += n; }
\`\`\`
Every object has a **monitor**, and it's **reentrant**. Lock the **smallest block that keeps the invariant** — never a whole method by reflex, and never across I/O.

### \`ReentrantLock\` when you need more
\`lock(); try { … } finally { unlock(); }\` — **always**. It adds \`tryLock\` with a **timeout**, interruptible waiting, fairness, several \`Condition\`s.

### Deadlock
A holds x wanting y; B holds y wanting x. **The cure is a rule: acquire locks in one global order.**`,
  narration:
    "Four answers to the race, and they're in order of preference — reach for the last one last. One: don't share. A local variable cannot race, because no other thread can see it. Confine mutable state to a single thread and the problem is gone. This is the best answer and it's underused, because people reach for a lock before asking whether the sharing was necessary. Two: share something immutable. If the object cannot change, there is nothing to interleave — every thread sees the same values forever, with no synchronisation at all. Records, List dot of, String, enums. That's why courses four and five spent time on immutability: this is what it was for. Three: an atomic, for a single variable, which is the next section. Four: a lock. And you need a lock specifically when the invariant spans more than one field. Look at the transfer: subtract from one account, add to the other. Either both happen or neither does, and no other thread may observe the moment in between where the money exists nowhere. No single atomic can express that, because two separate variables have to move together. Synchronized is the built-in form. Every Java object has a monitor, and a synchronized block acquires it. It's reentrant, meaning a thread already holding the lock can enter another synchronized block on the same object without deadlocking itself — which matters more than it sounds, because a synchronized method calling another synchronized method on the same object is common. The practical advice: lock the smallest block that preserves the invariant. Marking a whole method synchronized by reflex holds the lock across everything the method does, including slow things, and that's how contention is created. Never hold a lock across I/O. ReentrantLock is the explicit version, and you use it when you need something synchronized can't do. It can time out: tryLock with a duration, so you can give up instead of waiting forever. It can be interrupted while waiting. It can be fair, granting the lock in arrival order. And it supports several Condition objects on one lock, where synchronized gives you one wait set. The cost is that you must unlock in a finally block, every time, without exception — synchronized does that for you automatically. There's also ReadWriteLock, worth knowing when reads massively outnumber writes, since it lets readers run concurrently. And finally deadlock. Thread A holds lock x and wants y. Thread B holds y and wants x. Neither will ever let go, and neither will ever wake. The application doesn't crash — it just stops, which is harder to diagnose. And the cure is not a clever mechanism, it's a discipline: define one global order for acquiring locks and follow it everywhere. If everyone always takes x before y, that cycle cannot form.",
}
