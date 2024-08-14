plugins {
    id("org.jetbrains.kotlin.multiplatform")
//    kotlin("multiplatform") version ""
//    kotlin("plugin.serialization")
    id("org.jetbrains.kotlin.plugin.serialization")
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
            types = "kotlin/local4local-common.d.ts"
        }
        browser {
        }
    }
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
            }
        }
    }
}
