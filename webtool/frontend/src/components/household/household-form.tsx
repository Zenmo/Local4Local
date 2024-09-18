import {FormEvent, FunctionComponent} from "react"
import {HouseholdGroup} from "local4local"
import {Button, Card, Heading} from "@radix-ui/themes"
import {HouseholdHeading} from "./household-heading.tsx"

// Move Cost as a component
import { PiMoneyLight } from "react-icons/pi"

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
            parseFloat(formData.get("costsPer_kWh") as string) * 0.01,
            parseFloat(formData.get("buy_ct") as string) * 0.01,
            parseFloat(formData.get("income_r") as string) * 0.01,
            parseFloat(formData.get("writingPeriod_y") as string) * 0.01,
            parseFloat(formData.get("additionalCosts_cty") as string) * 0.01,
        )

        saveHouseholdGroup(householdGroup)
        hide()
    }

    const CostHeading = () => (
        <Heading as="h3" style={{paddingBottom: ".5rem"}}>
            <PiMoneyLight />
            &nbsp;
            Kosten
        </Heading>
    )

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
                <div>
                    <label htmlFor="costsPer_kWh">Kosten per kWh [€]</label>
                    <input type="number" id="costsPer_kWh" name="costsPer_kWh" defaultValue={0} min={0}/>
                </div>
                <div>
                    <label htmlFor="buy_ct">Aanschaf [€]</label>
                    <input type="number" id="buy_ct" name="buy_ct" defaultValue={0} min={0}/>
                </div>
                <div>
                    <label htmlFor="income_r">Rente [%]</label>
                    <input type="number" id="income_r" name="income_r" defaultValue={0} min={0} max={100} />
                </div>
                <div>
                    <label htmlFor="writingPeriod_y">Afschrijvingsperiode [jaar]</label>
                    <input type="number" id="writingPeriod_y" name="writingPeriod_y" defaultValue={0} min={0} />
                </div>
                <div>
                    <label htmlFor="additionalCosts_cty">Onderhoudskosten [€/jaar]</label>
                    <input type="number" id="additionalCosts_cty" name="additionalCosts_cty" defaultValue={0} min={0} />
                </div>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}