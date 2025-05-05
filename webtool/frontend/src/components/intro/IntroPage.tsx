import {FunctionComponent, ComponentProps} from "react"
import {IntroText} from "./IntroText.tsx"
import {NavLink} from "react-router"
import {Button} from "@radix-ui/themes"

export const IntroPage: FunctionComponent<ComponentProps<"div">> = ({...props}) => (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "1rem",
        maxWidth: "50rem"
    }} {...props}>
        <IntroText style={{marginBottom: "1rem"}}/>
        <Button asChild>
            <NavLink to="/rekentool">
                Start
            </NavLink>
        </Button>
    </div>
)
