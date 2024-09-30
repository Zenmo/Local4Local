import {FormEvent, FunctionComponent} from "react"
import {Flex, Button, Card, DataList, Heading} from "@radix-ui/themes"
import {SolarFarm} from "local4local"
import {SunIcon} from "@radix-ui/react-icons"
import {CardMenu} from "./card-menu.tsx"
import {CostSection, CostDisplay} from "./cost-section.tsx"

export const SolarFarmDisplay: FunctionComponent<{
    solarFarm: SolarFarm,
    toEdit: () => void,
    toDelete: () => void,
}> = ({solarFarm, toEdit, toDelete}) => {
    return (
        <Card>
            <Flex gap="3">
                <SolarFarmHeading />
                <CardMenu onEdit={toEdit} onDelete={toDelete}/>
            </Flex>
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Vermogen</DataList.Label>
                    <DataList.Value>{solarFarm.nominalPower_kW} kW</DataList.Value>
                </DataList.Item>
                <CostDisplay cost={solarFarm.cost} />
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
        const cost =  new AssetCost(
            parseFloat(formData.get("LCOE_eurpkWH") as string) || 0,
            parseFloat(formData.get("CAPEX_eur") as string) || 0,
            parseFloat(formData.get("interest_r") as string) * 0.01 || 0,
            parseFloat(formData.get("depreciationPeriod_y") as string) || 0,
            parseFloat(formData.get("OPEX_eurpy") as string) || 0,
        );

        const solarFarm = new SolarFarm(
            parseFloat(formData.get("nominalPower_kW") as string),
            cost,
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
                <CostSection />
                <Button onClick={hide} style={{ marginRight: '10px' }}  highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
