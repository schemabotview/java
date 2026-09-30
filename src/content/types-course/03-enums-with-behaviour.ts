import type { Section } from '../types'

export const enumsWithBehaviour: Section = {
  id: 'enums-with-behaviour',
  title: 'Enums with state & behaviour',
  scene: 'enums',
  slide: `## An enum constant is an object

\`\`\`java
enum Status {
    NEW(false), PAID(false), SHIPPED(true);
    private final boolean terminal;
    Status(boolean t) { this.terminal = t; }
}
\`\`\`
Constants take **constructor arguments**. The constructor is **implicitly \`private\`** — nothing else can ever make one.

### Behaviour **per constant**
\`\`\`java
enum Op {
    PLUS  { int apply(int a, int b) { return a+b; } },
    TIMES { int apply(int a, int b) { return a*b; } };
    abstract int apply(int a, int b);
}
\`\`\`
Each constant is an **anonymous subclass**. This replaces a \`switch\` on the enum with **behaviour living on the constant** — add one and the compiler demands its body.

### Also
An enum may **\`implements\`** an interface, never \`extends\`. \`enum X { INSTANCE; }\` is the **canonical singleton** — thread-safe and reflection-proof for free.`,
  narration:
    "The thing most people miss about enums is that a constant is a real object, which means it can carry data and behaviour. Start with data. Look at the first block. NEW, PAID and SHIPPED each have a parenthesised argument, and that argument is passed to a constructor. So each constant carries a boolean saying whether it's a terminal state, and isTerminal reads it. Note two details. The constructor is implicitly private — you cannot mark it public, and the compiler won't let anything outside the enum call it, which is what guarantees the set really is closed. And the constants must come first in the body, terminated with a semicolon before any fields or methods; that semicolon is the one piece of enum syntax people forget. Now the more interesting half: behaviour per constant. Look at the Op enum. It declares an abstract method, apply, and then each constant supplies its own body in braces immediately after its name. PLUS adds, TIMES multiplies. Under the hood each constant is an anonymous subclass of the enum, which is why this works at all. Why does that matter? Because it inverts a very common shape. The usual version of this code is a switch on the enum inside some method somewhere: if it's PLUS do this, if it's TIMES do that. That switch is a piece of behaviour about the enum living somewhere else — and when you add a third operation, you have to find every such switch. With per-constant bodies, the behaviour lives on the constant, and when you add DIVIDE the compiler refuses to build until you've given it an apply. The knowledge and the data are in the same place. Two more things. An enum can implement an interface, and often should — that lets you hand an Op to code that just wants something with apply, without knowing it's an enum. It can never extend a class, because every enum already extends java dot lang dot Enum and Java has single inheritance. And finally, a small but genuinely useful trick: an enum with exactly one constant is the best singleton Java has. Enum Registry, open brace, INSTANCE, semicolon. That is thread-safe on initialisation, correct across serialisation, and immune to reflection attacks, all for free — none of which is true of the double-checked-locking version people write by hand.",
}
