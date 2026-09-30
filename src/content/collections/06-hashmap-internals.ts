import type { Section } from '../types'

export const hashmapInternals: Section = {
  id: 'hashmap-internals',
  title: 'Inside HashMap',
  scene: 'hashmap-buckets',
  slide: `## Every step is constant except the last

1. **\`key.hashCode()\`** — yours. Any 32-bit value.
2. **Spread**: \`h ^ (h >>> 16)\` — mixes the **high** bits down, because step 3 throws them away
3. **Index**: \`h & (n - 1)\`. Capacity is a **power of two**, so that's \`h % n\` as one AND
4. **Walk the bucket**, calling \`equals\`

Steps 1–3 are constant. **Step 4 is the only one that isn't** — and it's where a bad \`hashCode\` lands you.

### Collisions
A bucket is a short list. Past **8 entries** it becomes a **red-black tree**, so the worst case is **O(log n)**. That's a DoS guard, not a licence.

### Resizing
At **size > 0.75 × capacity** the table **doubles** and everything **rehashes** — a full O(n) pause.

### The asterisk on "O(1)"
Constant **only if** hashes spread. A constant \`hashCode\` is legal — and turns every lookup into a scan.`,
  narration:
    "People say HashMap is O(1) and leave it there. Let's actually walk the lookup, because once you've seen the four steps you know exactly which one can go wrong. Step one: the map calls hashCode on your key. That's your method, and it can return any thirty-two-bit integer at all. Step two, and this one surprises people: the map does not use your hash code directly. It computes h exclusive-or h unsigned-right-shift sixteen. That's called the spread function, and it mixes the high sixteen bits down into the low sixteen. Why? Because of step three. Step three turns the hash into a bucket index with h bitwise-and n minus one, where n is the table's capacity. HashMap capacities are always powers of two, which makes that AND exactly equivalent to a modulo but far cheaper. But an AND with n minus one only looks at the low bits — so if two keys differ only in their high bits, they'd collide every time. The spread in step two is what stops that. Step four: go to that bucket and walk it, calling equals on each entry until you find a match or run out. Now look at those four steps. One, two and three are constant time, always, no matter how big the map is. Step four is the only one that isn't, and it is exactly where a bad hashCode hurts you. Collisions are normal — two different keys landing in the same bucket is expected and fine. A bucket is a short linked list and walking two or three entries is nothing. But if a bucket gets long, lookups in it degrade to linear. Java has a guard: once a bucket has more than eight entries, in a table of at least sixty-four, it converts that bucket from a linked list into a red-black tree, so the worst case is log n rather than n. That was added to defend against hash-collision denial-of-service attacks, where someone feeds you keys engineered to collide. It is not a licence to write a lazy hashCode. Then resizing. The map tracks its size, and when size exceeds point-seven-five times capacity — the load factor — it allocates a table twice as big and rehashes every single entry into it. That's a full linear pause, and if you're building a big map it happens repeatedly as it grows. If you know roughly how many entries you'll have, size it up front: new HashMap of expected divided by nought point seven five, plus one. And finally, the asterisk on O(1). It is constant time only if your hashes spread out across the buckets. A hashCode that returns a constant is perfectly legal and honours the equals-hashCode contract exactly — and it turns your HashMap into a linked list, where every single lookup scans everything. That's the failure mode to remember.",
}
