package nu.local4local.common.resourcefully

import nu.local4local.common.Pilot
import kotlin.js.collections.JsArray
import kotlin.js.collections.toList

external interface AnyLogicAssetCostReport {
    val fixedTariffPPA: Boolean
    val productionEPEXvalue_eur: Double
    val totalProduction_MWh: Double
    val ID: String
    val avgProductionEPEXvalue_eurpMWh: Double
}

fun createAssetCostReport(anyLogicAssetCostReport: AnyLogicAssetCostReport): AssetCostReport {
    return AssetCostReport(
        anyLogicAssetCostReport.fixedTariffPPA,
        anyLogicAssetCostReport.productionEPEXvalue_eur,
        anyLogicAssetCostReport.totalProduction_MWh,
        anyLogicAssetCostReport.ID,
        anyLogicAssetCostReport.avgProductionEPEXvalue_eurpMWh,
    )
}

@OptIn(ExperimentalJsCollectionsApi::class)
@JsExport
fun createExport(pilot: Pilot, metadata: ExportMetadata, scenarioUrl: String, coopReport: dynamic) = with(pilot) {
    val assetList: AssetList = (coopReport.assetList as JsArray<AnyLogicAssetCostReport>)
        .toList()
        .map { createAssetCostReport(it) }

    ResourcefullyExport(
        scenarioDescription = metadata.scenarioDescription,
        personName = metadata.personName,
        organizationName = metadata.organizationName,
        email = metadata.email,
        scenarioUrl = scenarioUrl,
        supplierCost = supplierCost,
        householdGroups = householdGroups.map { HouseholdGroup.create(it) },
        companies = companies.map { Company.create(it) },
        windFarms = windFarms.map { WindFarm.create(it, assetList) },
        solarFarms = solarFarms.map { SolarFarm.create(it, assetList) },
        biogasGenerators = biogasGenerators.map { BiogasGenerator.create(it, assetList) },
        batteries = batteries.map { Battery.create(it) },
        coopReport = createCoopReport(coopReport),
    )
}

/**
 * Create from a JS object created in AnyLogic using Jackson.
 */
fun createCoopReport(coopReport: dynamic) = AnnualCoopReport(
    ownProduction = createAccountingLine(coopReport.ownProduction),
    selfConsumption = createAccountingLine(coopReport.selfConsumption),
    feedInSelfConsumption = createAccountingLine(coopReport.feedinSelfConsumption),
    feedInExport = createAccountingLine(coopReport.feedinExport),
    EPEXbuy = createAccountingLine(coopReport.EPEXbuy),
    EPEXsell = createAccountingLine(coopReport.EPEXsell),
    nonsimultaneousDelivery = createAccountingLine(coopReport.nonsimultaneousDelivery),
    totalDelivery = createAccountingLine(coopReport.totalDelivery),
    reDeliveryFeedIn = createAccountingLine(coopReport.reDeliveryFeedIn),
    onbalans = createAccountingLine(coopReport.onbalans),
)

/**
 * Create from a JS object created in AnyLogic using Jackson.
 */
fun createAccountingLine(accountingLine: dynamic) = AccountingLine(
    quantity_MWh = accountingLine.quantity_MWh,
    price_eurpMWh = accountingLine.price_eurpMWh,
    totalPrice_eur = accountingLine.totalPrice_eur
)
