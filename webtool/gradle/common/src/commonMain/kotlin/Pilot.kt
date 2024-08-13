package nu.local4local.common

import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

@OptIn(ExperimentalJsExport::class)
@JsExport
data class Pilot(
    val name: String,
    val households: List<Households> = emptyList(),
    val companies: List<Company> = emptyList(),
    val solarFarms: List<SolarFarm> = emptyList(),
    val windFarms: List<WindFarm> = emptyList(),
    val batteries: List<Battery> = emptyList(),
    val heatStorages: List<HeatStorage> = emptyList(),
) {
    fun withHouseholds(households: Households): Pilot =
        copy(households = this.households + households)

    fun withSolarFarms(solarFarms: SolarFarm): Pilot =
        copy(solarFarms = this.solarFarms + solarFarms)

    fun withWindFarms(windFarms: WindFarm): Pilot =
        copy(windFarms = this.windFarms + windFarms)
}

@OptIn(ExperimentalJsExport::class)
@JsExport
data class Households(
    val type: String,
    val households_n: Int,
    val hasPV_r: Double,
    val hasHeatPump_r: Double,
    val hasChargePoint_r: Double,
    val hasHomeBattery_r: Double,
    
    /**Jaarlijks gemiddeld basisverbruik zonder warmtepomp, elektrische voertuigen en zonnepanelen */
    val yearlyBaseConsumptionAvg_kWh: Double,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
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
data class SolarFarm(
    val nominalPower_kW: Double,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
data class WindFarm(
    val nominalPower_kW: Double,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
data class Battery(
    val capacity_kWh: Double,
    val peakPower_kW: Double,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
data class HeatStorage(
    val storageMedium: String,
    val storageVolume_m3: Double,
    val minTemp_degC: Double,
    val maxTemp_degC: Double,
) {
    fun getCapacity_kWh(): Double {
        val specificHeatCapacity = 4.18 // kJ/kg/K

        return storageVolume_m3 * 1000 * specificHeatCapacity * (minTemp_degC - maxTemp_degC) / 3600
    }
}