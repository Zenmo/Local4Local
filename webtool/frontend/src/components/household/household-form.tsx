import {FormEvent, FunctionComponent} from "react"
import {HouseholdGroup} from "local4local"
import {Button, Card, Flex} from "@radix-ui/themes"
import {HouseholdHeading} from "./household-heading.tsx"
import {CardMenu} from "./../card-menu.tsx"

export const HouseholdForm: FunctionComponent<{
    saveHouseholdGroup: (householdGroup: HouseholdGroup) => void,
    hide: () => void,
}> = ({saveHouseholdGroup, hide}) => {
    const addHouseHold = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form);
        const householdGroup = new HouseholdGroup(
            formData.get("type") as string,
            parseInt(formData.get("households_n") as string),
            parseFloat(formData.get("hasPV_r") as string) * 0.01,
            parseFloat(formData.get("hasHeatPump_r") as string) * 0.01,
            parseFloat(formData.get("hasChargePoint_r") as string) * 0.01,
            parseFloat(formData.get("hasHomeBattery_r") as string) * 0.01,
            parseFloat(formData.get("annualBaseConsumptionAvg_kWh") as string),
        );
        saveHouseholdGroup(householdGroup);
        hide();
    };

    return (
        <Card className="form-box">
            <HouseholdHeading />
            <form onSubmit={addHouseHold}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="type">Type</label>
                    <input className="form-input" type="text" id="type" name="type" defaultValue="Huishoudens"/>
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="households_n">Aantal huishoudens</label>
                    <input className="form-input" type="number" id="households_n" name="households_n" defaultValue={100} min={0} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="hasPV_r">Percentage met zonnepanelen [%]</label>
                    <input className="form-input" type="number" id="hasPV_r" name="hasPV_r" defaultValue={20} min={0} max={100} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="hasHeatPump_r">Percentage met warmtepomp [%]</label>
                    <input className="form-input" type="number" id="hasHeatPump_r" name="hasHeatPump_r" defaultValue={10} min={0} max={100} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="hasChargePoint_r">Percentage met laadpaal [%]</label>
                    <input className="form-input" type="number" id="hasChargePoint_r" name="hasChargePoint_r" defaultValue={4} min={0} max={100} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="hasHomeBattery_r">Percentage met thuisbatterij [%]</label>
                    <input className="form-input" type="number" id="hasHomeBattery_r" name="hasHomeBattery_r" defaultValue={1} min={0} max={100} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="annualBaseConsumptionAvg_kWh">Jaarlijks gemiddeld verbruik (kWh)</label>
                    <input className="form-input" type="number" id="annualBaseConsumptionAvg_kWh" name="annualBaseConsumptionAvg_kWh" defaultValue={4500} min={0} />
                </div>
                <Button onClick={hide} style={{ marginRight: '10px' }}  highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}