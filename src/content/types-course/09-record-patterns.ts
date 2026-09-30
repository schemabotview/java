import type { Section } from '../types'

export const recordPatterns: Section = {
  id: 'record-patterns',
  title: 'Record patterns — destructuring',
  scene: 'patterns',
  slide: `## Name the parts, not the whole

\`\`\`java
case Placed p -> p.customer().name();  // the object

case Placed(String id, Customer c)     // COMPONENTS
        -> id + " " + c.name();

case Placed(String id, Customer(var nm, var tier))
        -> id + " for " + nm;          // and it nests
\`\`\`

### How it works
It uses the **canonical constructor's** components, **in order** — which is why records and patterns were designed together: a record's header **is** its deconstruction. That's also why it only works on records.

### Notes
\`var\` for any component you don't want to name · nested patterns **test as well as bind**, so \`Placed(var id, Premium p)\` matches only premium customers · exhaustiveness checks the **nested** cases too

> Sealed: **which alternatives**. Record: **what shape**. Pattern switch: **takes it apart, totally**.`,
  narration:
    "The last rung. A type pattern binds the whole object, and then you call accessors on it — case Placed p, and then p dot customer dot name. A record pattern goes one step further and binds the components directly. Case Placed, open paren, String id, Customer c, close paren. Now id and c are variables, already typed, already extracted. You never wrote an accessor call. And it nests. Look at the third example. Case Placed, open paren, String id, Customer open paren String name, var tier close paren, close paren. That reaches two levels into the data in a single pattern and gives you three named variables out of it. Without this you'd be writing a chain of accessor calls with an intermediate variable for each level, and probably a null check or two along the way. How does the compiler know how to take a record apart? It uses the canonical constructor — the components in the record's header, in declaration order. That's the reason records and patterns were designed together and shipped as one feature story. A record's header is both how you build one and how you take one apart; the construction and the deconstruction are the same list. This is also why a record pattern only works on records, not on arbitrary classes. A few notes. You can write var for any component whose type you don't want to spell out; the compiler infers it, exactly as in course two. The nested patterns are full patterns, so they test as well as bind — if you write case Placed with a Premium customer pattern nested inside, that arm only matches when the customer really is a Premium, and an ordinary customer falls through to the next case. That's genuinely powerful: you're matching on the shape of a whole data tree in one expression. And exhaustiveness still holds. If the nested type is itself a sealed family, the compiler checks that you've covered its alternatives too, so you can't accidentally leave a nested case out. So here's the summary of the last four sections, and it's worth saying as one sentence. Sealed says which alternatives exist. Record says what shape each one has. Pattern switch takes them apart, and the compiler guarantees you handled all of them. That combination is the thing that changed most about how modern Java models data, and it's why a course on types is worth ten sections rather than a footnote about enums.",
}
