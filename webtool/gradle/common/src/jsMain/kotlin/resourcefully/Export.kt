package nu.local4local.common.resourcefully

import nu.local4local.common.Pilot

@JsExport
fun createExport(pilot: Pilot, metadata: ExportMetadata, scenarioUrl: String, coopReport: dynamic) = with(pilot) {
    ResourcefullyExport(
        scenarioDescription = metadata.scenarioDescription,
        personName = metadata.personName,
        organizationName = metadata.organizationName,
        email = metadata.email,
        scenarioUrl = scenarioUrl,
        supplierCost = supplierCost,
        householdGroups = householdGroups.map { HouseholdGroup.create(it) },
        companies = companies.map { Company.create(it) },
        windFarms = windFarms.map { WindFarm.create(it) },
        solarFarms = solarFarms.map { SolarFarm.create(it) },
        biogasGenerators = biogasGenerators.map { BiogasGenerator.create(it) },
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
