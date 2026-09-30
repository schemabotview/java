import type { Section } from '../types'

export const jshell: Section = {
  id: 'jshell',
  title: 'jshell — the REPL',
  scene: 'jshell-session',
  slide: `## Java without the ceremony

Java 9 added a REPL. Type \`jshell\`, type an expression, see the answer — **no class, no \`main\`, no \`javac\`**.

### What it gives you
- Every result is **named** — \`$1\`, \`$3\` — so you can feed it forward
- **Declarations work**: classes, records, methods, at the prompt
- **Redefinition works**: retype a method and its dependents recompile

### Commands worth knowing
\`\`\`text
/vars  /methods  /types   what's in scope
/list                     what you've typed
/edit Point               open a declaration
/save session.jsh         keep it
\`\`\`

### Where it stops
A session is **not a file** — it can't be committed, reviewed or scheduled. The moment an experiment is worth keeping, it has to become real. That's next.`,
  narration:
    "For Java's first twenty years, the smallest possible experiment was a ceremony. To find out what two plus three times four evaluated to, you created a file, declared a public class, declared a public static void main taking a String array, wrote a System dot out dot println, saved it, compiled it, ran it, then deleted the file. Java 9 fixed that with jshell — a REPL, a read-evaluate-print loop, the thing Python users have had since the beginning. Look at the session on the left. You type jshell. You get a prompt. You type two plus three times four, and it answers dollar-one arrow fourteen. Notice what that dollar-one is: it isn't decoration, it is a name. Every result you produce gets a variable name automatically, so you can refer back to it on the next line. Then var name equals quote Ada — var works at the prompt just as it does in a file — and name arrow Ada comes back. Call name dot toUpperCase and you get ADA. And then the part people don't expect: declarations work here too. Record Point, open paren, int x comma int y, close paren, empty braces — and jshell says, created record Point. You just declared a type at a REPL prompt. Make one, new Point of three and four, and it prints Point, square bracket, x equals three, y equals four, because a record generates its own toString. There's a small set of commands, all beginning with a slash. Slash vars, slash methods and slash types tell you what is currently in scope. Slash list shows everything you've typed so far. Slash edit followed by a name opens that declaration in an editor so you can fix a long method without retyping it. Slash open loads a file into the session, slash save writes your session out, and slash exit leaves. One more behaviour worth knowing: you can redefine things. Retype a method with the same signature and it simply replaces the old one, and anything that depended on it is recompiled for you — so you can iterate on a function in place. But be clear about where jshell stops, because this is why the next section exists. A session is not a file. You cannot commit it, review it, schedule it, or send it to a colleague. It is a scratchpad, and the moment an experiment turns out to be worth keeping, it has to become something real.",
}
