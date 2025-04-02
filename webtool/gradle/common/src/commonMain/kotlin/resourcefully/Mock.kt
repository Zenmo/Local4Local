package nu.local4local.common.resourcefully

import nu.local4local.common.PPAType
import nu.local4local.common.PVOrientation
import nu.local4local.common.SupplierCost
import nu.local4local.common.WindFarmLocation

val mockAccountingLine = AccountingLine(
    quantity_MWh = 10.0,
    price_eurpMWh = 100.0,
    totalPrice_eur = 1000.0,
)

val mockExport = ResourcefullyExport(
    scenarioDescription = "Een betrokker cooperatie met een eerlijke prijs",
    personName = "Erik van Velzen",
    organizationName = "Zenmo",
    email = "erik@zenmo.com",
    scenarioUrl = "https://cooperatieconfigurator.local4local.nu?scenario=Yu83xB",
    supplierCost = SupplierCost(
        bufferPrice_eurpkWh = 0.03,
        onbalansMarkup_r = 0.08,
        feedInCompensation_eurpkWh = 0.03,
    ),
    householdGroups = listOf(
        HouseholdGroup(
            description = "Alle leden",
            households_n = 200,
            hasPV_n = 100,
            hasHeatPump_n = 30,
            hasChargePoint_n = 20,
            annualBaseConsumptionAvg_kWh = 4500.0,
        )
    ),
    companies = listOf(
        Company(
            name = "De Busschaufeurs",
            annualElectricityConsumption_kWh = 20000.0,
            pvInstalled_kWp = 20.0
        )
    ),
    windFarms = listOf(
        WindFarm(
            nominalPower_kW = 2000.0,
            LCOE_eurpkWH = 0.10,
            sdeAanvraagbedrag_eurpkWh = 0.10,
            sdeBasisenergieprijs_eurpkWh = 0.08,
            annualElectricityProduction_kWh = 2_000_000.0,
            curtailment = true,
            ppaType = PPAType.FIXED_PRICE_PPA,
            location = WindFarmLocation.MIDDEN_LIMBURG,
        )
    ),
    solarFarms = listOf(
        SolarFarm(
            peakPower_kW = 1000.0,
            orientation = PVOrientation.EAST_WEST,
            LCOE_eurpkWH = 0.09,
            sdeAanvraagbedrag_eurpkWh = 0.08,
            sdeBasisenergieprijs_eurpkWh = 0.07,
            annualElectricityProduction_kWh = 1_000_000.0,
            curtailment = true,
            ppaType = PPAType.FIXED_PRICE_PPA,
        )
    ),
    biogasGenerators = listOf(
        BiogasGenerator(
            power_kW = 200.0,
            LCOE_eurpkWH = 0.06,
            sdeAanvraagbedrag_eurpkWh = 0.05,
            sdeBasisenergieprijs_eurpkWh = 0.05,
            annualElectricityProduction_kWh = 2_000_000.0,
            curtailment = true,
            ppaType = PPAType.FIXED_PRICE_PPA,
        )
    ),
    batteries = listOf(
        Battery(
            capacity_kWh = 200.0,
            peakPower_kW = 100.0,
            CAPEX_eur = 50_000.0,
            interest_r = 0.04,
            depreciationPeriod_y = 20.0,
            OPEX_eurpy = 500.0,
        )
    ),
    coopReport = AnnualCoopReport(
        ownProduction = mockAccountingLine,
        selfConsumption = mockAccountingLine,
        feedInSelfConsumption = mockAccountingLine,
        feedInExport = mockAccountingLine,
        EPEXbuy = mockAccountingLine,
        EPEXsell = mockAccountingLine,
        nonsimultaneousDelivery = mockAccountingLine,
        totalDelivery = mockAccountingLine,
        reDeliveryFeedIn = mockAccountingLine,
        onbalans = mockAccountingLine,
    ),
)
