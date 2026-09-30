import type { Scene } from '@graphlearning/flow'

// §8 packages — the lookup, drawn as a lookup. A package name is not decoration: it is the PATH the
// class loader will search for, and the classpath is the list of roots it searches under. Almost
// every "it compiles but won't run" is this diagram going wrong at the last step, so the failure is
// drawn as a first-class branch rather than mentioned in the slide.
export const classpath: Scene = {
  id: 'classpath',
  padding: 0.13,
  nodes: [
    {
      id: 'lookup',
      label: 'A package name is a lookup path',
      pattern: 'group',
      icon: 'search',
      flow: 'TB',
      children: [
        {
          id: 'decl',
          kind: 'code',
          filename: 'App.java',
          hug: true,
          label: [
            'package com.graphl.orders;   // the name',
            '',
            'import java.util.List;       // one type',
            'import java.nio.file.*;      // a package',
            '',
            'public class App { }',
            '',
            '// name  -> com/graphl/orders/App.class',
          ].join('\n'),
        },
        {
          id: 'roots',
          label: 'Classpath · the roots searched, in order',
          pattern: 'network',
          icon: 'layers',
          cols: 3,
          children: [
            { id: 'classes', label: 'target/classes', pattern: 'storage', icon: 'filecode', sub: 'your compiled code' },
            { id: 'jars', label: 'Dependency JARs', pattern: 'storage', icon: 'package', sub: 'each JAR is a root of its own' },
            { id: 'platform', label: 'The JDK itself', pattern: 'external', icon: 'cpu', sub: 'java.base — always present' },
          ],
        },
        { id: 'found', label: 'Class loaded', pattern: 'service', icon: 'circlecheck', sub: 'first match on the path wins' },
        { id: 'missing', label: 'ClassNotFoundException', pattern: 'warn', icon: 'bell', sub: 'nothing on the path had that path' },
      ],
      edges: [
        { source: 'decl', target: 'roots', label: 'search for' },
        { source: 'roots', target: 'found', label: 'hit' },
        { source: 'roots', target: 'missing', label: 'miss' },
      ],
    },
  ],
  edges: [],
}
