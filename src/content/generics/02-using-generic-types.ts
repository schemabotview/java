import type { Section } from '../types'

export const usingGenericTypes: Section = {
  id: 'using-generic-types',
  title: 'Using generic types',
  scene: 'writing-generics',
  slide: `## Reading a type, and the diamond

\`\`\`java
Map<String, List<Order>> byId = new HashMap<>();
\`\`\`
Read it outside-in: a **Map** from **String** to **List of Order**. One line replacing a paragraph of comment.

### \`<>\` — the diamond
The right side infers from the left, so you write the arguments **once**. With \`var\` it goes the other way — name the type on the **right**:
\`\`\`java
var os = new ArrayList<Order>();   // not <>
\`\`\`

### Invariance — the rule that surprises everyone
\`\`\`java
List<Object> l = listOfStrings;   // will NOT compile
\`\`\`
\`List<String>\` is **not** a subtype of \`List<Object>\`. If it were, you could \`add\` an \`Integer\` through that view.

That's **course 2 §8's \`ArrayStoreException\`**, refused at compile time instead. **§6–7** give the flexibility back safely.`,
  narration:
    "Start with reading. Map of String to List of Order. Read it outside-in: it's a Map, its keys are Strings, and its values are Lists of Order. Generic types nest as deep as you like, and that one declaration replaces a paragraph of comment about what the map holds. You'll see three-level nestings in real code and they're readable once you get the habit of reading outward. Then the diamond, which is the empty angle brackets on the right of a new. Before Java 7 you had to write the type arguments twice — Map of String to List of Order on the left, and again on the right after new HashMap. That was pure noise, and the diamond removed it: write the arguments on the left, and new HashMap with empty angle brackets infers them. One subtlety worth knowing when you use var. With var, there's nothing on the left to infer from, so you must name the type on the right: var os equals new ArrayList of Order, with the type argument written out. Var equals new ArrayList with an empty diamond infers ArrayList of Object, which is almost certainly not what you wanted and will compile happily. Now the rule that surprises everyone, and it's the most important sentence in this section. Generics are invariant. List of String is not a subtype of List of Object. Even though String is absolutely a subtype of Object, the list types have no subtyping relationship at all, and the assignment is a compile error. That feels wrong until you see why. Suppose it were allowed. You take your List of String, assign it to a variable of type List of Object, and then — completely legally, because a List of Object accepts any Object — you add an Integer. Now your List of String contains an Integer, and the next line that reads a String out of it explodes. So the compiler forbids the assignment, because permitting it would make the type guarantee worthless. And you've seen this before. Course two section eight: arrays are covariant, a String array IS an Object array, and Java pushes that exact failure to run time as ArrayStoreException. Generics fixed it by refusing at compile time. The trade is that generics are now sometimes too rigid — you genuinely do want a method that accepts a list of any kind of Number. That's what wildcards are for, and that's sections six and seven.",
}
