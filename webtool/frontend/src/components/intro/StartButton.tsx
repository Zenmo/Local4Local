import {ComponentProps, FunctionComponent} from "react"
import {NavLink} from "react-router"
import {Button} from "@radix-ui/themes"
import {local4localLightGreen} from "../../colors.ts"
import {Local4LocalButton} from "../Local4LocalButton.tsx"

export const StartButton: FunctionComponent<ComponentProps<typeof Button>> = ({style, ...props}) => (
    <Local4LocalButton
        asChild
        style={{
            height: "unset",
            fontSize: "1.5rem",
            padding: "1.7rem 3rem",
            margin: "0 4rem",
            backgroundColor: local4localLightGreen,
            alignSelf: "center",
            color: "black",
            ...style,
        }}
        {...props}
    >
        <NavLink to="/rekentool">
            Start ➔
        </NavLink>
    </Local4LocalButton>
)
