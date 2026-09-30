import type { Scene } from '@graphlearning/flow'
import { javaReach } from './java-reach'
import { modernJava } from './modern-java'
import { jdkAnatomy } from './jdk-anatomy'
import { javaPipeline } from './java-pipeline'
import { jshellSession } from './jshell-session'
import { jbangScript } from './jbang-script'
import { mavenProject } from './maven-project'
import { classpath } from './classpath'
import { jvmMemory } from './jvm-memory'

// Course 1 (runtime) scenes. One scene per section, mirroring src/content/runtime — except that
// §10 you-are-here re-runs `java-pipeline`, which is the point of the course: the spine you were
// shown in §4 is the thing every other section hung off. `java-pipeline` and `jvm-memory` are both
// shared forward into the `jvm` course, refocused rather than redrawn.
export const runtimeScenes: Scene[] = [
  javaReach,
  modernJava,
  jdkAnatomy,
  javaPipeline,
  jshellSession,
  jbangScript,
  mavenProject,
  classpath,
  jvmMemory,
]
