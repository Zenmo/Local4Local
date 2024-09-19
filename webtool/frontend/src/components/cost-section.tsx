import {FunctionComponent} from "react"
import {DataList, Heading} from "@radix-ui/themes"
import { PiMoneyLight } from "react-icons/pi"

export const CostDisplay: FunctionComponent<{ artifact: any }> = ({artifact}) => {
    return (
        <div>
            <CostHeading />
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Kosten per kWh</DataList.Label>
                    <DataList.Value>{artifact.costsPer_kWh}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Aanschaf [€]</DataList.Label>
                    <DataList.Value>{artifact.buy_ct}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Rente</DataList.Label>
                    <DataList.Value>{artifact.income_r * 100} %</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Afschrijvingsperiode [jaar]</DataList.Label>
                    <DataList.Value>{artifact.writingPeriod_y}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Onderhoudskosten [€/jaar]</DataList.Label>
                    <DataList.Value>{artifact.additionalCosts_cty}</DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </div>
    )
}

const CostHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <PiMoneyLight />
        &nbsp;
        Kosten
    </Heading>
);

export const CostSection: FunctionComponent<{onCostChange: (key: any, value: any) => void}> = ({onCostChange}) => {
    return (
        <div>
            <CostHeading/>
            <div>
                <label htmlFor="costsPer_kWh">Kosten per kWh</label>
                <input type="number" id="costsPer_kWh" name="costsPer_kWh"
                    defaultValue={0} min={0}
                    onChange={(e) => onCostChange('costsPer_kWh', e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="buy_ct">Aanschaf [€]</label>
                <input type="number" id="buy_ct" name="buy_ct" defaultValue={0} min={0}
                    onChange={(e) => onCostChange('buy_ct', e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="income_r">Rente [%]</label>
                <input type="number" id="income_r" name="income_r" defaultValue={0} min={0} max={100}
                onChange={(e) => onCostChange('income_r', e.target.value)}
            />
            </div>
            <div>
                <label htmlFor="writingPeriod_y">Afschrijvingsperiode [jaar]</label>
                <input type="number" id="writingPeriod_y" name="writingPeriod_y" defaultValue={0} min={0}
                onChange={(e) => onCostChange('writingPeriod_y', e.target.value)}
            />
            </div>
            <div>
                <label htmlFor="additionalCosts_cty">Onderhoudskosten [€/jaar]</label>
                <input type="number" id="additionalCosts_cty" name="additionalCosts_cty" defaultValue={0} min={0}
                onChange={(e) => onCostChange('additionalCosts_cty', e.target.value)}
            />
            </div>
        </div>
    )
}
