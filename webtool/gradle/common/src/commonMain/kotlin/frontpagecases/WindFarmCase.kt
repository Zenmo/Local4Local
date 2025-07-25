package nu.local4local.common

import kotlin.js.JsExport

/**
 * Een casus waarin 10% van de productie van een 2.5MW windmolen (250kW)
 * wordt gebruikt om stroom te leveren aan 350 klanten,
 * waarvan 50% ook eigen zonnepanelen heeft,
 * en een terugleververgoeding aan klanten met zonnepanelen van 5ct/kWh geldt.
 */
@JsExport
val windFarmCase = Pilot(
    name = "Windmolen met prosumers",
    supplierCost = SupplierCost(
        feedInCompensation_eurpkWh = 0.05,
    ),
    windFarms = listOf(
        WindFarm(
            nominalPower_kW = 250.0,
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
            type = "Met zonnepanelen",
            households_n = 175,
            hasPV_r = 1.0,
            hasHeatPump_r = 0.0,
            hasChargePoint_r = 0.0,
            hasHomeBattery_r = 0.0,
            annualBaseConsumptionAvg_kWh = 4000.0,
        ),
        HouseholdGroup(
            type = "Zonder zonnepanelen",
            households_n = 175,
            hasPV_r = 0.0,
            hasHeatPump_r = 0.0,
            hasChargePoint_r = 0.0,
            hasHomeBattery_r = 0.0,
            annualBaseConsumptionAvg_kWh = 3000.0,
        )
    ),
)
