import type { Section } from '../types'

export const chaining: Section = {
  id: 'chaining',
  title: 'Chaining — the cause',
  scene: 'try-catch',
  slide: `## Wrap, but never drop what you wrapped

\`\`\`java
catch (SQLException e) {
    throw new RepoException("order " + id, e);
}                                    // ^ the CAUSE
\`\`\`
Omit that \`e\` and the stack trace **starts at this line**. The original — the actual failure, at the actual line — is **gone**.

### Why wrap at all
So callers depend on **your** abstraction. A repository throwing \`SQLException\` has leaked JDBC into every caller.

> **Wrap to change the abstraction. Chain to keep the evidence.**

### Two things not to do
- **Wrapping without adding anything** — five \`Caused by\` sections and one useful one
- **Losing \`InterruptedException\`.** Catching it **clears the interrupt flag** — rethrow, or call \`Thread.currentThread().interrupt()\` (course 10)`,
  narration:
    "You'll often catch one exception and throw a different one. That's called wrapping, and there's a right way and a lossy way, separated by one argument. Look at the code. Catch SQLException, throw a RepositoryException with a message and — crucially — e as the second argument. That e is the cause. It links the new exception to the original, and it means the printed stack trace will contain both: yours on top, and a Caused by section underneath with the original failure's full trace, right down to the line in the JDBC driver. Now leave the e off. The code still compiles, still runs, still throws something reasonable-looking. But the stack trace now starts at your catch block. The original exception — the actual failure, with the actual line number and the actual database error — is gone, unrecoverably. Somebody is going to spend an hour on that. So why wrap at all, if the original was informative? So that callers depend on your abstraction rather than the one underneath. If your repository interface throws SQLException, then JDBC has leaked into every caller's signature and every caller's catch block. Swap to a different store and every one of them changes. Throwing your own RepositoryException means the storage technology stays behind the interface where it belongs. The rule is one line: wrap to change the abstraction, chain to keep the evidence. Mechanically, essentially every exception constructor takes a cause as an argument, and for the rare ones that don't there's initCause. GetCause walks back down the chain, and section seven shows exactly how the whole chain prints. Two things not to do. First, don't wrap without adding anything. If every layer catches and rethrows new AppException of e with no new message and no new type, you end up with a trace containing five Caused by sections, four of which are noise, and the reader has to scroll past all of them. Wrap when you're genuinely changing the abstraction, and let it propagate otherwise. Second, a specific one worth knowing early: InterruptedException. Catching it silently clears the thread's interrupt flag, which means the cooperative cancellation mechanism the rest of the system relies on has just been broken by your catch block. Either rethrow it, or call Thread dot currentThread dot interrupt to put the flag back. We'll come back to that properly in course ten.",
}
