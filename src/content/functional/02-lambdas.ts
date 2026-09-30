import type { Section } from '../types'

export const lambdas: Section = {
  id: 'lambdas',
  title: 'Lambdas — syntax & target typing',
  scene: 'lambda-syntax',
  slide: `## The shortest form that still compiles

\`\`\`java
(Order o) -> { return o.qty() > 100; }  // full
o -> o.qty() > 100     // inferred, braces dropped
() -> log.info("hi")   // no params — parens required
(a, b) -> a + b
\`\`\`
One inferred parameter needs **no parentheses**. A single-expression body needs **no braces and no \`return\`** — the expression **is** the result.

### Target typing — a lambda has **no type of its own**
\`\`\`java
Predicate<Order> p = o -> o.qty() > 100;
Function<Order, Boolean> f = o -> o.qty() > 100;
\`\`\`
**Identical text, two types.** The context decides — which is why a lambda can't go in a \`var\`, and why your parameter types get inferred at all.

### Inside
\`this\` is the **enclosing** object, unlike an anonymous class. And a **checked exception won't fit** unless the interface declares it — §10's real cost.`,
  narration:
    "The syntax is small, and it's mostly about how much you're allowed to leave out. The full form is parentheses with a typed parameter, arrow, a braced block with a return. From there, three things drop away. If the compiler can infer the parameter type — and it almost always can, from the target type — you omit the type. If there's exactly one parameter and its type is inferred, you can drop the parentheses too. And if the body is a single expression, you drop the braces and the return keyword, and the expression's value is the result. So the four-line version collapses to o arrow o dot qty greater than one hundred. Two details. With no parameters you still need empty parentheses, so it's open-paren close-paren arrow. And you can write var on the parameters if you want to attach an annotation to one, though that's rare. Now target typing, which is the concept worth holding onto. A lambda has no type of its own. Look at the two assignments: identical text on the right-hand side, and two completely different types on the left — a Predicate of Order, and a Function from Order to Boolean. Both compile. The lambda means whatever the context needs it to mean. That has two consequences you'll meet. First, you cannot assign a lambda to var, because var infers from the right and there's nothing on the right to infer. The compiler will tell you so. Second, it's exactly how your parameter types get inferred: the compiler looks at the target interface's single method, reads the parameter types from there, and applies them. Two smaller points. Inside a lambda, this refers to the enclosing object — the class you're writing in. That's a deliberate difference from an anonymous class, where this refers to the anonymous instance itself, and it's usually what you want. And a lambda body is not a new scope in the way a class body is; it's more like a block. So you cannot declare a variable with the same name as a local from the surrounding method, because that would be shadowing something still in scope. Last, a limitation that will come up properly in section ten but which you should see coming. A lambda can only throw a checked exception if the functional interface's method declares it. Function doesn't. Neither does Predicate or Consumer. So the moment your lambda body calls something that throws IOException, you're stuck with a try-catch inside the lambda, and that's the single most awkward thing about functional style in Java.",
}
