import {FormEvent, FunctionComponent} from "react"
import {Button, Card, DataList, Flex, Heading} from "@radix-ui/themes"
import {CardMenu} from "./card-menu.tsx"
import {SupplierCost} from "local4local"
import {PiMoneyWavyLight} from "react-icons/pi"

export const SupplierCostDisplay: FunctionComponent<{
    supplierCost: SupplierCost,
    onEdit: () => void,
}> = ({supplierCost, onEdit}) => {
    return (
        <Card>
            <Flex className="head-title">
                <SupplierCostHeading />
                <CardMenu onEdit={onEdit}/>
            </Flex>
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Leveranciersopslag [€/kWh]</DataList.Label>
                    <DataList.Value>{supplierCost.bufferPrice_eurpkWh.toString()}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Opslag onbalans</DataList.Label>
                    <DataList.Value>{supplierCost.onbalansMarkup_r * 100} %</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Terugleververgoeding [€/kWh]</DataList.Label>
                    <DataList.Value>{supplierCost.feedInCompensation_eurpkWh.toString()}</DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </Card>
    )
}

const SupplierCostHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <PiMoneyWavyLight />
        &nbsp;
        Leverancierskosten
    </Heading>
)

export const SupplierCostForm: FunctionComponent<{
    initialData: SupplierCost;
    save: (supplierCost: SupplierCost) => void
    hide: () => void
}> = ({initialData, save, hide}) => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        const supplierCost = new SupplierCost(
            parseFloat(formData.get("bufferPrice_eurpkWh") as string) || 0,
            parseFloat(formData.get("onbalansMarkup_r") as string) * 0.01 || 0,
            parseFloat(formData.get("feedInCompensation_eurpkWh") as string) || 0,
        )
        save(supplierCost)
        hide()
    }

    return (
        <Card className="form-box">
            <SupplierCostHeading/>
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="bufferPrice_eurpkWh">Leveranciersopslag [€/kWh]</label>
                    <input className="form-input"
                           type="number"
                           id="bufferPrice_eurpkWh"
                           name="bufferPrice_eurpkWh"
                           placeholder="€/kWh"
                           required
                           defaultValue={initialData.bufferPrice_eurpkWh}
                           min={0}
                           step={0.001}/>
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="onbalansMarkup_r">Opslag onbalans [%]</label>
                    <input className="form-input"
                           type="number"
                           id="onbalansMarkup_r"
                           name="onbalansMarkup_r"
                           placeholder="%"
                           required
                           defaultValue={initialData.onbalansMarkup_r * 100}
                           min={0}
                           step={0.1}/>
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="feedInCompensation_eurpkWh">Terugleververgoeding [€/kWh]</label>
                    <input className="form-input"
                           type="number"
                           id="feedInCompensation_eurpkWh"
                           name="feedInCompensation_eurpkWh"
                           placeholder="€/kWh"
                           required
                           defaultValue={initialData.feedInCompensation_eurpkWh}
                           min={0}
                           step={0.001}/>
                </div>
                <Button onClick={hide} style={{marginRight: '10px'}} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
