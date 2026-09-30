import type { Section } from '../types'

export const conditionals: Section = {
  id: 'conditionals',
  title: 'Conditionals & the two switches',
  scene: 'switch-forms',
  slide: `## One keyword, two different constructs

An \`if\` condition must be a **\`boolean\`** — no truthiness. **Always brace**: a braceless \`if\` with two indented lines runs only the first.

### The old \`switch\` statement
- **Falls through** unless you \`break\` — silently
- Produces **no value**
- **No exhaustiveness check** — a missed enum constant falls to \`default\`

### The \`switch\` expression (14+)
\`\`\`java
int days = switch (month) {
  case 1, 3, 5, 7, 8, 10, 12 -> 31;
  default                    -> 30;
};        // note the semicolon
\`\`\`
- **Is a value** · arrow arms **never fall through** · a block arm uses **\`yield\`**
- Over an **enum** it's checked **exhaustive** — add a constant and it stops compiling, which is the compiler finding your bug

**Prefer the arrow form.** Course 4 puts patterns in those labels.`,
  narration:
    "Branching. If, else if, else — structurally familiar, with one Java-specific rule: the condition must be an actual boolean. There is no truthiness. You cannot write if of a list and have a non-empty list count as true, you cannot write if of a number. It is a boolean or it is a compile error, and honestly that removes a category of bug. One piece of style advice that is really a safety rule: always use braces, even for a single statement. A braceless if followed by two indented lines runs only the first one, and the indentation lies to you about that. Java does not care about your whitespace. Now switch, and the important thing to understand is that Java now has two constructs sharing one keyword, and they behave differently. The old one is the switch statement, on the left. Its defining behaviour is fall-through: when a case matches, execution continues into the following cases until it hits a break. Occasionally that is useful — stacking several case labels that share a body — but overwhelmingly it is a bug, and it is a silent one, because forgetting a break is not an error. The old switch also produces no value, so you declare a variable above it and assign into each arm, and if you forget the default, the compiler may tell you the variable might not have been assigned. And it does not check exhaustiveness: switch over an enum, miss one constant, and that constant quietly falls to default. Java 14 added the switch expression, on the right, and it fixes all three. Write it with an arrow instead of a colon and it becomes an expression that produces a value — int days equals switch, and note the semicolon at the end, because it is an assignment. Arrow arms never fall through, so there are no breaks at all. Multiple labels go on one arm separated by commas. If an arm needs several statements, use a block and the keyword yield to produce its value. And over an enum, the compiler checks exhaustiveness: if you have covered every constant you do not even need a default, and if someone later adds a new constant to that enum, every exhaustive switch over it stops compiling until it is handled. That is not an inconvenience, that is the compiler finding your bug before your users do. So: prefer the arrow form everywhere. And hold that thought, because in course four we will put patterns inside those case labels, and this construct becomes the main way you take apart data in modern Java.",
}
