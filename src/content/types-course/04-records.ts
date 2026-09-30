import type { Section } from '../types'

export const recordsSection: Section = {
  id: 'records',
  title: 'Records — a name for a shape',
  scene: 'records',
  slide: `## One line, and the compiler writes the rest

\`\`\`java
record Order(String id, int qty) {}
\`\`\`

### What's generated
\`private final\` fields · the **canonical constructor** · accessors \`id()\`/\`qty()\` (**no \`get\`**) · \`equals\` and \`hashCode\` over **all components** · \`toString\`

That's course 3 §10, generated **correctly**, for free.

### What it costs
- **Implicitly \`final\`**, and it **can't extend** anything — records are leaves. It *can* implement interfaces.
- The header **is** the API. A record that wants to hide a field is the wrong tool.
- No extra fields. Static factories and methods are fine.

### "Immutable" is **shallow**
The *fields* can't be reassigned; a \`List\` component still can be mutated by whoever passed it. **§5** fixes that.

### Use it for
DTOs, events, keys, coordinates, multiple return values.`,
  narration:
    "Records arrived in Java 14 and they are the single biggest reduction in Java boilerplate in the language's history. Record Order, open paren, String id, int qty, close paren, empty braces. One line. From it the compiler generates a private final field for each component, a constructor taking all of them in order — that's called the canonical constructor — an accessor per component, equals and hashCode computed over all the components, and a toString that prints Order square bracket id equals A-1, qty equals 2. Notice the accessors are called id and qty, not getId and getQty. Records deliberately dropped the JavaBean convention, and that's the modern style. So everything you had to write by hand in course three section ten — the equals, the hashCode, the toString, the getters — is generated, and generated correctly, which is more than can be said for most hand-written versions. Now what it costs, because a record isn't free. A record is implicitly final and cannot extend any class. Records are leaves in a hierarchy, never nodes. They can implement interfaces, which matters a lot for the sealed types we're coming to. Second, the header is the public API. The components are public by definition — you can't have a record with a hidden field. If your type needs to hide something, a record is the wrong tool and you want a class. And you cannot add instance fields beyond the components; everything the record holds is in that header. What you can add is static factory methods, instance methods that compute things, and interface implementations. Then the caveat that catches people, and it's important. Records are immutable, but only shallowly. What's guaranteed is that the fields cannot be reassigned. If one of your components is a List, the record holds a reference to a list that somebody else also holds a reference to, and they can go on adding to it all day. Your immutable record now changes behind your back. Section five is how you close that. So when do you reach for a record? When the type is data with no invariant to hide. Data transfer objects, events, map keys, coordinates, results. And a small but lovely use: returning two things from a method. Instead of an out-parameter or a two-element array, declare a one-line record right there. When there is a rule to defend, go back to a class.",
}
