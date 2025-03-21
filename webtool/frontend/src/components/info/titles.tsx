import {Link, Text} from "@radix-ui/themes"

/**
 * These records are put here to be reused in the form and the display
 */
export const titles = {
    // Leverancierskosten
    "bufferPrice_eurpkWh": {
        name: "bufferPrice_eurpkWh",
        title: "Leveranciersopslag [€/kWh]",
        infoText: `
            Opslag op de energieprijs die de energieleverancier in rekening brengt om haar eigen bedrijfskosten te dekken. 
            Deze opslag maakt onderdeel uit van de prijs van álle geleverde stroom aan klanten: gelijktijdig én ongelijktijdig.
        `,
    },
    "onbalansMarkup_r": {
        name: "onbalansMarkup_r",
        title: "Opslag onbalans",
        infoText: "De kosten die worden gemaakt op de onbalansmarkt voor het verschil tussen voorspelde en daadwerkelijke energiebalans. Deze kosten zijn typisch hoog (20+ %) voor energie uit zon en wind, omdat het weer niet precies te voorspellen is.",
    },
    "feedInCompensation_eurpkWh": {
        name: "feedInCompensation_eurpkWh",
        title: "Terugleververgoeding [€/kWh]",
        infoText: "Prijs die de klant ontvangt bij het terugleveren van zelf opgewekte stroom."
    },

    //Company
    "name": {
        name: "name",
        title: "Naam",
    },
    "annualElectricityConsumption_kWh": {
        name: "annualElectricityConsumption_kWh",
        title: "Bruto jaarverbruik [kWh]",
        infoText: "Verbruik in kWh per jaar achter de meter, dus inclusief verbruik van eigen opwek van zonnepanelen."
    },
    "pvInstalled_kWp": {
        name: "pvInstalled_kWp",
        title: "Zonnepanelen [kWp]",
        infoText: "Het geïnstalleerde vermogen aan zonnepanelen, in kiloWattPiek."
    },
    
    //Household
    "type": {
        name: "type",
        title: "Omschrijving",
        infoText: "Buurt of klantgroep waarmee de groep huishoudens benoemd wordt in een rapportage."
        + "Je kunt bijvoorbeeld een groep maken met zonnepanelen en een zonder."
    },
    "households_n": {
        name: "households_n",
        title: "Aantal huishoudens",
        infoText: "Het aantal huishoudens in deze groep. Je kunt meerdere groepen aanmaken."
    },
    "hasPV_r": {
        name: "hasPV_r",
        title: "Aandeel met zonnepanelen",
        infoText: "Het percentage van deze huishoudgroep dat zonnepanelen heeft. Er wordt een gemiddelde van 4kWp per huishouden met zonnepanelen aangenomen."
    },
    "hasHeatPump_r": {
        name: "hasHeatPump_r",
        title: "Aandeel met warmtepomp",
        infoText: "Het percentage van deze huishoudgroep dat een warmtepomp heeft. Er wordt rekening gehouden met een gemiddelde warmtevraag per huis. Het elektriciteitsverbruik van de warmtepomp komt bovenop het jaarlijks huishoudelijk verbruik."
    },
    "hasChargePoint_r": {
        name: "hasChargePoint_r",
        title: "Aandeel met laadpaal",
        infoText: "Het percentage van deze huishoudgroep dat een elektrische auto heeft die thuis wordt opgeladen. Er wordt aangenomen dat een auto 15000km per jaar rijdt, met een gemiddeld verbruik van 0.2kWh/km. Het elektriciteitsverbruik van de elektrische auto komt bovenop het jaarlijks huishoudelijk verbruik."
    },
    "hasHomeBattery_r": {
        name: "hasHomeBattery_r",
        title: "Aandeel met thuisbatterij",
    },
    "annualBaseConsumptionAvg_kWh": {
        name: "annualBaseConsumptionAvg_kWh",
        title: "Jaarlijks huishoudelijk verbruik",
        infoText: "Het huishoudelijk elektriciteitsverbruik exclusief de bijdrages van EV, warmtepomp en zonnepanelen."
    },

    //Costs
    "sdeAanvraagbedrag_eurpkWh": {
        name: "sdeAanvraagbedrag_eurpkWh",
        title: "SDE Aanvraagbedrag [€/kWh]",
        infoText: <>
            Het bedrag dat je aanvraagt bij de SDE++ regeling per kWh opgewekte energie.
            Voor uitleg zie de website van <Link href="https://www.rvo.nl/subsidies-financiering/sde/orienteren#basis--en-aanvraagbedrag">RVO</Link>
        </>,
    },
    "sdeBasisenergieprijs_eurpkWh": {
        name: "sdeBasisenergieprijs_eurpkWh",
        title: "SDE Basisenergieprijs [€/kWh]",
        infoText: <>
            De basisenergieprijs die wordt gehanteerd in de SDE++ regeling.
            Voor uitleg zie de website van <Link href="https://www.rvo.nl/subsidies-financiering/sde/orienteren#basis--en-aanvraagbedrag">RVO</Link>
        </>
    },
    "LCOE_eurpkWh": {
        name: "LCOE_eurpkWh",
        title: "Kosten per kWh [€/kWh] (LCOE)",
        infoText: <>
            <Text as="p">
                COE: Levellized Cost of Energy. De totale kosten per kWh geproduceerde energie.
                Dit is opgebouwd uit afschrijving, rente, reserveringen en operationele kosten.
            </Text>
            <br />
            <Text as="p">
                Dit vul je vaak in op basis van ervaring of expert judgement.
            </Text>
        </>
    },
    "CAPEX_eur": {
        name: "CAPEX_eur",
        title: "Aanschaf [€] (CAPEX)",
    },
    "interest_r": {
        name: "interest_r",
        title: "Rente [%]",
        infoText: "Het rentepercentage dat wordt gehanteerd voor de financiering van de aanschaf.",
    },
    "depreciationPeriod_y": {
        name: "depreciationPeriod_y",
        title: "Afschrijvingsperiode [jaar]",
        infoText: "De periode waarover de installatie wordt afgeschreven.",
    },
    "OPEX_eurpy": {
        name: "OPEX_eurpy",
        title: "Onderhoudskosten [€/jaar] (OPEX)",
        infoText: "De operationele kosten voor onderhoud per jaar.",
    },

    //SolarFarm
    "orientation": {
        name: "orientation",
        title: "Opstelling",
        infoText: "De opstelling van de zonnepanelen heeft invloed op de vorm van het opwekprofiel. Zuid-geörienteerde panelen hebben een hogere piek midden op de dag, en jaarlijkse een iets hogere opbrengst. Oost-west opstellingen hebben een breder opwekprofiel dat iets beter aansluit op de behoefte van klanten, maar een iets lagere jaarlijkse opwek.",
    },
    
    //BiogasGenerator
    "power_kW": {
        name: "power_kW",
        title: "Vermogen [kW]",
        infoText: "Continu elektrisch vermogen van de biogasmotor.",
    },
    
    //Battery
    "capacity_kWh": {
        name: "capacity_kWh",
        title: "Capaciteit [kWh]",
        infoText: "De hoeveelheid energie [kWh] die in de batterij kan worden opgeslagen.",
    },
    "peakPower_kW": {
        name: "peakPower_kW",
        title: "Vermogen [kW]",
        infoText: "Het maximale vermogen [kW] waarmee de batterij kan op- en ontladen.",
    },

    // Heat storage
    "storageMedium": {
        name: "storageMedium",
        title: "Opslagmedium",
        infoText: "Bijvoorbeeld water"
    },
    "storageVolume_m3": {
        name: "storageVolume_m3",
        title: "Volume (m3)",
    },
    "minTemp_degC": {
        name: "minTemp_degC",
        title: "Minimale temperatuur (°C)",
    },
    "maxTemp_degC": {
        name: "maxTemp_degC",
        title: "Maximale temperatuur (°C)",
    },
};

export const solarFarmTitles = {
    nominalPower_kW: {
        name: "nominalPower_kW",
        title: "Vermogen [kW]",
        infoText: "Het vermogen van het zonnepark dat toegekend wordt aan deze energiegemeeenschap. Dit kan ook de fractie van het vermogen van alle zonnepanelen zijn.",
    },
    curtailment: {
        name: "curtailment",
        title: "Curtailment",
        infoText: "Zonnepark afschakelen wanneer de marktprijs negatief is."
    },
}

export const windFarmTitles = {
    nominalPower_kW: {
        name: "nominalPower_kW",
        title: "Vermogen [kW]",
        infoText: "Het vermogen van de windmolen(s) dat toegekend wordt aan deze energiegemeeenschap. Dit kan ook de fractie van het vermogen van de windmolen(s) zijn.",
    },
    location: {
        name: "location",
        title: "Locatie",
        infoText: "Het effectieve vermogen van een windmolen hangt af van de locatie.",
    },
    curtailment: {
        name: "curtailment",
        title: "Curtailment",
        infoText: "Windpark afschakelen wanneer de marktprijs negatief is."
    },
}

export const biogasGeneratorTitles = {
    curtailment: {
        name: "curtailment",
        title: "Curtailment",
        infoText: "Windpark afschakelen wanneer de marktprijs negatief is."
    },
}
