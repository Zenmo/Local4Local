import {FunctionComponent} from "react"
import {IntroText} from "./components/IntroText.tsx"
import {UnderDevelopmentNotice} from "./components/UnderDevelopmentNotice.tsx"
import {StartButton} from "../../shared-components/buttons/StartButton.tsx"
import { Layout } from "../../layout/Layout.tsx"
import {VideoTutorialButton} from "./components/VideoTutorialButton.tsx"

export const IntroPage: FunctionComponent = () => {
    // Deeplinks used to refer to the main page.
    // This redirects them to the appropriate page.
    if (window.location.search.includes("pilot")) {
        window.location.pathname = "/rekentool"
    }

    return (
        <Layout>
            <div style={{
                // properties as child
                margin: "1rem",
                marginBottom: "2rem",
                // properties as parent
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
            }}>
                <IntroText/>
                <UnderDevelopmentNotice/>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "2rem",
                }}>
                    <VideoTutorialButton />
                    <StartButton/>
                </div>
            </div>
        </Layout>
    )
}
