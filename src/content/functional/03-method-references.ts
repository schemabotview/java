import type { Section } from '../types'

export const methodReferences: Section = {
  id: 'method-references',
  title: 'Method references — the four forms',
  scene: 'lambda-syntax',
  slide: `## When the lambda only calls one thing

\`o -> o.qty()\` says "take an \`o\`, call \`qty()\` on it" — all noise. \`Order::qty\` says it once.

### The four forms
1. **Bound** — \`System.out::println\`. A method on **that particular object**
2. **Static** — \`Integer::parseInt\`
3. **Unbound** — \`String::toUpperCase\`. An instance method of an **arbitrary object of the type**: the **argument becomes the receiver**
4. **Constructor** — \`ArrayList::new\`, \`Order[]::new\`

### Form 3 is the one people half-know
As a \`Function<String, String>\`, \`s -> s.toUpperCase()\` and \`String::toUpperCase\` are the same thing — the argument supplies the receiver. That's why \`Order::qty\` works as a \`Function<Order, Integer>\` with no parameter written anywhere.

### When **not** to
Only when the lambda does **nothing but** call that method. \`o -> o.qty() * 2\` can't be one. And \`this::handle\` reads worse than \`x -> handle(x)\` when the method name isn't self-explanatory — it's shorthand, not a goal.`,
  narration:
    "A method reference is shorthand for a lambda whose entire body is one method call. When you write o arrow o dot qty, you've named the parameter twice and added an arrow, to express take an order and call qty on it. Order colon colon qty says that once. There are four forms, and they're worth distinguishing because three are obvious and the fourth is the one people half-know. Form one is a bound reference: System dot out colon colon println. Here you've named a specific object — System dot out — and a method on it. The resulting Consumer calls println on that exact object every time. Form two is a static method reference: Integer colon colon parseInt. Straightforward — the argument becomes the method's argument. Form four is a constructor reference: ArrayList colon colon new, and it gives you a Supplier that makes a new list each time it's called. There's an array version too, Order square-bracket square-bracket colon colon new, which you'll see in toArray. Form three is the interesting one. String colon colon toUpperCase. Now, toUpperCase is an instance method — it needs a receiver, a String to be called on. But we haven't named one. That's the point: this is an unbound reference, an instance method of an arbitrary object of that type, and the rule is that the first argument becomes the receiver. So as a Function from String to String, s arrow s dot toUpperCase and String colon colon toUpperCase are exactly equivalent. The argument that gets passed in is the thing the method gets called on. Once that clicks, a lot of stream code becomes readable, because it's why Order colon colon qty works as a Function from Order to Integer despite there being no parameter written anywhere. And it's why the same syntax, Type colon colon method, can mean either a static call or an unbound instance call — the compiler works out which from the signatures, and occasionally complains if a class has both. Finally, when not to use one. A method reference is only possible when the lambda does nothing but call that method. O arrow o dot qty times two cannot be one, because there's arithmetic after the call. And even when it's possible, it isn't automatically better. This colon colon handle reads worse than x arrow handle of x when the method name doesn't say what it does with its argument. It's shorthand for the reader's benefit, not a target to hit.",
}
