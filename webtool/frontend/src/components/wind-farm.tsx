import {FormEvent, FunctionComponent, useState} from "react"
import {Flex, Button, Card, DataList, Heading} from "@radix-ui/themes"
import {Pilot, WindFarm} from "local4local"
import { GiWindTurbine } from "react-icons/gi";
import {CostSection, CostDisplay} from "./cost-section.tsx"
import {CardMenu} from "./card-menu.tsx"
import {costFromFormData} from "./cost-from-form-data.ts"

export const WindFarmDisplay: FunctionComponent<{
    windFarm: WindFarm,
    onEdit: () => void,
    toDelete: () => void,
}> = ({windFarm, onEdit, toDelete}) => {
    return (
        <Card>
             <Flex className="head-title">
                <WindFarmHeading/>
                <CardMenu onDelete={toDelete} onEdit={onEdit}/>
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
    initialData?: WindFarm | null;
    save: (s: WindFarm) => void
    hide: () => void
}> = ({initialData, save, hide}) => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const windFarm = new WindFarm(
            parseFloat(formData.get("nominalPower_kW") as string),
            costFromFormData(formData),
        );

        save(windFarm)
        hide()
    }

    return (
        <Card className="form-box">
            <WindFarmHeading/>
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="nominalPower_kW">Vermogen (kW)</label>
                    <input className="form-input" type="number" id="nominalPower_kW" name="nominalPower_kW" defaultValue={ initialData?.nominalPower_kW || 2000}/>
                </div>
                <CostSection />
                <Button onClick={hide} style={{ marginRight: '10px' }} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}

export const WindFarmsDisplayEdit: FunctionComponent<{
    pilot: Pilot,
    onChange: (pilot: Pilot) => void,
}> = ({pilot, onChange}) => {
    const [selected, setSelected] = useState<WindFarm | null>(null);

    return (
        <>
            {pilot.windFarms.asJsReadonlyArrayView().map((it, i) =>
                selected == it ? (
                    <WindFarmForm
                        key={"WindFarm_" + i}
                        save={(asset: WindFarm) => {
                            onChange(pilot.replaceWindFarm(i, asset))
                            setSelected(null);
                        }}
                        hide={() => {
                            setSelected(null);
                        }}
                        initialData={selected}
                    />
                ) : (
                    <WindFarmDisplay
                        key={"WindFarm_" + i}
                        windFarm={it}
                        onEdit={() => { setSelected(it)}}
                        toDelete={() => onChange(pilot.remove(it))}
                    />
                )
            )}
        </>
    )
}
