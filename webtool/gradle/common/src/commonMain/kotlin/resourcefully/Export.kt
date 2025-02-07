package nu.local4local.common.resourcefully

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import nu.local4local.common.PVOrientation
import kotlin.js.JsExport
import nu.local4local.common.SupplierCost

@JsExport
@Serializable
data class ResourcefullyExport(
    val scenarioDescription: String,
    val scenarioUrl: String,
    val personName: String,
    val organizationName: String,
    val email: String,

    /** Simultation settings */
    val year: Int = 2023,
    val includeFeedInInCoopProduction: Boolean = false,
    val supplierCost: SupplierCost,

    /** Customers */
    val householdGroups: List<HouseholdGroup>,
    val companies: List<Company>,

    /** Assets */
    val windFarms: List<WindFarm>,
    val solarFarms: List<SolarFarm>,
    val biogasGenerators: List<BiogasGenerator>,
    val batteries: List<Battery>,

    /* Simulation output */
    val coopReport: AnnualCoopReport,
) {
    fun toJson(): String =
        Json {
            encodeDefaults = true
            prettyPrint = true
        }.encodeToString(this)
}

@JsExport
@Serializable
data class HouseholdGroup(
    val description: String,
    val households_n: Int,
    val hasPV_n: Int,
    val hasHeatPump_n: Int,
    val hasChargePoint_n: Int,
    /** Jaarlijks gemiddeld basisverbruik zonder warmtepomp, elektrische voertuigen en zonnepanelen */
    val annualBaseConsumptionAvg_kWh: Double,

    /**
     * Simulation results.
     * I don't think we have these available yet on a per-group basis.
     */
    //val annualElectricityConsumption_kWh: Double,
    //val annualElectricityProduction_kWh: Double,
    //val annualElectricityDelivery_kWh: Double,
    //val annualElectricityFeedIn_kWh: Double,
)

@JsExport
@Serializable
data class Company(
    val name: String,
    val annualElectricityConsumption_kWh: Double,
    val pvInstalled_kWp: Double,
)

@JsExport
@Serializable
data class WindFarm(
    val nominalPower_kW: Double,
    val LCOE_eurpkWH: Double,
    val sdeAanvraagbedrag_eurpkWh: Double,
    val sdeBasisenergieprijs_eurpkWh: Double,

    /** Simulation result */
    val annualElectricityProduction_kWh: Double,
)

@JsExport
@Serializable
data class SolarFarm(
    val peakPower_kW: Double,
    val orientation: PVOrientation,
    val LCOE_eurpkWH: Double,
    val sdeAanvraagbedrag_eurpkWh: Double,
    val sdeBasisenergieprijs_eurpkWh: Double,
    /** Simulation result */
    val annualElectricityProduction_kWh: Double,
)

@JsExport
@Serializable
data class BiogasGenerator(
    val power_kW: Double,
    val LCOE_eurpkWH: Double,
    val sdeAanvraagbedrag_eurpkWh: Double,
    val sdeBasisenergieprijs_eurpkWh: Double,
    /** Simulation result */
    val annualElectricityProduction_kWh: Double,
)

@JsExport
@Serializable
data class Battery(
    val capacity_kWh: Double,
    val peakPower_kW: Double,
    val CAPEX_eur: Double,
    val interest_r: Double,
    val depreciationPeriod_y: Double,
    val OPEX_eurpy: Double,
)

@JsExport
@Serializable
data class AccountingLine(
    val quantity_MWh: Double,
    val price_eurpMWh: Double,
    val totalPrice_eur: Double,
)

@JsExport
@Serializable
data class AnnualCoopReport (
    val ownProduction: AccountingLine,
    val selfConsumption: AccountingLine,
    val feedinSelfConsumption: AccountingLine,
    val feedinExport: AccountingLine,
    val EPEXbuy: AccountingLine,
    val EPEXsell: AccountingLine,
    val nonsimultaneousDelivery: AccountingLine,
    val totalDelivery: AccountingLine,
    val reDeliveryFeedIn: AccountingLine,
    val onbalans: AccountingLine,
)
