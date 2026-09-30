import type { Section } from '../types'

export const map: Section = {
  id: 'map',
  title: 'Map',
  scene: 'list-set-map',
  slide: `## Key to value — and the methods that replace blocks

\`\`\`java
Map<String, Order> byId = new HashMap<>();
byId.put(id, o);   // returns the PREVIOUS value
byId.get(id);      // null if absent, not an exception
\`\`\`

### Java 8 added the useful half
\`\`\`java
byId.getOrDefault(id, EMPTY);
byId.computeIfAbsent(k, x -> new ArrayList<>())
    .add(line);
byId.merge(id, 1, Integer::sum);   // count in one line
\`\`\`
\`computeIfAbsent\` collapses get-check-put-return into one expression, **atomically** on a \`ConcurrentHashMap\`.

### Implementations
**\`HashMap\`** O(1), no order, **one null key** · **\`LinkedHashMap\`** insertion order — with \`accessOrder\` + \`removeEldestEntry\` it's a **20-line LRU cache** · **\`TreeMap\`** sorted, O(log n), **no null keys**

### Iterate \`entrySet()\`
Not \`keySet()\` + \`get()\` — that's **two lookups per entry**.`,
  narration:
    "A Map associates keys with values, and it's probably the data structure you'll use most. Put stores a pair and returns the previous value for that key, or null if there wasn't one — that return value is often exactly what you want and is usually ignored. Get returns the value, or null if the key isn't there. Note that: absent is null, not an exception, which is convenient and is also why containsKey exists, because a key genuinely mapped to null is indistinguishable from an absent key by get alone. Now, Java 8 added a set of default methods to Map that replaced whole blocks of code, and a lot of Java in the wild still doesn't use them. GetOrDefault does what it says without a null check. PutIfAbsent only writes if the key is free. ComputeIfAbsent is the important one: it takes a key and a function, and if the key is absent it calls the function, stores the result, and returns it — either way you get back a value you can use immediately. That collapses the classic four-line pattern, get, check for null, create and put, then return, into a single expression. The canonical use is a multimap: byId dot computeIfAbsent of key, arrow new ArrayList, dot add of line. One line, and on a ConcurrentHashMap it's atomic, which the four-line version was not. And merge is the counting idiom: merge of key, one, Integer colon colon sum means put one if absent, otherwise add one to what's there. Counting occurrences of anything is now one line. The implementations mirror the Sets, for the same reasons. HashMap: constant time, arbitrary order, and it allows one null key and any number of null values. LinkedHashMap: insertion order, and it has a lovely hidden feature — construct it with accessOrder true and it reorders on every get, so the least recently used entry is always first; override removeEldestEntry to return true past a size limit and you have written an LRU cache in about twenty lines. TreeMap: sorted by key, logarithmic, no null keys at all, and it gives you navigation — firstKey, headMap, floorKey. Last, a small habit with a real payoff. When you need both keys and values, iterate entrySet, not keySet followed by a get for each key. The keySet version hashes and looks up every single key a second time. EntrySet hands you the pair you already have.",
}
