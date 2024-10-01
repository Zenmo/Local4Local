import {FormEvent, FunctionComponent} from "react"
import {Button, Card, DataList, Heading} from "@radix-ui/themes"
import { PiMoneyWavyLight } from "react-icons/pi"

export const BufferPriceDisplay: FunctionComponent<{ bufferPrice_eurpkWh: Number }> = ({bufferPrice_eurpkWh}) => {
    return (
        <Card>
            <BufferPriceHeading />
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
    saveBufferPrice: (bufferPrice_eurpkWh: number) => void
    hide: () => void
}> = ({saveBufferPrice, hide}) => {
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
                    <input className="form-input" type="number" id="bufferPrice_eurpkWh" name="bufferPrice_eurpkWh" placeholder="€/kWh" required min={0} step={0.001}/>
                </div>

                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
