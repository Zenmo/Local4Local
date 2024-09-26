package nu.local4local.common

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class Pilot(
    val name: String,
    val householdGroups: List<HouseholdGroup> = emptyList(),
    val companies: List<Company> = emptyList(),
    val solarFarms: List<SolarFarm> = emptyList(),
    val windFarms: List<WindFarm> = emptyList(),
    val batteries: List<Battery> = emptyList(),
    val heatStorages: List<HeatStorage> = emptyList(),
) {
    fun withHouseholdGroup(households: HouseholdGroup): Pilot =
        copy(householdGroups = this.householdGroups + households)

    fun withSolarFarm(solarFarm: SolarFarm): Pilot =
        copy(solarFarms = this.solarFarms + solarFarm)

    fun withWindFarm(windFarm: WindFarm): Pilot =
        copy(windFarms = this.windFarms + windFarm)

    fun withBattery(battery: Battery): Pilot =
        copy(batteries = this.batteries + battery)

    fun withHeatStorage(heatStorage: HeatStorage): Pilot =
        copy(heatStorages = this.heatStorages + heatStorage)

    fun toJson(): String =
        Json.encodeToString(this)
}

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class AssetCost(
    val LCOE_eurpkWH: Double? = 0.0,
    val CAPEX_eur: Double? = 0,
    val interest_r: Double? = 0,
    val depreciationPeriod_y: Double? = 0,
    val OPEX_eurpy: Double? = 0,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class HouseholdGroup(
    val type: String,
    val households_n: Int,
    val hasPV_r: Double,
    val hasHeatPump_r: Double,
    val hasChargePoint_r: Double,
    val hasHomeBattery_r: Double,
     /**Jaarlijks gemiddeld basisverbruik zonder warmtepomp, elektrische voertuigen en zonnepanelen */
    val annualBaseConsumptionAvg_kWh: Double,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class Company(
    val name: String,
)

/*
@OptIn(ExperimentalJsExport::class)
@JsExport
data class Utility(
    val name: String,
    val type: String,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
data class ConsumptionAsset(
    val consumptionType: String,
    val consumption_kW: Double,
    val yearlyConsumption_kWh: Double,
)
*/

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class SolarFarm(
    val nominalPower_kW: Double,
    val cost: Cost,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class WindFarm(
    val nominalPower_kW: Double,
    val cost: Cost,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class Battery(
    val capacity_kWh: Double,
    val peakPower_kW: Double,
    val cost: Cost,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class HeatStorage(
    val storageMedium: String,
    val storageVolume_m3: Double,
    val minTemp_degC: Double,
    val maxTemp_degC: Double,
    val cost: Cost,
) {
    fun getCapacity_kWh(): Double {
        val specificHeatCapacity = 4.18 // kJ/kg/K

        return storageVolume_m3 * 1000 * specificHeatCapacity * (minTemp_degC - maxTemp_degC) / 3600
    }
}