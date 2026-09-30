import type { Section } from '../types'

export const objectContract: Section = {
  id: 'object-contract',
  title: 'equals, hashCode & toString',
  scene: 'equals-contract',
  slide: `## The contract your collections silently depend on

\`Object\`'s defaults are **identity**. For a value type that's wrong — two orders with the same id **are** the same order.

> **If \`a.equals(b)\` then \`a.hashCode() == b.hashCode()\`.** Always.

The reverse needn't hold — a **collision** is legal, just slower.

### What breaks
- **\`equals\` only** ⇒ equal keys land in **different buckets**. \`map.get(equalKey)\` returns \`null\`.
- **The diagram** ⇒ hashing a **mutable** field, then mutating it. The entry sits in the old bucket, **unreachable, forever**. Hash on **immutable** fields only.

\`\`\`java
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Order x)) return false;
    return qty == x.qty && Objects.equals(id, x.id);
}
public int hashCode() { return Objects.hash(id, qty); }
\`\`\`
**Override both or neither.** A **\`record\`** generates all three, correctly.`,
  narration:
    "This is the most consequential section in the course, because course five's collections depend on it and they depend on it silently. Every object inherits equals, hashCode and toString from Object, and Object's versions are all based on identity. Equals is just double-equals — are you literally the same object. HashCode is derived from the address. For a value type that is almost always the wrong answer: two Order objects with the same id and quantity are, for every purpose you care about, the same order. So you override equals. And here's the rule, and it is a hard rule, not a style preference. If a dot equals b is true, then a dot hashCode must equal b dot hashCode. Always. The reverse does not have to hold — two unequal objects are allowed to share a hash code, that's a collision, and it just costs a little speed. Now look at the diagram, because it shows what breaking that rule actually looks like, which is more useful than the rule stated abstractly. On the left, the contract is kept. You put a key in a HashMap. The map calls hashCode, gets 4921, and stores the entry in the bucket that number lands in. Later you look up with a different but equal key object. It hashes to the same number, the map goes straight to that bucket, finds an entry, calls equals, matches, returns your value. On the right, the contract is broken, and there are two ways to break it. The first is overriding equals and not hashCode. Then two equal keys produce different hash codes, land in different buckets, and map dot get with an equal key returns null even though your entry is right there. A HashSet will happily hold two entries you consider identical. The second is subtler and it's the one drawn: you hash on a mutable field, put the object in a map, and then mutate that field. The hash code changes. The map was never told. The entry is still sitting in the old bucket, and every future lookup computes the new hash, goes to the new bucket, and finds nothing. The entry is present and permanently unreachable. So: hash only on fields that never change. Writing them is mechanical. Start with a this double-equals o fast path. Then instanceof with a pattern variable, which handles the null case for you because null is never an instanceof anything. Then compare the fields — Objects dot equals for references so nulls don't throw, plain double-equals for primitives. And hashCode is one line: Objects dot hash of the same fields you compared. Override both or neither; there is no sensible middle. And write toString. It costs you nothing and it pays back in every log line and every debugger session you'll ever have. One relief to end on: a record, which is the next course, generates all three of these for you, correctly, from the fields you declared.",
}
