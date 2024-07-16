plugins {
    id("org.jetbrains.kotlin.multiplatform") version "2.0.20-Beta2"
//    kotlin("multiplatform") version ""
//    kotlin("plugin.serialization")
    id("org.jetbrains.kotlin.plugin.serialization") version "2.0.20-Beta2"
}

group = "com.zenmo"
version = "0.0.1"

repositories {
    mavenCentral()
}



kotlin {
    jvm {
    }
    js(IR) {
        useEsModules()
        generateTypeScriptDefinitions()
        binaries.library()
        compilations["main"].packageJson {
            // hack hack hack
            types = "kotlin/local4local.d.ts"
        }
        browser {
        }
    }
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
                implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.6.0-RC.2")
                implementation("com.benasher44:uuid:0.8.4")
            }
        }
    }
}
