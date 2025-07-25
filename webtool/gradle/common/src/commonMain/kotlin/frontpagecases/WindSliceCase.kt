package nu.local4local.common.frontpagecases

import nu.local4local.common.AssetCost
import nu.local4local.common.HouseholdGroup
import nu.local4local.common.PPAType
import nu.local4local.common.Pilot
import nu.local4local.common.SolarFarm
import nu.local4local.common.WindFarm
import kotlin.js.JsExport

/**
 * Een casus waarin een zonnepark van 800kW en een ‘plakje wind’ van 200kW wordt gebruikt
 * om stroom te leveren aan 400 klanten zonder zonnepanelen.
 *
 * Prices from https://www.pbl.nl/uploads/default/downloads/pbl-2023-voorlopige-correctiebedragen-sce-en-sde-plus-plus-2024-5036.pdf
 */
@JsExport
val windSliceCase = Pilot(
    name = "Plakje wind",
    solarFarms = listOf(
        SolarFarm(
            nominalPower_kW = 800.0,
            curtailment = true,
            cost = AssetCost(
                ppaType = PPAType.FLOOR_CAP_PPA,
                sdeAanvraagbedrag_eurpkWh = 0.12,
                sdeBasisenergieprijs_eurpkWh = 0.05,
            )
        ),
    ),
    windFarms = listOf(
        WindFarm(
            nominalPower_kW = 200.0,
            curtailment = true,
            cost = AssetCost(
                ppaType = PPAType.FLOOR_CAP_PPA,
                sdeAanvraagbedrag_eurpkWh = 0.13,
                sdeBasisenergieprijs_eurpkWh = 0.05,
            )
        )
    ),
    householdGroups = listOf(
        HouseholdGroup(
            type = "Zonder zonnepanelen",
            households_n = 400,
            hasPV_r = 0.0,
            hasHeatPump_r = 0.0,
            hasChargePoint_r = 0.0,
            hasHomeBattery_r = 0.0,
            annualBaseConsumptionAvg_kWh = 3000.0,
        )
    )
)
