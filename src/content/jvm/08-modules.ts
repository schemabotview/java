import type { Section } from '../types'

export const modules: Section = {
  id: 'modules',
  title: 'Modules — the 60-second tour',
  scene: 'class-loading',
  slide: `## Strong encapsulation, above packages

\`\`\`java
module com.graphl.orders {
    requires java.sql;
    exports com.graphl.orders.api;
    opens com.graphl.orders.model;   // for reflection
}
\`\`\`
A \`public\` class in a package you didn't \`exports\` is **unreachable from outside**. Course 3 §5 had four visibility levels; **this is a fifth** — the only one that stops \`public\` meaning everyone.

### What it bought
The JDK's own internals are **closed by default**. That's why an old library fails with **"module java.base does not open java.lang"** — reflection into the JDK now needs \`--add-opens\`.

**\`jlink\`** builds a runtime with **only the modules you use**.

### Why you may not use it
Adoption is partial; most applications still run on the **classpath**. Worth **recognising**; adopt deliberately.`,
  narration:
    "Java modules arrived in Java 9 and they're worth a short, honest section: what they are, what they bought, and why you may well never write one. The problem they solve is that public means public to everyone. Course three section five gave you four visibility levels, and the widest of them, public, has no way to say public to my own code but not to yours. So every library ended up with packages named internal or impl, held together by documentation and hope, and people used them anyway. A module declaration sits in a file called module-info dot java at the root of your source. It says three kinds of thing. Requires: which other modules I depend on. Exports: which of my packages other modules may use. And opens: which packages may be reflected into at run time, which is a separate permission because reflection bypasses the normal rules. And the enforcement is real: a public class in a package you didn't export is genuinely unreachable from outside your module, at compile time and at run time. That's a fifth visibility level, and it's the only one that lets public stop meaning everybody. What did this buy? Mostly, the JDK itself got fixed. Java dot base and the rest of the platform are real modules now, so the internal APIs everybody was using — sun dot misc dot Unsafe being the famous one — are closed by default. Which is why, when you move an older application to a newer Java, you sometimes get an error saying module java dot base does not open java dot lang. Some library is reflecting into the JDK, and now it needs an explicit dash dash add-opens flag. That's not a bug, it's the encapsulation working, and the right fix is usually to update the library. The other real payoff is jlink, which builds a custom runtime image containing only the modules your application actually uses. That can take a JDK from three hundred megabytes to forty, which in a container image is worth having. And the honest part. Adoption has been partial. Many libraries never modularised, the tooling was painful for years, and the great majority of applications still run on the classpath, where everything lands in something called the unnamed module and the old rules apply unchanged. So: know what a module-info file is, recognise the add-opens error when you meet it, and know jlink exists. Adopt modules deliberately — if you're publishing a library, or if you want a slim runtime — not because they're newer.",
}
