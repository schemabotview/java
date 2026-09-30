import type { Section } from '../types'

export const modernJava: Section = {
  id: 'modern-java',
  title: 'Modern Java, not 1998 Java',
  scene: 'modern-java',
  slide: `## The language you picture is 15 years out of date

If "Java" means \`AbstractSingletonProxyFactoryBean\`, you're picturing **Java 5**. You'll write **Java 21** — an LTS release, and a different language to write in.

### What changed
- **8** (2014) — **lambdas**, **streams**, \`Optional\`
- **10** — \`var\`, local type inference
- **14** — **records**: a data class in one line
- **16** — pattern matching for \`instanceof\`
- **17** — **sealed types**: a hierarchy you can close
- **21** (**LTS**) — pattern matching for \`switch\`, record patterns, **virtual threads**

### Why LTS picks your version
- A release every **6 months**; every **2 years** one is **LTS**, with years of patches
- Production runs LTS — **8, 11, 17, 21**
- This course is **Java 21 first**. Older style appears only where the contrast is the lesson`,
  narration:
    "Before we install anything, we need to deal with a reputation problem. If you have heard Java described as bureaucratic, ceremonial, drowning in boilerplate, with class names like AbstractSingletonProxyFactoryBean — that criticism was fair. It was fair about Java 5, in 2004. The language you are about to learn is Java 21, and it is a genuinely different thing to write. Look at the two files on the left and right. They define the same type. On the left is the version you'd have written for most of Java's life: a final class, two private fields, a constructor that assigns them, a getter for each one, and then hand-written or IDE-generated equals, hashCode and toString — comfortably forty lines to say a thing has an id and a quantity. On the right is the same type in Java 21. Record Order, open paren, String id, int qty, close paren, empty braces. One line. The compiler generates the constructor, the accessors, equals, hashCode and toString for you, and it generates them correctly, which is more than can be said for most hand-written versions. Underneath that is a second feature. Sealed interface Event permits Placed, Shipped — that says this family of types is closed, no one else may join it. And because the family is closed, the switch below it needs no default branch: the compiler can prove the cases are exhaustive, and if you later add a third kind of event, that switch stops compiling until you handle it. That is a type system doing real work for you. How did we get here? Java 8, in 2014, brought lambdas and streams. Java 10 brought var. Fourteen brought records, sixteen pattern matching for instanceof, seventeen sealed types, and twenty-one pattern matching for switch, record patterns and virtual threads. One more thing about version numbers, because it decides which one you install. Java ships a release every six months, but every two years one of them is marked LTS — long-term support — and gets years of security patches. Production systems run LTS versions: eight, eleven, seventeen, twenty-one. Twenty-one is the current one, it is what you will meet at work, and it is what this entire course is written in.",
}
