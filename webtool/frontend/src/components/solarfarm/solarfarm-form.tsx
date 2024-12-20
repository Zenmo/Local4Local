import {FormEvent, FunctionComponent} from "react"
import {Button, Card} from "@radix-ui/themes"
import {SolarFarm} from "local4local"
import {CostSection} from "../cost-section.tsx"
import {costFromFormData} from "../cost-from-form-data.ts"
import {SolarFarmHeading} from "./solarfarm-heading.tsx"

export const SolarFarmForm: FunctionComponent<{
    initialData?: SolarFarm | null;
    save: (solarFarm: SolarFarm) => void
    hide: () => void
}> = ({initialData, save, hide}) => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const solarFarm = new SolarFarm(
            parseFloat(formData.get("nominalPower_kW") as string),
            costFromFormData(formData),
        )
        save(solarFarm)
        hide()
    }

    return (
        <Card className="form-box">
            <SolarFarmHeading/>
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="nominalPower_kW">Vermogen (kW)</label>
                    <input className="form-input" type="number" id="nominalPower_kW" name="nominalPower_kW" defaultValue={ initialData?.nominalPower_kW || 1000}/>
                </div>
                <CostSection initialData={ initialData?.cost } />
                <Button onClick={hide} style={{ marginRight: '10px' }} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
