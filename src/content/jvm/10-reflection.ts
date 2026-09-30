import type { Section } from '../types'

export const reflectionSection: Section = {
  id: 'reflection',
  title: 'Reflection — how every framework works',
  scene: 'reflection',
  slide: `## Code as data, at run time

\`\`\`java
Method m = c.getDeclaredMethod("total", int.class);
m.setAccessible(true);      // if the module opens it
Object r = m.invoke(order, 100);
c.getDeclaredConstructor().newInstance();
\`\`\`

### This loop is the whole trick
\`\`\`java
for (Method m : c.getDeclaredMethods())
    if (m.isAnnotationPresent(Audited.class))
        wrap(m, m.getAnnotation(Audited.class).value());
\`\`\`
**Scan the classes. Find the annotated members. Act.** Spring's component scan, JPA, Jackson, JUnit finding your \`@Test\`s — all of it, plus \`@Retention(RUNTIME)\`.

### The costs, and they're real
**No compile-time checking** — a rename fails at **startup** · **slower**, the JIT can't inline through \`invoke()\` · it **defeats encapsulation**, which is why §8 pushes back

Use it to **build** a framework. Rarely in application code.`,
  narration:
    "Reflection lets a program examine and manipulate itself at run time — look up a class by name, list its methods, read its annotations, call a method it was never compiled against. And the reason to understand it is not that you'll write much of it. It's that once you've seen the loop on this slide, essentially every framework you use stops being magic. Start with the API. From any object, getClass gives you a Class object; or you write Order dot class directly. From the Class you can get declared fields, declared methods, declared constructors, superclass, interfaces and annotations. You can look up a specific method by name and parameter types. Then setAccessible true, which tells the JVM to skip the normal access check, so you can call a private method — subject to the module rules from section eight, which is exactly why add-opens exists. And invoke, which calls it, passing the receiver and the arguments. NewInstance on a constructor builds an object the compiler never saw being built. Now the loop in the middle of the slide, because this is the thing worth taking away. For every declared method on the class, if it's annotated with at-Audited, do something with it. That's it. That is how Spring finds your at-Component classes and wires them together. It's how JPA maps at-Entity to a table. It's how Jackson knows which fields to serialise. It's how JUnit finds every at-Test in your project without you registering anything. Scan the classes, find the annotated members, act on them. Three lines, and it needs one thing from course four section ten: the annotation must have RUNTIME retention, or reflection cannot see it at all. Now the costs, and they're genuine rather than theoretical. First: you have thrown away compile-time checking. A method looked up by a string name is not checked by the compiler, so renaming that method compiles perfectly and fails at startup — or worse, on the first request that hits that path. This is why reflection-heavy frameworks fail loudly at boot rather than at build. Second: it's slower. The JIT cannot inline through an invoke it can't resolve, so essentially everything in section two stops applying at that call. Modern JVMs do a great deal to make reflection cheaper, and method handles are faster still, but it is not free. Third: it defeats encapsulation. Private means nothing to setAccessible, which is precisely why the module system pushed back and closed the JDK's internals. So the guidance is: reflection is for building frameworks, tools and libraries. In ordinary application code it should be rare, and when you find yourself reaching for it, the first question is whether an interface and a bit of polymorphism would do the same job with the compiler still helping you.",
}
