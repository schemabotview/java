import type { Section } from '../types'

export const nioPath: Section = {
  id: 'nio-path',
  title: 'The NIO Path',
  scene: 'nio-files',
  slide: `## A \`Path\` is a **name**. It needn't exist.

\`\`\`java
Path p = Path.of("data", "orders.csv");
p.resolve("archive")  p.getParent()  p.normalize()
p.toAbsolutePath()   p.getFileName()  p.relativize(q)
\`\`\`
**Immutable**, so every one of those returns a **new** \`Path\`. \`Path.of\` inserts the platform separator for you — hard-coding \`/\` or \`\\\\\` is the classic portability bug.

### Why \`Path\` replaced \`java.io.File\`
\`File\`'s methods **returned \`false\` on failure** and told you nothing: \`delete()\` gave you a bare \`false\` — no permissions? not there? in use? \`Files.delete(p)\` **throws**, with the path and the reason. Same for \`mkdir\`, \`renameTo\`, all of it.

\`File\` also had **no symlink support**, no file attributes, and no directory watching.

### The pairing
**\`Path\`** names a file. **\`Files\`** (all \`static\`) does things to it. Almost everything you want is a \`Files\` method — §10.

\`File\` still appears in older APIs; \`p.toFile()\` and \`f.toPath()\` convert.`,
  narration:
    "Java has two file APIs, and the old one is still everywhere, so it's worth being clear about which you should write and why. The modern one is Path, from NIO dot two, added in Java 7. A Path is a name — nothing more. It identifies a location in a filesystem, and the file it names need not exist. Path dot of takes segments and joins them with the right separator for the platform, which matters: hard-coding a forward slash works on Linux and Mac and breaks on Windows, and that's a bug people still ship. Paths are immutable, so resolve, getParent, normalize, toAbsolutePath and relativize all return new Paths rather than modifying anything — which makes them safe to share and safe as map keys. Resolve is the one you'll use most: it appends a segment, and if the argument is already absolute it just returns that instead, which is usually what you want. Now, why did Path replace java dot io dot File? Because File's error reporting was genuinely bad, and this is the strongest argument for switching. File dot delete returns a boolean. If it returns false, you know the delete didn't happen and you know absolutely nothing else. Was the file not there? Did you lack permission? Is it open in another process? Is it a non-empty directory? File will not tell you, and there is no way to find out. Files dot delete throws an exception instead — NoSuchFileException, AccessDeniedException, DirectoryNotEmptyException — each naming the path and the reason. That's the difference between a bug you fix in ten seconds and one you fix by adding logging and redeploying. The same applies to mkdir, renameTo and setLastModified: all boolean, all silent. File also had no symbolic link support, no access to file attributes like ownership or permissions, and no way to watch a directory for changes. NIO has all three. The mental model to carry is a pairing. Path names a file; Files, which is a class of static methods, does things to files. So you'll write Path dot of to get a name, and then hand that name to Files dot readString, Files dot copy, Files dot exists. Almost everything useful is a static on Files, which is the next section. And you'll still meet File in older libraries — p dot toFile and f dot toPath convert between them, so the boundary is cheap to cross.",
}
