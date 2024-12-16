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
    val biogasGenerators: List<BiogasGenerator> = emptyList(),
    val supplierCost: SupplierCost = SupplierCost(),
) {
    @Deprecated("Moved to supplierCost.bufferPrice_eurpkWh", ReplaceWith("supplierCost.bufferPrice_eurpkWh"))
    val bufferPrice_eurpkWh
        get() = supplierCost.bufferPrice_eurpkWh

    // Create
    fun create(asset: AssetType): Pilot = when (asset) {
        is HouseholdGroup -> copy(householdGroups = this.householdGroups + asset)
        is SolarFarm -> copy(solarFarms = this.solarFarms + asset)
        is WindFarm -> copy(windFarms = this.windFarms + asset)
        is Battery -> copy(batteries = this.batteries + asset)
        is HeatStorage -> copy(heatStorages = this.heatStorages + asset)
        is BiogasGenerator -> copy(biogasGenerators = this.biogasGenerators + asset)
        else -> throw Exception("Unknown type")
    }

    // Delete
    fun remove(asset: AssetType): Pilot = when (asset) {
        is HouseholdGroup -> copy(householdGroups = this.householdGroups - asset)
        is SolarFarm -> copy(solarFarms = this.solarFarms - asset)
        is WindFarm -> copy(windFarms = this.windFarms - asset)
        is Battery -> copy(batteries = this.batteries - asset)
        is HeatStorage -> copy(heatStorages = this.heatStorages - asset)
        is BiogasGenerator -> copy(biogasGenerators = this.biogasGenerators - asset)
        else -> throw Exception("Unknown type")
    }

    // Generalized replace function
    fun replaceAsset(newAsset: AssetType, index: Int,): Pilot = when (newAsset) {
        is HouseholdGroup -> copy(householdGroups = householdGroups.replaceAt(index, newAsset))
        is SolarFarm -> copy(solarFarms = solarFarms.replaceAt(index, newAsset))
        is WindFarm -> copy(windFarms = windFarms.replaceAt(index, newAsset))
        is Battery -> copy(batteries = batteries.replaceAt(index, newAsset))
        is HeatStorage -> copy(heatStorages = heatStorages.replaceAt(index, newAsset))
        is BiogasGenerator -> copy(biogasGenerators = biogasGenerators.replaceAt(index, newAsset))
        else -> throw Exception("Unknown type")
    }

    // Extension function for List replacement
    private fun <T> List<T>.replaceAt(index: Int, newValue: T): List<T> {
        return toMutableList().apply { this[index] = newValue }
    }

    private fun <T> List<T>.replace(oldValue: T, newValue: T): List<T> =
        map { if (it == oldValue) newValue else it }

    fun withSupplierCost(supplierCost: SupplierCost) = copy(supplierCost = supplierCost)

    fun addCompany(company: Company) = copy(companies = companies + company)

    fun removeCompany(company: Company) = copy(companies = companies - company)

    fun replaceCompany(old: Company, new: Company) = copy(companies = companies.replace(old, new))

    fun toJson(): String =
        Json.encodeToString(this)
}

@OptIn(ExperimentalJsExport::class)
@JsExport
fun pilotFromJson(json: String) = Json.decodeFromString<Pilot>(json)

@OptIn(ExperimentalJsExport::class)
@JsExport
fun createDefaultStartPilot() = Pilot(
    name = "start",
    householdGroups = listOf(
        HouseholdGroup(
            type = "Huishoudens",
            households_n = 200,
            hasPV_r = 0.2,
            hasHeatPump_r = 0.1,
            hasChargePoint_r = 0.2,
            hasHomeBattery_r = 0.0,
            annualBaseConsumptionAvg_kWh = 3000.0,
        )
    )
)

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class SupplierCost (
    val bufferPrice_eurpkWh: Double = 0.01,
    val onbalansMarkup_r: Double = 0.08,
    val feedInCompensation_eurpkWh: Double = 0.00,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
sealed interface AssetType

@OptIn(ExperimentalJsExport::class)
@JsExport
@Serializable
data class AssetCost(
    val sdeAanvraagbedrag_eurpkWh: Double? = 0.0,
    val sdeBasisenergieprijs_eurpkWh: Double? = 0.0,
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
    val annualElectricityConsumption_kWh: Double,
    val pvInstalled_kWp: Double,
    // disabled for now
//    val chargePoints_n: Int,
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
data class BiogasGenerator(
    val power_kW: Double,
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
