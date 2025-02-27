package nu.local4local.backend

import org.http4k.client.JavaHttpClient
import org.http4k.core.Method.*
import org.http4k.core.Request
import org.http4k.routing.bind
import org.http4k.routing.routes

class ResourcefullyController {
    val httpClient = JavaHttpClient()

    val routes = routes(
        // proxy to resourcefully because it's probably easier then letting them set CORS headers
        "/resourcefully-report" bind POST to { req ->
            // We don't need to deserialize
            val data = req.bodyString()
            val url = "https://devapi.resourcefully.nl/coco/inputdata"

            println("POST to $url: $data")

            val request = Request(POST, url).body(data)
            val response = httpClient(request)

            println("Resourcefully responds ${response.status} ${response.bodyString()}")

            // return upstream response
            response
        }
    )
}
