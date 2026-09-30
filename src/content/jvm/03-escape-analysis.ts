import type { Section } from '../types'

export const escapeAnalysis: Section = {
  id: 'escape-analysis',
  title: 'Escape analysis',
  scene: 'jit-tiers',
  slide: `## The allocation that never happens

If C2 can prove an object **never escapes** the method that made it, it need not allocate it at all.

\`\`\`java
double distance(Point a, Point b) {
    var d = new Point(a.x-b.x, a.y-b.y);  // maybe not
    return Math.sqrt(d.x*d.x + d.y*d.y);
}
\`\`\`
**Scalar replacement**: \`d\` becomes two local doubles in registers. No heap object, no GC work, nothing to collect.

### What makes it possible
**Inlining (§2).** Across a call boundary C2 can't see what the callee does with a reference, so it must assume it escapes.

### What breaks it
**Returning** it · storing it in a **field** or collection · passing it to something **not inlined**.

### Why it matters to you
"This allocates, therefore it's slow" is often **wrong**. Write the clear version and measure — allocation rate shows up in **JFR** (§6).`,
  narration:
    "Escape analysis deserves its own section because it changes how you should think about writing Java. Here's the idea. C2 examines an object you allocate and asks: can a reference to this object ever be seen outside the method that created it? If the answer is provably no — it doesn't escape — then the object doesn't need to exist on the heap at all. Look at the distance method. It creates a Point to hold the difference, reads two fields off it, and returns a number. That Point is never returned, never stored, never passed anywhere. So C2 performs scalar replacement: it dismantles the object into its individual fields and keeps them in CPU registers as two plain doubles. There is no heap allocation. There is no object header. There is nothing for the garbage collector to trace or to collect. The object you wrote simply never comes into existence at run time, and the program behaves identically. Now, what makes this possible in the first place? Inlining, from the last section. Across a method call boundary, C2 cannot see what the callee does with a reference you hand it — it might store it in a static field for all the compiler knows — so it has to assume the object escapes. Once the callee is inlined, the whole lifetime of that object is visible inside one body, and the analysis can succeed. That's the dependency chain: inlining enables escape analysis, which eliminates allocation. Neither works without the other. What breaks it: returning the object, obviously. Storing it in a field or adding it to a collection. Passing it to a method that wasn't inlined — which includes anything too big to inline, or a megamorphic call site where several types show up. And synchronising on it, although in simple cases C2 can eliminate the lock instead, which is called lock elision. Why does this matter to you as someone writing code? Because it means the reflex \"this allocates, therefore it's slow\" is often simply wrong. A short-lived object in a hot method may cost nothing at all. So write the clear version — return a record rather than mutating an out-parameter, use an Optional, create the intermediate object — and measure before you contort anything for performance. If you want to see it happening, minus X X colon plus PrintEscapeAnalysis will tell you, and more practically, watching your allocation rate in Java Flight Recorder shows you whether the allocations you expected are actually occurring.",
}
