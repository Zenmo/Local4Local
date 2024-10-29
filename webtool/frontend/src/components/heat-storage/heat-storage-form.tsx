import {FormEvent, FunctionComponent} from "react"
import {HeatStorage} from "local4local"
import {Button, Card} from "@radix-ui/themes"
import {HeatStorageHeading} from "./heat-storage-heading.tsx"
import './../styles.css';
import {CostSection} from "../cost-section.tsx"
import {costFromFormData} from "../cost-from-form-data.ts"

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
            costFromFormData(formData),
        );

        saveHeatStorage(heatStorage)
        hide()
    }

    return (
        <Card className="form-box">
            <HeatStorageHeading />
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="storageMedium">Opslagmedium</label>
                    <input className="form-input" type="text" id="storageMedium" name="storageMedium" defaultValue="Water"/>
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="storageVolume_m3">Volume (m3)</label>
                    <input className="form-input" type="number" id="storageVolume_m3" name="storageVolume_m3" defaultValue={50} min={0} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="minTemp_degC">Minimale temperatuur (&deg;C)</label>
                    <input className="form-input" type="number" id="minTemp_degC" name="minTemp_degC" defaultValue={50} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="maxTemp_degC">Maximale temperatuur (&deg;C)</label>
                    <input className="form-input" type="number" id="maxTemp_degC" name="maxTemp_degC" defaultValue={95} />
                </div>

                <CostSection />

                <Button onClick={hide} style={{ marginRight: '10px' }} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
