import type { Section } from '../types'

export const polymorphism: Section = {
  id: 'polymorphism',
  title: 'Polymorphism & dynamic dispatch',
  scene: 'hierarchy',
  slide: `## The call is written against the parent. The object picks the method.

\`\`\`java
Account a = new Savings(…);
a.withdraw(50);        // Savings.withdraw runs
\`\`\`
The **declared type** decides what you may **call** (compile time). The **actual object** decides what **runs** (run time) — a **vtable** lookup.

### What it's for
\`\`\`java
for (Account a : accounts) a.applyInterest();
\`\`\`
Any mix of subtypes, **no \`instanceof\`, no \`switch\`**. Add a subclass and this loop doesn't change. A chain of type checks is the smell.

### Overriding rules
Same **signature**; return may **narrow**, access may **widen**. **\`@Override\`** makes the compiler check — without it a typo'd name is a **new method that silently never runs**.

### Override ≠ overload
**Override**: subclass, chosen at **run** time by the object. **Overload**: different parameters, chosen at **compile** time by the **static** type.`,
  narration:
    "Polymorphism is what makes inheritance worth having, and the mechanism is one sentence: the declared type decides what you may call, and the actual object decides what runs. Look at the bottom of the diagram. Account a equals new Savings. The variable's declared type is Account, so the compiler will only let you call methods that Account declares — ask for a Savings-specific method through that variable and it won't compile. But the object sitting on the heap is a Savings. So when you write a dot withdraw of fifty, the JVM looks at the actual object, finds that Savings overrides withdraw, and runs the Savings version. That lookup is called dynamic dispatch, or virtual dispatch, and underneath it's a table of method pointers per class — a vtable — so the cost is a single indirection, not a search. Now, what is it for? The loop on the slide. For each Account a in accounts, a dot applyInterest. That collection can hold savings accounts, checking accounts, and a type someone adds next year, and this loop is correct for all of them without knowing any of them exist. No instanceof, no switch on a type field. And when a new subclass arrives, this code does not change. That's the payoff. The inverse is worth naming as a smell: if you find yourself writing a chain of if-instanceof or a switch on some kind field, polymorphism was available and you didn't use it. Although — and course four will complicate this honestly — sealed types plus pattern matching have made the switch a legitimate choice again in some designs. A few overriding rules. The override must have the same signature: same name, same parameter types. The return type may narrow — that's covariant returns, so an override can return Savings where the parent returned Account. Access may widen but never narrow: you can make a protected method public in a subclass, but not the reverse. And always write at-Override. It's not decoration. It tells the compiler you intend to override, and the compiler checks. Without it, a mistyped method name or a wrong parameter type quietly creates a brand new method that nothing ever calls, and your override simply doesn't happen. That bug is silent and it's a nuisance to find. Last, keep overriding and overloading apart, because they behave oppositely. Overriding is same signature, in a subclass, resolved at run time by the actual object. Overloading is same name with different parameter types, resolved at compile time by the static type of the argument. That's why calling log of null can pick a surprising overload — the compiler chose from the declared types, before anything ran.",
}
