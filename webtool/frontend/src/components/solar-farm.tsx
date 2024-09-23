import {FormEvent, FunctionComponent, useState} from "react"
import {Button, Card, DataList, Heading} from "@radix-ui/themes"
import {SolarFarm} from "local4local"
import {SunIcon} from "@radix-ui/react-icons"
import {CostSection, CostDisplay} from "./cost-section.tsx"

export const SolarFarmDisplay: FunctionComponent<{ solarFarm: SolarFarm }> = ({solarFarm}) => {
    return (
        <Card>
            <SolarFarmHeading />
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Vermogen</DataList.Label>
                    <DataList.Value>{solarFarm.nominalPower_kW} kW</DataList.Value>
                </DataList.Item>
                <CostDisplay artifact={solarFarm} />
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

        const solarFarm = new SolarFarm(
            parseFloat(formData.get("nominalPower_kW") as string),
            costs.costsPer_kWh,
            costs.buy_ct,
            costs.income_r * 0.01,
            costs.writingPeriod_y,
            costs.additionalCosts_cty,
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
                <CostSection onCostChange={handleCostChange} />

                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
