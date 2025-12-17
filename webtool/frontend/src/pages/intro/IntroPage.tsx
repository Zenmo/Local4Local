import {ComponentProps, FunctionComponent} from "react"
import {IntroText} from "./components/IntroText.tsx"
import {UnderDevelopmentNotice} from "./components/UnderDevelopmentNotice.tsx"
import {StartButton} from "./components/StartButton.tsx"

export const IntroPage: FunctionComponent<ComponentProps<"div">> = (props) => {
    // Deeplinks used to refer to the main page.
    // This redirects them to the appropriate page.
    if (window.location.search.includes("pilot")) {
        window.location.pathname = "/rekentool"
    }

    return (
        <div style={{
            // properties as child
            margin: "1rem",
            marginBottom: "2rem",
            // properties as parent
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
        }} {...props}>
            <IntroText/>
            <UnderDevelopmentNotice/>
            <StartButton/>
        </div>
    )
}
