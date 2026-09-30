import type { Section } from '../types'

export const throwableHierarchySection: Section = {
  id: 'throwable-hierarchy',
  title: 'The Throwable hierarchy',
  scene: 'throwable-hierarchy',
  slide: `## Where you sit in the tree **is** the rule

\`\`\`
Throwable
├── Error        — the JVM. UNCHECKED.
└── Exception    — your program. CHECKED…
    └── RuntimeException  — …not this. UNCHECKED.
\`\`\`
Only a \`Throwable\` can be thrown or caught.

### \`Error\` — don't catch it
\`OutOfMemoryError\`, \`StackOverflowError\`. The **environment** is broken; catching usually makes the crash **worse and later**.

### \`Exception\` — conditions you might handle
\`IOException\`, \`SQLException\`, \`InterruptedException\`. **Checked.**

### \`RuntimeException\` — the exempt branch
\`NullPointerException\`, \`IllegalArgumentException\`, \`IllegalStateException\`. **Unchecked**, and the reason is a judgement: these signal a **bug in the code**, not a condition in the world. You **fix** them; you don't handle them.`,
  narration:
    "Everything throwable in Java descends from one class, Throwable, and that's the entire type rule for throw and catch — if it's a Throwable you can throw it, if it isn't you can't. Below Throwable there are two children, and the split between them is the most important structural fact in this course, because your position in this tree determines whether the compiler forces you to deal with something. On one side, Error. These say the JVM itself is in trouble: OutOfMemoryError when the heap is exhausted, StackOverflowError when recursion ran away, NoClassDefFoundError when the classpath is wrong. The rule with Errors is: don't catch them. There is essentially nothing useful your code can do about running out of memory, and catching an OutOfMemoryError typically means your program limps on in a broken state and crashes later somewhere more confusing. Let it kill the thread. On the other side, Exception. These say your program is in trouble, and they're things you might reasonably handle. IOException because the disk is full or the file isn't there. SQLException because the database rejected something. InterruptedException because someone asked your thread to stop. And these are checked — the compiler will force you to deal with them, which is section three. But inside Exception there's one branch that's exempt: RuntimeException. NullPointerException, IllegalArgumentException, IllegalStateException, ClassCastException, IndexOutOfBoundsException. All unchecked. And the reasoning behind that exemption is a judgement worth understanding, because it's what tells you which kind to throw in your own code. RuntimeExceptions signal a bug in the program, not a condition in the world. A NullPointerException doesn't mean the world went wrong — it means you didn't check something you should have. An IllegalArgumentException means a caller passed nonsense. You don't handle those, you fix them. And since you can't sensibly handle them, forcing every method to declare them would be pure noise — every single method in Java would declare NullPointerException. Checked exceptions, by contrast, describe things that genuinely can go wrong in a correct program. The disk really can be full. The network really can drop. So the tree is the rule: under Error or under RuntimeException means unchecked, anywhere else under Exception means checked.",
}
