import type { Scene } from '@graphlearning/flow'

// §4/§5 — the four shapes in java.util.function, organised by the only thing that distinguishes
// them: does it take a value, and does it give one back. Drawn as a 2×2 of that question rather
// than as a list, because once the axes are visible the forty-odd interfaces in the package stop
// needing to be memorised — they are all primitive or arity variants of these four.
export const fourInterfaces: Scene = {
  id: 'four-interfaces',
  padding: 0.09,
  nodes: [
    {
      id: 'grid',
      label: 'Takes a value? Returns one? That is the whole taxonomy.',
      pattern: 'group',
      icon: 'scale',
      cols: 2,
      children: [
        { id: 'fn', label: 'Function<T, R>', pattern: 'service', icon: 'repeat', sub: 'R apply(T) — in and out. map.' },
        { id: 'pred', label: 'Predicate<T>', pattern: 'network', icon: 'filter', sub: 'boolean test(T) — in, answer out. filter.' },
        { id: 'cons', label: 'Consumer<T>', pattern: 'warn', icon: 'plug', sub: 'void accept(T) — in, nothing out. Side effect.' },
        { id: 'sup', label: 'Supplier<T>', pattern: 'storage', icon: 'share', sub: 'T get() — nothing in. Deferred work.' },
      ],
    },
    {
      id: 'variants',
      label: 'Everything else in java.util.function is a variant',
      pattern: 'group',
      icon: 'layers',
      cols: 2,
      children: [
        { id: 'arity', label: 'Two arguments', pattern: 'network', icon: 'copy', sub: 'BiFunction · BiPredicate · BiConsumer' },
        { id: 'same', label: 'Same type both ends', pattern: 'network', icon: 'gitmerge', sub: 'UnaryOperator<T> · BinaryOperator<T>' },
        { id: 'prim', label: 'Primitive — no boxing', pattern: 'service', icon: 'calculator', sub: 'IntPredicate · ToIntFunction · IntSupplier' },
        { id: 'run', label: 'Neither in nor out', pattern: 'external', icon: 'zap', sub: 'Runnable — and Callable<V>, which may throw' },
      ],
    },
  ],
  edges: [{ source: 'grid', target: 'variants', label: 'specialised into' }],
}
