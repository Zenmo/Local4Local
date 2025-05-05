import { Callout } from "@radix-ui/themes"
import {FunctionComponent} from "react"
import {InfoCircledIcon} from "@radix-ui/react-icons"

export const UnderDevelopmentNotice: FunctionComponent = () => (
    <Callout.Root color="blue" style={{maxWidth: "30rem"}}>
        <Callout.Icon>
            <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
            Deze tool is nog in ontwikkeling. Loop je tegen problemen aan of heb je feedback,
            laat het ons weten op <a href="mailto:info@zenmo.com">info@zenmo.com</a>
        </Callout.Text>
    </Callout.Root>
)
