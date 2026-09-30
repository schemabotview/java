import type { Section } from '../types'

export const gotchas: Section = {
  id: 'gotchas',
  title: 'Gotchas — erasure showing through',
  scene: 'gotchas',
  slide: `## Six shapes to recognise

**1. Invariance.** \`List<Object> l = listOfStrings\` won't compile (§2) — and that's the compile-time fix for course 2 §8's \`ArrayStoreException\`.

**2. No array of \`T\`.** \`new T[n]\` is illegal. The standard workaround is \`(T[]) new Object[n]\` with \`@SuppressWarnings("unchecked")\` — **keep that array \`private\`**; hand it out as a \`T[]\` and the caller gets a \`ClassCastException\`.

**3. Clashing erasures.** \`f(List<String>)\` and \`f(List<Integer>)\` both erase to \`f(List)\` — not an overload, a **compile error**.

**4. Raw types poison.** One raw \`List\` variable turns generic checking **off** for *every* generic call on it, not just the one you meant. The only symptom is a warning.

**5. Generic varargs.** The array is unchecked. \`@SafeVarargs\` asserts *"I don't store or expose it"* — only add it when that's true.

**6. Need the type at run time?** Pass it: \`<T> T read(String json, Class<T> type)\`. That's the **type token**, and it's how every JSON library works.`,
  narration:
    "Six shapes worth recognising, and every one is erasure showing through somewhere. One: invariance, which we covered in section two. List of Object equals a List of String does not compile, and I want to name again what that buys, because it's the course's best moment. Course two section eight showed arrays being covariant and throwing ArrayStoreException at run time. Generics refuse the same thing at compile time. That is the whole thesis of generics in one comparison. Two: you cannot make an array of a type parameter. New T of n is illegal because there's no T at run time to give the array a component type. The standard workaround, and you'll see it in the source of ArrayList itself, is to allocate an Object array and cast it to T array, with a SuppressWarnings unchecked on it. That's safe on one condition: the array must stay private. Inside your class every element really is a T, so nothing goes wrong. But if you return it as a T array, the caller receives something whose actual runtime type is Object array, and the very first time they use it as a T array they get a ClassCastException from a line that looks innocent. Keep it private. Three: two overloads whose parameters erase to the same signature. F taking a List of String and f taking a List of Integer both erase to f taking a List, so they aren't overloads at all — they're a duplicate method, and it's a compile error with a message about the same erasure that confuses people the first time. Four, and this is the one that bites real codebases: raw types poison. If you declare a variable as a bare List with no type argument, you don't just lose checking for that one line. Every generic call on that variable is unchecked, including ones that have nothing to do with the element type. The compiler warns and carries on, and nobody reads warnings. The fix is simple — never write a raw type; if you truly don't care what's in it, write List of question mark, which is checked. Five: generic varargs. When you write T dot dot dot, the compiler has to create an array of T, which we just said it can't really do — so it creates one and warns. At SafeVarargs is your assertion that the method doesn't store that array anywhere or hand it out, which makes it safe. Only write it when that's actually true. And six, the practical escape hatch for all of it. If you genuinely need the type at run time, pass it as a value: a method taking a Class of T alongside the data. That's called a type token, and it's how every JSON library in Java works — objectMapper dot readValue of json comma Order dot class. You're handing the runtime the type that erasure took away.",
}
