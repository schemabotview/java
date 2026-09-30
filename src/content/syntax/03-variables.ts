import type { Section } from '../types'

export const variables: Section = {
  id: 'variables',
  title: 'Variables, final & var',
  scene: 'var-inference',
  slide: `## Declare, assign, decide what may change

### \`final\` locks the **reference**, not the object
\`\`\`java
final List<Order> os = new ArrayList<>();
os.add(o);        // fine — the list is mutable
os = otherList;   // error — can't be rebound
\`\`\`
Free on locals and parameters; it removes a question from the reader.

### \`var\` — inferred, still **static**
The compiler takes the type from the **initialiser**. \`var\` is **not** \`Object\`, and Java is **not** dynamically typed — you just didn't type it twice.

### The five refusals
No initialiser · \`= null\` · a bare lambda · an array initialiser · **fields and parameters**. Each has **nothing to infer from**.

### The judgement call
\`var\` helps when the right side says the type (\`new ArrayList<Order>()\`), hurts when it doesn't — \`var result = svc.process(in);\` sends the reader hunting.`,
  narration:
    "A variable declaration in Java is three things: a type, a name, and usually an initialiser. Int count equals zero. The type comes first, which is the visible difference from Python, and it is not optional — every variable has a type known at compile time. Then final, which is worth adopting as a habit. Final on a variable means it may be assigned exactly once. Try to reassign it and the compiler stops you. But be precise about what it locks, because this is misunderstood constantly: final locks the variable, not the object. If you declare a final List and then call add on it, that is completely fine — the list's contents are not protected at all. What is forbidden is pointing that variable at a different list. Final means the binding cannot be rebound, not that the thing is immutable. Use it freely on locals and on method parameters; it costs nothing at runtime and it removes a question from the reader's mind. Now var, which arrived in Java 10, and which is where a lot of Java's old verbosity actually went away. Before var, you wrote ArrayList of Order, orders, equals, new ArrayList of Order — the type twice, on one line. With var you write var orders equals new ArrayList of Order, and the compiler infers the type from the right-hand side. And here is the sentence to hold onto: var is not Object, and Java did not become dynamically typed. The type is still fixed, still checked at compile time, still exactly ArrayList of Order. You simply did not type it a second time. Look at the refusals in the lower half of the card, because they all have one cause: there is nothing to infer from. Var with no initialiser — nothing to look at. Var equals null — null has no type of its own. Var equals a bare lambda — a lambda needs a target type to know what it is. An array initialiser in braces, same problem. And var is never allowed for fields or method parameters, only for locals, because a field's type is part of your class's public shape and should be written down. Finally, the judgement call, because this is where teams argue. Var helps when the right-hand side already states the type — new ArrayList of Order tells you everything. Var hurts when the right-hand side is a method call: var result equals service dot process of input tells the reader nothing at all, and now they have to go and open that method to find out what they are holding. Var hides the type from the reader, never from the compiler. Write it for the reader.",
}
