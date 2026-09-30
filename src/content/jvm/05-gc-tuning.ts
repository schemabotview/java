import type { Section } from '../types'

export const gcTuning: Section = {
  id: 'gc-tuning',
  title: 'GC tuning & reading a log',
  scene: 'gc',
  slide: `## Measure first. Most tuning makes it worse.

\`\`\`bash
-Xms2g -Xmx2g          # equal, in a container
-XX:MaxGCPauseMillis=200      # a target, not a promise
-Xlog:gc*:file=gc.log:time,uptime
\`\`\`

### Reading a line
\`Pause Young 512M->48M(2048M) 12ms\` — **before → after (total)**, then the pause.

### Three shapes
- **Healthy** — the heap drops a long way each time; full GCs rare
- **Leak** — the ***after*** number **climbs steadily**, full GCs get more frequent, then \`OutOfMemoryError\`
- **Churning** — GC runs constantly and reclaims little

### The order to work in
**1.** Is it a leak? (\`jcmd <pid> GC.heap_dump\` + Eclipse MAT) **2.** Is the heap too small? **3.** Are pauses actually hurting? **4. Allocate less** — that fixes more than any flag.

**Never copy flags from a blog.**`,
  narration:
    "A warning before the mechanics: most GC tuning makes things worse. The default collector with a sensible heap size is right for the large majority of applications, and the people who need to tune have measured a specific problem first. So the order of operations matters more than the flags. Start with the flags worth setting. Minus X m s and minus X m x equal, in a container, because growing the heap costs pauses and you know the limit. Or minus X X colon MaxRAMPercentage, which lets the JVM read the container's cgroup limit and take a share of it — better, because it survives a change to the container size. For G1, MaxGCPauseMillis sets a pause target; understand it as a goal the collector works towards by sizing the young generation, not a guarantee. And always, always turn on GC logging. Minus X log colon g c star, to a file, with timestamps. It costs essentially nothing and it's the difference between diagnosing a problem and guessing. Now reading a line. Pause Young, Normal, 512 megabytes arrow 48 megabytes, 2048 in parentheses, 12 milliseconds. That's the heap before, the heap after, the total heap size, and how long the pause was. The drop from 512 to 48 is what got collected. Three shapes to recognise. Healthy: young pauses mostly, the heap drops a long way every time, and full GCs are rare or absent. Leak: the after number climbs steadily over hours. Not the before — the after. Each collection leaves more behind than the last, full GCs become more frequent, they reclaim less and less, and eventually you get an OutOfMemoryError. The shape is unmistakable once you've seen it, and it's visible long before the crash. Too small, or churning: GC runs constantly and reclaims very little each time. Either the heap is undersized for the working set, or something that should be short-lived is being retained — caching per request, say. And the order to work in. One: is it a leak? Take a heap dump with jcmd, open it in Eclipse MAT, and look at the dominator tree — that tells you which objects are holding the memory, and almost always the answer is obvious once you see it. Two: is the heap simply too small? Three: are the pauses actually hurting anyone? Check your latency percentiles before assuming. Only then think about changing collector. And four, which fixes more than any flag ever will: allocate less. Find the allocation hot spot in JFR and remove it. Finally: never copy GC flags from a blog post. They were tuned for someone else's heap size, object lifetimes and hardware, and a flag that helped them can easily hurt you.",
}
