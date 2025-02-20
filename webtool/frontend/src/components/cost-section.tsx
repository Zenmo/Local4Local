import { FunctionComponent } from "react"
import { DataList, Heading } from "@radix-ui/themes"
import { PiMoneyWavyLight } from "react-icons/pi"
import { AssetCost } from "local4local"
import { titles } from './info/titles.tsx';
import {DivWithInfo, LabelWithInfo} from "./info/label-with-info.tsx"

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
                            <DataList.Label>
                                <DivWithInfo data={titles["LCOE_eurpkWh"]} />
                            </DataList.Label>
                            <DataList.Value>{cost.LCOE_eurpkWH}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>
                                <DivWithInfo data={titles["sdeAanvraagbedrag_eurpkWh"]} />
                            </DataList.Label>
                            <DataList.Value>{cost.sdeAanvraagbedrag_eurpkWh}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>
                                <DivWithInfo data={titles["sdeBasisenergieprijs_eurpkWh"]} />
                            </DataList.Label>
                            <DataList.Value>{cost.sdeBasisenergieprijs_eurpkWh}</DataList.Value>
                        </DataList.Item>
                    </>
                )}
                {showTotalCostFactors &&
                    <>
                        <DataList.Item>
                            <DataList.Label>
                                <DivWithInfo data={titles["CAPEX_eur"]} />
                            </DataList.Label>
                            <DataList.Value>{cost.CAPEX_eur}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>
                                <DivWithInfo data={titles["interest_r"]} />
                            </DataList.Label>
                            <DataList.Value>{(cost.interest_r || 0) * 100}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>
                                <DivWithInfo data={titles["depreciationPeriod_y"]} />
                            </DataList.Label>
                            <DataList.Value>{cost.depreciationPeriod_y}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>
                                <DivWithInfo data={titles["OPEX_eurpy"]} />
                            </DataList.Label>
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
                        <LabelWithInfo data={titles["LCOE_eurpkWh"]}/>
                        <input className="form-input" type="number" id="LCOE_eurpkWh" name="LCOE_eurpkWh"
                               min={0} step={0.001}
                               placeholder="€/kWh"
                               defaultValue={initialData?.LCOE_eurpkWH || 0}
                        />
                    </div>
                    <div className="radix-grid">
                        <LabelWithInfo data={titles["sdeAanvraagbedrag_eurpkWh"]} />
                        <input className="form-input" type="number" id="sdeAanvraagbedrag_eurpkWh"
                               name="sdeAanvraagbedrag_eurpkWh"
                               min={0} step={0.001}
                               placeholder="€/kWh"
                               defaultValue={initialData?.sdeAanvraagbedrag_eurpkWh || 0}
                        />
                    </div>
                    <div className="radix-grid">
                        <LabelWithInfo data={titles["sdeBasisenergieprijs_eurpkWh"]} />
                        <input className="form-input" type="number" id="sdeBasisenergieprijs_eurpkWh"
                               name="sdeBasisenergieprijs_eurpkWh"
                               min={0} step={0.001}
                               placeholder="€/kWh"
                               defaultValue={initialData?.sdeBasisenergieprijs_eurpkWh || 0}
                        />
                    </div>
                </>
            )}

            {showTotalCostFactors &&
                <>
                    <div className="radix-grid">
                        <LabelWithInfo data={titles["CAPEX_eur"]} />
                        <input className="form-input" type="number" id="CAPEX_eur" name="CAPEX_eur" min={0} step={0.001}
                               placeholder="€" defaultValue={initialData?.CAPEX_eur || 0} />
                    </div>
                    <div className="radix-grid">
                        <LabelWithInfo data={titles["interest_r"]} />
                        <input className="form-input" type="number" id="interest_r" name="interest_r" min={0} max={100} step={0.05}
                            placeholder="%" defaultValue={ (initialData?.interest_r || 0) * 100}/>
                    </div>
                    <div className="radix-grid">
                        <LabelWithInfo data={titles["depreciationPeriod_y"]} />
                        <input className="form-input" type="number" id="depreciationPeriod_y" name="depreciationPeriod_y" min={0} step={0.001}
                            placeholder="jaar" defaultValue={ initialData?.depreciationPeriod_y || 0 }/>
                    </div>
                    <div className="radix-grid">
                        <LabelWithInfo data={titles["OPEX_eurpy"]} />
                        <input className="form-input" type="number" id="OPEX_eurpy" name="OPEX_eurpy" min={0} step={0.001}
                            placeholder="€/jaar" defaultValue={ initialData?.OPEX_eurpy || 0 }/>
                    </div>
                </>
            }
        </>
    )
}
