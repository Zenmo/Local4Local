plugins {
    kotlin("jvm") version "2.0.10"
    kotlin("plugin.serialization") version "2.0.10"
    id("com.github.johnrengelman.shadow") version "8.1.1"
}

repositories {
    mavenCentral()
}

tasks.shadowJar {
    archiveBaseName = "local4local-client"
    archiveClassifier = ""
}

dependencies {
    testImplementation(kotlin("test"))

    implementation(project(":common"))
    implementation(platform("org.http4k:http4k-bom:5.27.0.0"))
    implementation("org.http4k:http4k-core")
    implementation("org.http4k:http4k-format-kotlinx-serialization")

    // Http4k documentation prefers Apache above the Java built-in client but it seems fine
    //implementation("org.http4k:http4k-client-apache")
}