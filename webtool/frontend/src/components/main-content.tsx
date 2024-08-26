import {Tabs} from '@radix-ui/themes';
import {ViewPilot} from "./view-pilot.tsx"
import {FunctionComponent, useState} from "react"
import {savePilot} from "../services/save.ts"
import {startSimulation} from "../services/anylogic.ts"
import {Pilot} from "local4local"
import {Simulate} from "./simulate.tsx"
import {EmotionProps} from "../services/types"

export const MainContent: FunctionComponent<EmotionProps> = ({className}) => {
    const [pilot, setPilot] = useState(new Pilot("Pilot"))

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
                <Tabs.Content value="Introductie" >
                    Introductie!!!!
                </Tabs.Content>
                <Tabs.Content value="Configureer">
                    <ViewPilot pilot={pilot} setPilot={setPilot}/>
                </Tabs.Content>
                <Tabs.Content value="Simuleer" css={{
                    width: "50rem",
                }} forceMount hidden={activeTab !== "Simuleer"}>
                    <Simulate onClickStart={onClickStart} />
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}