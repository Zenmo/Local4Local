import {FormEvent, FunctionComponent} from "react"
import {HeatStorage} from "local4local"
import {Button, Card} from "@radix-ui/themes"
import {HeatStorageHeading} from "./heat-storage-heading.tsx"

export const HeatStorageForm: FunctionComponent<{
    saveHeatStorage: (heatStorage: HeatStorage) => void,
    hide: () => void,
}> = ({saveHeatStorage, hide}) => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const heatStorage = new HeatStorage(
            formData.get("storageMedium") as string,
            parseFloat(formData.get("storageVolume_m3") as string),
            parseFloat(formData.get("minTemp_degC") as string),
            parseFloat(formData.get("maxTemp_degC") as string),
        )

        saveHeatStorage(heatStorage)
        hide()
    }

    return (
        <Card>
            <HeatStorageHeading />
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="storageMedium">Opslagmedium</label>
                    <input type="text" id="storageMedium" name="storageMedium" defaultValue="Water"/>
                </div>
                <div>
                    <label htmlFor="storageVolume_m3">Volume</label>
                    <input type="number" id="storageVolume_m3" name="storageVolume_m3" defaultValue={50} min={0} />
                    m3
                </div>
                <div>
                    <label htmlFor="minTemp_degC">Minimale temperatuur</label>
                    <input type="number" id="minTemp_degC" name="minTemp_degC" defaultValue={50} />
                    &deg;C
                </div>
                <div>
                    <label htmlFor="maxTemp_degC">Maximale temperatuur</label>
                    <input type="number" id="maxTemp_degC" name="maxTemp_degC" defaultValue={95} />
                    &deg;C
                </div>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}