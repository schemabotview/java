import type { Section } from '../types'

export const recordValidation: Section = {
  id: 'record-validation',
  title: 'Compact constructors & real immutability',
  scene: 'records',
  slide: `## The one place a record gets an opinion

\`\`\`java
record Order(String id, int qty, List<Tag> tags) {
    Order {                   // COMPACT — no parameters
        if (qty <= 0) throw new IllegalArgEx();
        id = id.strip();      // normalise. No this.
        tags = List.copyOf(tags);    // defensive copy
    }
}
\`\`\`

### How it works
The body runs **before** the fields are assigned, over the **parameters** — so assigning to \`id\` rewrites what gets stored, and the compiler appends the field assignments. **Don't write \`this.id = …\`.**

### The defensive copy is the whole game
Without \`copyOf\`, the caller still **holds the list they passed in**. The field is immutable; its **contents** aren't. Copy **in** and **out**.

### Also
Override an accessor · add \`static\` factories · add derived methods.`,
  narration:
    "A record generates a constructor that just assigns the fields. Usually that's what you want. But sometimes a record needs to validate, or normalise, or defend itself — and the compact constructor is where that goes. Look at the syntax, because it's unusual. You write the record's name, then a brace. No parameter list at all. That's what compact means, and it's the visual signal that this is not a normal constructor. Inside it, you're operating on the parameters, before any field has been assigned. So the first line checks qty and throws if it's not positive — and because the canonical constructor is the only way to make one, that check cannot be bypassed. Any Order that exists anywhere has a positive quantity. The second line is the one that surprises people. Id equals id dot strip. You're assigning to the parameter. That's deliberate: the compiler inserts the field assignments after your body, so whatever the parameters hold at the end of the compact constructor is what gets stored. So you can normalise on the way in — trim whitespace, lowercase, round. And the rule that goes with it: do not write this dot id equals something in a compact constructor. That's the syntax for the full canonical constructor, and writing it here either fails to compile or misses the point. Now the third line, which is the whole reason this section exists. Tags equals List dot copyOf of tags. Remember from section four that a record's immutability is shallow. If a caller builds an ArrayList, passes it to your constructor, and then keeps adding to it, your supposedly immutable record changes behind your back — and worse, since equals and hashCode are computed over that list, a record you used as a map key has just moved buckets. List dot copyOf makes an independent unmodifiable copy, and now nothing outside can reach it. Copy on the way in. And if you also hand the collection back out, copy on the way out too, or return an unmodifiable view — otherwise the accessor is the getter that leaks, from course three section five. A few other things records allow. You can override an individual accessor if it should do something on the way out. You can add static factory methods, which is the idiomatic way to give a record an alternative or friendlier constructor. You can add ordinary instance methods that compute things from the components. Records can be generic, and the last component can be varargs. What you cannot add is another field.",
}
