package nu.local4local.backend

import nu.local4local.common.Households
import nu.local4local.common.Pilot
import org.http4k.core.Method.PUT
import org.http4k.core.Method.GET
import org.http4k.core.Response
import org.http4k.core.Status.Companion.NOT_FOUND
import org.http4k.core.Status.Companion.OK
import org.http4k.format.KotlinxSerialization.json
import org.http4k.routing.bind
import org.http4k.routing.path
import org.http4k.routing.routes
import java.util.concurrent.ConcurrentHashMap

val startPilot = Pilot(
    name="startPilot",
    households = listOf(
        Households(
            type = "Mix",
            households_n = 100,
            hasPV_r = 0.5,
            hasHeatPump_r = 0.5,
            hasChargePoint_r = 0.5,
            hasHomeBattery_r = 0.5,
            yearlyBaseConsumptionAvg_kWh = 4500.0
        )
    )
)

class PilotController {
    val pilots = ConcurrentHashMap(
        mapOf(startPilot.name to startPilot)
    )

    val routes = routes(
        "/pilots/{session}" bind GET to { req ->
            val session = req.path("session")!!
            val pilot = pilots[session]
            if (pilot != null) {
                Response(OK).json(pilot)
            } else {
                Response(NOT_FOUND).body("Pilot not found")
            }
        },
        "/pilots/{session}" bind PUT to { req ->
            val session = req.path("session")!!
            val pilot = req.json<Pilot>()
            pilots[session] = pilot

            Response(OK)
        },
    )
}
