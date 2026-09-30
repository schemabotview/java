import type { Section } from '../types'

export const theRun: Section = {
  id: 'the-run',
  title: 'From source to running code',
  scene: 'java-pipeline',
  slide: `## Two stages, not one

\`\`\`bash
javac Main.java   # → Main.class (bytecode)
java  Main        # load, verify, execute
\`\`\`

### \`javac\` — ahead of time
Type-checks the whole program, then emits **bytecode**: instructions for the JVM, **not** your CPU. \`Main.class\` is identical on every machine.

### \`java\` — at run time
1. **Class loader** finds it, **verifies** the bytecode, links it
2. **Interpreter** starts executing immediately
3. The JVM **counts** calls; once a method is **hot**, the **JIT** compiles it to native and swaps it in

### Why this beats both neighbours
- **C** compiles to one CPU — fast, not portable
- **Python** has no compile step — portable, no type check
- **Java gets both** — plus one neither has: the JIT optimises on **facts only known at runtime**, so a long-lived service gets *faster* after warm-up`,
  narration:
    "Now the sentence that the rest of this course hangs off. There are two stages between the file you save and the output you see, and almost everything distinctive about Java comes from the fact that there are two rather than one. Stage one is javac, the compiler, and it runs ahead of time — before your program has ever executed. You type javac Main dot java, and it does two jobs. First it type-checks the entire program: every variable, every method call, every assignment, and if anything doesn't line up, it refuses and you get an error now rather than a crash in production later. Then, having proved the program is well-formed, it emits Main dot class — bytecode. And the crucial thing about that file is what it is not. It is not instructions for your CPU. It is instructions for the Java Virtual Machine, that idealised computer we talked about, and it is byte-for-byte identical whether you compiled it on an ARM Mac or an Intel server. Stage two is java, and it runs at run time. Follow the chain on the left. First, the class loader finds Main dot class, verifies that the bytecode is structurally safe — that it doesn't, say, try to pop from an empty stack — and links it. Then the interpreter starts executing that bytecode immediately, one instruction at a time. No waiting, no native compile step, the program starts. But the JVM is also counting. It keeps a tally of how many times each method has been called and each loop has gone round, and when a method crosses a threshold and becomes what's called hot, the JIT compiler — just-in-time — takes that method's bytecode and compiles it properly into native machine code, then quietly swaps the fast version in while the program keeps running. Now put Java next to its neighbours and the shape of the trade is clear. C compiles straight down to one specific CPU: very fast, not portable. Python has no separate compile stage at all: very portable, but nothing checks your types before you run. Java takes two steps and gets both properties at once. And it gets a third thing that neither of the others can have. Because the JIT compiles while the program is running, it can optimise using facts that are only knowable at runtime — which branch is actually being taken, which concrete type is actually showing up at this call site. Which is why a long-running Java service does something unusual: it gets faster after it warms up.",
}
