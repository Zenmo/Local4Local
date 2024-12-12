import {Configure} from "./configure.tsx"
import {FunctionComponent, useState} from "react"
import {savePilot} from "../services/save.ts"
import {startSimulation} from "../services/anylogic.ts"
import {Pilot} from "local4local"
import {Simulate} from "./simulate.tsx"
import {EmotionProps} from "../services/types"
import {Intro} from "./intro.tsx";
import {Button} from "@radix-ui/themes";
import {intializePilotFromDeeplink} from "./deeplink.ts"

export const MainContent: FunctionComponent<EmotionProps> = ({css, className}) => {
    const [pilot, setPilot] = useState(intializePilotFromDeeplink)
    const [showConfigSimulate, setShowConfigSimulate] = useState(false);
    const [showSimulation, setShowSimulation] = useState(false);

    const onChange = async (pilot: Pilot) => {
        setPilot(pilot)
        setShowSimulation(false)
    }

    const onClickStart = async (anylogicElementId: string) => {
        const sessionId = await savePilot(pilot)
        startSimulation(anylogicElementId, sessionId)
        setShowSimulation(true)
    }

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
