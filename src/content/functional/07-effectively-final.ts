import type { Section } from '../types'

export const effectivelyFinal: Section = {
  id: 'effectively-final',
  title: 'Capture & effectively final',
  scene: 'capture',
  slide: `## "must be final or effectively final"

\`\`\`java
int limit = 100;
Predicate<Order> p = o -> o.qty() > limit;
limit = 200;   // ERROR — on the ASSIGNMENT
\`\`\`
**Effectively final** = you never reassign it, whether or not you wrote \`final\`.

### Why — captured **by value**
The local lives on the **stack frame**. The lambda is an **object on the heap** holding a **copy**, and it **outlives the frame**. Two copies that could drift apart would be a silent bug — so Java forbids the change instead.

### What you *can* still mutate
- **Fields.** A lambda captures \`this\` and reads the field **live**. Fine — and a **data race** in a parallel stream.
- **The object's contents.** A \`final List\` can still be added to.

### Don't smuggle a counter out
\`int[] c = {0}\` and \`AtomicInteger\` both compile, and both mean you wanted a \`reduce\` (course 8).`,
  narration:
    "Every Java developer meets this error message in their first week of lambdas: local variables referenced from a lambda expression must be final or effectively final. Here's what it means and, more usefully, why. Effectively final means you never reassign the variable after initialising it, whether or not you wrote the word final. Since Java 8 you don't have to write final — the compiler works out whether you could have. So the code on the slide compiles fine up until the line limit equals two hundred, and that's where the error appears. Note that: the error is reported on the reassignment, not on the lambda. Which is the compiler telling you the truth about what's wrong. Now why. Look at the diagram. Limit is a local variable, so it lives in the method's stack frame. The lambda is an object, and it lives on the heap. When the lambda is created, the value of limit is copied into it — captured by value. And the lambda can outlive the method entirely: you might return it, or store it, or hand it to a thread pool, and by the time it runs, that stack frame is long gone. So there are now two copies of the value, with different lifetimes. If Java let you change the original, the lambda would carry on using the old one, and you'd have two things that look like the same variable quietly disagreeing. Java could have made that work by boxing the variable, as some languages do — but it chose to forbid the reassignment instead, so the copy can never diverge. One restriction, no surprises. Now, what you can still mutate, because this is where it gets subtle. Fields are not captured. When a lambda uses a field, it captures this — the enclosing object — and reads the field live, every time it runs. So this dot limit can be reassigned all day and the lambda sees the new value. That's legal, it's occasionally what you want, and it's also a data race waiting to happen the moment that lambda runs in a parallel stream. And the object's contents are not protected either: a final List is still a mutable list, and the lambda can add to it. Which brings us to the thing not to do. People discover that a one-element array, int square bracket count equals brace zero, compiles inside a lambda — because the array reference never changes, only its contents. Same with AtomicInteger. Both work. Both are a sign that you wanted a reduce or a collector, which is course eight, and that you're writing an accumulation as a side effect. In a sequential stream it's merely ugly. In a parallel one it's a race.",
}
