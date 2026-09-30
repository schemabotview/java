import type { Section } from '../types'

export const methodsSection: Section = {
  id: 'methods',
  title: 'Methods & pass-by-value',
  scene: 'methods',
  slide: `## The signature is the name and the parameter types

The **return type is not part of it** — two methods differing only by return won't compile.

### Overloading
Same name, different parameter types; resolved at **compile time** by the argument's **static** type: **exact → widening → boxing → varargs**.
\`\`\`java
int sum(int... ns) { }   // varargs: really int[]
sum(); sum(1); sum(1, 2);
\`\`\`

### \`static\` vs instance
**\`static\`** belongs to the **class** — no object, no \`this\`.

### Java is pass-by-value. Always.
The argument is **copied**. For an object the *value* is the **reference**, so the copy points at the **same object**:
\`\`\`java
void rename(Order o) { o.setId("B-9"); } // SEEN
void swap(Order o)   { o = new Order(); } // NOT
\`\`\`
Mutating what it points at: visible. Rebinding the parameter: invisible.`,
  narration:
    "A method declaration reads left to right: modifiers, return type, name, parameter list, body. Public static int total, open paren, List of Order os, close paren. The word signature has a precise meaning here and it matters: the signature is the method's name plus its parameter types. The return type is not part of it. Which means you cannot have two methods with the same name and parameters that differ only in what they return — that will not compile, because at a call site the compiler would have no way to choose. Overloading is having several methods with the same name and different parameter types. The resolution happens entirely at compile time, using the static type of each argument, not the runtime type, and it tries in a fixed order: an exact match first, then widening — an int can widen to a long — then boxing, and only last varargs. So if you have log of int and log of Object and you call log of forty-two, you get log of int, because exact beats boxing. Varargs is the three-dots form: int sum, open paren, int dot dot dot ns. Inside the method ns is just an int array; at the call site you can pass any number of arguments, including none at all, which is the one to watch — sum with empty parentheses is legal and gives you an empty array. Then static versus instance. A static method belongs to the class itself. There is no object, there is no this, and it cannot touch instance fields. Main is static, which is why it can run before any object exists. An instance method needs an object to be called on, and inside it, this refers to that object. Now the last part, which is the single most argued-about sentence in Java, and the diagram from section two settles it. Java is pass-by-value. Always. Without exception. What gets copied into the parameter is the value of the argument. For a primitive, that is the number, so nothing you do to the parameter is visible outside. For an object, the value of the argument is the reference — the address — so what gets copied is the address. Which means the parameter and the caller's variable now point at the same object. And that gives you the two lines at the bottom of the card, and they behave differently. Rename takes an Order and calls setId on it. That mutates the object both variables point at, so the caller absolutely sees it. Swap takes an Order and assigns a brand new Order to the parameter. That only rebinds the local copy of the address; the caller's variable still points where it always did, and the caller sees nothing. People look at the first line and conclude Java passes objects by reference. It does not. It passes the reference by value, and the difference is exactly the second line.",
}
