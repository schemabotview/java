import type { Section } from '../types'

export const functionBifunction: Section = {
  id: 'function-bifunction',
  title: 'Function & BiFunction',
  scene: 'four-interfaces',
  slide: `## Takes a value, returns one

\`\`\`java
Function<Order, Integer> qty = Order::qty;
BiFunction<Order, Integer, Long> total =
        (o, price) -> (long) o.qty() * price;
\`\`\`
\`Function\` is the shape behind \`map\` — **everywhere**: \`Stream.map\`, \`Optional.map\`, \`CompletableFuture.thenApply\`.

### \`UnaryOperator<T>\` when both ends match
It **extends** \`Function<T, T>\` and adds nothing — it exists so the signature reads better. \`BinaryOperator<T>\` is what \`reduce\` takes.

### Primitive variants — boxing you don't pay
\`Function<Integer, Integer>\` **boxes twice per call**. Over a million elements that's two million allocations for nothing. Hence \`IntUnaryOperator\`, \`ToIntFunction<T>\`, \`IntFunction<R>\`.

That's why the package has forty interfaces: four shapes × arity × primitives.`,
  narration:
    "Function is the most general of the four shapes: it takes a value and returns one. Function of Order to Integer, with a single method called apply. Note that the type parameters are input first, output second, which reads naturally. BiFunction is the two-argument version, with three type parameters: two inputs and an output. Function is the shape behind map, everywhere in Java. Stream dot map takes one. Optional dot map takes one. CompletableFuture dot thenApply takes one. Once you recognise it, those three methods are obviously the same idea applied to three different containers. Then UnaryOperator, which confuses people at first. UnaryOperator of String is a Function from String to String — it literally extends Function, adding nothing. So why does it exist? Purely so the signature reads better. A method that takes a UnaryOperator of T says I will transform a T into another T, in one type parameter instead of two repeated ones. BinaryOperator of T is the two-argument version, taking two Ts and returning a T, and it's what reduce takes in course eight. Now the primitive variants, and this is the bulk of java dot util dot function. If you write Function of Integer to Integer and call it in a loop over a million elements, you box the input and box the output — two million allocations, for nothing, because the value was an int at both ends. That's course two section two's cost, multiplied by your data size. So the library provides primitive-specialised versions. IntUnaryOperator takes an int and returns an int, no objects at all. ToIntFunction of T takes an object and returns a primitive int. IntFunction of R takes an int and returns an object. And there are Long and Double versions of each. That's the answer to why this package looks so cluttered when you first open it: it's these four shapes, times one or two arguments, times the primitive specialisations. Four ideas in forty interfaces. Two small built-ins worth knowing now. Function dot identity gives you a function that returns its argument unchanged — it looks pointless until you meet Collectors dot toMap, where you frequently want the element itself as the value. And every Function has andThen and compose for chaining, which is section eight.",
}
