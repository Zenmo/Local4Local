import {FormEvent, FunctionComponent} from "react"
import {Button, Card, DataList, Heading} from "@radix-ui/themes"
import { PiMoneyWavyLight } from "react-icons/pi"

export const BufferPriceDisplay: FunctionComponent<{ bufferPrice_EurpkWh: Number }> = ({bufferPrice_EurpkWh}) => {
    return (
        <Card>
            <BufferPriceHeading />
            <DataList.Root>
                <DataList.Item>
                    <DataList.Label minWidth="88px">Buffer Price [€/kWh]</DataList.Label>
                    <DataList.Value>{bufferPrice_EurpkWh.toString()}</DataList.Value>
                </DataList.Item>
            </DataList.Root>
        </Card>
    )
}

const BufferPriceHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <PiMoneyWavyLight />
        &nbsp;
        Buffer Price
    </Heading>
)

export const BufferPriceForm: FunctionComponent<{
    saveBufferPrice: (bufferPrice_EurpkWh: string) => void
    hide: () => void
}> = ({saveBufferPrice, hide}) => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        const solarFarm = formData.get("bufferPrice_EurpkWh") as string
        saveBufferPrice(solarFarm)
        hide()
    }

    return (
        <Card className="form-box">
            <BufferPriceHeading/>
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="bufferPrice_EurpkWh">Onderhoudskosten [€/kWh]</label>
                    <input className="form-input" type="number" id="bufferPrice_EurpkWh" name="bufferPrice_EurpkWh" defaultValue={1000}/>
                </div>

                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
