import {FormEvent, FunctionComponent} from "react"
import {HeatStorage} from "local4local"
import {Button, Card} from "@radix-ui/themes"
import {HeatStorageHeading} from "./heat-storage-heading.tsx"
import './../styles.css';
import {CostSection} from "../cost/cost-section.tsx"
import {costFromFormData} from "../cost/cost-from-form-data.ts"
import {LabelWithInfo} from "../info/label-with-info.tsx"
import { titles } from '../info/titles.tsx';

export const HeatStorageForm: FunctionComponent<{
    initialData?: HeatStorage | null;
    save: (heatStorage: HeatStorage) => void,
    hide: () => void,
}> = ({initialData, save, hide}) => {
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)

        const heatStorage = new HeatStorage(
            formData.get("storageMedium") as string,
            parseFloat(formData.get("storageVolume_m3") as string),
            parseFloat(formData.get("minTemp_degC") as string),
            parseFloat(formData.get("maxTemp_degC") as string),
            costFromFormData(formData),
        );

        save(heatStorage)
        hide()
    }

    return (
        <Card className="form-box">
            <HeatStorageHeading />
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <LabelWithInfo data={titles["storageMedium"]} />
                    <input className="form-input" type="text" id="storageMedium" name="storageMedium" defaultValue="Water"/>
                </div>
                <div className="radix-grid">
                    <LabelWithInfo data={titles["storageVolume_m3"]} />
                    <input className="form-input" type="number" id="storageVolume_m3" name="storageVolume_m3" defaultValue={ initialData?.storageVolume_m3 || 50} min={0} />
                </div>
                <div className="radix-grid">
                    <LabelWithInfo data={titles["minTemp_degC"]} />
                    <input className="form-input" type="number" id="minTemp_degC" name="minTemp_degC" defaultValue={ initialData?.minTemp_degC || 50} />
                </div>
                <div className="radix-grid">
                    <LabelWithInfo data={titles["maxTemp_degC"]} />
                    <input className="form-input" type="number" id="maxTemp_degC" name="maxTemp_degC" defaultValue={ initialData?.maxTemp_degC || 95} />
                </div>

                <CostSection initialData={initialData?.cost}/>

                <Button type="button" onClick={hide} style={{ marginRight: '10px' }} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
