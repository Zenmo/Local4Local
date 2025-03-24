import {RadioGroup} from "@radix-ui/themes"
import {PPAType} from "local4local"
import {FunctionComponent} from "react"

export const PPARadios: FunctionComponent<{
    initialValue?: PPAType
    onChange: (ppaType: PPAType) => void
}> = ({
    initialValue,
    onChange,
}) => {
    return (
        <RadioGroup.Root name="location" defaultValue={initialValue?.name} style={{paddingBottom: ".3rem"}}>
            {PPAType.values().map(ppaType => (
                <label style={{display: "block"}} key={ppaType.name}>
                    <input type="radio" name="ppaType" value={ppaType.name} defaultChecked={initialValue === ppaType} onChange={
                        event => {
                            if (event.target.checked) {
                                onChange(ppaType)
                            }
                        }
                    }/>
                    {ppaType.displayName}
                </label>
            ))}
        </RadioGroup.Root>
    )
}
