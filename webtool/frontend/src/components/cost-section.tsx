import {FunctionComponent} from "react"
import {DataList, Heading, Link, Text} from "@radix-ui/themes"
import { PiMoneyWavyLight } from "react-icons/pi"
import {AssetCost} from "local4local"

const titles = {
    "sdeAanvraagbedrag_eurpkWh": "SDE Aanvraagbedrag [€/kWh]",
    "sdeBasisenergieprijs_eurpkWh": "SDE Basisenergieprijs [€/kWh]",
    "LCOE_eurpkWh": "Kosten per kWh [€/kWh] (LCOE)",
    "CAPEX_eur": "Aanschaf [€] (CAPEX)",
    "interest_r": "Rente [%]",
    "depreciationPeriod_y": "Afschrijvingsperiode [jaar]",
    "OPEX_eurpy": "Onderhoudskosten [€/jaar] (OPEX)",
}

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
                            <DataList.Label>{titles["LCOE_eurpkWh"]}</DataList.Label>
                            <DataList.Value>{cost.LCOE_eurpkWH}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>{titles["sdeAanvraagbedrag_eurpkWh"]}</DataList.Label>
                            <DataList.Value>{cost.sdeAanvraagbedrag_eurpkWh}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>{titles["sdeBasisenergieprijs_eurpkWh"]}</DataList.Label>
                            <DataList.Value>{cost.sdeBasisenergieprijs_eurpkWh}</DataList.Value>
                        </DataList.Item>
                    </>
                )}
                {showTotalCostFactors &&
                    <>
                        <DataList.Item>
                            <DataList.Label>{titles["CAPEX_eur"]}</DataList.Label>
                            <DataList.Value>{cost.CAPEX_eur}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>{titles["interest_r"]}</DataList.Label>
                            <DataList.Value>{(cost.interest_r || 0) * 100}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>{titles["depreciationPeriod_y"]}</DataList.Label>
                            <DataList.Value>{cost.depreciationPeriod_y}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>{titles["OPEX_eurpy"]}</DataList.Label>
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
                        <label className="form-label" htmlFor="LCOE_eurpkWh">{titles["LCOE_eurpkWh"]}*</label>
                        <input className="form-input" type="number" id="LCOE_eurpkWh" name="LCOE_eurpkWh"
                               min={0} step={0.001}
                               placeholder="€/kWh"
                               defaultValue={initialData?.LCOE_eurpkWH || 0}
                               title="LCOE: Levellized AssetCost of Energy; the 'total' cost per kWh of energy produced,
                            including CAPEX, OPEX and interest"
                        />
                    </div>
                    {showTotalCostFactors &&
                        <div className="form-message">
                            <Text>
                                *Dit veld gebruik je op basis van ervaring of expert judgement.<br />
                                De overige kostenvelden laat je dan leeg.
                            </Text>
                        </div>
                    }
                    <div className="radix-grid">
                        <label className="form-label"
                               htmlFor="sdeAanvraagbedrag_eurpkWh">{titles["sdeAanvraagbedrag_eurpkWh"]}*</label>
                        <input className="form-input" type="number" id="sdeAanvraagbedrag_eurpkWh"
                               name="sdeAanvraagbedrag_eurpkWh"
                               min={0} step={0.001}
                               placeholder="€/kWh"
                               defaultValue={initialData?.sdeAanvraagbedrag_eurpkWh || 0}
                        />
                    </div>
                    <div className="radix-grid">
                        <label className="form-label"
                               htmlFor="sdeAanvraagbedrag_eurpkWh">{titles["sdeBasisenergieprijs_eurpkWh"]}*</label>
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
                        <label className="form-label" htmlFor="CAPEX_eur">{titles["CAPEX_eur"]}</label>
                        <input className="form-input" type="number" id="CAPEX_eur" name="CAPEX_eur" min={0} step={0.001}
                               placeholder="€" defaultValue={initialData?.CAPEX_eur || 0} />
                    </div>
                    <div className="radix-grid">
                        <label className="form-label" htmlFor="interest_r">{titles["interest_r"]}</label>
                        <input className="form-input" type="number" id="interest_r" name="interest_r" min={0} max={100} step={0.05}
                            placeholder="%" defaultValue={ (initialData?.interest_r || 0) * 100}/>
                    </div>
                    <div className="radix-grid">
                        <label className="form-label" htmlFor="depreciationPeriod_y">{titles["depreciationPeriod_y"]}</label>
                        <input className="form-input" type="number" id="depreciationPeriod_y" name="depreciationPeriod_y" min={0} step={0.001}
                            placeholder="jaar" defaultValue={ initialData?.depreciationPeriod_y || 0 }/>
                    </div>
                    <div className="radix-grid">
                        <label className="form-label" htmlFor="OPEX_eurpy">{titles["OPEX_eurpy"]}</label>
                        <input className="form-input" type="number" id="OPEX_eurpy" name="OPEX_eurpy" min={0} step={0.001}
                            placeholder="€/jaar" defaultValue={ initialData?.OPEX_eurpy || 0 }/>
                    </div>
                </>
            }
        </>
    )
}
