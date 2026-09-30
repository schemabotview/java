import type { Section } from '../types'

export const functionsAsValues: Section = {
  id: 'functions-as-values',
  title: 'Functions as values',
  scene: 'functions-as-values',
  slide: `## A lambda is an **object**, not a function

Java has no free functions. A lambda is an **instance of an interface with exactly one abstract method** — a **functional interface** (course 3 §9).

\`\`\`java
Predicate<Order> big = new Predicate<>() {
    public boolean test(Order o) {
        return o.qty() > 100;
    }
};
Predicate<Order> big = o -> o.qty() > 100;  // same
\`\`\`

### What that buys
**Behaviour becomes an argument.** The library owns the mechanism; you own the decision — \`orders.removeIf(big)\`, \`orders.sort(comparing(Order::qty))\`.

### Not just sugar
A lambda compiles to \`invokedynamic\`, not to an anonymous class file — so no \`Foo$1.class\`, and no captured \`this\` unless you use one.

### Why Java did it
**Streams** (course 8) needed it. This course is the vocabulary that one is written in.`,
  narration:
    "Java 8 introduced lambdas, and the single most useful thing to understand about them is what they actually are — because with that in place, the whole of this course and all of course eight stop looking like magic. Java has no free functions. You cannot declare a function outside a type, and that hasn't changed. So what is a lambda? It is an instance of an interface that has exactly one abstract method. Course three section nine gave that a name: a functional interface. Look at the two declarations on the slide. The first is an anonymous class implementing Predicate of Order, with a test method that returns whether the quantity is over a hundred. The second is a lambda: o arrow o dot qty greater than one hundred. Those two mean exactly the same thing. Same interface, same method, same object at run time. The lambda is just the anonymous class with everything redundant removed — you don't repeat the interface name, you don't repeat the method name, you don't write public or return or the braces. All of that was recoverable from the target type, so Java 8 stopped making you write it. And that's the first practical takeaway: when you see a lambda and wonder what its parameter types are, go and look at the single method of the interface it's being assigned to. What does it buy? Behaviour becomes an argument. Before Java 8, you passed data to a method that had its behaviour baked in — a sort method knew how to compare, a filter method knew what to keep. Now the caller supplies the varying part. Orders dot removeIf of big: removeIf knows how to walk the list safely, you supply what counts as removable. Orders dot sort of comparing by quantity: sort knows the algorithm, you supply the order. The library owns the mechanism, you own the decision. One implementation note that occasionally matters. A lambda does not compile to an anonymous class file. It compiles to an invokedynamic instruction, and the JVM builds the implementation the first time that line runs. So you don't get a pile of dollar-one class files in your jar, and a lambda that captures nothing can be created once and reused rather than allocated per call. Finally, why Java added them at all, because it wasn't for elegance. It was for streams. The whole point was to make bulk operations on collections expressible and parallelisable, and that needed behaviour you could pass around. So this course is the vocabulary, and course eight is what it was built for.",
}
