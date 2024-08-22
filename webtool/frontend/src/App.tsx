import {useState} from "react"
import viteLogo from "/vite.svg"
import {Pilot} from "local4local"
import {css} from "@emotion/react"
import {ViewPilot} from "./components/view-pilot.tsx"
import {startSimulation} from "./components/anylogic.ts"

function App() {
    const [pilot, setPilot] = useState(new Pilot("Pilot"))
    const anylogicElementId = "anylogic"

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} css={css`
                        height: 6em;
                        padding: 1.5em;
                        will-change: filter;
                        transition: filter 300ms;

                        &:hover {
                            filter: drop-shadow(0 0 2em #646cffaa);
                        }

                        &:hover {
                            filter: drop-shadow(0 0 2em #61dafbaa);
                        }
                    `} alt="Vite logo"/>
                </a>
            </div>
            <h1>Cooperatie Configurator</h1>
            <ViewPilot pilot={pilot} setPilot={setPilot}/>
            <button type="button" onClick={() => startSimulation(anylogicElementId)}>Start simulatie</button>
            <div id={anylogicElementId} style={{height: "600px"}}/>
        </>
    )
}

export default App
