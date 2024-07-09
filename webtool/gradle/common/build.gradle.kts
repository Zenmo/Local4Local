plugins {
    id("org.jetbrains.kotlin.multiplatform") version "2.0.0"
//    kotlin("multiplatform") version ""
//    kotlin("plugin.serialization")
    id("org.jetbrains.kotlin.plugin.serialization") version "2.0.0"
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
        binaries.executable()
        browser {
            useEsModules()
//            webpackTask {
//                output.libraryTarget = "commonjs2"
//            }
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
