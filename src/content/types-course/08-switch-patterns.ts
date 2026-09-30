import type { Section } from '../types'

export const switchPatterns: Section = {
  id: 'switch-patterns',
  title: 'Pattern matching for switch',
  scene: 'patterns',
  slide: `## A total switch over a sealed family

\`\`\`java
return switch (e) {
    case Placed p  -> "placed " + p.id();
    case Paid pd when pd.amount() > 1000 -> "big sale";
    case Paid pd   -> "paid " + pd.amount();
    case Shipped s -> "shipped " + s.carrier();
};
\`\`\`
**No \`default\`.** \`Event\` is sealed, so the compiler proves those three are all of them — and a fourth **breaks this method until it's handled**.

### Guards — \`when\`
A boolean refines a pattern. The compiler enforces order: a **guarded** case before the same pattern unguarded, and it rejects any case already **dominated** by an earlier one.

### \`null\`
Still **throws NPE** unless you write \`case null\` — which makes the NPE a **choice**.

### Which to use
**Per-constant** (§3) when the logic belongs to the type. **Pattern switch** when it belongs to the **caller**.`,
  narration:
    "Now the rung this course has been building towards. Java 21 lets a case label be a pattern rather than a constant, and combined with sealed types that changes how you write a whole category of code. Look at the method. Switch on e, and each case is a type pattern: case Placed p, case Paid pd, case Shipped s. Each arm gets a properly typed variable with no cast. And look at what isn't there: no default branch. It isn't missing, it's unnecessary, because Event is sealed and the compiler knows Placed, Paid and Shipped are the complete list. This is the payoff for everything in the course so far. Sealed gave the compiler the list. Records gave each alternative a shape. Pattern switch takes them apart. And the day a colleague adds Cancelled to the permits clause, this method stops compiling, with an error telling you the switch isn't exhaustive. Every place that needs updating is handed to you at build time. Compare that to the old world of a status String and a chain of if-else with a fallthrough at the bottom, where the new case just quietly hits the else. Then guards. The keyword is when, and it goes after the pattern: case Paid pd when pd dot amount greater than a thousand. That arm only matches a Paid whose amount is over a thousand, and the plain case Paid below it catches the rest. Order matters here, and the compiler polices it. A guarded case has to come before the same pattern unguarded, because otherwise the unguarded one would swallow everything and the guarded one could never run. More generally the compiler rejects any case that is dominated by an earlier one — if you put case Event first, nothing after it is reachable and it tells you so. That's a real improvement on if-else chains, where an unreachable branch is silent. Null. A pattern switch behaves like the old switch and throws a NullPointerException if the thing you're switching on is null — unless you write case null explicitly, which is now allowed and wasn't before. So the NPE becomes a choice: either you write case null and handle it, or you don't and you get the throw. You can also combine it, case null, comma, default, when null should behave like anything else unmatched. Last, when to use which. Section three showed behaviour attached per enum constant, and that's right when the logic genuinely belongs to the type — how an operation applies. A pattern switch is right when the logic belongs to the caller, not the data: formatting an event for a log line, routing it to a handler, mapping it into a different shape. Those are the caller's concern, and putting them on the type would be wrong.",
}
