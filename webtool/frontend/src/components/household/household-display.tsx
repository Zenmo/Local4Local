import {FunctionComponent} from "react"
import {Card, DataList, Flex} from "@radix-ui/themes"
import {HouseholdGroup} from "local4local"
import {HouseholdHeading} from "./household-heading.tsx"
import {CardMenu} from "./../card-menu.tsx"
import LabelInfo from "../label-info"
import { titles } from '../titles';

export const HouseholdDisplay: FunctionComponent<{ 
    householdGroup: HouseholdGroup,
    onEdit: () => void,
    toDelete: () => void,
}> = ({householdGroup, onEdit, toDelete}) => {
    return (
        <Card>
            <Flex className="head-title">
                <HouseholdHeading />
                <CardMenu onDelete={toDelete} onEdit={onEdit}/>
            </Flex>
            <DataList.Root style={{gridTemplateColumns: "3fr 1fr"}}>
                <DataList.Item>
                    <DataList.Label>
                        <LabelInfo data={titles["type"]} />
                    </DataList.Label>
                    <DataList.Value>{householdGroup.type}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>
                        <LabelInfo data={titles["households_n"]} />
                    </DataList.Label>
                    <DataList.Value>{householdGroup.households_n}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>
                        <LabelInfo data={titles["hasPV_r"]} />
                    </DataList.Label>
                    <DataList.Value>{householdGroup.hasPV_r * 100} %</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>
                        <LabelInfo data={titles["hasHeatPump_r"]} />
                    </DataList.Label>
                    <DataList.Value>{householdGroup.hasHeatPump_r * 100} %</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>
                        <LabelInfo data={titles["hasChargePoint_r"]} />
                    </DataList.Label>
                    <DataList.Value>{householdGroup.hasChargePoint_r * 100} %</DataList.Value>
                </DataList.Item>
                {/*<DataList.Item>*/}
                {/*    <DataList.Label>Aandeel met thuisbatterij</DataList.Label>*/}
                {/*    <DataList.Value>{householdGroup.hasHomeBattery_r * 100} %</DataList.Value>*/}
                {/*</DataList.Item>*/}
                <DataList.Item>
                    <DataList.Label>
                        <LabelInfo data={titles["annualBaseConsumptionAvg_kWh"]} />
                    </DataList.Label>
                    <DataList.Value>{householdGroup.annualBaseConsumptionAvg_kWh} kWh</DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </Card>
    )
}
