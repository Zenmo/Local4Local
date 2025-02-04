import {FunctionComponent} from "react"
import {Flex, Card, DataList} from "@radix-ui/themes"
import {SolarFarm} from "local4local"
import {CardMenu} from "../card-menu.tsx"
import {CostDisplay} from "../cost-section.tsx"
import {SolarFarmHeading} from "./solarfarm-heading.tsx"

export const SolarFarmDisplay: FunctionComponent<{
    solarFarm: SolarFarm,
    onEdit: () => void,
    toDelete: () => void,
}> = ({solarFarm, onEdit, toDelete}) => {
    return (
        <Card>
            <Flex className="head-title">
                <SolarFarmHeading />
                <CardMenu onDelete={toDelete} onEdit={onEdit}/>
            </Flex>
            <DataList.Root style={{gridTemplateColumns: "3fr 1fr"}}>
                <DataList.Item>
                    <DataList.Label>Vermogen</DataList.Label>
                    <DataList.Value>{solarFarm.nominalPower_kW} kW</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>Opstelling</DataList.Label>
                    <DataList.Value>{solarFarm.orientation.displayName}</DataList.Value>
                </DataList.Item>
            </DataList.Root>
            <CostDisplay cost={solarFarm.cost} />
        </Card>
    )
}
