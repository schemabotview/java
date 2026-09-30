import type { Section } from '../types'

export const equality: Section = {
  id: 'equality',
  title: 'The contracts collections rely on',
  scene: 'hashmap-buckets',
  slide: `## Course 3 §10, from the map's side

Every hash-based collection assumes **equal objects hash equally**, and that **both stay put**.

### The three failures
- **\`equals\` without \`hashCode\`** ⇒ equal keys land in **different buckets**. \`get\` returns \`null\`
- **Hashing a mutable field**, then mutating it ⇒ the entry stays in the **old** bucket, **unreachable forever**. A leak with no error
- **\`compareTo\` inconsistent with \`equals\`** ⇒ \`BigDecimal("1.0")\` is **not \`equals\`** to \`"1.00"\` but **compares equal**, so a \`HashSet\` keeps both and a \`TreeSet\` keeps one

### The rules
1. **Keys should be immutable** — \`String\`, boxed primitives, enums, **records**
2. Override \`equals\` and \`hashCode\` **together**, over the **same** fields
3. Never key on a **mutable collection**
4. In a \`Tree…\`, make \`compareTo\` agree with \`equals\``,
  narration:
    "This is course three section ten again, seen from the collection's side, and now you can see the machinery it depends on. Every hash-based collection — HashMap, HashSet, LinkedHashMap, ConcurrentHashMap — makes one assumption: equal objects hash equally, and both of those stay true for as long as the object is in the collection. Three ways that breaks. The first is overriding equals and forgetting hashCode. It's the commonest, and the IDE will generate both together which is why it's rarer than it used to be. The effect: two keys you consider equal produce different hash codes, so step three of section six's lookup sends them to different buckets, and get with an equal key looks in the wrong place and returns null. A HashSet will cheerfully hold two entries you think are the same. The second is hashing on a field that later changes. Put the object in a map, then mutate that field. The hash code is now different, but the entry is still physically sitting in the bucket it was filed under. Every future lookup computes the new hash, goes to the new bucket, finds nothing. The entry is present, unreachable and un-removable, and nothing ever throws. That's a leak with no error message, and it's why the first rule is that keys should be immutable. The third is subtler and it's about sorted collections. TreeSet and TreeMap don't use equals at all — they decide two elements are the same when compareTo returns zero. If compareTo and equals disagree, the two kinds of collection behave differently on the same data. The famous example is BigDecimal. New BigDecimal of one point zero and new BigDecimal of one point zero zero are not equals, because equals compares scale as well as value. But compareTo says they're equal, because numerically they are. So a HashSet keeps both and a TreeSet keeps one, from identical input. That's not a bug in BigDecimal; it's documented. But it will astonish you at two in the morning if you don't know it. So four rules. Keys should be immutable — String, boxed primitives, enums and records are all safe, and a record is the easiest correct key you can write. Override equals and hashCode together, over the same fields. Never use a mutable collection as a key, because its hash code is computed from its contents and changes when they do. And in a sorted collection, either make compareTo consistent with equals, or use a Comparator knowing full well that it is deciding identity in that structure, not just order.",
}
