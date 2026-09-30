import type { Section } from '../types'

export const loops: Section = {
  id: 'loops',
  title: 'Loops',
  scene: 'loop-forms',
  slide: `## Four forms, one question: do you need the index?

### The enhanced \`for\` — your default
\`\`\`java
for (Order o : orders) { total += o.qty(); }
\`\`\`
No index, so **no off-by-one**. Works on any array or **\`Iterable\`**.

### The classic \`for\` — when the index *is* the problem
Three parts: **init · condition · update**. For \`i\` itself, or to walk **backwards** while removing.

### \`while\` / \`do-while\`
\`while\` when the round count isn't known up front. \`do-while\` runs **at least once** — rare.

### \`break\`, \`continue\`, and the label nobody knows
\`\`\`java
search:
for (var row : grid)
    for (var cell : row)
        if (cell == target) break search;
\`\`\`
A **label** breaks the **outer** loop. The alternative is a \`found\` flag checked in two conditions — strictly worse.

**Don't mutate a collection while looping it** — \`ConcurrentModificationException\`.`,
  narration:
    "Java has four loop forms, and choosing between them is almost mechanical once you ask one question: do you actually need the index? Start with the enhanced for, because it should be your default and a lot of people skip past it. For, open paren, Order o, colon, orders, close paren. Read the colon as for each. There is no counter, no comparison, no increment, which means there is no off-by-one bug available to you. It works on any array and on anything that implements Iterable, which we will unpack properly in course five when we look at the iterator protocol. If you are just visiting every element, this is the form. The classic for is for when the index is genuinely part of the problem. Three parts separated by semicolons: initialise, condition, update. For, int i equals zero, i less than orders dot size, i plus plus. Use it when you need to print the position, when you are comparing element i with element i plus one, or when you need to walk backwards — which is the standard trick for removing items by index without the indices shifting under you. While is for when you do not know how many rounds there will be up front. The canonical shape is reading a file: while line equals reader dot readLine, and that is not null, parse the line. Do-while is the same thing with the check at the bottom, so the body always runs at least once. It is genuinely rare; when you see it, it is usually prompting a user until they type something valid. Then break and continue. Break leaves the loop entirely, continue abandons this round and starts the next. And there is one piece of syntax most Java developers have never seen: a labelled break. Put a name and a colon before a loop — search, colon — and then inside a nested loop you can write break search, and it exits the outer loop, not just the inner one. Without it, the usual workaround is a boolean flag called found, which you then have to check in both loop conditions, and that is strictly worse code. One warning to close on, which we will return to in course five. Do not modify a collection while you are looping over it — do not add to it or remove from it inside an enhanced for. It will not misbehave quietly; it will throw ConcurrentModificationException, which despite the name usually has nothing to do with threads. It is the collection noticing you changed it mid-iteration.",
}
