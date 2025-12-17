import {ComponentProps, FunctionComponent} from "react"
import {NavLink} from "react-router"
import {FaArrowRight} from "react-icons/fa6"
import {BigButton} from "./BigButton.tsx"

export const StartButton: FunctionComponent<ComponentProps<typeof BigButton>> = ({...props}) => (
    <BigButton
        asChild
        {...props}
    >
        <NavLink to="/rekentool">
            Start <FaArrowRight />
        </NavLink>
    </BigButton>
)
