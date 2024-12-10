import {FunctionComponent} from "react"
import {DataList, Heading, Text} from "@radix-ui/themes"
import { PiMoneyWavyLight } from "react-icons/pi"
import {AssetCost} from "local4local"

const titles = {
    "sdeSubsidy_eurpkWh": "SDE subsidietarief [€/kWh]",
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
            <DataList.Root>
                {showCostPerKwh && (
                    <>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">{titles["LCOE_eurpkWh"]}</DataList.Label>
                            <DataList.Value>{cost.LCOE_eurpkWH}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">{titles["sdeSubsidy_eurpkWh"]}</DataList.Label>
                            <DataList.Value>{cost.sdeSubsidy_eurpkWH}</DataList.Value>
                        </DataList.Item>
                    </>
                )}
                {showTotalCostFactors &&
                    <>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">{titles["CAPEX_eur"]}</DataList.Label>
                            <DataList.Value>{cost.CAPEX_eur}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">{titles["interest_r"]}</DataList.Label>
                            <DataList.Value>{(cost.interest_r || 0) * 100}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">{titles["depreciationPeriod_y"]}</DataList.Label>
                            <DataList.Value>{cost.depreciationPeriod_y}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">{titles["OPEX_eurpy"]}</DataList.Label>
                            <DataList.Value>{cost.OPEX_eurpy}</DataList.Value>
                        </DataList.Item>
                    </>
                }
            </DataList.Root>
        </div>
    )
}

const CostHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
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
                               defaultValue={ initialData?.LCOE_eurpkWH || 0}
                               title="LCOE: Levellized AssetCost of Energy; the 'total' cost per kWh of energy produced,
                            including CAPEX, OPEX and interest"
                        />
                    </div>
                    <div className="form-message">
                        <Text>
                            *Dit veld gebruik je op basis van ervaring of expert judgement.<br/>
                            De overige kostenvelden laat je dan leeg.
                        </Text>
                    </div>
                    <div className="radix-grid">
                        <label className="form-label" htmlFor="sdeSubsidy_eurpkWh">{titles["sdeSubsidy_eurpkWh"]}*</label>
                        <input className="form-input" type="number" id="sdeSubsidy_eurpkWh" name="sdeSubsidy_eurpkWh"
                               min={0} step={0.001}
                               placeholder="€/kWh"
                               defaultValue={ initialData?.sdeSubsidy_eurpkWH || 0 }
                        />
                    </div>
                </>
            )}

            {showTotalCostFactors &&
                <>
                    <div className="radix-grid">
                        <label className="form-label" htmlFor="CAPEX_eur">{titles["CAPEX_eur"]}</label>
                        <input className="form-input" type="number" id="CAPEX_eur" name="CAPEX_eur" min={0} step={0.001}
                               placeholder="€" defaultValue={ initialData?.CAPEX_eur || 0 }/>
                    </div>
                    <div className="radix-grid">
                        <label className="form-label" htmlFor="interest_r">{titles["interest_r"]}</label>
                        <input className="form-input" type="number" id="interest_r" name="interest_r" min={0} max={100} step={0.05}
                            placeholder="%" defaultValue={ initialData?.interest_r || 0 }/>
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
