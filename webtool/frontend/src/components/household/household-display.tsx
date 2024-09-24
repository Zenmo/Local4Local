import {FunctionComponent} from "react"
import {Card, DataList} from "@radix-ui/themes"
import {HouseholdGroup} from "local4local"
import {HouseholdHeading} from "./household-heading.tsx"
import {CostDisplay} from "../cost-section.tsx"

export const HouseholdDisplay: FunctionComponent<{ householdGroup: HouseholdGroup }> = ({householdGroup}) => {
    return (
        <Card>
            <HouseholdHeading />
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Type</DataList.Label>
                    <DataList.Value>{householdGroup.type}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Aantal huishoudens</DataList.Label>
                    <DataList.Value>{householdGroup.households_n}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Percentage met zonnepanelen</DataList.Label>
                    <DataList.Value>{householdGroup.hasPV_r * 100} %</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Percentage met warmtepomp</DataList.Label>
                    <DataList.Value>{householdGroup.hasHeatPump_r * 100} %</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Percentage met laadpaal</DataList.Label>
                    <DataList.Value>{householdGroup.hasChargePoint_r * 100} %</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Percentage met thuisbatterij</DataList.Label>
                    <DataList.Value>{householdGroup.hasHomeBattery_r * 100} %</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Jaarlijks gemiddeld verbruik</DataList.Label>
                    <DataList.Value>{householdGroup.annualBaseConsumptionAvg_kWh} kWh</DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </Card>
    )
}