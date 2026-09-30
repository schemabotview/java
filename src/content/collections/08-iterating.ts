import type { Section } from '../types'

export const iterating: Section = {
  id: 'iterating',
  title: 'Iterating — and why it throws',
  scene: 'iteration',
  slide: `## for-each is an \`Iterator\` in disguise

\`\`\`java
for (Order o : orders) { … }
// compiles to:
var it = orders.iterator();
while (it.hasNext()) { Order o = it.next(); }
\`\`\`
That's why it works on **any \`Iterable\`** — and why there's no index inside one.

### \`ConcurrentModificationException\`
Every **structural** change bumps the collection's \`modCount\`. The iterator saved that number at creation and **compares on every \`next()\`**. A mismatch throws.

Despite the name it usually has **nothing to do with threads**. It's **fail-fast**: a **bug detector**, never a guarantee.

### Removing while iterating
\`\`\`java
orders.removeIf(o -> o.qty() == 0);   // the answer
while (it.hasNext())
    if (it.next().qty() == 0) it.remove();
\`\`\`
\`Iterator.remove()\` is the **only** legal in-place removal — it updates \`modCount\` **and** the iterator's copy.`,
  narration:
    "The enhanced for loop is syntactic sugar, and knowing what it desugars to explains a lot. For each Order o in orders compiles to: create an iterator, while it has a next, call next and assign it to o. That's all. Which tells you two things immediately. First, why for-each works on anything at all — it only needs the one method from Iterable, so your own classes can support it by implementing iterator. Second, why you can't get at the index inside a for-each: there isn't one. There's just a cursor. Now the exception everybody hits. ConcurrentModificationException. Here's the mechanism, and it's simple once you see it. Every collection keeps an internal counter called modCount, and every structural modification — an add, a remove, a clear, anything that changes the size — increments it. When you create an iterator, it copies the current modCount. And on every call to next, it compares its saved copy against the collection's current value. If they differ, something changed the collection behind its back, and it throws. So the loop on the slide — iterating orders and calling orders dot remove inside it — bumps modCount, and the very next call to next notices and throws. Two things worth being precise about. Despite the name, this usually has nothing whatsoever to do with concurrency or threads. The overwhelmingly common cause is a single thread modifying a collection it's iterating. And it is explicitly fail-fast, not fail-safe. The documentation is clear that you must not rely on it: it's a best-effort bug detector, and in a genuinely multithreaded situation it might not fire at all. Treat it as a helpful crash, never as a safety net. So how do you remove while iterating? The modern answer is removeIf, which takes a predicate and does the whole thing in one call, correctly and usually faster. Use that. When you need more control — say you're also collecting what you removed — get the iterator explicitly and call it dot remove. That is the only legal way to remove during iteration, and it works because Iterator dot remove updates both the collection's modCount and the iterator's saved copy, so they stay in step. And one more, from the last section: when you need both keys and values from a map, iterate entrySet rather than keySet plus a get for each key, which does two lookups per entry instead of one.",
}
