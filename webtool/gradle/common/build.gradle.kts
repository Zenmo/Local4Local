plugins {
    kotlin("multiplatform")
    kotlin("plugin.serialization") version libs.versions.kotlin
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
            types = "kotlin/local4local-common.d.mts"
        }
        browser {
        }
    }
    sourceSets {
        all {
            languageSettings.optIn("kotlin.js.ExperimentalJsExport")
            languageSettings.optIn("kotlin.js.ExperimentalJsStatic")
        }
        val commonMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.9.0")
            }
        }
    }
}
