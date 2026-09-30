import type { Section } from '../types'

export const insideTheJvm: Section = {
  id: 'inside-the-jvm',
  title: 'Inside the JVM',
  scene: 'jvm-memory',
  slide: `## The same diagram, opened up

Course 1 §9 was true and shallow. Now the details that let you **read a failure**.

### Stack — per thread
Frames with **locals** and an **operand stack**. ~512 KB–1 MB (\`-Xss\`). Deep recursion ⇒ \`StackOverflowError\`; **more threads means more stack**, reserved.

### Heap — shared
\`-Xms\` / \`-Xmx\`. **Set them equal in a container** — growing is a pause. \`-XX:MaxRAMPercentage\` reads the cgroup limit.

### Metaspace
**Native memory**, not the heap, since Java 8 replaced PermGen. Unbounded by default, so a classloader leak grows until the **machine** runs out.

### The two you'll forget
**Code cache** — the JIT's output. Fill it and compilation **stops silently**: same behaviour, ten times slower.

**Stacks + metaspace + code cache + direct buffers are all outside \`-Xmx\`** — the classic container OOM-kill with a healthy heap.`,
  narration:
    "Course one section nine drew the three memory regions and that picture was true. It was also shallow. Here are the details you need to read an actual failure. The stack, one per thread. Each frame holds the method's local variables and an operand stack — that's the working area where bytecode pushes and pops values. Default size is around half a megabyte to a megabyte, and minus X s s changes it. Two consequences worth connecting. Deep recursion overflows it, and that's StackOverflowError. And every thread reserves a whole stack, which is exactly the constraint from course ten section one — although note that on most systems it's reserved address space rather than committed memory, so it's cheaper than it looks. The heap. Minus X m s sets the starting size, minus X m x the maximum. And a practical piece of advice: in a container, set them equal. Growing the heap involves work and pauses, and if you know how much memory the container has, there's no reason to start smaller. Related: for years the JVM ignored container memory limits and read the host's physical memory, which is how a JVM in a 512-megabyte container decided it could use 30 gigabytes and got killed. Modern JVMs read cgroup limits, and minus X X colon MaxRAMPercentage is the container-friendly way to express it. Metaspace holds class metadata, and the thing to know is that it's native memory, not part of the heap. Before Java 8 this lived in a fixed-size heap region called PermGen, and running out of it was a common and confusing failure. Java 8 moved it to native memory, unbounded by default — which converted a common failure into a rarer and worse one, because a classloader leak now grows until the whole machine runs out rather than until a configured limit. And then two regions people forget, both of which cause real production incidents. The code cache is where the JIT puts compiled native code. It has a fixed size. Fill it — which a very large application genuinely can — and compilation simply stops. No error, no crash. Your application keeps working and gets about ten times slower, permanently, and nothing in the logs says why. And the sentence to memorise: thread stacks, metaspace, the code cache and direct byte buffers are all outside minus X m x. So a JVM configured with a two-gigabyte heap can easily use three gigabytes of RSS, and if your container limit is two gigabytes, the kernel kills it. That is the single most common container OOM, and the heap is fine in every dump you take.",
}
