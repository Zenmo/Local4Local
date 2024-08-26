package nu.local4local.backend

import org.http4k.core.HttpHandler
import org.http4k.core.Method
import org.http4k.core.Method.GET
import org.http4k.core.Response
import org.http4k.core.Status.Companion.OK
import org.http4k.core.then
import org.http4k.filter.AllowAll
import org.http4k.filter.CorsPolicy
import org.http4k.filter.DebuggingFilters.PrintRequest
import org.http4k.filter.OriginPolicy
import org.http4k.filter.ServerFilters
import org.http4k.routing.bind
import org.http4k.routing.routes
import org.http4k.server.SunHttp
import org.http4k.server.asServer

val ping = routes(
    "/ping" bind GET to {
        Response(OK).body("pong")
    }
)

fun main() {
    val pilotController = PilotController()
    val app = routes(pilotController.routes, ping)
    val corsPolicy = CorsPolicy(
        OriginPolicy.AllowAll(),
        listOf("content-type"),
        Method.entries,
        false
    )

    val printingApp: HttpHandler = PrintRequest()
        .then(ServerFilters.Cors(corsPolicy))
        .then(app)

    val server = printingApp.asServer(SunHttp(9000)).start()

    println("Server started on " + server.port())
}
