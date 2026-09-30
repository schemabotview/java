import type { Section } from '../types'

export const filesReadWrite: Section = {
  id: 'files-read-write',
  title: 'Reading & writing',
  scene: 'nio-files',
  slide: `## Small files whole; large files streamed

\`\`\`java
String s = Files.readString(p);      // whole file
Files.writeString(p, s, CREATE, TRUNCATE_EXISTING);

try (var lines = Files.lines(p)) {   // lazy — CLOSE it
    return lines.filter(l -> !l.isBlank()).count();
}
\`\`\`
\`readAllLines\` on a 2 GB log is an \`OutOfMemoryError\`. \`Files.lines\` is constant memory, and composes with course 8.

### The charset trap
The default became **UTF-8 in Java 18**. Before that it was the **platform default** — so identical code round-tripped on Linux and **corrupted accents** on Windows. On 17 or earlier, pass it explicitly.

### Also
\`newBufferedReader\` — unbuffered is a **syscall per character**. And writing with **no options truncates**.`,
  narration:
    "Reading and writing files splits cleanly by size, and getting that split right is most of what matters. For a small file, read the whole thing. Files dot readString gives you the content as one String. Files dot readAllLines gives you a List of lines. Files dot readAllBytes for binary. These are one line and they're perfect for configuration, a small data file, a template. For a large file, stream it. Files dot lines returns a Stream of String that reads lazily, one line at a time, so memory stays constant regardless of file size — and it composes with everything from course eight. The failure mode if you get this backwards is specific and memorable: readAllLines on a two-gigabyte log file is an OutOfMemoryError, and the method that crashed will look completely innocent. And remember from course eight section three: Files dot lines holds an open file handle, so it must be in a try-with-resources, which we just covered. It is the one stream you must close. Now the charset trap, which is worth knowing because it's a classic version-upgrade bug. Until Java 18, methods without an explicit charset used the platform default encoding — whatever the operating system happened to be configured with. So the same code read and wrote UTF-8 on a Linux CI box and Windows-1252 on a developer's laptop, and a file with an accented character or a euro sign round-tripped fine in one place and got silently corrupted in the other. No exception, just wrong characters. Java 18 changed the default to UTF-8 everywhere, which fixed it — but if you're on 17 or earlier, or reading files written by older code, pass StandardCharsets dot UTF underscore 8 explicitly. It costs one argument and removes a whole class of bug. Buffering. If you're reading or writing character by character, use Files dot newBufferedReader or newBufferedWriter. An unbuffered reader can issue a system call per character, and the difference is orders of magnitude, not percentages. Files dot lines and readString buffer for you. And finally, the open options, which mean exactly what they say and are worth reading once. CREATE makes the file if it's absent. CREATE_NEW fails if it already exists, which is how you avoid a race. APPEND adds to the end. TRUNCATE_EXISTING empties it first. The one to remember: writing with no options at all truncates. That's the default, and it's occasionally a nasty surprise.",
}
