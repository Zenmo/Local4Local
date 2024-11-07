import {Configure} from "./configure.tsx"
import {FunctionComponent, useEffect, useState} from "react"
import {savePilot} from "../services/save.ts"
import {startSimulation} from "../services/anylogic.ts"
import {HouseholdGroup, Pilot} from "local4local"
import {Simulate} from "./simulate.tsx"
import {EmotionProps} from "../services/types"
import {Intro} from "./intro.tsx";
import {Button} from "@radix-ui/themes";

export const MainContent: FunctionComponent<EmotionProps> = () => {
    const [pilot, setPilot] = useState(new Pilot("Pilot"))
    const [showConfigSimulate, setShowConfigSimulate] = useState(false);
    const [showSimulation, setShowSimulation] = useState(false);

    const onChange = async (pilot: Pilot) => {
        setPilot(pilot)
        setShowSimulation(false)
    }

    useEffect(() => {
        // Set Default HouseholdGroup, minimum required to get run the simulation
        const defaultHouseholdGroup = new HouseholdGroup("Huishoudens", 200, 0.2, 0.1, 0.2, 0.0, 3000);
        setPilot(pilot.create(defaultHouseholdGroup))
        localStorage.setItem('dataLoaded', 'true'); // Mark as loaded
    }, []);

    const onClickStart = async (anylogicElementId: string) => {
        const sessionId = await savePilot(pilot)
        startSimulation(anylogicElementId, sessionId)
        setShowSimulation(true)
    }

    return (
        <>
            {showConfigSimulate ?
                <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                    <div style={{width: "30%", padding: "1rem", borderRight: "1px solid #ccc"}}>
                        <Configure
                            pilot={pilot}
                            onChange={onChange}
                        />
                    </div>
                    <div style={{width: "80%", padding: "1rem"}}>
                        <Simulate
                            showSimulation={showSimulation}
                            onClickStart={onClickStart}
                        />
                    </div>
                </div>
                :
                <div style={{justifyItems: "center"}}>
                    <Intro/>
                    <Button type="button" onClick={() => setShowConfigSimulate(true)}>
                        Start
                    </Button>
                </div>
            }
        </>
    );
}