import {ComponentProps, FunctionComponent} from "react"
import {NavLink} from "react-router"
import {VideoIcon} from "@radix-ui/react-icons"
import {BigButton} from "../../../shared-components/buttons/BigButton.tsx"

export const VideoTutorialButton: FunctionComponent<ComponentProps<typeof BigButton>> = ({...props}) => (
    <BigButton
        asChild
        {...props}
    >
        <NavLink to="/video-tutorial">
            <VideoIcon width="2rem" height="2rem" />
            Videotutorial
        </NavLink>
    </BigButton>
)
