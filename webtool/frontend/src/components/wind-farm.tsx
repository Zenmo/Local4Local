import {FormEvent, FunctionComponent} from "react"
import {Button, Card, DataList, Heading} from "@radix-ui/themes"
import {WindFarm} from "local4local"
import { GiWindTurbine } from "react-icons/gi";

export const WindFarmDisplay: FunctionComponent<{ windFarm: WindFarm }> = ({windFarm}) => {
    return (
        <Card>
            <WindFarmHeading />
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Vermogen</DataList.Label>
                    <DataList.Value>{windFarm.nominalPower_kW} kW</DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </Card>
    )
}

const WindFarmHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <GiWindTurbine />
        &nbsp;
        Windpark
    </Heading>
)

export const WindFarmForm: FunctionComponent<{
    saveWindFarm: (s: WindFarm) => void
    hide: () => void
}> = ({saveWindFarm, hide}) => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const windFarm = new WindFarm(
            parseFloat(formData.get("nominalPower_kW") as string),
        )

        saveWindFarm(windFarm)
        hide()
    }

    return (
        <Card>
            <WindFarmHeading/>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="nominalPower_kW">Vermogen (kW)</label>
                    <input type="number" id="nominalPower_kW" name="nominalPower_kW" defaultValue={2000}/>
                </div>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}