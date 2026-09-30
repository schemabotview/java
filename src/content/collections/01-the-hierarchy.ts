import type { Section } from '../types'

export const theHierarchy: Section = {
  id: 'the-hierarchy',
  title: 'The Collection hierarchy',
  scene: 'collection-hierarchy',
  slide: `## Two trees, not one

\`\`\`
Iterable<E> → Collection<E> → List · Set · Queue/Deque
Map<K,V>    (beside it — NOT a Collection)
\`\`\`

- **\`Iterable\`** has exactly **one** method, \`iterator()\`. That's the whole for-each contract, and why for-each works on anything
- **\`Collection\`** adds \`add\` · \`remove\` · \`contains\` · \`size\` · \`stream\`
- **\`Map\` is not a \`Collection\`** — it holds *pairs*, not elements, so it can't be passed where a \`Collection\` is wanted. Its \`keySet()\`, \`values()\` and \`entrySet()\` are the bridge

### A view is **live**
\`keySet()\` isn't a copy — it's **backed by the map**. Remove from it and you remove from the map. Same for \`subList\` and \`Arrays.asList\`. Surprising until you know; useful once you do.

### Declare the interface, construct the class
\`\`\`java
List<Order> os = new ArrayList<>();
\`\`\`
The **left** side is your promise; the **right** is today's choice. Swapping the implementation then touches one line.`,
  narration:
    "Collections are where most Java code actually spends its time, and the library is genuinely well designed — but there's one structural fact that explains most of its signatures, so let's start there. There are two trees, not one. On the left, Iterable at the top. Iterable has exactly one method: iterator. That's it. And that single method is the entire for-each contract — anything that implements Iterable can be used in an enhanced for loop, including your own classes. Below it, Collection, which adds the operations you'd expect on a group of things: add, remove, contains, size, isEmpty, and since Java 8, stream. And below that, three shapes that differ by what they promise. A List is ordered and indexed and allows duplicates. A Set refuses duplicates. A Queue or Deque cares about the ends — you add at one and take from the other. Now the fact that matters. Map is not a Collection. It is not in that tree at all; it sits beside it. And that's not an oversight, it's because a Map doesn't hold elements, it holds pairs, and almost none of Collection's methods make sense on a pair. So you cannot pass a Map to something expecting a Collection, and the compiler will tell you so in a message that confuses people the first time. The bridge is three view methods: keySet gives you a Set of the keys, values a Collection of the values, and entrySet a Set of the key-value pairs. Those are Collections, and that's how a Map participates. And here's the thing about those views that surprises everybody once: a view is live. KeySet does not copy the keys into a new set. It's a window onto the map, and if you remove a key from the keySet, you have removed that entry from the map. Same story with subList on a List, and with Arrays dot asList, which is a view over the array you handed it. Once you know, it's a useful tool; until you know, it produces bugs that look impossible. Last, a habit worth forming immediately. Declare the interface, construct the class. List of Order os equals new ArrayList. The left-hand side is the promise you're making to the rest of the code — this is a list. The right-hand side is the implementation you happen to have chosen today. If you later decide a LinkedHashSet or a different list is better, you change one line and nothing else. Write ArrayList on the left instead and you've promised an ArrayList to every caller.",
}
