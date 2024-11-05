import {Configure} from "./configure.tsx"
import {FunctionComponent, useState} from "react"
import {savePilot} from "../services/save.ts"
import {startSimulation} from "../services/anylogic.ts"
import {Pilot} from "local4local"
import {Simulate} from "./simulate.tsx"
import {EmotionProps} from "../services/types"

export const MainContent: FunctionComponent<EmotionProps> = () => {
    const [pilot, setPilot] = useState(new Pilot("Pilot"))

    const onChange = async (pilot: Pilot) => {
        setPilot(pilot)
        setShowSimulateInfo(false)
    }

    const onClickStart = async (anylogicElementId: string) => {
        const sessionId = await savePilot(pilot)
        startSimulation(anylogicElementId, sessionId)
        setShowSimulateInfo(true)
    }

    const [showSimulateInfo, setShowSimulateInfo] = useState(false);

    return (
        <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
            {/* Configureer Section */}
            <div style={{width: "30%", padding: "1rem", borderRight: "1px solid #ccc"}}>
                <Configure
                    pilot={pilot}
                    onChange={onChange}
                    onClickStart={onClickStart}
                />
            </div>

            {/* Simuleer Section */}
            <div style={{width: "80%", padding: "1rem"}}>
                <Simulate showInfo={showSimulateInfo}/>
            </div>
        </div>
    );
}