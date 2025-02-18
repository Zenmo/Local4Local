import {Configure} from "./configure.tsx"
import {FunctionComponent, useRef, useState} from "react"
import {savePilot} from "../services/save.ts"
import {startSimulation} from "../services/anylogic.ts"
import {Pilot} from "local4local"
import {Simulate} from "./simulate.tsx"
import {EmotionProps} from "../services/types"
import {Intro} from "./intro.tsx";
import {Button} from "@radix-ui/themes";
import {intializePilotFromDeeplink} from "./deeplink.ts"
import {ResourcefullyDialog} from "./resourcefully/dialog.tsx"

export const MainContent: FunctionComponent<EmotionProps> = ({css, className}) => {
    const [pilot, setPilot] = useState(intializePilotFromDeeplink)
    const [showConfigSimulate, setShowConfigSimulate] = useState(false);
    const [showSimulation, setShowSimulation] = useState(false);
    const simulationRef = useRef<AnyLogicCloudClient.Animation>(null)

    const stopAnyLogicSession = () => {
        if (simulationRef.current) {
            simulationRef.current.stop()
        }
    }

    const onChange = async (pilot: Pilot) => {
        setPilot(pilot)
        stopAnyLogicSession()
        setShowSimulation(false)
    }

    const onClickStart = async (anylogicElementId: string) => {
        stopAnyLogicSession()
        const sessionId = await savePilot(pilot)
        setShowSimulation(true)
        simulationRef.current = await startSimulation(anylogicElementId, sessionId)
    }

    // const onClickExport = async () => {
    //     const coopReport = await simulationRef.current.callFunction("experiment.root.f_getCoopReport", [])
    //     console.log(coopReport)
    // }

    const enableResourcefully = new URLSearchParams(window.location.search).has("resourcefully-preview");

    return (
        <>
            {showConfigSimulate ?
                <div style={{
                    display: "flex",
                    justifyContent: "start",
                    width: "100%",
                }} css={css} className={className}>
                    <div style={{maxWidth: "25rem", padding: "1rem", borderRight: "1px solid #ccc"}}>
                        <Configure
                            pilot={pilot}
                            onChange={onChange}
                        />
                    </div>
                    <div style={{padding: "0", flexGrow: "1"}}>
                        <Simulate
                            showSimulation={showSimulation}
                            onClickStart={onClickStart}
                        />
                        {enableResourcefully && <ResourcefullyDialog pilot={pilot} />}
                    </div>
                </div>
                :
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "1rem",
                    maxWidth: "50rem"
                }} css={css} className={className}>
                    <Intro style={{marginBottom: "1rem"}}/>
                    <Button type="button" onClick={() => setShowConfigSimulate(true)}>
                        Start
                    </Button>
                </div>
            }
        </>
    );
}
