import {ComponentProps, FunctionComponent} from "react"
import {NavLink} from "react-router"
import {FaArrowRight} from "react-icons/fa6"
import {BigButton} from "./BigButton.tsx"
import {local4localDarkOrange} from "../../colors.ts"

export const StartButton: FunctionComponent<ComponentProps<typeof BigButton>> = ({...props}) => (
    <BigButton
        asChild
        style={{
            backgroundColor: local4localDarkOrange,
        }}
        {...props}
    >
        <NavLink to="/rekentool">
            Start <FaArrowRight />
        </NavLink>
    </BigButton>
)
