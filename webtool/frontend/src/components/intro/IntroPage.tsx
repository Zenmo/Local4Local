import {FunctionComponent, ComponentProps} from "react"
import {IntroText} from "./IntroText.tsx"
import {UnderDevelopmentNotice} from "./UnderDevelopmentNotice.tsx"
import {StartButton} from "./StartButton.tsx"
import {Flex} from "@radix-ui/themes"

export const IntroPage: FunctionComponent<ComponentProps<"div">> = (props) => (
    <div style={{
        // properties as child
        margin: "1rem",
        marginBottom: "2rem",
        // properties as parent
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }} {...props}>
        <UnderDevelopmentNotice />
        <Flex direction={{initial: "column", md: "row"}}>
            <IntroText />
            <StartButton />
        </Flex>
    </div>
)
