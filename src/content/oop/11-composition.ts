import type { Section } from '../types'

export const compositionSection: Section = {
  id: 'composition',
  title: 'Composition over inheritance',
  scene: 'composition',
  slide: `## You are here — and the judgement to take away

\`extends\` says **IS-A** and inherits **everything**:
\`\`\`java
class Stack extends ArrayList<String> { }
// ...and it now has add(int, e), remove(0), set(3, x)
\`\`\`
You can't take them away; the LIFO invariant is gone. **Composition** says **HAS-A** — hold the list \`private\`, expose only \`push\`/\`pop\`. Nothing can violate the rule.

### When \`extends\` is still right
It's genuinely a subtype · the parent was **designed** for it · you want every future parent method. Otherwise **hold a field**.

### The course
**§1** the invariant needs a home · **§2–3** class defines, \`new\` instantiates · **§4** \`super\` runs first · **§5** \`private\`, and the getter that leaks it · **§6–7** \`extends\` shares, dispatch varies · **§8** state + holes · **§9** contract, many · **§10** the \`equals\` contract

### Next
Course 4 — types that are **just data**: records, sealed hierarchies, pattern matching.`,
  narration:
    "Last section, and this is the judgement the course exists to hand over. Inheritance is the first tool people reach for and usually the wrong one. Here's the textbook example, and it's a good one. Suppose you want a Stack. A stack is a list where you only ever add and remove at one end. So — extends ArrayList, and you get add and remove for free, and you write push and pop on top. Now look at what you actually built. Your Stack has inherited add at an index. It has inherited remove of zero. It has inherited set of three. Every one of those lets a caller reach into the middle of your stack and violate the single rule that made it a stack. And you cannot remove them. Inheritance is not a menu; you get the parent's entire public surface, including every part that makes no sense for your type. The composition version is below it. Stack holds a private List in a field. It exposes push, pop and isEmpty, and nothing else. There is no way to reach the list from outside, so there is no way to violate LIFO. That's the same code doing the same work with the invariant intact. The slogan is composition over inheritance, and the test behind it is: is this genuinely an IS-A, or did I just want the parent's code? Wanting the code is a HAS-A, and HAS-A means a field. Extends is still right sometimes. When it really is a subtype — a Savings really is an Account. When the parent was designed to be extended, meaning it documents its hooks and doesn't make them final. And when you genuinely do want every method the parent might add in future. Outside those, hold a field. One related trap while we're here: a non-static inner class holds a hidden reference to the instance that created it. That keeps the outer object alive for as long as the inner one lives, which is a classic quiet memory leak. Unless you need that link, write static. So, the course in one line each. Section one: an invariant needs somewhere to live, and an object is where. Two and three: the class defines, new instantiates, and the variable holds an address. Four: constructors establish the invariant, and super runs before your fields exist. Five: private, and the getter that hands out the thing private was protecting. Six and seven: extends shares what's common, dispatch lets behaviour vary without the caller knowing. Eight: abstract is state plus named holes. Nine: an interface is a contract, and you can have many. Ten: the equals and hashCode contract your collections silently rely on. And where next. Every class in this course was behaviour guarding state. Course four is the other kind of type entirely — the ones that are just data, with no invariant to defend. Records, sealed hierarchies and pattern matching. And the good news: all that equals and hashCode work from section ten is generated for you.",
}
