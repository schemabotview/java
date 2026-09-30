import type { Scene } from '@graphlearning/flow'

// §1 why-java — the one claim the whole language is built on: compile ONCE to a portable artifact,
// then run it anywhere a JVM exists. Drawn as a fan, because the fan IS the argument: a single
// .class/.jar at the top, four very different runtime homes below it. The platforms are peers, so
// they sit in an edgeless grid container and the engine wraps them two-up.
export const javaReach: Scene = {
  id: 'java-reach',
  padding: 0.16,
  nodes: [
    {
      id: 'promise',
      label: 'Write once, run anywhere',
      pattern: 'group',
      icon: 'globe',
      flow: 'TB',
      children: [
        { id: 'source', label: 'Order.java', pattern: 'network', icon: 'filecode', sub: 'source you write, once' },
        { id: 'jar', label: 'app.jar · bytecode', pattern: 'storage', icon: 'package', sub: 'the portable artifact — no CPU baked in' },
        {
          id: 'homes',
          label: 'Any machine with a JVM',
          pattern: 'service',
          icon: 'cpu',
          cols: 2,
          children: [
            { id: 'server', label: 'Backend services', pattern: 'service', icon: 'server', sub: 'banks, retail, airlines' },
            { id: 'android', label: 'Android', pattern: 'service', icon: 'plug', sub: 'the mobile runtime' },
            { id: 'bigdata', label: 'Data platforms', pattern: 'storage', icon: 'database', sub: 'Spark, Kafka, Flink, Elastic' },
            { id: 'tools', label: 'Tools & build systems', pattern: 'network', icon: 'wrench', sub: 'Maven, Gradle, IDEs' },
          ],
        },
      ],
      edges: [
        { source: 'source', target: 'jar', label: 'javac' },
        { source: 'jar', target: 'homes', label: 'java' },
      ],
    },
  ],
  edges: [],
}
