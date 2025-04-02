package nu.local4local.common

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString
import kotlin.js.JsExport
import kotlin.math.roundToInt

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

    fun addHouseHoldGroup(householdGroup: HouseholdGroup) = copy(householdGroups = householdGroups + householdGroup)
    fun addCompany(company: Company) = copy(companies = companies + company)
    fun addSolarFarm(solarFarm: SolarFarm) = copy(solarFarms = solarFarms + solarFarm)
    fun addWindFarm(windFarm: WindFarm) = copy(windFarms = windFarms + windFarm)
    fun addBattery(battery: Battery) = copy(batteries = batteries + battery)
    fun addHeatStorage(heatStorage: HeatStorage) = copy(heatStorages = heatStorages + heatStorage)
    fun addBiogasGenerator(biogasGenerator: BiogasGenerator) = copy(biogasGenerators = biogasGenerators + biogasGenerator)

    fun removeHouseholdGroup(householdGroup: HouseholdGroup) = copy(householdGroups = this.householdGroups - householdGroup)
    fun removeCompany(company: Company) = copy(companies = companies - company)
    fun removeSolarFarm(solarFarm: SolarFarm) = copy(solarFarms = this.solarFarms - solarFarm)
    fun removeWindFarm(windFarm: WindFarm) = copy(windFarms = this.windFarms - windFarm)
    fun removeBattery(battery: Battery) = copy(batteries = this.batteries - battery)
    fun removeHeatStorage(heatStorage: HeatStorage) = copy(heatStorages = this.heatStorages - heatStorage)
    fun removeBiogasGenerator(biogasGenerator: BiogasGenerator) = copy(biogasGenerators = this.biogasGenerators - biogasGenerator)

    fun replaceHouseholdGroup(householdGroup: HouseholdGroup, index: Int) = copy(householdGroups = householdGroups.replaceAt(index, householdGroup))
    fun replaceSolarFarm(solarFarm: SolarFarm, index: Int) = copy(solarFarms = solarFarms.replaceAt(index, solarFarm))
    fun replaceWindFarm(windFarm: WindFarm, index: Int) = copy(windFarms = windFarms.replaceAt(index, windFarm))
    fun replaceBattery(battery: Battery, index: Int) = copy(batteries = batteries.replaceAt(index, battery))
    fun replaceHeatStorage(heatStorage: HeatStorage, index: Int) = copy(heatStorages = heatStorages.replaceAt(index, heatStorage))
    fun replaceBiogasGenerator(biogasGenerator: BiogasGenerator, index: Int) = copy(biogasGenerators = biogasGenerators.replaceAt(index, biogasGenerator))
    fun replaceCompany(old: Company, new: Company) = copy(companies = companies.replace(old, new))

    // Extension function for List replacement
    private fun <T> List<T>.replaceAt(index: Int, newValue: T): List<T> {
        return toMutableList().apply { this[index] = newValue }
    }

    private fun <T> List<T>.replace(oldValue: T, newValue: T): List<T> =
        map { if (it == oldValue) newValue else it }

    fun withSupplierCost(supplierCost: SupplierCost) = copy(supplierCost = supplierCost)

    fun toJson(): String =
        Json.encodeToString(this)
}

@JsExport
fun pilotFromJson(json: String) = Json.decodeFromString<Pilot>(json)

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

@JsExport
@Serializable
data class SupplierCost (
    val bufferPrice_eurpkWh: Double = 0.01,
    val onbalansMarkup_r: Double = 0.08,
    val feedInCompensation_eurpkWh: Double = 0.00,
)

@JsExport
@Serializable
enum class PPAType(val displayName: String) {
    FIXED_PRICE_PPA("Fixed price PPA"),
    FLOOR_CAP_PPA("Floor-cap PPA"),
}

@JsExport
@Serializable
data class AssetCost(
    val ppaType: PPAType = PPAType.FIXED_PRICE_PPA,
    val sdeAanvraagbedrag_eurpkWh: Double? = 0.0,
    val sdeBasisenergieprijs_eurpkWh: Double? = 0.0,
    val LCOE_eurpkWH: Double? = 0.0,
    val CAPEX_eur: Double? = 0.0,
    val interest_r: Double? = 0.0,
    val depreciationPeriod_y: Double? = 0.0,
    val OPEX_eurpy: Double? = 0.0,
)

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
) {
    fun hasPV_n() = (hasPV_r * households_n).roundToInt()
    fun hasHeatPump_n() = (hasHeatPump_r * households_n).roundToInt()
    fun hasChargePoint_n() = (hasChargePoint_r * households_n).roundToInt()
    fun hasHomeBattery_n() = (hasHomeBattery_r * households_n).roundToInt()
}

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

@JsExport
data class Utility(
    val name: String,
    val type: String,
)


@JsExport
data class ConsumptionAsset(
    val consumptionType: String,
    val consumption_kW: Double,
    val yearlyConsumption_kWh: Double,
)
*/

@JsExport
@Serializable
enum class PVOrientation(val displayName: String) {
    SOUTH("Zuid"),
    EAST_WEST("Oost-west"),
}

@JsExport
@Serializable
data class SolarFarm(
    val nominalPower_kW: Double,
    val orientation: PVOrientation = PVOrientation.SOUTH,
    val cost: AssetCost,
    val curtailment: Boolean = false,
)

@JsExport
@Serializable
data class BiogasGenerator(
    val power_kW: Double,
    val cost: AssetCost,
    val curtailment: Boolean = false,
)

@JsExport
@Serializable
data class WindFarm(
    val nominalPower_kW: Double,
    val cost: AssetCost,
    val location: WindFarmLocation = WindFarmLocation.BETUWE,
    val curtailment: Boolean = false,
)

@JsExport
@Serializable
enum class WindFarmLocation(val displayName: String) {
    ZUID_HOLLAND("Hoek van Holland"),
    MIDDEN_LIMBURG("Midden-Limburg"),
    BETUWE("Betuwe"),
}

@JsExport
@Serializable
data class Battery(
    val capacity_kWh: Double,
    val peakPower_kW: Double,
    val cost: AssetCost,
)

@JsExport
@Serializable
data class HeatStorage(
    val storageMedium: String,
    val storageVolume_m3: Double,
    val minTemp_degC: Double,
    val maxTemp_degC: Double,
    val cost: AssetCost,
) {
    fun getCapacity_kWh(): Double {
        val specificHeatCapacity = 4.18 // kJ/kg/K

        return storageVolume_m3 * 1000 * specificHeatCapacity * (minTemp_degC - maxTemp_degC) / 3600
    }
}
