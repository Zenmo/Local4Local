import {FormEvent, FunctionComponent} from "react"
import {Button, Card, RadioGroup} from "@radix-ui/themes"
import {SolarFarm, PVOrientation } from "local4local"
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
        
        const dataOrientation: { [key: string]: PVOrientation } = {
            SOUTH: PVOrientation.SOUTH,
            EAST_WEST: PVOrientation.EAST_WEST,
        }
        
        const orientation = formData.get("orientation") as string;
        const pvOrientation: PVOrientation = dataOrientation[orientation];

        const solarFarm = new SolarFarm(
            parseFloat(formData.get("nominalPower_kW") as string),
            pvOrientation,
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
                <div className="radix-grid">
                    <label className="form-label">Opstelling</label>
                </div>
                <div>
                    <RadioGroup.Root name="orientation" defaultValue={initialData?.orientation.name.toString() || PVOrientation.SOUTH.toString()}>
                        <label>
                            <input type="radio" name="orientation" value={PVOrientation.SOUTH.name} defaultChecked={initialData?.orientation === PVOrientation.SOUTH} />
                            {PVOrientation.SOUTH.name}
                        </label>
                        <label>
                            <input type="radio" name="orientation" value={PVOrientation.EAST_WEST.name} defaultChecked={initialData?.orientation === PVOrientation.EAST_WEST} />
                            {PVOrientation.EAST_WEST.name}
                        </label>
                    </RadioGroup.Root>
                </div>
                <CostSection initialData={ initialData?.cost } />
                <Button onClick={hide} style={{ marginRight: '10px' }} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
