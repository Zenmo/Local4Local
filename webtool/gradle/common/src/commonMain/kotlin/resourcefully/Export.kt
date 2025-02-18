package nu.local4local.common.resourcefully

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import nu.local4local.common.PVOrientation
import nu.local4local.common.Pilot
import kotlin.js.JsExport
import nu.local4local.common.SupplierCost
import kotlin.js.ExperimentalJsStatic
import kotlin.js.JsStatic

@JsExport
@Serializable
data class ResourcefullyExport(
    /** Metadata for the export filled out by the user */
    var scenarioDescription: String? = null,
    var personName: String? = null,
    var organizationName: String? = null,
    var email: String? = null,

    var scenarioUrl: String? = null,

    /** Simultation settings */
    var year: Int = 2023,
    var includeFeedInInCoopProduction: Boolean = false,
    var supplierCost: SupplierCost? = null,

    /** Customers */
    var householdGroups: List<HouseholdGroup> = mutableListOf(),
    var companies: List<Company> = emptyList(),

    /** Assets */
    var windFarms: List<WindFarm> = emptyList(),
    var solarFarms: List<SolarFarm> = emptyList(),
    var biogasGenerators: List<BiogasGenerator> = emptyList(),
    var batteries: List<Battery> = emptyList(),

    /** Simulation output */
    var coopReport: AnnualCoopReport? = null,
) {
    companion object {
        @JsStatic
        fun create(pilot: Pilot, metadata: ExportMetadata, scenarioUrl: String) = ResourcefullyExport(
            scenarioDescription = metadata.scenarioDescription,
            personName = metadata.personName,
            organizationName = metadata.organizationName,
            email = metadata.email,
            scenarioUrl = scenarioUrl,
        )
    }

    fun toJson(): String =
        Json {
            encodeDefaults = true
            prettyPrint = true
        }.encodeToString(this)
}

@JsExport
data class ExportMetadata(
    val scenarioDescription: String,
    val personName: String,
    val organizationName: String,
    val email: String,
)

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
    val feedInSelfConsumption: AccountingLine,
    val feedInExport: AccountingLine,
    val EPEXbuy: AccountingLine,
    val EPEXsell: AccountingLine,
    val nonsimultaneousDelivery: AccountingLine,
    val totalDelivery: AccountingLine,
    val reDeliveryFeedIn: AccountingLine,
    val onbalans: AccountingLine,
)
