import {FunctionComponent, useState} from "react"
import {HeatStorage, Pilot} from "local4local"
import {HeatStorageDisplay} from "./heat-storage-display.tsx";
import {HeatStorageForm} from "./heat-storage-form.tsx"

export const HeatStoragesDisplayEdit: FunctionComponent<{
    pilot: Pilot,
    onChange: (pilot: Pilot) => void,
}> = ({pilot, onChange}) => {
    const [selected, setSelected] = useState<HeatStorage | null>(null);

    return (
        <>
            {pilot.heatStorages.asJsReadonlyArrayView().map((it, i) =>
                selected == it ? (
                    <HeatStorageForm
                        key={"HeatStorage_" + i}
                        save={(asset: HeatStorage) => {
                            onChange(pilot.replaceAsset(asset, i))
                            setSelected(null);
                        }}
                        hide={() => {
                            setSelected(null);
                        }}
                        initialData={selected}
                    />
                ) : (
                    <HeatStorageDisplay
                        key={"HeatStorage_" + i}
                        heatStorage={it}
                        onEdit={() => { setSelected(it)}}
                        toDelete={() => onChange(pilot.remove(it))}
                    />
                )
            )}
        </>
    )
}
