package nu.local4local.backend

import nu.local4local.common.HouseholdGroup
import nu.local4local.common.AssetCost
import nu.local4local.common.Battery
import nu.local4local.common.Pilot
import nu.local4local.common.SolarFarm
import nu.local4local.common.WindFarm
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
import kotlin.Double

val startPilot = Pilot(
    name = "startPilot",
    bufferPrice_eurpkWh = 0.01,
    householdGroups = listOf(
        HouseholdGroup(
            type = "Mix",
            households_n = 200,
            hasPV_r = 0.5,
            hasHeatPump_r = 0.2,
            hasChargePoint_r = 0.2,
            hasHomeBattery_r = 0.1,
            annualBaseConsumptionAvg_kWh = 4500.0
        ),
    ),
    windFarms = listOf(
        WindFarm(
            nominalPower_kW = 2000.0,
            AssetCost(
                LCOE_eurpkWH = 0.07,
                CAPEX_eur = 0.0,
                interest_r = 0.0,
                depreciationPeriod_y = 0.0,
                OPEX_eurpy = 0.0
            ),
        ),
    ),
    solarFarms = listOf(
        SolarFarm(
            nominalPower_kW = 2000.0,
            AssetCost(
                LCOE_eurpkWH = 0.04,
            )
        )
    ),
    batteries = listOf(
        Battery(
            capacity_kWh = 200.0,
            peakPower_kW = 100.0,
            cost = AssetCost(
                CAPEX_eur = 100_000.0,
                interest_r = 0.05,
                depreciationPeriod_y = 30.0,
                OPEX_eurpy = 1000.0,
            )
        ),
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
