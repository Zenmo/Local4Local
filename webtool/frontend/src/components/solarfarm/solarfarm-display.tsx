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
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Vermogen</DataList.Label>
                    <DataList.Value>{solarFarm.nominalPower_kW} kW</DataList.Value>
                </DataList.Item>
                <CostDisplay cost={solarFarm.cost} />
            </DataList.Root>
        </Card>
    )
}
