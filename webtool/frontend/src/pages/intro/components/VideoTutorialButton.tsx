import {ComponentProps, FunctionComponent} from "react"
import {NavLink} from "react-router"
import {VideoIcon} from "@radix-ui/react-icons"
import {BigButton} from "../../../shared-components/buttons/BigButton.tsx"
import {local4localDarkBlue} from "../../../colors.ts"

export const VideoTutorialButton: FunctionComponent<ComponentProps<typeof BigButton>> = ({style, ...props}) => (
    <BigButton
        asChild
        {...props}
        style={{
            backgroundColor: local4localDarkBlue,
            ...style,
        }}
    >
        <NavLink to="/video-tutorial">
            <VideoIcon width="2rem" height="2rem" />
            Videotutorial
        </NavLink>
    </BigButton>
)
