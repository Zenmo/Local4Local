import {RadioGroup} from "@radix-ui/themes"
import {WindFarmLocation} from "local4local"
import {FunctionComponent} from "react"

export const LocationRadioButtons: FunctionComponent<{
    initialValue?: WindFarmLocation
}> = ({initialValue}) => {
    return (
        <RadioGroup.Root name="location" defaultValue={initialValue?.name}>
            {WindFarmLocation.values().map(location => (
                <label style={{display: "block"}} key={location.name}>
                    <input type="radio" name="location" value={location.name} defaultChecked={initialValue === location} />
                    {location.displayName}
                </label>
            ))}
        </RadioGroup.Root>
    )
}
