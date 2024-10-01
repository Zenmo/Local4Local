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
    // Create
    fun create(asset: AssetType) = when (asset) {
        is HouseholdGroup -> copy(householdGroups = this.householdGroups + asset)
        is SolarFarm -> copy(solarFarms = this.solarFarms + asset)
        is WindFarm -> copy(windFarms = this.windFarms + asset)
        is Battery -> copy(batteries = this.batteries + asset)
        is HeatStorage -> copy(heatStorages = this.heatStorages + asset)
        else -> "Unknown type"
    }

    // Delete
    fun remove(obj: AssetType) = when (obj) {
        is HouseholdGroup -> copy(householdGroups = this.householdGroups - obj)
        is SolarFarm -> copy(solarFarms = this.solarFarms - obj)
        is WindFarm -> copy(windFarms = this.windFarms - obj)
        is Battery -> copy(batteries = this.batteries - obj)
        is HeatStorage -> copy(heatStorages = this.heatStorages - obj)
        else -> "Unknown type"
    }

    fun toJson(): String =
        Json.encodeToString(this)
}
sealed interface AssetType

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class AssetCost(
    val LCOE_eurpkWH: Double? = 0.0,
    val CAPEX_eur: Double? = 0.0,
    val interest_r: Double? = 0.0,
    val depreciationPeriod_y: Double? = 0.0,
    val OPEX_eurpy: Double? = 0.0,
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
): AssetType

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
    val cost: AssetCost,
): AssetType

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class WindFarm(
    val nominalPower_kW: Double,
    val cost: AssetCost,
): AssetType

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class Battery(
    val capacity_kWh: Double,
    val peakPower_kW: Double,
    val cost: AssetCost,
): AssetType

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class HeatStorage(
    val storageMedium: String,
    val storageVolume_m3: Double,
    val minTemp_degC: Double,
    val maxTemp_degC: Double,
    val cost: AssetCost,
): AssetType {
    fun getCapacity_kWh(): Double {
        val specificHeatCapacity = 4.18 // kJ/kg/K

        return storageVolume_m3 * 1000 * specificHeatCapacity * (minTemp_degC - maxTemp_degC) / 3600
    }
}