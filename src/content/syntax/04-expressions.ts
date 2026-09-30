import type { Section } from '../types'

export const expressionsSection: Section = {
  id: 'expressions',
  title: 'Expressions, operators & three surprises',
  scene: 'expressions',
  slide: `## An expression has a value. A statement does something.

\`2 + 3 * 4\` is an expression — it **is** \`14\`. \`if (ok) { }\` is a statement — it has no value and can't be assigned. The **ternary** \`ok ? "yes" : "no"\` is the conditional as an *expression*.

### Operators worth naming
- \`&&\` and \`||\` **short-circuit** — the right side isn't evaluated if the left decides it. That's what makes \`o != null && o.qty() > 0\` safe.
- \`%\` is remainder, and it **keeps the sign of the left operand**: \`-7 % 3\` is \`-1\`
- \`+\` on a \`String\` concatenates, and **converts the other side** — \`1 + 2 + "x"\` is \`"3x"\`, \`"x" + 1 + 2\` is \`"x12"\`

### The three that catch everyone once
1. **\`int\` overflow is silent** — it wraps to negative. \`Math.addExact\` throws instead.
2. **\`int / int\` is integer division** — \`7 / 2\` is \`3\`. One \`double\` promotes the whole expression.
3. **\`double\` is binary** — \`0.1 + 0.2\` is \`0.30000000000000004\`. For money use \`BigDecimal\`, or count whole pence in a \`long\`.`,
  narration:
    "Expressions and operators. Start with the distinction, because it gets sharper later in the course. An expression has a value and a type: two plus three times four is an expression, and it is fourteen — note that multiplication binds tighter than addition, as it does in arithmetic. A statement does something and has no value: if, open paren ok, close paren, braces — you cannot assign that to anything. And then there is the ternary, question mark colon, which is the conditional in expression form: ok question mark quote yes quote colon quote no quote produces a value, so you can assign it. A few operators are worth calling out specifically. Double-ampersand and double-pipe short-circuit. That means if the left side already decides the answer, the right side is never evaluated at all. That is not an optimisation detail, it is a technique you will use constantly: o not-equals null, double ampersand, o dot qty greater than zero — the null check protects the call after it, and it only works because of short-circuiting. Percent is remainder, not modulo, and the difference shows up with negatives: minus seven percent three is minus one, because it keeps the sign of the left operand. And plus on a String concatenates and converts whatever is on the other side, which produces a classic surprise: one plus two plus quote x quote is the string three-x, because the arithmetic happens first; but quote x quote plus one plus two is x-one-two, because once the left side is a string, everything after it is concatenation. Now the three arithmetic surprises, and every Java developer meets each of these exactly once. First: integer overflow is silent. Integer dot MAX_VALUE is about two point one billion. Add one to it and you do not get an error — you get the most negative int. It wraps, quietly. If that matters, Math dot addExact throws an ArithmeticException instead. Second: int divided by int is integer division. Seven over two is three, not three point five, and the remainder is simply dropped. If you want three point five, one side has to be a double — seven over two point zero — and that single double promotes the whole expression. Third: double is binary floating point, and binary cannot represent zero point one exactly. So zero point one plus zero point two is zero point three zero zero zero zero zero zero zero zero zero zero zero zero zero zero four. That is not a Java bug, it is how the hardware works, and it is why you must never, ever hold money in a double. Use BigDecimal, or count in whole pence as a long.",
}
