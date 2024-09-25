import {FormEvent, FunctionComponent, useState} from "react"
import {Button, Card, DataList, Heading} from "@radix-ui/themes"
import {WindFarm, Cost} from "local4local"
import { GiWindTurbine } from "react-icons/gi";
import {CostSection, CostDisplay} from "./cost-section.tsx"

export const WindFarmDisplay: FunctionComponent<{ windFarm: WindFarm }> = ({windFarm}) => {
    return (
        <Card>
            <WindFarmHeading />
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

        const cost =  new Cost(
            parseFloat(formData.get("costsPer_kWh") as string),
            parseFloat(formData.get("buy_ct") as string),
            parseFloat(formData.get("income_r") as string) * 0.01,
            parseFloat(formData.get("writingPeriod_y") as string),
            parseFloat(formData.get("additionalCosts_cty") as string),
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
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
