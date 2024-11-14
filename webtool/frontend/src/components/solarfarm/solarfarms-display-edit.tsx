import {FunctionComponent, useState} from "react"
import {SolarFarm, Pilot} from "local4local"
import {SolarFarmDisplay} from "./solarfarm-display.tsx";
import {SolarFarmForm} from "./solarfarm-form.tsx"

export const SolarFarmsDisplayEdit: FunctionComponent<{
    pilot: Pilot,
    onChange: (pilot: Pilot) => void,
}> = ({pilot, onChange}) => {
    const [selected, setSelected] = useState<SolarFarm | null>(null);

    return (
        <>
            {pilot.solarFarms.asJsReadonlyArrayView().map((it, i) =>
                selected == it ? (
                    <SolarFarmForm
                        key={"SolarFarm_" + i}
                        save={(asset: SolarFarm) => {
                            onChange(pilot.replaceAsset(asset, i))
                            setSelected(null);
                        }}
                        hide={() => {
                            setSelected(null);
                        }}
                        initialData={selected}
                    />
                ) : (
                    <SolarFarmDisplay
                        key={"SolarFarm_" + i}
                        solarFarm={it}
                        onEdit={() => { setSelected(it)}}
                        toDelete={() => onChange(pilot.remove(it))}
                    />
                )
            )}
        </>
    )
}
