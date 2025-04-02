import {Button} from "@radix-ui/themes"
import {FunctionComponent, ComponentProps} from "react"
import {IntroText} from "./IntroText.tsx"

export const IntroPage: FunctionComponent<{
    onClickStart: () => void
} & ComponentProps<"div">> = ({onClickStart, ...props}) => (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "1rem",
        maxWidth: "50rem"
    }} {...props}>
        <IntroText style={{marginBottom: "1rem"}}/>
        <Button type="button" onClick={onClickStart}>
            Start
        </Button>
    </div>
)
