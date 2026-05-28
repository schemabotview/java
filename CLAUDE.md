# Java Learning Content Repo

## Role
You are a Java and Spring expert and content creator. This repo contains educational content covering modern Java (Java 21 LTS and newer) plus the Spring Framework / Spring Boot ecosystem, targeting developers who want strong Java fundamentals on a direct path to building production Spring backend services.

See `../CLAUDE.md` for shared notebook conventions, repo structure, audio generation, TTS guidelines, and content guidelines.

## Learning Design

The topic list is **12 notebooks** — at the upper edge of the user's 10±2 retention range, justified by the breadth of Java + Spring. The first seven build the Java foundation in order of conceptual dependency; the last five pivot to Spring, split into Core, Web, Data, Production (incl. messaging/Kafka), and Spring Cloud so each track gets its own focused session. Annotations and reflection — the underpinnings of Spring's programming model — are seeded in topics 02 and 07 so they land on prepared ground.

## Local Setup

```bash
brew install --cask temurin              # Eclipse Temurin JDK 21 LTS
brew install maven gradle                # build tools
brew install jbang                       # single-file scripts, ideal for notebook examples
brew install spring-boot                 # Spring Boot CLI (optional)
```

Use `jshell` (ships with the JDK) and `jbang` for quick runnable snippets. Use Maven or Gradle for the Spring chapters where multi-file projects are unavoidable. For Spring Data, an embedded H2 database keeps examples self-contained without external services.

## Content Guidelines

- Target **Java 21+** syntax and idioms (records, sealed types, pattern matching for `switch`, text blocks, `var`, virtual threads)
- Show pre-21 equivalents briefly only when contrasting old vs. new style adds learning value
- Prefer immutable data (records, `List.of`, `Map.of`) and pure methods in examples
- Use real-world analogies; relate concepts to Python/Scala where the user has prior context
- Keep core-Java examples runnable in `jshell` or a single-file `jbang` script without extra setup
- For Spring topics, prefer **Spring Boot 3.x** with annotation-based Java configuration; show minimal `pom.xml` / `build.gradle` snippets only when essential
- Show Spring concepts as small, self-contained apps (one controller, one service, one repository) before layering on complexity

## Topics Covered

| # | Topic | Notebook | Audio |
|---|---|---|---|
| 01 | Java Essentials | `01-java-essentials.ipynb` | `01-java-essentials.wav` |
| 02 | OOP & Modern Types | `02-oop-and-modern-types.ipynb` | `02-oop-and-modern-types.wav` |
| 03 | Collections & Generics | `03-collections-and-generics.ipynb` | `03-collections-and-generics.wav` |
| 04 | Functional Java & Streams | `04-functional-java-and-streams.ipynb` | `04-functional-java-and-streams.wav` |
| 05 | Errors, Files & I/O | `05-errors-files-and-io.ipynb` | `05-errors-files-and-io.wav` |
| 06 | Concurrency & Virtual Threads | `06-concurrency-and-virtual-threads.ipynb` | `06-concurrency-and-virtual-threads.wav` |
| 07 | JVM, Reflection, Build & Testing | `07-jvm-reflection-build-and-testing.ipynb` | `07-jvm-reflection-build-and-testing.wav` |
| 08 | Spring Core | `08-spring-core.ipynb` | `08-spring-core.wav` |
| 09 | Spring Web | `09-spring-web.ipynb` | `09-spring-web.wav` |
| 10 | Spring Data | `10-spring-data.ipynb` | `10-spring-data.wav` |
| 11 | Spring Boot in Production | `11-spring-boot-in-production.ipynb` | `11-spring-boot-in-production.wav` |
| 12 | Spring Cloud | `12-spring-cloud.ipynb` | `12-spring-cloud.wav` |

### What each notebook covers

- **01 Java Essentials** — intro & JDK / tool setup, `jshell` / `jbang`, **values**, primitives vs reference types, **expressions vs statements**, operators, `var` and type inference, control flow statements, methods, strings, text blocks
- **02 OOP & Modern Types** — classes, inheritance, interfaces, abstract classes, enums, records, sealed types, pattern matching for `switch`, built-in annotations (`@Override`, `@Deprecated`)
- **03 Collections & Generics** — `List`/`Set`/`Map`/`Queue` hierarchy, iterators, immutable collections, generics, bounded types, variance (`? extends` / `? super`)
- **04 Functional Java & Streams** — lambdas, method references, functional interfaces (`Function`, `Predicate`, `Consumer`, `Supplier`), `Stream` pipelines, collectors, `Optional`
- **05 Errors, Files & I/O** — checked vs unchecked exceptions, `try-with-resources`, custom exceptions, NIO `Path` and `Files`, reading/writing, serialization basics
- **06 Concurrency & Virtual Threads** — threads, `Runnable`/`Callable`, `ExecutorService`, virtual threads, `CompletableFuture`, structured concurrency, locks and `java.util.concurrent` utilities
- **07 JVM, Reflection, Build & Testing** — heap/stack/metaspace, GC at a glance, class loading, modules, **annotations & reflection** (the Spring bridge), Maven & Gradle basics, JUnit 5 + Mockito
- **08 Spring Core** — IoC container, dependency injection, bean lifecycle and scopes, `@Configuration`/`@Component`/`@Bean`, profiles, `@Value` and `Environment`, AOP basics, `ApplicationContext` events
- **09 Spring Web** — Spring MVC, REST controllers, request mapping, validation (`@Valid`), `@ControllerAdvice` exception handlers, `RestClient`/`WebClient`, Spring Security essentials (auth, method security)
- **10 Spring Data** — Spring Data JPA, entity mapping, repositories, derived queries, `@Query`, paging & sorting, transactions (`@Transactional`), Flyway/Liquibase migrations
- **11 Spring Boot in Production** — auto-configuration, `@ConfigurationProperties`, externalized config, Actuator endpoints, logging, **messaging with `spring-kafka`** (producers, consumers, `@KafkaListener`), JMS / Spring AMQP (RabbitMQ) at a glance, `@SpringBootTest`, `@WebMvcTest`, `@DataJpaTest`, Testcontainers, packaging and container deployment
- **12 Spring Cloud** — config server & client, service discovery (Eureka), API gateway (Spring Cloud Gateway), circuit breakers (Resilience4j), distributed tracing (Micrometer + OpenTelemetry), Spring Cloud Stream as the binder abstraction on top of Kafka/RabbitMQ
