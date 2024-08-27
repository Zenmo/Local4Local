import {FormEvent, FunctionComponent} from "react"
import {HouseholdGroup} from "local4local"
import {Button, Card} from "@radix-ui/themes"
import {HouseholdHeading} from "./household-heading.tsx"

export const HouseholdForm: FunctionComponent<{
    saveHouseholdGroup: (householdGroup: HouseholdGroup) => void,
    hide: () => void,
}> = ({saveHouseholdGroup, hide}) => {
    const addHouseHold = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const householdGroup = new HouseholdGroup(
            formData.get("type") as string,
            parseInt(formData.get("households_n") as string),
            parseFloat(formData.get("hasPV_r") as string) * 0.01,
            parseFloat(formData.get("hasHeatPump_r") as string) * 0.01,
            parseFloat(formData.get("hasChargePoint_r") as string) * 0.01,
            parseFloat(formData.get("hasHomeBattery_r") as string) * 0.01,
            parseFloat(formData.get("annualBaseConsumptionAvg_kWh") as string),
        )

        saveHouseholdGroup(householdGroup)
        hide()
    }

    return (
        <Card>
            <HouseholdHeading />
            <form onSubmit={addHouseHold}>
                <div>
                    <label htmlFor="type">Type</label>
                    <input type="text" id="type" name="type" defaultValue="Huishoudens"/>
                </div>
                <div>
                    <label htmlFor="households_n">Aantal huishoudens</label>
                    <input type="number" id="households_n" name="households_n" defaultValue={100} min={0} />
                </div>
                <div>
                    <label htmlFor="hasPV_r">Percentage met zonnepanelen</label>
                    <input type="number" id="hasPV_r" name="hasPV_r" defaultValue={20} min={0} max={100} />
                </div>
                <div>
                    <label htmlFor="hasHeatPump_r">Percentage met warmtepomp</label>
                    <input type="number" id="hasHeatPump_r" name="hasHeatPump_r" defaultValue={10} min={0} max={100} />
                </div>
                <div>
                    <label htmlFor="hasChargePoint_r">Percentage met laadpaal</label>
                    <input type="number" id="hasChargePoint_r" name="hasChargePoint_r" defaultValue={4} min={0} max={100} />
                </div>
                <div>
                    <label htmlFor="hasHomeBattery_r">Percentage met thuisbatterij</label>
                    <input type="number" id="hasHomeBattery_r" name="hasHomeBattery_r" defaultValue={1} min={0} max={100} />
                </div>
                <div>
                    <label htmlFor="annualBaseConsumptionAvg_kWh">Jaarlijks gemiddeld verbruik (kWh)</label>
                    <input type="number" id="annualBaseConsumptionAvg_kWh" name="annualBaseConsumptionAvg_kWh" defaultValue={4500} min={0} />
                </div>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}