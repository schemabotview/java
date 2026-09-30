import type { Section } from '../types'

export const genericMethods: Section = {
  id: 'generic-methods',
  title: 'Generic methods',
  scene: 'writing-generics',
  slide: `## A method can declare its own type parameter

\`\`\`java
static <T> List<T> firstTwo(List<T> src) { … }
//     ^^^ declared HERE, before the return type
\`\`\`
After the modifiers, before the return type — the one bit of Java syntax nobody guesses right.

### When you need one
- **\`static\` methods must.** No instance, so nothing ever fixed the class's \`T\`
- An **instance** method whose type is **independent**:
\`\`\`java
<R> Box<R> map(Function<T, R> f)   // R is the method's
\`\`\`
- Two parameters whose types must **match each other**

### Inference
The compiler works \`T\` out from the **arguments**, so you write \`firstTwo(orders)\`. The explicit form (\`Collections.<String>emptyList()\`) is for when it can't decide.

**Prefer a generic method to a generic class** when the type is only needed for one call.`,
  narration:
    "As well as a class declaring a type parameter, a single method can declare its own. The syntax is the one bit of Java nobody guesses right the first time: the angle bracket T goes after the modifiers and before the return type. Static, angle bracket T angle bracket, List of T, firstTwo. It looks odd until you read it as: this method introduces a type parameter T, and then returns a List of T. Three situations where you need one. The first is not optional: a static method must declare its own. A static method belongs to the class rather than to an instance, and the class's T only gets fixed when someone writes new Box of Order — so there is no instance, and therefore no T, for a static method to see. If a static method needs a type parameter, it declares its own, and the compiler enforces that. Second, an instance method whose type is independent of the class's. Look at the map method on Box. Box has a T. Map takes a function from T to R and returns a Box of R — and R has nothing to do with T or with the Box's own parameter. So map declares R itself. That's exactly how Optional dot map and Stream dot map are written, and now you can read their signatures. Third, when two parameters have to have matching types but neither is tied to the class — a method that takes two lists and requires them to hold the same kind of thing. Then inference, which is why generic methods are pleasant to use. The compiler works out what T is from the arguments you actually passed. So you just write firstTwo of orders, and because orders is a List of Order, T is Order, and the return type is a List of Order. You never write the type argument. There is an explicit syntax for the rare cases where inference can't decide — you write the type in angle brackets before the method name, as in Collections dot angle bracket String angle bracket emptyList — and you'll see it occasionally when a method's argument gives the compiler nothing to infer from. A guideline to close on: prefer a generic method to a generic class when the type is only needed for the duration of one call. A whole generic class is a commitment — every use of it names the type. A generic method is local, it infers, and it's less to read.",
}
