import type { Scene } from '@graphlearning/flow'

// §4 the-run (reused by §10 you-are-here, and again in the `jvm` course) — the execution SPINE:
// what happens between saving a file and seeing output. The two-stage shape is the point, and it is
// what separates Java from both C (compile straight to this machine) and Python (no separate
// compile step at all): javac targets a fictional machine, the JVM turns that into a real one.
//
// Two bands. The spine runs top to bottom; the JVM's own inner pipeline runs left to right inside
// it, so the classloader → interpreter → JIT chain reads as a sequence rather than a stack.
export const javaPipeline: Scene = {
  id: 'java-pipeline',
  padding: 0.12,
  nodes: [
    {
      id: 'spine',
      label: 'From source to running code',
      pattern: 'group',
      icon: 'repeat',
      flow: 'TB',
      children: [
        { id: 'you', label: 'You · developer', pattern: 'user', icon: 'scanface', sub: 'write Java' },
        { id: 'src', label: 'Main.java', pattern: 'network', icon: 'filecode', sub: 'text — human readable' },
        { id: 'javac', label: 'javac · the compiler', pattern: 'service', icon: 'braces', sub: 'type-checks, then emits bytecode' },
        { id: 'classfile', label: 'Main.class · bytecode', pattern: 'storage', icon: 'binary', sub: 'instructions for a machine that does not exist' },
        {
          id: 'jvm',
          label: 'JVM · java Main',
          pattern: 'service',
          icon: 'cpu',
          flow: 'LR',
          children: [
            { id: 'loader', label: 'Class loader', pattern: 'network', icon: 'dooropen', sub: 'finds and verifies .class' },
            { id: 'interp', label: 'Interpreter', pattern: 'service', icon: 'repeat', sub: 'runs bytecode immediately' },
            { id: 'jit', label: 'JIT compiler', pattern: 'service', icon: 'zap', sub: 'recompiles hot code to native' },
          ],
          edges: [
            { source: 'loader', target: 'interp' },
            { source: 'interp', target: 'jit', label: 'when hot' },
          ],
        },
        { id: 'os', label: 'OS · CPU · memory', pattern: 'external', icon: 'server', sub: 'where execution actually lands' },
      ],
      edges: [
        { source: 'you', target: 'src' },
        { source: 'src', target: 'javac' },
        { source: 'javac', target: 'classfile' },
        { source: 'classfile', target: 'jvm', label: 'loaded at runtime' },
        { source: 'jvm', target: 'os', label: 'native instructions' },
      ],
    },
  ],
  edges: [],
}
