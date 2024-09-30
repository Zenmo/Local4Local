import {FormEvent, FunctionComponent} from "react"
import {Button, Card, DataList, Heading} from "@radix-ui/themes"
import {Battery, AssetCost} from "local4local"
import { PiCarBatteryLight } from "react-icons/pi"
import {CostSection, CostDisplay} from "./cost-section.tsx"

export const BatteryDisplay: FunctionComponent<{ battery: Battery }> = ({battery}) => {
    return (
        <Card>
            <BatteryHeading />
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Capaciteit</DataList.Label>
                    <DataList.Value>{battery.capacity_kWh} kWh</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Vermogen</DataList.Label>
                    <DataList.Value>{battery.peakPower_kW} kW</DataList.Value>
                </DataList.Item>
                <CostDisplay cost={battery.cost} hideCostPerKwh={true} />
            </DataList.Root>
        </Card>
    )
}

const BatteryHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <PiCarBatteryLight />
        &nbsp;
        Batterij
    </Heading>
)

export const BatteryForm: FunctionComponent<{
    saveBattery: (s: Battery) => void
    hide: () => void
}> = ({saveBattery, hide}) => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form);

        const cost =  new AssetCost(
            parseFloat(formData.get("LCOE_eurpkWH") as string) || 0,
            parseFloat(formData.get("CAPEX_eur") as string) || 0,
            parseFloat(formData.get("interest_r") as string) * 0.01 || 0,
            parseFloat(formData.get("depreciationPeriod_y") as string) || 0,
            parseFloat(formData.get("OPEX_eurpy") as string) || 0,
        );

        const battery = new Battery(
            parseFloat(formData.get("capacity_kWh") as string),
            parseFloat(formData.get("peakPower_kW") as string),
            cost,
        )

        saveBattery(battery)
        hide()
    }

    return (
        <Card className="form-box">
            <BatteryHeading/>
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="capacity_kWh">Capaciteit (kWh)</label>
                    <input className="form-input" type="number" id="capacity_kWh" name="capacity_kWh" defaultValue={100} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="peakPower_kW">Vermogen (kW)</label>
                    <input className="form-input" type="number" id="peakPower_kW" name="peakPower_kW" defaultValue={100} />
                </div>
                <CostSection hideCostPerKwh={true} />
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
