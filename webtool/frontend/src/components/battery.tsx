import {FormEvent, FunctionComponent} from "react"
import {Flex, Button, Card, DataList, Heading} from "@radix-ui/themes"
import {Battery} from "local4local"
import {PiCarBatteryLight} from "react-icons/pi"
import {CostSection, CostDisplay} from "./cost-section.tsx"
import {CardMenu} from "./card-menu.tsx"
import {costFromFormData} from "./cost-from-form-data.ts"

export const BatteryDisplay: FunctionComponent<{
    battery: Battery,
    toDelete: () => void,
}> = ({battery, toDelete}) => {
    return (
        <Card>
            <Flex className="head-title">
                <BatteryHeading />
                <CardMenu onDelete={toDelete}/>
            </Flex>
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
        Leveranciersopslag
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

        const battery = new Battery(
            parseFloat(formData.get("capacity_kWh") as string),
            parseFloat(formData.get("peakPower_kW") as string),
            costFromFormData(formData),
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
                <Button onClick={hide} style={{ marginRight: '10px' }} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
