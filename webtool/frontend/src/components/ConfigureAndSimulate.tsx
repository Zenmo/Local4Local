import {Configure} from "./configure.tsx"
import {ComponentProps, FunctionComponent, useState} from "react"
import {savePilot} from "../services/save.ts"
import {startSimulation} from "../services/anylogic.ts"
import {Pilot} from "local4local"
import {Simulate} from "./simulate.tsx"
import {intializePilotFromDeeplink} from "./deeplink.ts"
import {ResourcefullyDialog} from "./resourcefully/dialog.tsx"
import {useForceUpdate} from "../services/use-force-update.ts"
import {usePromiseValue} from "../services/use-promise-value.ts"
import {useOpenFormTracker} from "../services/open-form-tracker.ts"

export const ConfigureAndSimulate: FunctionComponent<ComponentProps<"div">> = (props) => {
    const [pilot, setPilot] = useState(intializePilotFromDeeplink)
    const [showSimulation, setShowSimulation] = useState(false)
    const [simulation, setSimulation] = useState<AnyLogicCloudClient.Animation>()

    // track which form is open
    const openFormTracker = useOpenFormTracker()

    // allows to sync the GUI after simulation changes
    const forceUpdate = useForceUpdate()

    const stopAnyLogicSession = () => {
        if (simulation) {
            simulation.stop()
        }
    }

    const onChange = async (pilot: Pilot) => {
        setPilot(pilot)
        stopAnyLogicSession()
        setShowSimulation(false)
    }

    const onClickStart = async (anylogicElementId: string) => {
        if (openFormTracker.isOpen) {
            alert("Sla eerst de wijzigingen op en start dan de simulatie")
        }

        stopAnyLogicSession()
        const sessionId = await savePilot(pilot)
        setShowSimulation(true)
        const simulation = await startSimulation(anylogicElementId, sessionId)
        setSimulation(simulation)
        await simulation.waitForCompletion()
        forceUpdate()
    }

    const showResourceFully = usePromiseValue(shouldShowResourcefully(simulation), false)

    return (
        <div style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            width: "100%",
        }} {...props}>
            <div style={{
                width: "30%",
                maxWidth: "25rem",
                padding: "1rem",
                borderRight: "1px solid #ccc",
            }}>
                <Configure
                    pilot={pilot}
                    onChange={onChange}
                />
            </div>
            <div style={{padding: 0, flexGrow: 1, position: "sticky", top: 0}}>
                <Simulate
                    showSimulation={showSimulation}
                    onClickStart={onClickStart}
                />
                {simulation && showResourceFully && <ResourcefullyDialog pilot={pilot} anyLogicAnimation={simulation} />}
            </div>
        </div>
    )
}

async function shouldShowResourcefully(simulation: AnyLogicCloudClient.Animation | undefined): Promise<boolean> {
    if (!new URLSearchParams(window.location.search).has("resourcefully-preview")) {
        return false
    }

    try {
        return await simulation?.getState() === "PAUSED"
    } catch {
        // simulation probably no longer exists serverside
        return false
    }
}
