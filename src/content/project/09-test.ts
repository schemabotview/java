import type { Section } from '../types'

export const test: Section = {
  id: 'test',
  title: 'Testing it',
  scene: 'testing',
  slide: `## The design made most of this easy

\`\`\`java
@ParameterizedTest
@CsvSource({
  "'…Z INFO web 12 ok',  true",
  "'garbage',            false",
  "'…Z NOPE web 12 ok',  false",
})
void parsesOrReportsWhy(String raw, boolean ok) {
    assertEquals(ok, parse(raw, 1) instanceof Ok);
}
\`\`\`

### What the model bought
\`LineParser\` is a **pure function** — no I/O, no clock, no state. So there is **nothing to mock** (**c11 §13**), and every edge case is one row.

### Where the seams are
**\`@TempDir\`** for the file layer — a **real** file is faster and more honest than a mocked \`Files\`. **Inject the \`Clock\`** — that's the one thing worth faking.

### Test the **behaviour**
\`rejectsUnknownLevel\`, not \`testParse3\` — and assert on \`Bad.why()\`, which is data precisely so you can.`,
  narration:
    "This is the section where the earlier decisions pay off, and the way you can tell is how little setup the tests need. The parser is a pure function. Give it a string and a line number, get back a ParseResult. No file access, no clock, no configuration, no state carried between calls. Which means there is nothing to mock — course eleven section thirteen's judgement about where to stop, resolved by the design rather than by discipline. And because it's pure, every edge case is one row of a table: a well-formed line, garbage, an unknown level, a negative duration, a missing field. That's a parameterised test with a CsvSource, course eleven section twelve, and adding a case is adding a line. Where are the seams that do need help? Three. The file-reading layer touches the filesystem, and the right tool there is at-TempDir, which is JUnit's temporary directory — you write two small real files and read them. A real file is faster than people expect and far more honest than mocking Files, which is a static API you'd have to fight to intercept and where a mock would let you test behaviour the real filesystem never produces. The clock is the one thing genuinely worth faking: if any report says errors in the last hour, inject a Clock and pass Clock dot fixed in the test, because a test that depends on the real time is a test that fails at midnight. And the aggregator takes a list of entries and returns maps — pure again, so you just call it with three hand-written entries and assert on the maps. Two habits worth naming. Test the behaviour, not the method: rejectsUnknownLevel tells you what broke when it goes red, testParse3 makes you read the body to find out. And test the reason, not just the failure. Asserting that a bad line produced a Bad is weak; asserting that the why field mentions the level is what catches the case where you return Bad for the wrong reason. And notice that this is only possible because section three put the reason on the type as data rather than logging it and returning null. Designing for testability isn't a separate activity — it's the same decisions.",
}
