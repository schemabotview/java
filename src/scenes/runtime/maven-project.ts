import type { Scene } from '@graphlearning/flow'

// §7 maven — two facts, side by side, because Maven is two things at once: a fixed directory
// convention (left) and a fixed lifecycle (right). Almost every Java project you will ever open has
// the layout on the left, which is exactly why it is worth memorising once. The lifecycle below it
// is ordered and cumulative — asking for `package` runs everything before it, and that cumulative
// property is the part people get wrong.
export const mavenProject: Scene = {
  id: 'maven-project',
  padding: 0.12,
  nodes: [
    {
      id: 'maven',
      label: 'Maven — a convention and a lifecycle',
      pattern: 'group',
      icon: 'wrench',
      flow: 'TB',
      children: [
        {
          id: 'shape',
          label: 'The layout every Java project shares',
          pattern: 'network',
          icon: 'layers',
          cols: 2,
          children: [
            {
              id: 'tree',
              kind: 'code',
              filename: 'orders/',
              hug: true,
              label: [
                'pom.xml            <- the project, declared',
                'src/',
                '  main/',
                '    java/          <- your code',
                '      com/graphl/orders/App.java',
                '    resources/     <- config, files on classpath',
                '  test/',
                '    java/          <- your tests',
                'target/            <- generated; never committed',
                '  classes/         <- .class output',
                '  orders-1.0.jar   <- the artifact',
              ].join('\n'),
            },
            {
              id: 'pom',
              kind: 'code',
              filename: 'pom.xml',
              hug: true,
              label: [
                '<project>',
                '  <groupId>com.graphl</groupId>',
                '  <artifactId>orders</artifactId>',
                '  <version>1.0</version>',
                '',
                '  <properties>',
                '    <maven.compiler.release>21</...>',
                '  </properties>',
                '',
                '  <dependencies>',
                '    <dependency>...</dependency>',
                '  </dependencies>',
                '</project>',
              ].join('\n'),
            },
          ],
        },
        {
          id: 'lifecycle',
          label: 'mvn package · the phases it runs',
          pattern: 'service',
          icon: 'repeat',
          flow: 'LR',
          children: [
            { id: 'validate', label: 'validate', pattern: 'service', icon: 'check', variant: 'tile' },
            { id: 'compile', label: 'compile', pattern: 'service', icon: 'braces', variant: 'tile' },
            { id: 'test', label: 'test', pattern: 'service', icon: 'shieldcheck', variant: 'tile' },
            { id: 'pkg', label: 'package', pattern: 'storage', icon: 'archive', variant: 'tile' },
          ],
          edges: [
            { source: 'validate', target: 'compile' },
            { source: 'compile', target: 'test' },
            { source: 'test', target: 'pkg' },
          ],
        },
      ],
      edges: [{ source: 'shape', target: 'lifecycle', label: 'mvn reads, then builds' }],
    },
  ],
  edges: [],
}
