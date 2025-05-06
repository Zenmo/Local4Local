import {FunctionComponent} from "react"
import {anylogicElementId} from "./ConfigureAndSimulate.tsx"

export const Simulate: FunctionComponent = () => {
    return (
        <div id={anylogicElementId} style={{
            width: "100%",
            aspectRatio: "8/5",
            // anylogic uses absolute positioning.
            // this makes it relative to this parent element
            position: "relative",
        }}/>
    )
}
