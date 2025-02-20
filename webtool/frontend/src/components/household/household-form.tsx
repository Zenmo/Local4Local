import {FormEvent, FunctionComponent} from "react"
import {HouseholdGroup} from "local4local"
import {Button, Card} from "@radix-ui/themes"
import {HouseholdHeading} from "./household-heading.tsx"
import {getWithDefault} from "../default.ts"
import {LabelWithInfo} from "../info/label-with-info.tsx"
import { titles } from '../info/titles.tsx';

export const HouseholdForm: FunctionComponent<{
    initialData?: HouseholdGroup | null;
    save: (householdGroup: HouseholdGroup) => void,
    hide: () => void,
}> = ({initialData, save, hide}) => {
    const onSubmit = (event: FormEvent) => {
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
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <LabelWithInfo data={titles["type"]} />
                    <input className="form-input" type="text" id="type" name="type" defaultValue={initialData?.type || "Huishoudens"} />
                </div>
                <div className="radix-grid">
                    <LabelWithInfo data={titles["households_n"]} />
                    <input className="form-input" type="number" id="households_n" name="households_n" defaultValue={initialData?.households_n || 200} min={0} />
                </div>
                <div className="radix-grid">
                    <LabelWithInfo data={titles["hasPV_r"]} />
                    <input className="form-input" type="number" id="hasPV_r" name="hasPV_r" defaultValue={getWithDefault(initialData?.hasPV_r, 0.2) * 100} min={0} max={100} />
                </div>
                <div className="radix-grid">
                    <LabelWithInfo data={titles["hasHeatPump_r"]} />
                    <input className="form-input" type="number" id="hasHeatPump_r" name="hasHeatPump_r" defaultValue={getWithDefault(initialData?.hasHeatPump_r, 0.1) * 100} min={0} max={100} />
                </div>
                <div className="radix-grid">
                    <LabelWithInfo data={titles["hasChargePoint_r"]} />
                    <input className="form-input" type="number" id="hasChargePoint_r" name="hasChargePoint_r" defaultValue={getWithDefault(initialData?.hasChargePoint_r, 0.2) * 100} min={0} max={100} />
                </div>
                <div className="radix-grid" style={{ display: "none" }}>
                    <LabelWithInfo data={titles["hasHomeBattery_r"]} />
                    <input className="form-input" type="number" id="hasHomeBattery_r" name="hasHomeBattery_r" defaultValue={(initialData?.hasHomeBattery_r || 0.0) * 100} min={0} max={100} />
                </div>
                <div className="radix-grid">
                    <LabelWithInfo data={titles["annualBaseConsumptionAvg_kWh"]} />
                    <input className="form-input" type="number" id="annualBaseConsumptionAvg_kWh" name="annualBaseConsumptionAvg_kWh" defaultValue={initialData?.annualBaseConsumptionAvg_kWh || 3000} min={0} />
                </div>
                <Button onClick={hide} style={{ marginRight: '10px' }} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
