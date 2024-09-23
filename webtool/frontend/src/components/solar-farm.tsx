import {FormEvent, FunctionComponent} from "react"
import {Button, Card, DataList, Heading} from "@radix-ui/themes"
import {SolarFarm} from "local4local"
import {SunIcon} from "@radix-ui/react-icons"

export const SolarFarmDisplay: FunctionComponent<{ solarFarm: SolarFarm }> = ({solarFarm}) => {
    return (
        <Card>
            <SolarFarmHeading />
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Vermogen</DataList.Label>
                    <DataList.Value>{solarFarm.nominalPower_kW} kW</DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </Card>
    )
}

const SolarFarmHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <SunIcon />
        &nbsp;
        Zonnepark
    </Heading>
)

export const SolarFarmForm: FunctionComponent<{
    saveSolarFarm: (s: SolarFarm) => void
    hide: () => void
}> = ({saveSolarFarm, hide}) => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const solarFarm = new SolarFarm(
            parseFloat(formData.get("nominalPower_kW") as string),
        )

        saveSolarFarm(solarFarm)
        hide()
    }

    return (
        <Card className="form-box">
            <SolarFarmHeading/>
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="nominalPower_kW">Vermogen (kW)</label>
                    <input className="form-input" type="number" id="nominalPower_kW" name="nominalPower_kW" defaultValue={1000}/>
                </div>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
