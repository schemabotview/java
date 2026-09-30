import type { Section } from '../types'

export const higherOrderMethods: Section = {
  id: 'higher-order-methods',
  title: 'Higher-order methods',
  scene: 'composing',
  slide: `## Take behaviour, or return it

\`\`\`java
static <T> List<T> keep(List<T> xs,
                        Predicate<? super T> p)
\`\`\`
Always give the functional parameter a **wildcard**: the method only **consumes** \`T\`s through it, so \`? super T\` accepts a \`Predicate<Object>\` too (course 6 §7). That's why \`forEach\` takes \`Consumer<? super T>\`.

### Returning behaviour — a **factory** for functions
\`\`\`java
static Predicate<Order> minQty(int n) {
    return o -> o.qty() >= n;   // n is captured (§7)
}
orders.removeIf(minQty(100).negate());
\`\`\`
One method, a **family** of predicates, parameterised at run time — the shape behind every rules engine.

### What it replaces
Course 3 §8's **template method**, with the hierarchy deleted: the hole is a **parameter**, filled at the call site.`,
  narration:
    "A higher-order method is one that takes behaviour as a parameter, or returns behaviour, or both. You've been calling them for two courses — removeIf, sort, forEach, computeIfAbsent. Now write one. Static, angle bracket T, List of T, keep, taking a List of T and a Predicate of question mark super T. And look at that wildcard, because it isn't decoration. Your method only ever consumes T values through that predicate — it passes each element in and gets a boolean back. So by PECS, from course six section seven, it's a consumer of T, and the right declaration is question mark super T. What does that buy? It means someone can pass you a Predicate of Object — a general is-this-null check, say — and use it on your List of Order. Without the wildcard, only a Predicate of exactly Order would compile. That's precisely why forEach takes a Consumer of question mark super T, and why you can hand a print-any-object consumer to a list of strings. Make it a habit: a functional parameter almost always wants a wildcard. Now the other direction, returning behaviour, which is the more powerful move. Look at minQty. It takes an int and returns a Predicate of Order — o arrow o dot qty greater than or equal to n. The n is captured, by section seven's rules, and it's effectively final because it's a parameter you never reassign. So one method gives you a whole family of predicates, parameterised at run time. MinQty of a hundred, minQty of a thousand, minQty of whatever came out of a config file. And because the result is a Predicate, you can compose it — minQty of a hundred dot negate, or dot and with something else. That is the shape behind every fluent builder API and every rules engine you'll ever use. Worth noticing what this replaces. Course three section eight showed the template method pattern: an abstract class with a fixed algorithm and an abstract hole that a subclass fills in. This is the same idea with the hierarchy deleted. The hole is a parameter, and it's filled at the call site rather than by declaring a subclass. When there's state to share and a family of related behaviours, the abstract class still earns its place. When there's one varying decision, a functional parameter is simply less machinery for the same result.",
}
