import {LabelWithInfo} from "../info/label-with-info.tsx"
import {titles} from "../info/titles.tsx"
import {ComponentProps, FunctionComponent} from "react"

export const SdeAanvraagBedragFormRow: FunctionComponent<ComponentProps<"input">> = (props) => (
    <div className="radix-grid">
        <LabelWithInfo data={titles["sdeAanvraagbedrag_eurpkWh"]} />
        <input className="form-input" type="number" id="sdeAanvraagbedrag_eurpkWh"
               name="sdeAanvraagbedrag_eurpkWh"
               min={0} step={0.001}
               placeholder="€/kWh"
               defaultValue={0.10}
                {...props}
        />
    </div>
)

export const SdeBasisenergiePrijsFormRow: FunctionComponent<ComponentProps<"input">> = (props) => (
    <div className="radix-grid">
        <LabelWithInfo data={titles["sdeBasisenergieprijs_eurpkWh"]} />
        <input className="form-input" type="number" id="sdeBasisenergieprijs_eurpkWh"
               name="sdeBasisenergieprijs_eurpkWh"
               min={0} step={0.001}
               placeholder="€/kWh"
               defaultValue={0.04}
               {...props}
        />
    </div>
)
