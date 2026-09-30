import type { Scene } from '@graphlearning/flow'

// §10 annotations — the closer's second half. Kept deliberately small: what matters here is that an
// annotation is metadata with a RETENTION, and that whether anything acts on it is a separate
// question from whether you wrote it. The reflection that reads them is course 11.
export const annotations: Scene = {
  id: 'annotations',
  title: 'Annotations — metadata, and who reads it',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Annotations.java',
      label: [
        '@Override            // the compiler CHECKS this one. Always',
        '                     // write it — a typo becomes a new method',
        '                     // that silently never runs.',
        'public String toString() { … }',
        '',
        '@Deprecated(since = "2.1", forRemoval = true)',
        '@FunctionalInterface // fails the build if a second abstract',
        '                     // method is ever added',
        '@SuppressWarnings("unchecked")   // narrowest scope possible',
        '@SafeVarargs',
        '',
        '// Your own: the RETENTION decides who can ever see it.',
        '@Retention(RetentionPolicy.SOURCE)   // javac drops it',
        '@Retention(RetentionPolicy.CLASS)    // in the .class, not at',
        '                                     // runtime (the default)',
        '@Retention(RetentionPolicy.RUNTIME)  // readable by reflection',
        '@Target(ElementType.METHOD)',
        '@interface Audited { String value() default ""; }',
        '',
        '// An annotation does NOTHING on its own. Something has to',
        '// read it — javac, an annotation processor, or reflection',
        '// at startup. That last one is course 11.',
      ].join('\n'),
    },
  ],
  edges: [],
}
