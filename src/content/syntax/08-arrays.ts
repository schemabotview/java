import type { Section } from '../types'

export const arrays: Section = {
  id: 'arrays',
  title: 'Arrays — and a hole in the type system',
  scene: 'array-covariance',
  slide: `## The one fixed-size container

\`\`\`java
int[] counts = new int[3];   // {0,0,0} — never null
String[] ids = {"A-1", "A-2"};
ids.length                   // a FIELD, not a method
\`\`\`

- **Size is fixed.** "Growing" is \`Arrays.copyOf\` — a new array and a copy
- \`ids.toString()\` prints \`[Ljava.lang.String;@1b\` — use **\`Arrays.toString\`**, and \`Arrays.equals\`
- \`new int[3][4]\` is an **array of arrays**, not a matrix

### The hole: arrays are **covariant**
\`\`\`java
Object[] objs = ids;  // String[] IS-A Object[] (!)
objs[0] = 42;         // ArrayStoreException at RUN time
\`\`\`
A 1995 concession made because generics didn't exist. It moves a **type** error to run time — and a \`List\` refuses the same thing at compile time. **That refusal is course 6.**

**In practice: use \`List\`.**`,
  narration:
    "Arrays are Java's one fixed-size container, and they sit slightly awkwardly in the language — they predate generics and they behave differently from everything else. Declaration is int square-bracket square-bracket counts equals new int of three. Note two things straight away. A new array of a primitive type comes back zeroed — three zeros, not nulls and not garbage. A new array of a reference type comes back full of nulls. And length is a field, not a method: it is ids dot length with no parentheses, whereas a String uses dot length with parentheses and a List uses dot size. That inconsistency is historical and you simply memorise it. The size is fixed at creation and cannot change. Growing an array means Arrays dot copyOf, which allocates a new one and copies, and if you find yourself doing that, what you actually wanted was a List. A couple of practical traps. Calling toString on an array does not print its contents — it prints something like bracket L java dot lang dot String semicolon at 1b, which is the type name and a hash. Use Arrays dot toString. Similarly double-equals on two arrays compares identity, not contents; use Arrays dot equals, or Arrays dot deepEquals for nested ones. And new int of three of four is not a matrix — it is an array of three references, each pointing at its own array of four ints. The rows are separate objects and they are allowed to have different lengths, which is occasionally useful and frequently surprising. Now the interesting part, and the reason this section exists rather than being a footnote. Arrays are covariant. That means a String array is considered to be an Object array, and this line compiles: Object array objs equals ids, where ids is a String array. Now write objs of zero equals forty-two. That also compiles — objs is an Object array, and forty-two boxes to an Integer, which is an Object. But at runtime the array knows it really holds Strings, and you get an ArrayStoreException. So the type system let a type error through to runtime. This was a deliberate concession in 1995, made because generics did not exist yet and without covariance you could not write a method that sorted any array. And the fix is the whole argument for generics: a List refuses the same thing at compile time. List of String is simply not a List of Object, and the assignment does not compile. Hold onto that, because it is exactly where course six begins. The practical advice: in application code, use List. Reach for arrays when you need primitives in a hot loop without boxing, when you are writing varargs, and when an API hands you one.",
}
