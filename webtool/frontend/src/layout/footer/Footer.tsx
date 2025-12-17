import {css} from "@emotion/react"
import {ComponentProps, FunctionComponent} from "react"
import {GitLink} from "./GitLink.tsx"
import {DevModeButton} from "../../shared-components/devmode/DevModeButton.tsx"
import {ZenmoAttribution} from "./ZenmoAttribution.tsx"
import {DevModeControl} from "../../shared-components/devmode/DevMode.ts"

type FooterProps = {
    devModeControl: DevModeControl,
} & ComponentProps<"div">

export const Footer: FunctionComponent<FooterProps> = ({devModeControl, ...props}) => (
    <div css={css`
        padding: .5rem 1rem;
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 1.5rem;
    `} {...props}>
        <DevModeButton devModeControl={devModeControl} />
        <GitLink />
        <ZenmoAttribution />
    </div>
)
