import type { Section } from '../types'

export const inheritance: Section = {
  id: 'inheritance',
  title: 'Inheritance',
  scene: 'hierarchy',
  slide: `## \`extends\` — one parent, everything inherited

\`\`\`java
class Savings extends Account {
    Savings(String id, long open, long min) {
        super(id, open);     // FIRST statement
    }
}
\`\`\`

- **Inherited**: every \`public\`/\`protected\` member. \`private\` fields **are there** but not reachable by name
- **Not inherited**: **constructors** — hence the required \`super(…)\`
- **Single inheritance**: one \`extends\`, many \`implements\` (§9)

### \`Object\` is the root
Everything extends it, so *every* type has \`equals\`, \`hashCode\`, \`toString\` — which is why §10 applies to all of them.

### Shutting it down
**\`final class\`** can't be extended (\`String\`, every record). A **\`final\` method** can't be overridden — that's how you protect an algorithm.

### The cost
\`extends\` is the **tightest coupling Java offers**. **§11 is the counter-argument.**`,
  narration:
    "Inheritance. Class Savings extends Account says: a Savings is an Account, and it starts with everything Account has. Look at the hierarchy on the left. What you inherit is every public and protected member — fields and methods both. Private members are more subtle: a Savings object genuinely contains the parent's private balance field in memory, it just can't refer to it by name. That's why parent fields you intend subclasses to use are marked protected rather than private, though we'll question whether you want that at all in section eleven. What you do not inherit is constructors. Constructors belong to the class that declared them, which is why the Savings constructor has to call super, open paren, id, open, close paren as its first statement — it's asking the Account part of itself to be built. If the parent has a no-argument constructor, Java will insert that super call for you invisibly. If it doesn't, you must write it, and forgetting is a common first error. Java has single inheritance only. One extends, one parent. That was a deliberate departure from C-plus-plus, which allows several and gets into genuine trouble when two parents supply the same thing. Java's answer is that you may implement as many interfaces as you like, which is section nine. At the top of every hierarchy sits Object. Every class extends it, directly or through a chain, whether you write extends Object or not. That's why every single Java object — yours, the library's, everything — has equals, hashCode, toString and getClass available on it. And it's why section ten applies to every type you'll ever write: those methods are already there, with default implementations that are usually wrong for your type. Two ways to shut inheritance down. Final on a class means nobody may extend it. String is final; every record is implicitly final. Final on a method means nobody may override that one method, and that's how you protect an algorithm while still allowing the class to be extended — you'll see exactly that shape in section eight. And then the cost, which you should have in mind from the start. Extends is the tightest coupling Java offers. You don't get to pick what you inherit; you get the parent's whole surface, including methods that make no sense for your type, and you can't remove them. And because the parent is now part of your public behaviour, a change the parent's author makes in a later version changes you, without you touching a line. Section eleven is the counter-argument, and it's the piece of judgement this course exists to hand over.",
}
