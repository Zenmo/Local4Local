import {FunctionComponent} from "react"
import {Card, DataList} from "@radix-ui/themes"
import {HeatStorage} from "local4local"
import {HeatStorageHeading} from "./heat-storage-heading.tsx"

export const HeatStorageDisplay: FunctionComponent<{ heatStorage: HeatStorage }> = ({heatStorage}) => {
    return (
        <Card>
            <HeatStorageHeading />
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
            </DataList.Root>
        </Card>
    )
}