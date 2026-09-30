import type { Section } from '../types'

export const structure: Section = {
  id: 'structure',
  title: 'Structure',
  scene: 'maven-project',
  slide: `## The layout is course 1 §7's, and the packages are the design

\`\`\`
src/main/java/com/graphl/loganalyse/
    Main.java            cli/Options.java
    model/   LogEntry · Level · ParseResult
    parse/   LineParser
    report/  Aggregator · Report
src/test/java/…          pom.xml
\`\`\`

### Packages by **feature**, not by layer
\`model\`, \`parse\`, \`report\` — not \`entities\`, \`services\`, \`utils\`. A feature package can be made **cohesive** and its internals kept **package-private** (course 3 §5); a layer package forces everything \`public\` to be useful at all.

### \`pom.xml\` — three things
\`maven.compiler.release\` = **21** · **JUnit 5** at \`test\` scope · the **shade** plugin for §10. That's the whole file, and no runtime dependencies at all.

### The dependency direction
\`cli → report → parse → model\`, and **never back**. \`model\` knows nothing about anything, which is what makes it trivially testable.`,
  narration:
    "Start with the layout, which is exactly course one section seven's Maven convention — src slash main slash java, src slash test slash java, pom at the root, target generated. Nothing new; that's the point of a convention. What is a decision is the package structure, and it's worth arguing for. Packages are organised by feature: model, parse, report. Not by layer: not entities, services, utils, impl. The difference matters for a reason that comes straight from course three section five. If your packages are layers, then every class in the service layer needs to be public so the controller layer can use it, and every entity needs to be public so everything can. Public is the one visibility you can't take back, so a layered structure forces you to expose essentially everything. If your packages are features, the package boundary aligns with a cohesive piece of functionality — and then most of what's inside can be package-private. The LineParser's helper methods, the intermediate types, the constants: none of them need to be visible outside the parse package. You get real encapsulation at a level above the class, and the public surface of each package is small enough to think about. A second benefit: the dependency direction becomes obvious and checkable. Cli depends on report, report depends on parse, parse depends on model, and nothing ever points back. Model knows about nothing at all — it's records and an enum and a sealed interface — which is exactly why it's trivially testable with no setup. If you ever find model importing something from report, that's a design error you can see rather than argue about. The pom has three things in it. The compiler release set to twenty-one, which is what makes records, sealed types and pattern switches available. JUnit 5 at test scope, so it doesn't ship. And the shade plugin, which is section ten. Note what isn't there: no runtime dependencies whatsoever. Everything this program does comes from java dot base. That's unusual for a real application and it's deliberate here — it means every mechanism in the program is one you've seen, rather than something a library is doing for you.",
}
