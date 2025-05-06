import {Link, } from "@radix-ui/themes"
import {ComponentProps, FunctionComponent} from "react"
import {ExternalLinkIcon} from "@radix-ui/react-icons"

export const ExternalLink: FunctionComponent<ComponentProps<typeof Link>> = ({children, ...props}) => (
    <Link style={{
        display: "inline-flex",
        alignItems: "center",
        ...props.style,
    }} {...props}>
        {children}
        &nbsp;
        <ExternalLinkIcon />
    </Link>
)
