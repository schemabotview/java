import type { Scene } from '@graphlearning/flow'

// §3 install — what you actually downloaded. The nesting IS the lesson: JDK ⊃ JRE ⊃ JVM, and the
// three names people use interchangeably are three different sizes of the same box. Containers, not
// a flow: the developer tools are peers inside the JDK, the runtime pieces are peers inside the JRE.
export const jdkAnatomy: Scene = {
  id: 'jdk-anatomy',
  padding: 0.14,
  nodes: [
    {
      id: 'jdk',
      label: 'JDK — what you install (Temurin 21)',
      pattern: 'group',
      icon: 'package',
      flow: 'TB',
      children: [
        {
          id: 'devtools',
          label: 'Developer tools · bin/',
          pattern: 'network',
          icon: 'wrench',
          cols: 2,
          children: [
            { id: 'javac', label: 'javac', pattern: 'network', icon: 'braces', sub: 'compiler — .java to .class' },
            { id: 'jshell', label: 'jshell', pattern: 'network', icon: 'terminal', sub: 'the REPL' },
            { id: 'jar', label: 'jar', pattern: 'network', icon: 'archive', sub: 'bundles classes into one file' },
            { id: 'jfr', label: 'jcmd · jfr', pattern: 'network', icon: 'gauge', sub: 'inspect a live JVM' },
          ],
        },
        {
          id: 'jre',
          label: 'JRE — everything needed to RUN',
          pattern: 'service',
          icon: 'cpu',
          flow: 'LR',
          children: [
            { id: 'jvm', label: 'JVM', pattern: 'service', icon: 'cpu', sub: 'loads and executes bytecode' },
            { id: 'stdlib', label: 'Class library', pattern: 'storage', icon: 'layers', sub: 'java.lang, java.util, java.nio' },
          ],
          edges: [{ source: 'jvm', target: 'stdlib' }],
        },
      ],
      edges: [{ source: 'devtools', target: 'jre', label: 'produce code for' }],
    },
  ],
  edges: [],
}
