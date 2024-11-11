import {FormEvent, FunctionComponent, useState} from "react"
import {Flex, Button, Card, DataList, Heading} from "@radix-ui/themes"
import {Pilot, BiogasGenerator} from "local4local"
import {CardMenu} from "../card-menu.tsx"
import {CostSection, CostDisplay} from "../cost-section.tsx"
import {ImFire} from "react-icons/im"
import {costFromFormData} from "../cost-from-form-data.ts"

export const BiogasGeneratorDisplay: FunctionComponent<{
    biogasGenerator: BiogasGenerator,
    onEdit: () => void,
    toDelete: () => void,
}> = ({biogasGenerator, onEdit, toDelete}) => {
    return (
        <Card>
            <Flex className="head-title">
                <BiogasGeneratorHeading />
                <CardMenu onDelete={toDelete} onEdit={onEdit}/>
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
    initialData?: BiogasGenerator | null;
    save: (b: BiogasGenerator) => void
    hide: () => void
}> = ({initialData, save, hide}) => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const generator = new BiogasGenerator(
            parseFloat(formData.get("power_kW") as string),
            costFromFormData(formData),
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
                    <input className="form-input" type="number" id="power_kW" name="power_kW" defaultValue={ initialData?.power_kW || 200}/>
                </div>
                <CostSection />
                <Button onClick={hide} style={{ marginRight: '10px' }} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}

export const BiogasGeneratorsDisplayEdit: FunctionComponent<{
    pilot: Pilot,
    onChange: (pilot: Pilot) => void,
}> = ({pilot, onChange}) => {
    const [selected, setSelected] = useState<BiogasGenerator | null>(null);

    return (
        <>
            {pilot.biogasGenerators.asJsReadonlyArrayView().map((it, i) =>
                selected == it ? (
                    <BiogasGeneratorForm
                        key={"BiogasGenerator_" + i}
                        save={(asset: BiogasGenerator) => {
                            onChange(pilot.replaceBiogasGenerator(i, asset))
                            setSelected(null);
                        }}
                        hide={() => {
                            setSelected(null);
                        }}
                        initialData={selected}
                    />
                ) : (
                    <BiogasGeneratorDisplay
                        key={"BiogasGenerator_" + i}
                        biogasGenerator={it}
                        onEdit={() => { setSelected(it)}}
                        toDelete={() => onChange(pilot.remove(it))}
                    />
                )
            )}
        </>
    )
}
