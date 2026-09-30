import type { Section } from '../types'

export const abstractClasses: Section = {
  id: 'abstract-classes',
  title: 'Abstract classes',
  scene: 'abstract-class',
  slide: `## A half-built class with named holes

\`abstract\` on a class forbids **\`new\`**. On a method it means **no body** — subclasses must supply one.

### The shape it's for: template method
\`\`\`java
final void withdraw(long n) {        // fixed algorithm
    if (!allowed(n)) throw new InsufficientFunds(id);
    balance -= n;
    audit("withdraw", n);
}
protected abstract boolean allowed(long n);  // the hole
\`\`\`
The parent owns the **order and the guarantees**; the subclass fills in **one decision** and can't reorder or skip the rest. The \`final\` is what makes that binding.

### Rules
One abstract method ⇒ the class must be abstract. A class with none may still be declared abstract. It can have **constructors, fields and state**.

### Why it survives next to interfaces
An interface has **no instance state**. If the half-built thing must **hold a field**, only an abstract class can. **That's the whole distinction.**`,
  narration:
    "An abstract class is a class that is deliberately incomplete. Abstract on the class means new is forbidden — you cannot instantiate it, and the compiler will stop you. Abstract on a method means it's declared but has no body: just a signature and a semicolon. Subclasses are required to supply one. The rules follow from that. If a class has even one abstract method, the class itself must be declared abstract, because it's got a hole in it. The reverse isn't required: a class with no abstract methods at all can still be declared abstract, and people do that when a type is only ever meant to be a base. And unlike an interface, an abstract class is still a class — it can have fields, it can have state, and it can have constructors, which subclasses call with super. Now the shape it actually exists for, which is on the left and is called the template method pattern. Look at withdraw. It's final, and it lays out the algorithm in a fixed order: validate the amount, ask whether this is allowed, subtract, write an audit record. Four steps, always in that order. Directly below it is allowed — abstract, no body. That's the hole. Every subclass must decide what allowed means: a savings account checks the balance against a minimum, a checking account permits an agreed overdraft. And notice what the final on withdraw buys. The subclass gets to make exactly one decision. It cannot reorder the steps, it cannot skip the audit, it cannot forget the validation. The parent owns the guarantees and delegates precisely one judgement. That's a much stronger design than a parent method the subclass is free to override entirely, because then the audit is optional again and you're back to hoping everyone remembers. Which brings us to the question people ask at this point: given interfaces can have default methods now, when do you still need an abstract class? And the answer is one word: state. An interface cannot have instance fields. It has no per-object storage at all. Everything in it is implicitly public static final. So the moment your partially-built thing needs to hold a value — the balance field here — an interface can't express it and an abstract class can. That's the whole distinction, and it's worth remembering because it's the question that comes up in interviews and in design reviews.",
}
