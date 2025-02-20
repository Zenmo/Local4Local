import {FunctionComponent, useState} from "react"
import {HouseholdGroup, Pilot} from "local4local"
import {HouseholdDisplay} from "./household-display.tsx";
import {HouseholdForm} from "./household-form.tsx"

export const HouseholdsDisplayEdit: FunctionComponent<{
    pilot: Pilot,
    onChange: (pilot: Pilot) => void,
}> = ({pilot, onChange}) => {
    const [selectedHouseholdGroup, setSelectedHouseholdGroup] = useState<HouseholdGroup | null>(null);
    return (
        <>
            {pilot.householdGroups.asJsReadonlyArrayView().map((it, i) =>
            selectedHouseholdGroup == it ? (
                <HouseholdForm
                    key={"householdGroup_" + i}
                    save={(asset: HouseholdGroup) => {
                        onChange(pilot.replaceHouseholdGroup(asset, i))
                        setSelectedHouseholdGroup(null);
                    }}
                    hide={() => {
                        setSelectedHouseholdGroup(null);
                    }}
                    initialData={selectedHouseholdGroup}
                />
            ) : (
                <HouseholdDisplay
                    key={"householdGroup_" + i}
                    householdGroup={it}
                    onEdit={() => { setSelectedHouseholdGroup(it)}}
                    toDelete={() => onChange(pilot.removeHouseholdGroup(it))}
                />
            )
        )}
        </>
    )
}
