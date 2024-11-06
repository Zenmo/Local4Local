import {Tabs} from '@radix-ui/themes';
import {Configure} from "./configure.tsx"
import {FunctionComponent, useEffect, useState} from "react"
import {savePilot} from "../services/save.ts"
import {startSimulation} from "../services/anylogic.ts"
import {HouseholdGroup, Pilot} from "local4local"
import {Simulate} from "./simulate.tsx"
import {EmotionProps} from "../services/types"
import {Intro} from "./intro.tsx"

export const MainContent: FunctionComponent<EmotionProps> = ({className}) => {
    const [pilot, setPilot] = useState(new Pilot("Pilot"))

    useEffect(() => {
        // Set Default HouseholdGroup, minimum required to get run the simulation
        const defaultHouseholdGroup = new HouseholdGroup("Huishoudens", 100, 0.0, 0.0, 0.0, 0.0, 0);
        setPilot(pilot.create(defaultHouseholdGroup))
        localStorage.setItem('dataLoaded', 'true'); // Mark as loaded
    }, []);

    const onClickStart = async (anylogicElementId: string) => {
        const sessionId = await savePilot(pilot)
        startSimulation(anylogicElementId, sessionId)
    }

    const initialTab = "Introductie"
    const [activeTab, setActiveTab] = useState(initialTab)

    return (
        <div className={className} css={{
            margin: "0 auto",
        }}>
            <Tabs.Root defaultValue={initialTab} onValueChange={setActiveTab}>
                <Tabs.List className="TabsList" aria-label="Stappen" justify="center">
                    <Tabs.Trigger value="Introductie">
                        1. Introductie
                    </Tabs.Trigger>
                    <Tabs.Trigger value="Configureer">
                        2. Configureer
                    </Tabs.Trigger>
                    <Tabs.Trigger value="Simuleer">
                        3. Simuleer
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="Introductie" css={{
                    maxWidth: "40rem",
                }}>
                    <Intro />
                </Tabs.Content>
                <Tabs.Content value="Configureer">
                    <Configure pilot={pilot} setPilot={setPilot}/>
                </Tabs.Content>
                <Tabs.Content value="Simuleer" css={{
                    width: "100vw",
                    maxWidth: "70rem",
                }} forceMount hidden={activeTab !== "Simuleer"}>
                    <Simulate onClickStart={onClickStart} />
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}