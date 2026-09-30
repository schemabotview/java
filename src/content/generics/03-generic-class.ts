import type { Section } from '../types'

export const genericClass: Section = {
  id: 'generic-class',
  title: 'Writing a generic class',
  scene: 'writing-generics',
  slide: `## \`<T>\` after the name scopes \`T\` to the class

\`\`\`java
final class Box<T> {
    private final T value;
    T get() { return value; }
}
\`\`\`
\`T\` is a **placeholder the caller fills in**. \`new Box<Order>(o)\` makes \`T\` mean \`Order\` everywhere in the class, for that use.

### Conventions
**T** type · **E** element · **K**/**V** · **R** result. Single capitals, deliberately — a parameter isn't a type name.

### What \`T\` can't do (all §8)
\`new T()\` · \`new T[n]\` · \`T.staticMethod()\` · \`instanceof T\` · a **static field** of type \`T\`

### Unbounded, \`T\` is only \`Object\`
You can call just \`Object\`'s methods on it. **Bounds (§5)** buy more.

Generic **records** work: \`record Pair<A, B>(A a, B b) {}\`.`,
  narration:
    "To write your own generic type, put angle bracket T angle bracket after the class name. That declares a type parameter, and it's in scope for the entire class body — fields, constructors, methods, all of it. So Box of T has a field of type T, a constructor taking a T, and a get that returns a T. What T is gets decided by whoever uses your class. New Box of Order means T is Order for that instance, and the compiler now knows get returns an Order. New Box of String means T is String there. One class, any element type, and each use fully checked. On naming: single capital letters, by convention, and it's a strong convention. T for a general type, E for an element in a collection, K and V for a map's key and value, R for a result, and T and U when you need two unrelated ones. The reason they're single letters is deliberate: a type parameter is a placeholder, not a type, and giving it a full name like ItemType makes it look like a real class in the code. Now what T can't do, and every item on this list is section eight's fault. You cannot write new T — the class has no idea at run time what T was, so it can't construct one. You cannot write new T of n to make an array. You cannot call a static method on T. You cannot write instanceof T. And you cannot have a static field of type T, for a subtle reason worth understanding: there's exactly one copy of a static field shared by every instantiation of the class, so a static T would have to be an Order and a String at the same time. All five of those are erasure showing through, and we'll unpack the mechanism properly in two sections. One more thing about what's available inside the class. If T is unbounded, then as far as the compiler is concerned T could be absolutely anything, so the only methods you can call on a T are the ones every object has — the Object methods, equals, hashCode, toString. You cannot call compareTo on a T, because nothing promised T is Comparable. Bounds are how you buy more, and that's section five. And finally, a nice modern combination: records can be generic. Record Pair of A comma B, with an A first and a B second, is a complete, correct, immutable pair type in one line, with equals and hashCode generated properly over both components.",
}
