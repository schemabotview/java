import type { Section } from '../types'

export const yourOwnFunctionalInterface: Section = {
  id: 'your-own-functional-interface',
  title: 'Writing your own',
  scene: 'four-interfaces',
  slide: `## Any interface with **one** abstract method

\`\`\`java
@FunctionalInterface
interface Validator<T> {
    List<String> validate(T value);     // the one

    default Validator<T> and(Validator<T> o) { … }
    static <T> Validator<T> none() { … }
}
\`\`\`
\`default\` and \`static\` **don't count** — which is how \`Predicate\` has \`test\` plus \`and\`, \`or\` and \`negate\`.

### \`@FunctionalInterface\` is a **check**
The build fails if a second abstract method is ever added. Always write it — otherwise someone adds one and **every lambda written against it breaks at once**.

### When to write one
The **name** carries meaning · you want **domain defaults** · **more than two** parameters · you need to **declare a checked exception** — the one real fix for §2's limitation.`,
  narration:
    "You're not limited to the library's interfaces. Any interface with exactly one abstract method is a functional interface, which means a lambda can be written for it — including interfaces that existed long before lambdas did. Runnable has one method. Comparator has one abstract method. Callable has one. That's why you can pass a lambda to a thread or to sort, and it wasn't a change to those types. Look at the Validator on the slide. One abstract method, validate, taking a value and returning a list of problems. And then a default method and a static one. Those don't count towards the limit, and that's not a loophole, it's the design: it's exactly how Predicate gets to have test as its one abstract method plus and, or and negate as defaults. Your own interfaces can do the same, and giving them composition methods is often what makes them pleasant. The at-FunctionalInterface annotation is optional, and you should always write it. It doesn't create anything — the interface is functional whether or not you annotate it. What it does is make the compiler check, and fail the build if the interface ever has a second abstract method. Without it, somebody adds a method next year in good faith, and every lambda anyone ever wrote against that interface stops compiling simultaneously, with no hint about what changed. So when should you write your own rather than reaching for Function? Four situations. First, when the name carries meaning. Validator of Order tells the reader what this is for; Function from Order to List of String tells them only its shape. In a domain API that difference is worth a file. Second, when you want domain-specific default methods, like the and above — that gives your callers composition for free and it lives with the concept. Third, when you need more than two parameters. The library stops at BiFunction, and there's deliberately no TriFunction; if you need three, you write it. And fourth, and this is the one that matters most in practice: when you need to declare a checked exception. Function dot apply doesn't declare any, so a lambda that calls something throwing IOException can't be a Function without wrapping it in a try-catch inside the lambda body. Declaring your own interface whose method throws IOException is the one real fix for that, and we'll come back to it in section ten.",
}
