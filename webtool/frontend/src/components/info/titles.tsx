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
        infoText: "De kosten die worden gemaakt op de onbalansmarkt voor het verschil tussen voorspelde en daadwerkelijke energieverbruik.",
    },
    "feedInCompensation_eurpkWh": {
        name: "feedInCompensation_eurpkWh",
        title: "Terugleververgoeding [€/kWh]",
        infoText: "Prijs die de klant ontvangt bij het terugleveren aan het net"
    },

    //Company
    "name": {
        name: "name",
        title: "Naam",
    },
    "annualElectricityConsumption_kWh": {
        name: "annualElectricityConsumption_kWh",
        title: "Bruto jaarverbruik [kWh]",
        infoText: "Verbruik achter de meter, dus inclusief verbruik van eigen opwek van zonnepanelen"
    },
    "pvInstalled_kWp": {
        name: "pvInstalled_kWp",
        title: "Zonnepanelen [kWp]",
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
    },
    "hasPV_r": {
        name: "hasPV_r",
        title: "Aandeel met zonnepanelen",
    },
    "hasHeatPump_r": {
        name: "hasHeatPump_r",
        title: "Aandeel met warmtepomp",
    },
    "hasChargePoint_r": {
        name: "hasChargePoint_r",
        title: "Aandeel met laadpaal",
    },
    "hasHomeBattery_r": {
        name: "hasHomeBattery_r",
        title: "Aandeel met thuisbatterij",
    },
    "annualBaseConsumptionAvg_kWh": {
        name: "annualBaseConsumptionAvg_kWh",
        title: "Jaarlijks huishoudelijk verbruik",
        infoText: "Verbruik exclusief laden en zonnepanelen"
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
                Dit is opgebouwd uit afschrijving, rente en operationele kosten.
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
        infoText: "Het rentepercentage dat wordt gehanteerd voor de financiering van de aanschaf."
    },
    "depreciationPeriod_y": {
        name: "depreciationPeriod_y",
        title: "Afschrijvingsperiode [jaar]",
        infoText: "De periode waarover de installatie wordt afgeschreven."
    },
    "OPEX_eurpy": {
        name: "OPEX_eurpy",
        title: "Onderhoudskosten [€/jaar] (OPEX)",
        infoText: "De operationele kosten Wvoor onderhoud per jaar."
    },

    //SolarFarm
    "orientation": {
        name: "orientation",
        title: "Opstelling",
    },
    
    //BiogasGenerator
    "power_kW": {
        name: "power_kW",
        title: "Vermogen [kW]",
        infoText: "Continu vermogen"
    },
    
    //Battery
    "capacity_kWh": {
        name: "capacity_kWh",
        title: "Capaciteit",
    },
    "peakPower_kW": {
        name: "peakPower_kW",
        title: "Vermogen [kW]",
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
        infoText: "Piekvermogen"
    },
}

export const windFarmTitles = {
    nominalPower_kW: {
        name: "nominalPower_kW",
        title: "Vermogen [kW]",
        infoText: "Nominaal vermogen",
    },
}
