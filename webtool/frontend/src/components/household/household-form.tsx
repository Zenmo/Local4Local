import {FormEvent, FunctionComponent} from "react"
import {HouseholdGroup} from "local4local"
import {Button, Card} from "@radix-ui/themes"
import {HouseholdHeading} from "./household-heading.tsx"

export const HouseholdForm: FunctionComponent<{
    initialData?: HouseholdGroup | null;
    save: (householdGroup: HouseholdGroup) => void,
    hide: () => void,
}> = ({initialData, save, hide}) => {
    console.log("editHouseHold")
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
        save(householdGroup);
        hide();
    };

    return (
        <Card className="form-box">
            <HouseholdHeading />
            <form onSubmit={addHouseHold}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="type">Type</label>
                    <input className="form-input" type="text" id="type" name="type" defaultValue= { initialData?.type || "Huishoudens" }/>
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="households_n">Aantal huishoudens</label>
                    <input className="form-input" type="number" id="households_n" name="households_n" defaultValue={ initialData?.households_n || 200 } min={0} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="hasPV_r">Percentage met zonnepanelen [%]</label>
                    <input className="form-input" type="number" id="hasPV_r" name="hasPV_r" defaultValue={(initialData?.hasPV_r || 0.2) * 100 } min={0} max={100} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="hasHeatPump_r">Percentage met warmtepomp [%]</label>
                    <input className="form-input" type="number" id="hasHeatPump_r" name="hasHeatPump_r" defaultValue={ (initialData?.hasHeatPump_r || 0.1) * 100 } min={0} max={100} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="hasChargePoint_r">Percentage met laadpaal [%]</label>
                    <input className="form-input" type="number" id="hasChargePoint_r" name="hasChargePoint_r" defaultValue={ (initialData?.hasChargePoint_r || 0.2) * 100 } min={0} max={100} />
                </div>
                <div className="radix-grid" style={{display: "none"}}>
                    <label className="form-label" htmlFor="hasHomeBattery_r">Percentage met thuisbatterij [%]</label>
                    <input className="form-input" type="number" id="hasHomeBattery_r" name="hasHomeBattery_r" defaultValue={ (initialData?.hasHomeBattery_r || 0.0) * 100 } min={0} max={100} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="annualBaseConsumptionAvg_kWh">Jaarlijks huishoudelijk verbruik (kWh)</label>
                    <input className="form-input" type="number" id="annualBaseConsumptionAvg_kWh" name="annualBaseConsumptionAvg_kWh" defaultValue={ initialData?.annualBaseConsumptionAvg_kWh || 3000 } min={0} />
                </div>
                <Button onClick={hide} style={{ marginRight: '10px' }} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
