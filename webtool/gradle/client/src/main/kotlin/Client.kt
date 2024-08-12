package nu.local4local.client

import org.http4k.client.JavaHttpClient
import org.http4k.core.Method
import org.http4k.core.Request

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
            throw RuntimeException("Unexpected status code: ${response.status.code} ${response.status.description}")
        }
        return response.bodyString()
    }
}