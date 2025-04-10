/*
 * The settings file is used to specify which projects to include in your build.
 * For more detailed information on multi-project builds, please refer to https://docs.gradle.org/8.8/userguide/multi_project_builds.html in the Gradle documentation.
 */

rootProject.name = "local4local"

dependencyResolutionManagement {
    versionCatalogs {
        create("libs") {
            version("kotlin", "2.1.20")
        }
    }
}

include("common", "backend", "client")
