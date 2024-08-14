package nu.local4local.client

import nu.local4local.common.Pilot
import org.http4k.client.JavaHttpClient
import org.http4k.core.Method
import org.http4k.core.Request
import org.http4k.format.KotlinxSerialization.json

class Client
@JvmOverloads
constructor(
    val baseUrl: String = requireNotNull(System.getenv("LOCAL4LOCAL_BACKEND_URL")) {
        "Please set the LOCAL4LOCAL_BACKEND_URL environment variable"
    }
) {
    fun ping(): String {
        val client = JavaHttpClient()
        val request = Request(Method.GET, "$baseUrl/ping")
        val response = client(request)
        if (response.status.code != 200) {
            throw RuntimeException("Unexpected status code: ${response.status.code}")
        }
        return response.bodyString()
    }

    fun getPilot(session: String): Pilot {
        val client = JavaHttpClient()
        val request = Request(Method.GET, "$baseUrl/pilots/$session")
        val response = client(request)
        if (response.status.code != 200) {
            throw RuntimeException("Unexpected status code: ${response.status.code}")
        }
        return response.json()
    }

    fun savePilot(session: String, pilot: Pilot) {
        val client = JavaHttpClient()
        val request = Request(Method.PUT, "$baseUrl/pilots/$session")
            .json(pilot)
        val response = client(request)
        if (response.status.code != 200) {
            throw RuntimeException("Unexpected status code: ${response.status.code}")
        }
    }
}