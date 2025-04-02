
import org.gradle.api.JavaVersion.VERSION_21
import org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_21
import org.jetbrains.kotlin.gradle.tasks.KotlinJvmCompile

plugins {
    kotlin("jvm") version libs.versions.kotlin
    kotlin("plugin.serialization") version libs.versions.kotlin
    application
    id("com.gradleup.shadow") version "8.3.6"
}

buildscript {
    repositories {
        mavenCentral()
        gradlePluginPortal()
    }

    dependencies {
    }
}

application {
    mainClass = "nu.local4local.backend.MainKt"
}

tasks {
    shadowJar {
        archiveBaseName.set(project.name)
        archiveClassifier = null
        archiveVersion = null
        mergeServiceFiles()
        dependsOn(distTar, distZip)
        isZip64 = true
    }
}

repositories {
    mavenCentral()
}

apply(plugin = "kotlin")

tasks {
    withType<KotlinJvmCompile>().configureEach {
        compilerOptions {
            allWarningsAsErrors = false
            jvmTarget.set(JVM_21)
            freeCompilerArgs.add("-Xjvm-default=all")
        }
    }

    withType<Test> {
        useJUnitPlatform()
    }

    java {
        sourceCompatibility = VERSION_21
        targetCompatibility = VERSION_21
    }
}

dependencies {
    val http4kVersion = "6.4.1.0"

    implementation(project(":common"))
    implementation("org.http4k:http4k-core:${http4kVersion}")
    implementation("org.http4k:http4k-format-kotlinx-serialization:${http4kVersion}")
    implementation("org.jetbrains.kotlin:kotlin-stdlib:${libs.versions.kotlin}")
    testImplementation("org.http4k:http4k-testing-approval:${http4kVersion}")
    testImplementation("org.http4k:http4k-testing-hamkrest:${http4kVersion}")
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.12.1")
    testImplementation("org.junit.jupiter:junit-jupiter-engine:5.12.1")
}

