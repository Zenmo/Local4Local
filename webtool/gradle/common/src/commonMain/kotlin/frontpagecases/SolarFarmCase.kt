package nu.local4local.common.frontpagecases

import nu.local4local.common.AssetCost
import nu.local4local.common.HouseholdGroup
import nu.local4local.common.PPAType
import nu.local4local.common.Pilot
import nu.local4local.common.SolarFarm
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

/**
 * Een casus waarin een stroom van een 800kW zonnepark geleverd wordt
 * aan 200 klanten zonder eigen zonnepanelen.
 */
@JsExport
val solarFarmCase = Pilot(
    name = "Zonnepark zonder prosumers",
    solarFarms = listOf(
        SolarFarm(
            nominalPower_kW = 800.0,
            curtailment = true,
            cost = AssetCost(
                ppaType = PPAType.FLOOR_CAP_PPA,
                sdeAanvraagbedrag_eurpkWh = 0.12,
                sdeBasisenergieprijs_eurpkWh = 0.05,
            )
        )
    ),
    householdGroups = listOf(
        HouseholdGroup(
            type = "Huishoudens",
            households_n = 200,
            hasPV_r = 0.0,
            hasHeatPump_r = 0.0,
            hasChargePoint_r = 0.0,
            hasHomeBattery_r = 0.0,
            annualBaseConsumptionAvg_kWh = 3000.0,
        )
    )
)
