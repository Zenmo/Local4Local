import {FormEvent, FunctionComponent, useState} from "react"
import {Flex, Button, Card, DataList, Heading} from "@radix-ui/themes"
import {Pilot, BiogasGenerator} from "local4local"
import {CardMenu} from "../card-menu.tsx"
import {CostSection, CostDisplay} from "../cost/cost-section.tsx"
import {ImFire} from "react-icons/im"
import {costFromFormData} from "../cost/cost-from-form-data.ts"
import {DivWithInfo, LabelWithInfo} from "../info/label-with-info.tsx"
import {biogasGeneratorTitles, titles} from "../info/titles.tsx"

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
            <DataList.Root style={{gridTemplateColumns: "3fr 1fr"}}>
                <DataList.Item>
                    <DataList.Label><DivWithInfo data={titles["power_kW"]} /></DataList.Label>
                    <DataList.Value>{biogasGenerator.power_kW} kW</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label><DivWithInfo data={biogasGeneratorTitles.curtailment} /></DataList.Label>
                    <DataList.Value>{biogasGenerator.curtailment ? "Ja" : "Nee"}</DataList.Value>
                </DataList.Item>
            </DataList.Root>
            <CostDisplay cost={biogasGenerator.cost} />
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
            formData.get("curtailment") === "on",
        )
        save(generator)
        hide()
    }

    return (
        <Card className="form-box">
            <BiogasGeneratorHeading/>
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <LabelWithInfo data={titles["power_kW"]} />
                    <input className="form-input" type="number" id="power_kW" name="power_kW" defaultValue={ initialData?.power_kW || 200}/>
                </div>
                <div className="radix-grid">
                    <LabelWithInfo data={biogasGeneratorTitles.curtailment} />
                    <input type="checkbox" id="curtailment" name="curtailment" defaultChecked={initialData?.curtailment} />
                </div>
                <CostSection initialData={initialData?.cost}/>
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
                            onChange(pilot.replaceBiogasGenerator(asset, i))
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
                        toDelete={() => onChange(pilot.removeBiogasGenerator(it))}
                    />
                )
            )}
        </>
    )
}
