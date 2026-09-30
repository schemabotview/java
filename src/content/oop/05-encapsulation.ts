import type { Section } from '../types'

export const encapsulation: Section = {
  id: 'encapsulation',
  title: 'Encapsulation & visibility',
  scene: 'encapsulation',
  slide: `## Four reaches, and one leak everyone ships

- **\`public\`** — anyone, anywhere. A promise you must keep.
- **\`protected\`** — the package **and every subclass, anywhere**. Wider than package-private.
- **(none)** — the same **package**. The sane default.
- **\`private\`** — this class only. Free to change tomorrow.

**Fields \`private\`. Methods as narrow as they can be.** \`public\` is the only one you can't take back.

### A getter can leak what \`private\` protected
\`\`\`java
private final List<Order> lines;
List<Order> getLines() { return lines; }
\`\`\`
\`getLines().clear()\` just emptied your field. Return \`List.copyOf(lines)\` — or don't expose it.

### Don't reflexively write setters
A setter per field is a \`public\` field with extra steps. Expose **operations** (\`withdraw\`), not **slots**. If a type really is just data, a **\`record\`** says so honestly.`,
  narration:
    "Encapsulation is the mechanism behind section one's argument, and it comes down to four access modifiers. The diagram draws them as reaches, widest first, because that's what they are — a containment hierarchy, not four unrelated options. Public means anyone, anywhere, can see it. Protected means the same package, and additionally every subclass, wherever it lives. Note that carefully, because it's the one people misremember: protected is wider than package-private, not narrower. No modifier at all — often called package-private or default — means only code in the same package. And private means this class and nothing else. Not subclasses, not the same package. Just this class. The working rule is short: fields are private, and methods are as narrow as they can be while still doing their job. The reason to be stingy with public is that public is the only one you can't take back. Every public member is API. Somebody will depend on it, and then you can't change it without breaking them. Private is the opposite: you can rename it, retype it or delete it tomorrow and nobody can tell. Now the leak, because this is the thing that gets shipped constantly. Look at the code. The field is private and final — a List of Order lines. And then there's a getter that returns it. That getter completely undoes the privacy. A caller writes getLines dot clear and has just emptied your field. Or getLines dot add and has inserted a line that bypassed every check you wrote. Private protected the reference; it did nothing about the object the reference points at, and you just handed that object out. Two fixes. Return a copy — List dot copyOf gives back an unmodifiable snapshot. Or don't expose the collection at all: expose addLine and lineCount and let the list stay yours. Which leads to the last point, and it's a habit worth breaking early. Do not reflexively write a getter and a setter for every field. A class with a setter for every field is just a class with public fields and extra typing, and the invariant that justified the whole exercise is gone again. Expose operations, not slots. Withdraw, not setBalance. Ask what callers need to do, not what fields you happen to have. And if a type genuinely is just data — no rules, no behaviour, nothing to protect — then say so honestly with a record, which is course four, rather than dressing it up in forty lines of ceremony that pretends to be encapsulating something.",
}
