import type { Section } from '../types'

export const boundedTypes: Section = {
  id: 'bounded-types',
  title: 'Bounded type parameters',
  scene: 'writing-generics',
  slide: `## A bound is a promise — and it's what buys the body

\`\`\`java
static <T extends Comparable<T>> T max(List<T> xs) {
    T best = xs.get(0);
    for (T x : xs)
        if (x.compareTo(best) > 0) best = x;
    return best;
}
\`\`\`
Without the bound, \`compareTo\` **won't compile** — an unbounded \`T\` is only \`Object\`.

### A **two-sided** contract
The **caller** must supply a \`T\` that satisfies it; the **body** may then rely on it. Both halves are checked.

### Details
- **\`extends\` for everything** — no \`implements\`, even for an interface
- **Multiple** with \`&\`; at most one **class**, and it comes **first**
- \`T\` **erases to its first bound** (§8), not to \`Object\`
- \`<T extends Comparable<T>>\` says "comparable **to itself**" — which is what you want`,
  narration:
    "Here's the problem a bound solves. You want a method that finds the largest element of a list. So you write static, angle bracket T, T max, taking a List of T. Inside, you compare elements — x dot compareTo of best. And that does not compile. Why? Because T is unbounded. As far as the compiler knows, T could be absolutely any type, including one with no compareTo at all. The only methods you're allowed to call on an unbounded T are Object's. So you need to promise something about T, and that promise is a bound: T extends Comparable of T. Now the compiler knows every T has a compareTo, and the body compiles. That's the whole idea. A bound is what you're allowed to assume inside, and it's exactly what you demand of the caller outside. It's a two-sided contract and both halves are checked: the caller has to supply a type that satisfies the bound, and having done so, the body may rely on it. A few details. First, the keyword is always extends, never implements — even when the bound is an interface, as Comparable is. That's a little inconsistent with the rest of Java and it's simply how it is. Second, you can have several bounds joined with a single ampersand: T extends Number and Comparable of T means T must be both. At most one of them can be a class, and if there is one it must come first. Third, a detail that connects to the next section but is worth flagging now: a bounded T erases to its first bound, not to Object. So T extends Number becomes Number in the bytecode. That occasionally matters when you're reading a decompiled signature or a stack trace. And last, that recursive-looking bound — T extends Comparable of T. It reads strangely: T must be comparable to T. But that is precisely what you want. You don't want a method that accepts any old Comparable, because then you could pass a list mixing Strings and Integers and it would explode at run time. T extends Comparable of T says: whatever T is, it must know how to compare itself to its own kind. You'll see that shape throughout the standard library once you start looking, and it's worth recognising rather than puzzling over each time.",
}
