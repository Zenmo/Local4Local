package nu.local4local.common.resourcefully

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import nu.local4local.common.*
import kotlin.js.JsExport
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
) {
    companion object {
        fun create(householdGroup: nu.local4local.common.HouseholdGroup) = with(householdGroup) {
            HouseholdGroup(
                description = type,
                households_n = households_n,
                hasPV_n = hasPV_n(),
                hasHeatPump_n = hasHeatPump_n(),
                hasChargePoint_n = hasChargePoint_n(),
                annualBaseConsumptionAvg_kWh = annualBaseConsumptionAvg_kWh,
            )
        }
    }
}

@JsExport
@Serializable
data class Company(
    val name: String,
    val annualElectricityConsumption_kWh: Double,
    val pvInstalled_kWp: Double,
) {
    companion object {
        fun create(company: nu.local4local.common.Company) = with(company) {
            Company(
                name = name,
                annualElectricityConsumption_kWh = annualElectricityConsumption_kWh,
                pvInstalled_kWp = pvInstalled_kWp,
            )
        }
    }
}

@JsExport
@Serializable
data class WindFarm(
    val nominalPower_kW: Double,
    val LCOE_eurpkWH: Double,
    val sdeAanvraagbedrag_eurpkWh: Double,
    val sdeBasisenergieprijs_eurpkWh: Double,
    val curtailment: Boolean,
    val ppaType: PPAType,
    val location: WindFarmLocation,

    /** Simulation result */
    val annualElectricityProduction_kWh: Double?,
) {
    companion object {
        fun create(windFarm: nu.local4local.common.WindFarm) = with(windFarm) {
            with(cost) {
                WindFarm(
                    nominalPower_kW = nominalPower_kW,
                    LCOE_eurpkWH = LCOE_eurpkWH!!,
                    sdeAanvraagbedrag_eurpkWh = sdeAanvraagbedrag_eurpkWh!!,
                    sdeBasisenergieprijs_eurpkWh = sdeBasisenergieprijs_eurpkWh!!,
                    curtailment = curtailment,
                    ppaType = ppaType,
                    location = location,
                    annualElectricityProduction_kWh = null,
                )
            }
        }
    }
}

@JsExport
@Serializable
data class SolarFarm(
    val peakPower_kW: Double,
    val orientation: PVOrientation,
    val LCOE_eurpkWH: Double,
    val sdeAanvraagbedrag_eurpkWh: Double,
    val sdeBasisenergieprijs_eurpkWh: Double,
    val curtailment: Boolean,
    val ppaType: PPAType,

    /** Simulation result */
    val annualElectricityProduction_kWh: Double?,
) {
    companion object {
        fun create(solarFarm: nu.local4local.common.SolarFarm) = with(solarFarm) {
            with(cost) {
                SolarFarm(
                    peakPower_kW = nominalPower_kW,
                    orientation = orientation,
                    LCOE_eurpkWH = LCOE_eurpkWH!!,
                    sdeAanvraagbedrag_eurpkWh = sdeAanvraagbedrag_eurpkWh!!,
                    sdeBasisenergieprijs_eurpkWh = sdeBasisenergieprijs_eurpkWh!!,
                    curtailment = curtailment,
                    ppaType = ppaType,
                    annualElectricityProduction_kWh = null,
                )
            }
        }
    }
}

@JsExport
@Serializable
data class BiogasGenerator(
    val power_kW: Double,
    val LCOE_eurpkWH: Double,
    val sdeAanvraagbedrag_eurpkWh: Double,
    val sdeBasisenergieprijs_eurpkWh: Double,
    val curtailment: Boolean,
    val ppaType: PPAType,

    /** Simulation result */
    val annualElectricityProduction_kWh: Double?,
) {
    companion object {
        fun create(biogasGenerator: nu.local4local.common.BiogasGenerator) = with(biogasGenerator) {
            with(biogasGenerator.cost) {
                BiogasGenerator(
                    power_kW = power_kW,
                    LCOE_eurpkWH = LCOE_eurpkWH!!,
                    sdeAanvraagbedrag_eurpkWh = sdeAanvraagbedrag_eurpkWh!!,
                    sdeBasisenergieprijs_eurpkWh = sdeBasisenergieprijs_eurpkWh!!,
                    curtailment = curtailment,
                    ppaType = ppaType,
                    annualElectricityProduction_kWh = null,
                )
            }
        }
    }
}

@JsExport
@Serializable
data class Battery(
    val capacity_kWh: Double,
    val peakPower_kW: Double,
    val CAPEX_eur: Double,
    val interest_r: Double,
    val depreciationPeriod_y: Double,
    val OPEX_eurpy: Double,
) {
    companion object {
        fun create(battery: nu.local4local.common.Battery) = with(battery) {
            with (cost) {
                Battery(
                    capacity_kWh = capacity_kWh,
                    peakPower_kW = peakPower_kW,
                    CAPEX_eur = CAPEX_eur!!,
                    interest_r = interest_r!!,
                    depreciationPeriod_y = depreciationPeriod_y!!,
                    OPEX_eurpy = OPEX_eurpy!!,
                )
            }
        }
    }
}

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
