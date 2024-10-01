import {FormEvent, FunctionComponent} from "react"
import {Flex, Button, Card, DataList, Heading} from "@radix-ui/themes"
import {WindFarm, AssetCost} from "local4local"
import { GiWindTurbine } from "react-icons/gi";
import {CostSection, CostDisplay} from "./cost-section.tsx"
import {CardMenu} from "./card-menu.tsx"

export const WindFarmDisplay: FunctionComponent<{
    windFarm: WindFarm,
    toDelete: () => void,
}> = ({windFarm, toDelete}) => {
    return (
        <Card>
             <Flex className="head-title">
                <WindFarmHeading/>
                <CardMenu onDelete={toDelete}/>
            </Flex>
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Vermogen</DataList.Label>
                    <DataList.Value>{windFarm.nominalPower_kW} kW</DataList.Value>
                </DataList.Item>
                <CostDisplay cost={windFarm.cost} />
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
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const cost =  new AssetCost(
            parseFloat(formData.get("LCOE_eurpkWH") as string) || 0,
            parseFloat(formData.get("CAPEX_eur") as string) || 0,
            parseFloat(formData.get("interest_r") as string) * 0.01 || 0,
            parseFloat(formData.get("depreciationPeriod_y") as string) || 0,
            parseFloat(formData.get("OPEX_eurpy") as string) || 0,
        );

        const windFarm = new WindFarm(
            parseFloat(formData.get("nominalPower_kW") as string),
            cost,
        );

        saveWindFarm(windFarm)
        hide()
    }

    return (
        <Card className="form-box">
            <WindFarmHeading/>
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="nominalPower_kW">Vermogen (kW)</label>
                    <input className="form-input" type="number" id="nominalPower_kW" name="nominalPower_kW" defaultValue={2000}/>
                </div>
                <CostSection />
                <Button onClick={hide} style={{ marginRight: '10px' }} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
