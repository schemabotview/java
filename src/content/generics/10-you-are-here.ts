import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here — reading a real signature',
  scene: 'why-generics',
  slide: `## Everything in the course, in one line

\`\`\`java
static <T, R> List<R> mapAll(
        Collection<? extends T> src,
        Function<? super T, ? extends R> f)
\`\`\`
**Two** parameters declared by the **method** (§4) · \`src\` **produces** \`T\`s ⇒ \`? extends\` (§6) · \`f\` **consumes** \`T\` and **produces** \`R\` ⇒ both (§7) · a concrete \`List<R>\` out, because the caller uses it.

Once that reads as a sentence, the standard library opens up.

### The course
**§1** the error moves to compile time · **§2** invariance · **§3–4** where the parameter is declared · **§5** a bound is a promise both ways · **§6–7** PECS · **§8** erasure · **§9** its six symptoms

### Rules
Never a **raw** type · \`? extends\` to read, \`? super\` to write · a **generic method** when one call needs it · a **\`Class<T>\` token** for the run time

### Next
Course 7 — that \`Function<T, R>\` is an **interface with one method**.`,
  narration:
    "Let's finish by reading a real signature, because that's the actual skill this course was for. Static, angle bracket T comma R, List of R, mapAll, taking a Collection of question mark extends T, and a Function from question mark super T to question mark extends R. A year ago that was noise. Now read it piece by piece. The angle bracket T comma R before the return type: this is a generic method declaring two of its own type parameters, and it has to, because it's static — that's section four. Collection of question mark extends T: this parameter produces values the method reads, so producer extends — section six. And it means the method accepts a List of Order, a Set of Order, or a Collection of any subtype of T, rather than exactly one type. Function of question mark super T to question mark extends R: the function consumes a T and produces an R, so super on the input and extends on the output — that's PECS applied twice in one type, section seven. And the return type is a plain List of R with no wildcard, because the caller is going to use it, and pushing a wildcard onto them would just move the awkwardness. Four sections of this course, in one signature. And once that reads as a sentence rather than as punctuation, the whole standard library opens up — because every stream method, every Optional method, every Collections utility is written in exactly this vocabulary. So, the course. Section one: generics move an error from run time to compile time, and delete the casts. Two: they're invariant, and that refusal is necessary — it's the compile-time fix for the array covariance hole. Three and four: where the type parameter is declared, on the class or on the method, and static methods must declare their own. Five: a bound is a two-way promise, and it's what lets the body call anything at all. Six and seven: PECS — producer extends, consumer super, and plain T when you do both. Eight: erasure, the one decision behind every restriction. Nine: its six symptoms. Practical rules to carry: never write a raw type. Question mark extends on parameters you read, question mark super on parameters you write. Prefer a generic method to a generic class when only one call needs the type. And pass a Class token when you genuinely need the type at run time. Next is course seven, functional Java. And there's a nice hand-off: that Function of T to R we just read is an interface with exactly one abstract method — course three section nine called that a functional interface — and a lambda is simply how you write one without the ceremony.",
}
