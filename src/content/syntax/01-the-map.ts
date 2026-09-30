import type { Section } from '../types'

export const theMap: Section = {
  id: 'the-map',
  title: 'The shape of a Java file',
  scene: 'java-file-anatomy',
  slide: `## Four nested layers

Java has no loose code. **Everything lives inside a type**, and the nesting on the left is the map for this course.

### The layers
1. **\`package\`** — the type's real name, and its path
2. **\`import\`** — shorthand only
3. **The type** — one **public** type per file, named exactly like the file
4. **Members** — **fields** (state), **constructors** (birth), **methods** (behaviour)

### Inside a method
- **Statements** *do* something — assign, branch, loop, return
- **Expressions** *are* something — \`qty * price\` has a **value** and a **type**

### Conventions — not optional in practice
\`\`\`java
class OrderLine   // types: UpperCamelCase
int lineTotal     // vars & methods: lowerCamelCase
static final int MAX_RETRIES = 3;   // SCREAMING_SNAKE
\`\`\`
**Blocks are \`{ }\`** — indentation is for humans, and the compiler ignores it.`,
  narration:
    "Before any individual piece of syntax, here is the shape everything sits in, because Java is stricter about this than most languages. There is no loose code in Java. You cannot put a statement at the top of a file the way you can in Python or JavaScript. Everything lives inside a type. So look at the nesting on the left; each layer of it is a section of this course. Outermost is the file. It is called Order dot java, and inside it there is normally exactly one public type, whose name must match the filename exactly, character for character. The first line is the package declaration — that is the type's real name and its path, which we covered in course one. Then the imports, which as we said are pure shorthand and load nothing. Then the type itself: class Order, open brace, everything, close brace. And inside the type, its members, which come in three kinds. Fields are its state — String id, int qty. The constructor is how one comes into existence. And methods are its behaviour. Course three is about this layer; here we are only naming it. Now go one level deeper, inside a method, because that is where this course actually lives. A method body is a sequence of statements, and statements are built out of expressions. That distinction is worth getting straight now. An expression has a value and a type — qty times price is an expression, it evaluates to a number. A statement does something — it assigns, it branches, it loops, it returns. It has no value. Some things are both, which we will come to. Last, conventions, and in Java these are not really optional because every codebase you will ever open follows them. Type names are UpperCamelCase. Variables and methods are lowerCamelCase. Constants — static final — are screaming snake case, all capitals with underscores. Blocks are delimited by curly braces, not by indentation, so the compiler does not care how you indent; but everyone indents anyway, because the braces alone are not enough for a human to read. With that map in hand, we can start filling it in, beginning with the thing at the very bottom of it: values.",
}
