import {FormEvent, FunctionComponent, useState} from "react"
import {Button, Card, DataList, Heading} from "@radix-ui/themes"
import {Battery} from "local4local"
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
                <CostDisplay asset={battery} hideCostPerKwh={true} />
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
        const formData = new FormData(form)

        const battery = new Battery(
            parseFloat(formData.get("capacity_kWh") as string),
            parseFloat(formData.get("peakPower_kW") as string),
            parseFloat(formData.get("buy_ct") as string),
            parseFloat(formData.get("income_r") as string) * 0.01,
            parseFloat(formData.get("writingPeriod_y") as string),
            parseFloat(formData.get("additionalCosts_cty") as string),
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
