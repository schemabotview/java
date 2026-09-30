import type { Scene } from '@graphlearning/flow'

// §12/§13 — JUnit 5 and Mockito on one card. The two belong together because the judgement that
// matters is about the boundary: mock what you do not own and cannot run, and use the real thing
// everywhere else. Over-mocking produces tests that pass while the system is broken, which is the
// failure mode worth warning about explicitly.
export const testing: Scene = {
  id: 'testing',
  title: 'JUnit 5, and where to stop mocking',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'OrderTest.java',
      label: [
        '@Test void rejectsNegativeQuantity() {',
        '    var e = assertThrows(IllegalArgumentException.class,',
        '                         () -> new Order("A-1", -1));',
        '    assertTrue(e.getMessage().contains("-1"));',
        '}',
        '',
        '@BeforeEach  @AfterEach  @BeforeAll  @AfterAll',
        'assertEquals(expected, actual)   // EXPECTED first, always',
        'assertAll(…)          // report every failure, not just the 1st',
        '@DisplayName("...")   @Disabled("why, and when it comes back")',
        '',
        '// PARAMETERISED — one test, many cases',
        '@ParameterizedTest',
        '@CsvSource({ "0, false", "1, true", "-1, false" })',
        'void validity(int qty, boolean ok) { … }',
        '// also @ValueSource, @EnumSource, @MethodSource',
        '',
        '// MOCKITO — replace a collaborator you cannot run',
        'var repo = mock(OrderRepository.class);',
        'when(repo.findById("A-1")).thenReturn(Optional.of(order));',
        'verify(repo).save(any());',
        '',
        '// The judgement: mock what you do NOT own and cannot run —',
        '// a payment gateway, a clock. Use the REAL thing otherwise.',
        '// Mock everything and the test passes while the system is broken.',
      ].join('\n'),
    },
  ],
  edges: [],
}
