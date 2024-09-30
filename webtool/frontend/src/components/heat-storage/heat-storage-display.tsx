import {FunctionComponent} from "react"
import {Flex, Card, DataList} from "@radix-ui/themes"
import {HeatStorage} from "local4local"
import {HeatStorageHeading} from "./heat-storage-heading.tsx"
import {CostDisplay} from "../cost-section.tsx"
import {CardMenu} from "./../card-menu.tsx"

export const HeatStorageDisplay: FunctionComponent<{
        heatStorage: HeatStorage,
        toEdit: () => void,
        toDelete: () => void,
    }> = ({heatStorage, toEdit, toDelete}) => {
    return (
        <Card>
            <Flex gap="3">
                <HeatStorageHeading />
                <CardMenu onEdit={toEdit} onDelete={toDelete}/>
            </Flex>
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Opslagmedium</DataList.Label>
                    <DataList.Value>{heatStorage.storageMedium}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Volume</DataList.Label>
                    <DataList.Value>{heatStorage.storageVolume_m3} m3</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Minimale temperatuur</DataList.Label>
                    <DataList.Value>{heatStorage.minTemp_degC} &deg;C</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Maximale temperatuur</DataList.Label>
                    <DataList.Value>{heatStorage.maxTemp_degC} &deg;C</DataList.Value>
                </DataList.Item>
                <CostDisplay cost={heatStorage.cost} />
            </DataList.Root>
        </Card>
    )
}