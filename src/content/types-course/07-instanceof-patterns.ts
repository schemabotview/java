import type { Section } from '../types'

export const instanceofPatterns: Section = {
  id: 'instanceof-patterns',
  title: 'Pattern matching for instanceof',
  scene: 'patterns',
  slide: `## Test and bind, in one step

\`\`\`java
// before 16 — the type named 3×, plus a cast
if (o instanceof Order) {
    Order ord = (Order) o;
    total += ord.qty();
}

// 16+ — a type pattern
if (o instanceof Order ord) total += ord.qty();
\`\`\`
The cast that **could never fail** is gone, and with it the chance of getting it wrong.

### Flow scoping
\`ord\` is in scope exactly where the compiler can **prove the test passed**:
\`\`\`java
if (!(o instanceof Order ord)) return;
total += ord.qty();      // still in scope
\`\`\`
That guard-clause shape is the one you'll reach for constantly.

### And it's still \`instanceof\`
**\`null\` is never \`instanceof\` anything** — so a pattern is a null check too. That's what makes course 3 §10's \`equals\` a one-liner.`,
  narration:
    "The first rung of the pattern-matching ladder, and it's a small change with a large effect. Look at the before. If o instanceof Order, then inside the block, Order ord equals open paren Order close paren o. You've named the type Order three times and written a cast that cannot possibly fail — the instanceof just proved it. That cast is pure noise, and it's noise you can get wrong, because nothing stops you casting to a different type than the one you tested. Java 16 added the type pattern. If o instanceof Order ord — you name a variable right there in the test. If the test passes, ord is already an Order, already assigned. The cast is gone. Now the genuinely clever part, which is called flow scoping. The variable is in scope wherever the compiler can prove the test succeeded, and the compiler is quite good at that. So in an if with double-ampersand, the right-hand side can already use it, because double-ampersand only evaluates the right if the left was true — that's the short-circuiting from course two. More usefully, look at the third example. If not open paren o instanceof Order ord close paren, return. The pattern is inside a negation, so the variable is not in scope inside the if — but it is in scope after it, because the only way to reach that line is for the test to have passed. That's the guard-clause shape: reject the wrong type early and then carry on with a properly typed variable, no nesting. You'll write that constantly. One more property, inherited from plain instanceof and worth stating explicitly: null is never instanceof anything. Not instanceof Object, not instanceof String, never. Which means a type pattern is a null check as well as a type check, and that is exactly what makes the equals method from course three section ten a one-liner. If not open paren o instanceof Order x close paren return false — that single line handles null, handles the wrong type, and gives you a typed variable for the comparison that follows. Three problems, one test.",
}
