import type { Section } from '../types'

export const interfacesSection: Section = {
  id: 'interfaces',
  title: 'Interfaces',
  scene: 'interfaces',
  slide: `## A contract. No state. As many as you like.

\`\`\`java
interface Auditable {
    String id();          // public abstract, implicitly
    default String tag() { return "audit:" + id(); }
    int LIMIT = 100;    // public static final
}
\`\`\`
One \`extends\`, **many** \`implements\` — an interface says what you **can do**, not what you **are**.

### \`default\` changed what an interface is for
A method **with a body** that implementors inherit free. It lets an interface **grow** without breaking implementors — exactly how \`Collection\` gained \`stream()\` in Java 8.

### The one conflict Java admits
Two interfaces, same \`default\` signature? The compiler **refuses to guess**: override and pick \`Auditable.super.tag()\`.

### Choosing
**Interface** by default. **Abstract class** only when the shared thing needs **instance state**.

An interface with **one** abstract method is a **functional interface** — that's what a lambda is (course 7).`,
  narration:
    "An interface is a contract. It says what a type can do, without saying anything about what it is or how it does it. Look at the card. Method declarations with no body are implicitly public and abstract — you don't write those words, and adding them is noise. Any field is implicitly public, static and final, always, which means an interface cannot hold per-object state. That's the defining limitation and it's the one from the last section. The key structural fact is at the bottom: a class extends exactly one class but implements as many interfaces as it likes. Savings extends Account and implements both Auditable and Comparable. That's why interfaces express capabilities well — being auditable and being comparable are unrelated things a type can happen to be, and forcing them into a single inheritance chain would be absurd. Now default methods, which arrived in Java 8 and changed what an interface is for. A default method has a body, and every implementor inherits it for free without writing anything. Why would you want that? Because of a problem the Java library had. They wanted to add stream to Collection. But Collection is implemented by thousands of classes across the whole world, and adding an abstract method to an interface breaks every single one of them at compile time. Default methods were invented to solve exactly that: stream was added as a default, and not one existing implementation had to change. So when you're designing, default is for evolving an interface, and for genuinely convenient derived behaviour — a method that can be written purely in terms of the abstract ones. Static methods on interfaces are usually factories, like the of method there. Default methods create the only inheritance conflict Java allows, and the language handles it the way it handles everything ambiguous: it refuses. If you implement two interfaces that both supply a default method with the same signature, that's a compile error, and you must override it yourself and say which one you want, with the syntax Auditable dot super dot tag. Explicit, and no silent winner. So how do you choose? Default to an interface. It's the looser coupling, it leaves the implementor free to have a different parent, and a class can implement several. Reach for an abstract class only when the shared thing needs instance state. Java's own library does both, quite deliberately: List is the interface, and AbstractList is the half-built helper for anyone writing an implementation. One last thing that matters far beyond this course. An interface with exactly one abstract method is called a functional interface — and that is precisely what a lambda is. When you write an arrow function in Java, you are creating an implementation of a one-method interface. That's course seven.",
}
