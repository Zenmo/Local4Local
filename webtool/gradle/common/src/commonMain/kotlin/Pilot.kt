package nu.local4local.common

import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

@OptIn(ExperimentalJsExport::class)
@JsExport
data class Pilot(
    val name: String,
    val numHouseholds: int,
    val households: List<Households>,
    val numCompanies: int,
    val companies: List<Company>,
    val numSolarfarms: int,
    val solarfarms: List<Solarfarm>,
    val numWindfarms: int,
    val windfarms: List<Windfarm>,
    val numBatteries: int,
    val batteries: List<Battery>,
    val numHeatStorages: int,
    val heatStorages: List<HeatStorage>,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
data class Households(
    val type: String,
    val numHouseholds: int,
    val hasPVRatio: double,
    val hasHeatPumpRatio: double,
    val hasChargePointRatio: double,
    val hasHomeBatteryRatio: double,
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
    val type: String,
    val consumption_kW: double,
)
*/

@OptIn(ExperimentalJsExport::class)
@JsExport
data class Solarfarm(
    val production_kW: double,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
data class Windfarm(
    val production_kW: double,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
data class Battery(
    val capacity_kWh: double,
    val peakPower_kW: double,
)

@OptIn(ExperimentalJsExport::class)
@JsExport
data class HeatStorage(
    val capacity_kWh: double,
    val peakPower_kW: double,
    val water_m3: double,
    val minTemp: double,
    val maxTemp: double,
)