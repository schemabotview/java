import type { Section } from '../types'

export const classLoadingSection: Section = {
  id: 'class-loading',
  title: 'Class loading',
  scene: 'class-loading',
  slide: `## Parent first — and the order is the security model

Every request goes **up** before anything is searched: **Application** → **Platform** → **Bootstrap**. So a \`java.lang.String\` on your classpath is **never reached**.

### Three phases, and the last is lazy
**Load** → **Link** (verify · prepare · resolve) → **Initialise** (**static blocks run**), at **first use**, not at startup.

That's why a static initialiser's failure surfaces as \`ExceptionInInitializerError\` at a seemingly random moment — and why the **second** attempt gives \`NoClassDefFoundError\` with **no cause**. Go find the first occurrence.

### Identity is (name, loader)
The same class file via two loaders gives **two incompatible types** — \`Order cannot be cast to Order\`. That's how plugin isolation and hot reload work.

### The two errors
\`ClassNotFoundException\` — asked by name, missing. \`NoClassDefFoundError\` — there at compile, gone now.`,
  narration:
    "Class loading is one of those subjects that seems like internals until it explains three errors you've been guessing at. Start with the chain. There are three loaders in a modern JVM: the bootstrap loader, which handles java dot base and the core classes; the platform loader, for the rest of the JDK; and the application loader, for your classpath. And the rule is parent-first delegation. When the application loader is asked for a class, it does not look. It asks the platform loader. Which asks the bootstrap loader. Only when the parent reports failure does the child search its own locations. Why does that matter? Because it means a class named java dot lang dot String sitting on your classpath is never loaded. The bootstrap loader answers first with the real one, and yours is unreachable. That is the entire defence against someone substituting a core class, and it's a structural property rather than a check. Now the three phases. Loading finds the bytes and creates a Class object. Linking has three parts: verification, which checks the bytecode is structurally safe; preparation, which allocates static fields and sets them to their default values, zero and null; and resolution of symbolic references. And then initialisation, which is where your static initialiser blocks and static field initialisers actually run. And initialisation is lazy. It happens at first active use — the first time you instantiate the class, call a static method, or read a non-constant static field. Not at startup. This explains a confusing failure. If a static initialiser throws, you get an ExceptionInInitializerError at whatever moment that class was first touched, which can be deep into a run and nowhere near where the problem is configured. And here's the cruel part: the class is now marked erroneous, so the second time anything touches it you get a NoClassDefFoundError with no cause attached. So the informative error appears once, possibly in a log you've rotated away, and every subsequent attempt gives you a useless one. If you're chasing a NoClassDefFoundError, go looking for the first occurrence. Next, class identity. A class's identity is the pair of its fully-qualified name and the loader that loaded it. So the same class file loaded by two different loaders produces two distinct, incompatible types, and assigning one to the other gives you a ClassCastException reading \"Order cannot be cast to Order\", which is genuinely bewildering until you know this. That's not a bug — it's the mechanism behind application server isolation, plugin systems and hot reloading. Finally the two errors, which we met in course one and can now distinguish properly. ClassNotFoundException means something asked for a class by name, usually reflectively, and no loader could find it. NoClassDefFoundError means the class was present when you compiled but isn't now — or that its initialiser already failed.",
}
