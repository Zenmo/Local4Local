import {FormEvent, FunctionComponent, useState} from "react"
import {Button, Card, DataList, Heading} from "@radix-ui/themes"
import {WindFarm} from "local4local"
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
                <CostDisplay artifact={windFarm} />
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
    const [costs, setCosts] = useState({ costsPer_kWh: 0, buy_ct: 0, income_r: 0, writingPeriod_y: 0, additionalCosts_cty: 0 });

    const handleCostChange = (key: any, value: any) => {
        setCosts((prevCosts) => ({
            ...prevCosts,
            [key]: value,
        }));
    };
    
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const windFarm = new WindFarm(
            parseFloat(formData.get("nominalPower_kW") as string),
            costs.costsPer_kWh,
            costs.buy_ct,
            costs.income_r * 0.01,
            costs.writingPeriod_y,
            costs.additionalCosts_cty,
        )

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
                <CostSection onCostChange={handleCostChange} />
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
