import {FunctionComponent} from "react"
import {anylogicElementId} from "../RekentoolPage.tsx"
import {css} from "@emotion/react"
import {useIsDevMode} from "../../../shared-components/devmode/DevMode.ts"

const hideControls = css({
    "#control-panel, #control-panel-progress": {
        display: "none",
    }
})

export const Simulate: FunctionComponent = () => {
    let extraStyles = hideControls
    if (useIsDevMode()) {
        extraStyles = css({})
    }

    return (
        <div id={anylogicElementId} style={{
            width: "100%",
            aspectRatio: "16/9",
            // anylogic uses absolute positioning.
            // this makes it relative to this parent element
            position: "relative",
            marginBottom: "-3rem",
        }} css={extraStyles}/>
    )
}
