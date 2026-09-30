import type { Section } from '../types'

export const optionalSection: Section = {
  id: 'optional',
  title: 'You are here — Optional',
  scene: 'optional',
  slide: `## A container of zero or one — and it **composes**

\`\`\`java
String name = repo.findById(id)   // Optional<Order>
        .map(Order::customer)
        .flatMap(Customer::email) // already Optional
        .orElse("unknown");
\`\`\`
Absent at **any** step and the whole chain is absent. **No null checks** — that's the point, not \`isPresent\`.

\`orElseGet(…)\` is **lazy** (course 7 §5) · \`.stream()\` drops empties inside a \`flatMap\`

### The anti-patterns
\`if (o.isPresent()) use(o.get())\` — a null check, wordier · a **field** — not \`Serializable\` · a **parameter** — now every caller must wrap · \`orElse(new Order())\` — **eager**

> It's a **return type**: "this may legitimately find nothing."

### The course
**§1–2** a lazy recipe · **§3–7** create, transform, finish · **§8** identity and associativity · **§9** downstream collectors · **§10** measure first`,
  narration:
    "Optional closes the course, and it belongs here for two reasons: findFirst returns one, and it behaves like a stream of at most one element. Here's what it's for. A method that might legitimately find nothing used to return null, and null tells the caller nothing — it isn't in the signature, the compiler doesn't mention it, and the only way to know is to read the documentation or get a NullPointerException. Optional of Order in the return type says, in the type system, this may find nothing, and you must decide what that means. But the value isn't the isPresent method. The value is that it composes. Look at the chain. Find an order by id — that gives an Optional of Order. Map to the customer — still an Optional, now of Customer. FlatMap to the email, and it's flatMap rather than map because Customer dot email itself returns an Optional and map would leave you holding an Optional of Optional. Map to lowercase. Then orElse to supply a default. And if anything in that chain is absent — no order, no customer, no email — the whole expression is absent and you get the default. There is not one null check in it. That's the point. The useful methods: ifPresent and ifPresentOrElse for doing something; orElse for a plain default; orElseGet taking a supplier, which is lazy — course seven section five, and it matters when the default is expensive; orElseThrow taking a supplier of an exception; and stream, added in Java 9, which lets you flatMap a stream of Optionals down to just the present values. Now the anti-patterns, because Optional is misused a lot. First and worst: if o dot isPresent, then use o dot get. That is a null check with more typing and no safety gained. If you're calling get, you've thrown away the entire benefit. Second: don't use Optional for a field. It isn't Serializable, it costs an extra object per instance, and null in a private field is fine — that's what it's for. Third: don't use it for a parameter. It forces every caller to wrap, including the ones who definitely have a value, and an overload or a null-tolerant method is kinder. Fourth: orElse of new Order allocates that object on every call, even when the Optional has a value. OrElseGet with a lambda doesn't. So the one-line rule: Optional is a return type. Use it when a method may legitimately find nothing. Now the course. Sections one and two: a pipeline is a lazy recipe, and the terminal pulls elements through one at a time. Three to seven: creating, transforming and finishing — and which operations are stateful. Eight: reduce, and why identity and associativity are correctness conditions rather than trivia. Nine: collectors, and the downstream argument that makes groupingBy read like SQL. Ten: parallel, and measure before you use it. Next is course nine, exceptions and I/O — starting with the checked exception that wouldn't fit in a lambda.",
}
