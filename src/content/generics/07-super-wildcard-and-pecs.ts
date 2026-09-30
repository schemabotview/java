import type { Section } from '../types'

export const superWildcardAndPecs: Section = {
  id: 'super-wildcard-and-pecs',
  title: '? super T and PECS',
  scene: 'pecs',
  slide: `## The consumer: you may **write**, not usefully read

\`List<? super Integer>\` — some unknown **supertype**: \`List<Integer>\`, \`List<Number>\`, \`List<Object>\`.
\`add(1)\` is **safe**; \`get\` gives only **\`Object\`**, all they're guaranteed to share.

### PECS — **P**roducer **E**xtends, **C**onsumer **S**uper
Ask what the parameter does **for the method**:
**produces** values you read ⇒ \`? extends T\` · **consumes** values you write ⇒ \`? super T\` · **both** ⇒ plain \`T\`

\`\`\`java
void forEach(Consumer<? super T> action)
Optional<U> map(Function<? super T, ? extends U> f)
\`\`\`
That \`super\` is why \`list.forEach(printAnyObject)\` compiles.

### Two notes
Wildcards belong on **parameters** — a returned wildcard forces the *caller* to deal with it. And \`List<?>\` is still checked; a **raw** \`List\` turns checking **off** (§9).`,
  narration:
    "Question mark super is the mirror image. List of question mark super Integer means a list of some unknown supertype of Integer. So a List of Integer fits, a List of Number fits, and a List of Object fits. And the permissions flip. Writing is safe: xs dot add of one works, because whatever that unknown supertype is, an Integer is assignable to it. You're putting something specific into something more general, which is always fine. Reading is the problem. What type do you get back from get? The compiler only knows the element type is somewhere above Integer — it might be Number, it might be Object. The only thing it can guarantee is Object, so that's what get returns, and you're back to casting. Hence: a super-wildcard list is for writing into. Now the mnemonic, which is genuinely worth memorising because it makes every one of these decisions automatic. PECS: Producer Extends, Consumer Super. And the key to applying it is to ask what the parameter does for your method, not what it is in the abstract. If the parameter produces values that your method reads out of it, it's a producer, and you write question mark extends T. If the parameter consumes values that your method writes into it, it's a consumer, and you write question mark super T. And if your method both reads and writes the same parameter, neither wildcard works, and you use a plain T with no wildcard at all. Look at the three signatures on the slide, because they're from the standard library and they should now read like sentences. Collections dot copy takes a destination of question mark super T — it writes there — and a source of question mark extends T — it reads from there. ForEach takes a Consumer of question mark super T, and that super is why you can pass a Consumer of Object to a List of String's forEach; a thing that can print any Object can certainly print a String. And Optional dot map takes a Function from question mark super T to question mark extends U, which is both wildcards in one signature, for exactly the same reasons. Two closing notes. Wildcards belong on parameters and only rarely on return types — returning a wildcard pushes the awkwardness onto every caller instead of containing it in your method. And List with a bare question mark, the unbounded wildcard, means a list of something, unknown: you can read Object out and put only null in. That is still far better than a raw List, because a raw type turns checking off entirely, and that's the next section but one.",
}
