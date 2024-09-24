import {FunctionComponent} from "react"
import {DataList, Heading} from "@radix-ui/themes"
import { PiMoneyWavyLight } from "react-icons/pi"

export const CostDisplay: FunctionComponent<{ asset: any, hideCostPerKwh?: boolean }> = ({asset, hideCostPerKwh}) => {
    return (
        <div>
            <CostHeading />
            <DataList.Root>
                { !hideCostPerKwh && (
                    <DataList.Item>
                        <DataList.Label minWidth="88px">Kosten per kWh [€/kWh]</DataList.Label>
                        <DataList.Value>{asset.costsPer_kWh}</DataList.Value>
                    </DataList.Item>
                )}
                <DataList.Item>
                    <DataList.Label minWidth="88px">Aanschaf [€]</DataList.Label>
                    <DataList.Value>{asset.buy_ct}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Rente</DataList.Label>
                    <DataList.Value>{asset.income_r * 100} %</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Afschrijvingsperiode [jaar]</DataList.Label>
                    <DataList.Value>{asset.writingPeriod_y}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Onderhoudskosten [€/jaar]</DataList.Label>
                    <DataList.Value>{asset.additionalCosts_cty}</DataList.Value>
                </DataList.Item>
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


export const CostSection: FunctionComponent<{hideCostPerKwh?: boolean}> = ({hideCostPerKwh}) => {
    return (
        <div>
            <CostHeading/>
            { !hideCostPerKwh && (
                <div className="radix-grid" >
                    <label className="form-label" htmlFor="costsPer_kWh">Kosten per kWh [€/kWh]</label>
                    <input className="form-input" type="number" id="costsPer_kWh" name="costsPer_kWh"
                        min={0} step={0.001} 
                        placeholder="€/kWh"
                        title="Dit veld gebruik je op basis van ervaring of expert judgement. De overige kostenvelden laat je dan leeg."
                    />
                </div>
            )}

            <div className="radix-grid">
                <label className="form-label" htmlFor="buy_ct">Aanschaf [€]</label>
                <input className="form-input" type="number" id="buy_ct" name="buy_ct" min={0} step={0.001}
                    placeholder="€"/>
            </div>
            <div className="radix-grid">
                <label className="form-label" htmlFor="income_r">Rente [%]</label>
                <input className="form-input" type="number" id="income_r" name="income_r" min={0} max={100} step={0.05}
                    placeholder="%"/>
            </div>
            <div className="radix-grid">
                <label className="form-label" htmlFor="writingPeriod_y">Afschrijvingsperiode [jaar]</label>
                <input className="form-input" type="number" id="writingPeriod_y" name="writingPeriod_y" min={0} step={0.001}
                    placeholder="jaar"/>
            </div>
            <div className="radix-grid">
                <label className="form-label" htmlFor="additionalCosts_cty">Onderhoudskosten [€/jaar]</label>
                <input className="form-input" type="number" id="additionalCosts_cty" name="additionalCosts_cty" min={0} step={0.001}
                    placeholder="€/jaar"/>
            </div>
        </div>
    )
}
