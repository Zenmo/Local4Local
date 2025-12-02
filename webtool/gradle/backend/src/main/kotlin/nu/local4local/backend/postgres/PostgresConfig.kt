package nu.local4local.backend.postgres

import org.jetbrains.exposed.sql.Database

object PostgresConfig {
    fun connect() {
        val url = getEnvRequired("POSTGRES_URL")
        val user = getEnvRequired("POSTGRES_USER")
        val password = getEnvRequired("POSTGRES_PASSWORD")

        Database.connect(
            url = url,
            user = user,
            password = password,
            driver = org.postgresql.Driver::class.qualifiedName!!,
        )
    }

    private fun getEnvRequired(name: String): String {
        return System.getenv(name) ?: throw IllegalArgumentException("Environment variable $name is required")
    }
}