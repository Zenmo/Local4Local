import { FunctionComponent } from "react"
import { DataList, Heading, Link, Text, HoverCard } from "@radix-ui/themes"
import { PiMoneyWavyLight, PiInfoLight } from "react-icons/pi"
import { AssetCost } from "local4local"
import LabelInfo from "./label-info"

const titles = {
    "sdeAanvraagbedrag_eurpkWh": {
        name: "sdeAanvraagbedrag_eurpkWh",
        title: "SDE Aanvraagbedrag [€/kWh]",
        infoText: "Het bedrag dat je aanvraagt bij de SDE+ regeling per kWh opgewekte energie."
    },
    "sdeBasisenergieprijs_eurpkWh": {
        name: "sdeBasisenergieprijs_eurpkWh",
        title: "SDE Basisenergieprijs [€/kWh]",
        infoText: "De basisenergieprijs die wordt gehanteerd in de SDE+ regeling."
    },
    "LCOE_eurpkWh": {
        name: "LCOE_eurpkWh",
        title: "Kosten per kWh [€/kWh] (LCOE)",
        infoText: "LCOE: Levellized AssetCost of Energy; de 'totale' kosten per kWh geproduceerde energie, inclusief CAPEX, OPEX en rente."
    },
    "CAPEX_eur": {
        name: "CAPEX_eur",
        title: "Aanschaf [€] (CAPEX)",
        infoText: "De kapitaalkosten (CAPEX) voor de aanschaf van de installatie."
    },
    "interest_r": {
        name: "interest_r",
        title: "Rente [%]",
        infoText: "Het rentepercentage dat wordt gehanteerd voor de financiering."
    },
    "depreciationPeriod_y": {
        name: "depreciationPeriod_y",
        title: "Afschrijvingsperiode [jaar]",
        infoText: "De periode waarover de installatie wordt afgeschreven."
    },
    "OPEX_eurpy": {
        name: "OPEX_eurpy",
        title: "Onderhoudskosten [€/jaar] (OPEX)",
        infoText: "De operationele kosten (OPEX) voor onderhoud per jaar."
    }
};

export const CostDisplay: FunctionComponent<{
    cost: AssetCost,
    showCostPerKwh?: boolean,
    showTotalCostFactors?: boolean
}> = ({
    cost,
    showCostPerKwh = true,
    showTotalCostFactors = false,
}) => {
    return (
        <div>
            <CostHeading />
            <DataList.Root style={{gridTemplateColumns: "3fr 1fr"}}>
                {showCostPerKwh && (
                    <>
                        <DataList.Item>
                            <DataList.Label>{titles["LCOE_eurpkWh"].title}</DataList.Label>
                            <DataList.Value>{cost.LCOE_eurpkWH}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>{titles["sdeAanvraagbedrag_eurpkWh"].title}</DataList.Label>
                            <DataList.Value>{cost.sdeAanvraagbedrag_eurpkWh}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>{titles["sdeBasisenergieprijs_eurpkWh"].title}</DataList.Label>
                            <DataList.Value>{cost.sdeBasisenergieprijs_eurpkWh}</DataList.Value>
                        </DataList.Item>
                    </>
                )}
                {showTotalCostFactors &&
                    <>
                        <DataList.Item>
                            <DataList.Label>{titles["CAPEX_eur"].title}</DataList.Label>
                            <DataList.Value>{cost.CAPEX_eur}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>{titles["interest_r"].title}</DataList.Label>
                            <DataList.Value>{(cost.interest_r || 0) * 100}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>{titles["depreciationPeriod_y"].title}</DataList.Label>
                            <DataList.Value>{cost.depreciationPeriod_y}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>{titles["OPEX_eurpy"].title}</DataList.Label>
                            <DataList.Value>{cost.OPEX_eurpy}</DataList.Value>
                        </DataList.Item>
                    </>
                }
            </DataList.Root>
        </div>
    )
}

const CostHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem", paddingTop: ".5rem"}}>
        <PiMoneyWavyLight />
        &nbsp;
        Kosten
    </Heading>
);

export const CostSection: FunctionComponent<{
    showCostPerKwh?: boolean
    showTotalCostFactors?: boolean
    initialData?: AssetCost | null
}> = ({
    showCostPerKwh = true,
    showTotalCostFactors = false,
    initialData
}) => {
    return (
        <>
            <CostHeading/>
            { showCostPerKwh && (
                <>
                    <div className="radix-grid">
                        <LabelInfo data={titles["LCOE_eurpkWh"]}/>
                        <input className="form-input" type="number" id="LCOE_eurpkWh" name="LCOE_eurpkWh"
                               min={0} step={0.001}
                               placeholder="€/kWh"
                               defaultValue={initialData?.LCOE_eurpkWH || 0}
                        />
                    </div>
                    {showTotalCostFactors &&
                        <div className="form-message">
                            <Text>
                                * Dit veld gebruik je op basis van ervaring of expert judgement.<br />
                                De overige kostenvelden laat je dan leeg.
                            </Text>
                        </div>
                    }
                    <div className="radix-grid">
                        <LabelInfo data={titles["sdeAanvraagbedrag_eurpkWh"]} />
                        <input className="form-input" type="number" id="sdeAanvraagbedrag_eurpkWh"
                               name="sdeAanvraagbedrag_eurpkWh"
                               min={0} step={0.001}
                               placeholder="€/kWh"
                               defaultValue={initialData?.sdeAanvraagbedrag_eurpkWh || 0}
                        />
                    </div>
                    <div className="radix-grid">
                        <LabelInfo data={titles["sdeBasisenergieprijs_eurpkWh"]} />
                        <input className="form-input" type="number" id="sdeBasisenergieprijs_eurpkWh"
                               name="sdeBasisenergieprijs_eurpkWh"
                               min={0} step={0.001}
                               placeholder="€/kWh"
                               defaultValue={initialData?.sdeBasisenergieprijs_eurpkWh || 0}
                        />
                    </div>
                    <div className="form-message">
                        <Text>
                            Voor uitleg zie de website van <Link href="https://www.rvo.nl/subsidies-financiering/sde/orienteren#basis--en-aanvraagbedrag">RVO</Link>
                        </Text>
                    </div>
                </>
            )}

            {showTotalCostFactors &&
                <>
                    <div className="radix-grid">
                        <LabelInfo data={titles["CAPEX_eur"]} />
                        <input className="form-input" type="number" id="CAPEX_eur" name="CAPEX_eur" min={0} step={0.001}
                               placeholder="€" defaultValue={initialData?.CAPEX_eur || 0} />
                    </div>
                    <div className="radix-grid">
                        <LabelInfo data={titles["interest_r"]} />
                        <input className="form-input" type="number" id="interest_r" name="interest_r" min={0} max={100} step={0.05}
                            placeholder="%" defaultValue={ (initialData?.interest_r || 0) * 100}/>
                    </div>
                    <div className="radix-grid">
                        <LabelInfo data={titles["depreciationPeriod_y"]} />
                        <input className="form-input" type="number" id="depreciationPeriod_y" name="depreciationPeriod_y" min={0} step={0.001}
                            placeholder="jaar" defaultValue={ initialData?.depreciationPeriod_y || 0 }/>
                    </div>
                    <div className="radix-grid">
                        <LabelInfo data={titles["OPEX_eurpy"]} />
                        <input className="form-input" type="number" id="OPEX_eurpy" name="OPEX_eurpy" min={0} step={0.001}
                            placeholder="€/jaar" defaultValue={ initialData?.OPEX_eurpy || 0 }/>
                    </div>
                </>
            }
        </>
    )
}
