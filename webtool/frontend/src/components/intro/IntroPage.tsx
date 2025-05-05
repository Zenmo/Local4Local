import {FunctionComponent, ComponentProps} from "react"
import {IntroText} from "./IntroText.tsx"
import {NavLink} from "react-router"
import {Button} from "@radix-ui/themes"
import {UnderDevelopmentNotice} from "./UnderDevelopmentNotice.tsx"

export const IntroPage: FunctionComponent<ComponentProps<"div">> = ({...props}) => (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "1rem",
    }} {...props}>
        <UnderDevelopmentNotice />
        <IntroText />
        <Button asChild style={{marginTop: "1rem"}}>
            <NavLink to="/rekentool">
                Start
            </NavLink>
        </Button>
    </div>
)
