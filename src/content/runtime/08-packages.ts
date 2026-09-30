import type { Section } from '../types'

export const packages: Section = {
  id: 'packages',
  title: 'Packages, imports & the classpath',
  scene: 'classpath',
  slide: `## A package name *is* a path

\`package com.graphl.orders;\` declares the class is looked up at **\`com/graphl/orders/App.class\`** — declaration and directory must match.

- **package** — the class's real name; \`App\` is shorthand
- **import** — pure convenience; it loads and bundles **nothing**. \`java.lang\` is automatic.
- **classpath** — the **roots** searched: \`target/classes\`, each jar, the JDK. **First match wins.**

### The four errors
| error | means |
|---|---|
| \`package … does not exist\` | **compile** — not a dependency |
| \`ClassNotFoundException\` | **run** — not on the path |
| \`NoClassDefFoundError\` | there at compile, **gone** at run |
| \`NoSuchMethodError\` | found — **wrong version** |

The last two: your build and your runtime disagree about which jars are on the path.`,
  narration:
    "Every Java file starts with a package declaration, and it is worth being precise about what that line does, because a surprising share of Java's confusing errors live right here. Package com dot graphl dot orders is not a label or a comment. It declares this class's real, full name. The class you call App is actually called com dot graphl dot orders dot App, and that dotted name maps directly onto a path: com, slash, graphl, slash, orders, slash, App dot class. That is where the class loader will go looking. Which means the package declaration and the directory structure have to agree. If the line says one thing and the folders say another, nothing resolves. Then there's import, and import does much less than people assume. Import java dot util dot List does not load anything, link anything, or bundle anything into your program. It is pure shorthand — it lets you write List instead of writing java dot util dot List every single time. Nothing about the running program changes. One package, java dot lang, is imported for you automatically, which is why String and Integer and System just work. Now the classpath, in the middle of the diagram. The classpath is a list of roots, and when the loader needs com slash graphl slash orders slash App dot class, it walks that list in order looking for that exact path underneath each root. Your own compiled output, target slash classes, is a root. Every dependency jar is a root — a jar is really just a zip of that same directory structure. And the JDK itself is there, which is where java dot base and the standard library come from. First match on the path wins, and that ordering matters when two jars contain the same class. Look at the bottom of the diagram: either the loader finds it, or it doesn't, and the failure has a name. Now, the errors, because knowing which one you're looking at tells you where to go. Package does not exist is a compile-time error — javac couldn't find it, which means it isn't declared as a dependency. ClassNotFoundException is a runtime error — the program asked for a class by name and nothing on the path had it. NoClassDefFoundError is subtly different and much more informative: it means the class was present when you compiled but absent when you ran. And NoSuchMethodError means the class was found, but at the wrong version — it has the name you wanted and not the method. Those last two are the classic signature of one situation: your build and your runtime disagree about which jars are on the path. Finally, naming. Packages are the reverse of a domain you control, all lowercase — com dot graphl dot orders — so that two organisations writing a class called App never collide.",
}
