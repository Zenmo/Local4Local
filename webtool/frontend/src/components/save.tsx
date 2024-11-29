import {BookmarkIcon, CopyIcon} from "@radix-ui/react-icons"
import {Button, Flex, Link, Popover} from "@radix-ui/themes"
import {Pilot} from "local4local"
import {FunctionComponent} from "react"
// @ts-expect-error no typings in library
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {createDeeplink} from "./deeplink.ts"

export const SaveButton: FunctionComponent<{pilot: Pilot}> = ({pilot}) => {
    const deeplinkUrl = createDeeplink(pilot)

    return (
        <Popover.Root>
            <Popover.Trigger>
                <Button>
                    <BookmarkIcon /> Bewaren
                </Button>
            </Popover.Trigger>
            <Popover.Content>
                <Flex>
                    <Link style={{wordBreak: "break-all", fontSize: ".75rem"}} href={deeplinkUrl}>{deeplinkUrl}</Link>
                    <CopyToClipboard text={deeplinkUrl}>
                        <Button variant="outline">
                            <CopyIcon />
                        </Button>
                    </CopyToClipboard>
                </Flex>
            </Popover.Content>
        </Popover.Root>
    )
}
