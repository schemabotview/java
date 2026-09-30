import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here — choosing',
  scene: 'collection-hierarchy',
  slide: `## The decision, in four questions

1. **Pairs or elements?** Pairs ⇒ \`Map\`
2. **Duplicates allowed?** No ⇒ \`Set\`
3. **Do the ends matter?** Yes ⇒ \`Deque\` (\`ArrayDeque\`). No ⇒ \`List\` (\`ArrayList\`)
4. **What order do you promise?** None ⇒ \`Hash…\` · insertion ⇒ \`LinkedHash…\` · sorted ⇒ \`Tree…\`

### Costs, and where they come from
\`ArrayList\` \`get\` **O(1)**, \`contains\` **O(n)** — it's an array (§3) · \`Hash…\` **O(1)** *if the hashes spread* (§6) · \`Tree…\` **O(log n)**, sorted

### The one that fixes real slowness
A **\`contains\` inside a loop** is O(n·m). Put one side in a \`HashSet\`: **O(n+m)**.

### The course
**§1** two trees · **§2–3** it's an array · **§4–6** hashing, four steps · **§7** the ends · **§8** for-each is an \`Iterator\` · **§9** copy at the boundary · **§10–11** the contracts

### Next
Course 6 — **generics**: what \`<E>\` guarantees, and what erasure takes away.`,
  narration:
    "Let's turn the whole course into a decision you can make in four questions. One: are you storing pairs or elements? Pairs means a Map, and you're done with the tree. Elements, carry on. Two: are duplicates allowed? If not, you want a Set. If yes, carry on. Three: do the ends matter — are you adding at one end and taking from the other? Then a Deque, implemented by ArrayDeque, and that covers both queues and stacks. Otherwise a List, implemented by ArrayList. Four, and this applies to Sets and Maps: what order do you promise the caller? If none, the plain hash implementation. If insertion order, the LinkedHash one. If sorted, the Tree one. Four questions, and you've picked the right type every time. Now the costs, and the point of this course is that you can derive them rather than memorise them. ArrayList's get is constant and contains is linear, because it's an array with a size — section three. HashMap and HashSet are constant time, with the asterisk from section six: only if your hashes actually spread, because step four of the lookup is the one that degrades. Tree collections are logarithmic and give you sorted order and range queries in exchange. ArrayDeque is constant at both ends. And the single most valuable thing in the course, if you take only one: a contains inside a loop is quadratic. If you're iterating n things and asking whether each is in a list of m things, that's n times m equals operations. Put the m things in a HashSet before the loop and it becomes n plus m. On a few thousand elements that's minutes becoming milliseconds, and it's a two-line change. When something is inexplicably slow, look for that shape first. So, the course. Section one: two trees, and Map is beside the Collection tree rather than in it, and its views are live. Two and three: a List is ordered and indexed, ArrayList is an array plus a size, and the layout is the cost model. Four to six: Sets and Maps are hashing, and we walked the four steps of a lookup so you know which one can degrade. Seven: queues and deques, where the ends are the point, and don't use java dot util dot Stack. Eight: for-each is an Iterator, and ConcurrentModificationException is a modCount check. Nine: immutable collections, and copy at the boundary. Ten and eleven: ordering, and the contracts every one of these structures quietly assumes. Next is course six, generics. You've written angle-bracket E on every single line of this course. Now we find out what it actually guarantees, and what type erasure quietly takes away.",
}
