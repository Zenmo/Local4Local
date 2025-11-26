package nu.local4local.backend.postgres

import java.sql.Connection
import java.sql.DriverManager

fun connectToPostgres(): Connection {
    val url = getEnvRequired("POSTGRES_URL")
    val user = getEnvRequired("POSTGRES_USER")
    val password = getEnvRequired("POSTGRES_PASSWORD")

    return connectToPostgres(url, user, password)
}

fun connectToPostgres(url: String, user: String, password: String): Connection =
    DriverManager.getConnection(url, user, password)

fun getEnvRequired(name: String): String {
    return System.getenv(name) ?: throw IllegalArgumentException("Environment variable $name is required")
}