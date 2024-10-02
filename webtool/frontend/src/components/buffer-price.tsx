import {FormEvent, FunctionComponent} from "react"
import {Flex, Button, Card, DataList, Heading} from "@radix-ui/themes"
import { PiMoneyWavyLight } from "react-icons/pi"
import {CardMenu} from "./card-menu.tsx"

export const BufferPriceDisplay: FunctionComponent<{
    bufferPrice_eurpkWh: Number,
    toDelete: () => void,
}> = ({bufferPrice_eurpkWh, toDelete}) => {
    return (
        <Card>
            <Flex className="head-title">
                <BufferPriceHeading />
                <CardMenu onDelete={toDelete}/>
            </Flex>
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Bufferprijs [€/kWh]</DataList.Label>
                    <DataList.Value>{bufferPrice_eurpkWh.toString()}</DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </Card>
    )
}

const BufferPriceHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <PiMoneyWavyLight />
        &nbsp;
        Bufferprijs
    </Heading>
)

export const BufferPriceForm: FunctionComponent<{
    initialData?: number | null; 
    saveBufferPrice: (bufferPrice_eurpkWh: number) => void
    hide: () => void
}> = ({initialData, saveBufferPrice, hide}) => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        const bufferPrice = parseFloat(formData.get("bufferPrice_eurpkWh") as string) || 0
        saveBufferPrice(bufferPrice)
        hide()
    }

    return (
        <Card className="form-box">
            <BufferPriceHeading/>
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="bufferPrice_eurpkWh">Bufferprijs [€/kWh]</label>
                    <input className="form-input" type="number" id="bufferPrice_eurpkWh" name="bufferPrice_eurpkWh" placeholder="€/kWh" required defaultValue={initialData ? initialData : 0.0 } min={0} step={0.001}/>
                </div>
                <Button onClick={hide} style={{ marginRight: '10px' }} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
