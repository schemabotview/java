import type { Section } from '../types'

export const junit5: Section = {
  id: 'junit5',
  title: 'JUnit 5',
  scene: 'testing',
  slide: `## A test is a method with an annotation

\`\`\`java
@Test void rejectsNegativeQuantity() {
    var e = assertThrows(IllegalArgumentException.class,
                         () -> new Order("A-1", -1));
    assertTrue(e.getMessage().contains("-1"));
}
\`\`\`
JUnit finds it with **§10's loop** — so tests needn't be \`public\` any more.

### The essentials
\`@BeforeEach\`/\`@AfterEach\` · \`@BeforeAll\` (\`static\`, once) · \`@DisplayName\` · \`@Disabled("why, and when it returns")\`
\`assertEquals(expected, actual)\` — **expected first**; reversing it makes every failure message a lie. \`assertAll\` reports **every** failure.

### Parameterised — one test, many cases
\`@CsvSource\` for rows · \`@ValueSource\` · \`@EnumSource\` (**every** constant, so a new one is covered automatically) · \`@MethodSource\` for objects

**Name the behaviour, not the method.**`,
  narration:
    "JUnit 5 is the modern test framework, and having just done reflection you know exactly how it works: it scans your classes, finds the methods annotated with at-Test, and invokes them. That's section ten's loop. One small consequence of that — since JUnit 5 uses setAccessible, your test classes and methods don't need to be public any more. Package-private is the modern style. The essentials. At-Test marks a test method. At-BeforeEach and at-AfterEach run around every single test, which is where you build fresh fixtures. At-BeforeAll and at-AfterAll run once for the whole class and must be static, which is for expensive shared setup like starting a container. At-DisplayName gives a readable description in the report. At-Disabled skips a test, and always give it a reason and a condition for coming back — a permanently disabled test with no explanation is worse than a deleted one. Assertions. AssertEquals takes expected first and actual second, always, and this matters more than it sounds: JUnit's failure message says \"expected X but was Y\", so if you reverse the arguments every failure message in your suite is a lie, and someone will chase the wrong value. AssertThrows takes the exception class and a lambda, returns the thrown exception, and then you can assert on its message — which is worth doing, because it checks you threw the exception for the reason you meant. And assertAll takes several assertions and reports all the failures rather than stopping at the first, which turns three debugging round trips into one. Parameterised tests are the feature most worth adopting. At-ParameterizedTest with a source annotation runs the same method over many inputs. CsvSource takes rows of comma-separated values that map onto the parameters. ValueSource is for a single varying argument. EnumSource runs over every constant of an enum — and that one has a lovely property: add a constant to the enum next year, and the test automatically covers it. MethodSource points at a static method returning a stream of arguments, which is how you parameterise over real objects rather than literals. Finally, naming. Name the behaviour, not the method under test. RejectsNegativeQuantity tells you what broke when it goes red. TestOrder3 tells you nothing, and you'll have to read the body to find out what was supposed to be true.",
}
