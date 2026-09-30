import type { Scene } from '@graphlearning/flow'

// §6 jbang — the gap jshell leaves: a REPL cannot be saved, committed or scheduled. jbang closes it
// by letting ONE file be the whole program, dependencies included, with no pom and no build step.
// The `//DEPS` line is the whole idea, so the card is the scene.
export const jbangScript: Scene = {
  id: 'jbang-script',
  title: 'jbang — one file is the whole program',
  padding: 0.16,
  nodes: [
    {
      id: 'script',
      kind: 'code',
      filename: 'wordcount.java',
      label: [
        '///usr/bin/env jbang "$0" "$@" ; exit $?',
        '//JAVA 21',
        '//DEPS org.apache.commons:commons-lang3:3.17.0',
        '',
        'import java.nio.file.*;',
        'import java.util.*;',
        'import java.util.stream.*;',
        '',
        'void main(String[] args) throws Exception {',
        '    Map<String, Long> counts = Files.lines(Path.of(args[0]))',
        '        .flatMap(line -> Arrays.stream(line.split("\\\\W+")))',
        '        .filter(w -> !w.isBlank())',
        '        .collect(Collectors.groupingBy(String::toLowerCase,',
        '                                       Collectors.counting()));',
        '    counts.forEach((w, n) -> System.out.println(n + "  " + w));',
        '}',
        '',
        '// $ jbang wordcount.java access.log',
        '// no pom.xml, no mvn, no target/ — it just runs',
      ].join('\n'),
    },
  ],
  edges: [],
}
