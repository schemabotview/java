import type { Section } from '../types'

export const constructorsSection: Section = {
  id: 'constructors',
  title: 'Constructors & initialisation order',
  scene: 'constructors',
  slide: `## The one place an object can refuse to exist

No return type, named like the class. Its job isn't "set the fields" — it's to **establish the invariant**, so no Account has *ever* existed in a bad state.

\`\`\`java
Account(String id, long opening) {
    if (opening < 0)
        throw new IllegalArgumentException();
    this.id = id;
}
Account(String id) { this(id, 0); }   // delegate: FIRST
\`\`\`

### Two rules that catch people
- **No constructor ⇒ a free no-arg one.** Write **any** constructor and it **disappears** — breaking \`new Account()\`
- \`this(…)\`/\`super(…)\` must be **first**; never both

### The order — and the trap
**1.** \`super(…)\` up to \`Object\` · **2.** field initialisers · **3.** this body

**1 runs before 2.** A superclass constructor calling an **overridden** method runs the override against fields still \`null\`. **Never call an overridable method from a constructor.**`,
  narration:
    "A constructor looks like a method with two differences: it has no return type at all, not even void, and it is named exactly like the class. But the interesting thing about constructors isn't the syntax, it's the job. It's tempting to describe a constructor as the thing that sets the fields. It isn't. A constructor's job is to establish the invariant — to guarantee that from this moment on, this object is in a valid state. Which is why the very first line of the one on screen is a check: if the opening balance is negative, throw. That throw is a constructor refusing to produce an object. And because that's the only way in, it means no Account has ever existed anywhere in your program with a negative balance. That's a much stronger statement than a validation method someone might call. Then the mechanics. You can overload constructors like any method, and one can delegate to another with this, open paren, arguments — that's the second constructor on screen, which supplies a default opening balance of zero and hands off. The delegation has to be the very first statement in the constructor. Two rules catch people out. First: if you write no constructor at all, Java gives you a free public no-argument one. But the moment you write any constructor of your own, that free one vanishes. So adding a two-argument constructor to a class that people were calling with new Account, empty parens, breaks every one of those callers, and the error looks like it came from nowhere. Second: this-call and super-call both have to be the first statement, which means you can't do both — if you delegate to another constructor, that one handles the super call. Now the order, and the trap. When you write new Savings of A-1, three things happen in this sequence. First, the superclass constructor runs, recursively, all the way up to Object. Second, this class's field initialisers and instance initialiser blocks run, top to bottom in source order. Third, this constructor's body runs. Notice that step one happens before step two. The parent is fully constructed before any of the child's fields are assigned. So here's the bug. If the parent's constructor calls a method, and the child overrides that method, then the child's version runs — during the parent's constructor — at a moment when every one of the child's fields is still null or zero. The override reads a field it initialises in its own constructor and gets null, and the stack trace points at a line that looks completely innocent. The rule that avoids it entirely: never call an overridable method from a constructor. Make it private, or make it final.",
}
