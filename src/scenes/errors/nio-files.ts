import type { Scene } from '@graphlearning/flow'

// §9/§10/§11 — the modern file API on one card. NIO's Path replaced java.io.File for a reason that
// is worth stating: File's methods returned false on failure and told you nothing, where Files
// throws with the path and the cause. Charset is called out because the default changed in Java 18
// and silently corrupting non-ASCII is the classic version-upgrade bug.
export const nioFiles: Scene = {
  id: 'nio-files',
  title: 'Path, Files, and the charset that used to bite',
  padding: 0.13,
  nodes: [
    {
      id: 'card',
      kind: 'code',
      filename: 'Io.java',
      label: [
        'Path p = Path.of("data", "orders.csv");   // never String concat',
        'p.resolve("x")  p.getParent()  p.normalize()  p.toAbsolutePath()',
        '// A Path is just a name. It need not exist. It is immutable.',
        '',
        'Files.exists(p)  Files.size(p)  Files.createDirectories(p)',
        'Files.copy(a, b, REPLACE_EXISTING)   Files.move(a, b)',
        'Files.delete(p)        // throws if absent',
        'Files.deleteIfExists(p)',
        '',
        '// SMALL files — read it all',
        'String s = Files.readString(p);          // UTF-8 since 18',
        'Files.writeString(p, s, CREATE, TRUNCATE_EXISTING);',
        '',
        '// LARGE files — stream it, and CLOSE it (course 8 §3)',
        'try (var lines = Files.lines(p)) {',
        '    return lines.filter(l -> !l.isBlank()).count();',
        '}',
        '',
        '// A TREE — walk is lazy, so it is closeable too',
        'try (var paths = Files.walk(root)) { … }',
        'Files.find(root, depth, (q, a) -> a.isRegularFile())',
        '',
        '// Charset: the default became UTF-8 in 18. Before that it was',
        '// the platform default — so the same code round-tripped on',
        '// Linux and corrupted accents on a Windows box. Be explicit.',
      ].join('\n'),
    },
  ],
  edges: [],
}
