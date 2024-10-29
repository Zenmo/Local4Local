import {FormEvent, FunctionComponent} from "react"
import {Flex, Button, Card, DataList, Heading} from "@radix-ui/themes"
import {BiogasGenerator, AssetCost} from "local4local"
import {CardMenu} from "./card-menu.tsx"
import {CostSection, CostDisplay} from "./cost-section.tsx"
import {ImFire} from "react-icons/im"

export const BiogasGeneratorDisplay: FunctionComponent<{
    biogasGenerator: BiogasGenerator,
    toDelete: () => void,
}> = ({biogasGenerator, toDelete}) => {
    return (
        <Card>
            <Flex className="head-title">
                <BiogasGeneratorHeading />
                <CardMenu onDelete={toDelete}/>
            </Flex>
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Vermogen</DataList.Label>
                    <DataList.Value>{biogasGenerator.power_kW} kW</DataList.Value>
                </DataList.Item>
                <CostDisplay cost={biogasGenerator.cost} />
            </DataList.Root>
        </Card>
    )
}

const BiogasGeneratorHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <ImFire />
        &nbsp;
        Biogasmotor
    </Heading>
)

export const BiogasGeneratorForm: FunctionComponent<{
    save: (b: BiogasGenerator) => void
    hide: () => void
}> = ({save, hide}) => {
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

        const generator = new BiogasGenerator(
            parseFloat(formData.get("power_kW") as string),
            cost,
        )
        save(generator)
        hide()
    }

    return (
        <Card className="form-box">
            <BiogasGeneratorHeading/>
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="power_kW">Vermogen (kW)</label>
                    <input className="form-input" type="number" id="power_kW" name="power_kW" defaultValue={200}/>
                </div>
                <CostSection />
                <Button onClick={hide} style={{ marginRight: '10px' }} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
