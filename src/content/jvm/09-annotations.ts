import type { Section } from '../types'

export const annotations: Section = {
  id: 'annotations',
  title: 'Declaring an annotation',
  scene: 'reflection',
  slide: `## Metadata, and what decides who sees it

\`\`\`java
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD, ElementType.TYPE })
public @interface Audited {
    String value() default "";
    Level level() default Level.INFO;
}
\`\`\`

### Retention decides everything
**\`SOURCE\`** — \`javac\` drops it. \`@Override\`, linters, Lombok.
**\`CLASS\`** — in the bytecode, not loadable. **The default**, and almost never what you want.
**\`RUNTIME\`** — **readable by reflection** (§10). Every framework needs this.

### Members
Only constants, \`String\`, \`Class\`, enums, annotations and arrays of those — the values are **baked into the class file**.

### It does nothing on its own
\`javac\`, an **annotation processor** (compile time, generates code — Lombok, MapStruct), or **reflection at startup**. §10 is that last one.`,
  narration:
    "Course four section ten introduced the built-in annotations. This is about declaring your own, and about the three declarations that decide what's possible with it. You declare one with at-interface — that's the keyword, at sign immediately followed by interface. Inside, you declare members, which look like methods but are really named values with optional defaults. And there's a convention worth knowing: a member named value can be supplied without naming it, so at-Audited of quote payment quote works rather than requiring value equals payment. Retention is the one that matters most. SOURCE means javac reads it and then throws it away — it doesn't exist in the class file at all. That's right for things only tools reading your source care about: at-Override, linter suppressions, and Lombok, which is an annotation processor. CLASS means it's stored in the bytecode but not made available at run time. That is the default, which is unfortunate, because it's almost never what anyone wants — if you forget to specify retention, your annotation is invisible to reflection and your framework silently doesn't see it. And RUNTIME means it's kept and readable by reflection, which is what every framework requires. If you're writing an annotation for anything that will be discovered at startup, you need RUNTIME, explicitly. Target restricts where it may be placed — methods, types, fields, parameters, and so on. Without it, an annotation can go almost anywhere, and you'll get it applied in places you never intended. Inherited means a subclass is considered annotated if its superclass is, which matters for framework base classes. And Repeatable, since Java 8, allows the same annotation more than once on one element. One restriction on members, and it's structural. The types allowed are primitives, String, Class, enums, other annotations, and arrays of those. Nothing else. You cannot have a member of an arbitrary type, because the values are constants baked into the class file at compile time — there's no place to construct an object. Finally, the sentence from course four, restated because it's the hinge into the next section. An annotation does nothing by itself. It's a label. Something has to read it and act: javac for the built-in checks, an annotation processor which runs at compile time and can generate source — that's how Lombok and MapStruct work — or reflection at run time, typically during startup. That last one is the next section, and it's the mechanism behind every framework you've used.",
}
