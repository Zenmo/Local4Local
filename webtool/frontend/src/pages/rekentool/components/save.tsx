import {BookmarkIcon, CopyIcon} from "@radix-ui/react-icons"
import {Flex, Link, Popover} from "@radix-ui/themes"
import {Pilot} from "local4local"
import {FunctionComponent} from "react"
// @ts-expect-error no typings in library
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {createDeeplink} from "./deeplink.ts"
import {local4localDarkOrange, local4localLightBlue} from "../../../colors.ts"
import {Local4LocalButton} from "../../../shared-components/buttons/Local4LocalButton.tsx"

export const SaveButton: FunctionComponent<{pilot: Pilot}> = ({pilot}) => {
    const deeplinkUrl = createDeeplink(pilot)

    return (
        <Popover.Root>
            <Popover.Trigger>
                <Local4LocalButton style={{backgroundColor: local4localLightBlue}}>
                    <BookmarkIcon style={{ width: "1.2rem", height: "1.2rem" }} />
                    Bewaren
                </Local4LocalButton>
            </Popover.Trigger>
            <Popover.Content>
                <Flex>
                    <Link style={{wordBreak: "break-all", fontSize: ".75rem"}} href={deeplinkUrl}>{deeplinkUrl}</Link>
                    <CopyToClipboard text={deeplinkUrl}>
                        <Local4LocalButton style={{backgroundColor: local4localDarkOrange}}>
                            <CopyIcon />
                        </Local4LocalButton>
                    </CopyToClipboard>
                </Flex>
            </Popover.Content>
        </Popover.Root>
    )
}
