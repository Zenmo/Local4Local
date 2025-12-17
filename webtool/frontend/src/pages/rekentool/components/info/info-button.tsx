import {FunctionComponent, ReactNode} from "react"
import {IconButton, Popover, Text} from "@radix-ui/themes"
import {InfoCircledIcon} from "@radix-ui/react-icons"

export const InfoButton: FunctionComponent<{
    content: ReactNode,
}> = ({content}) => (
    <Popover.Root>
        <Popover.Trigger>
            <IconButton variant="ghost" size="1" color="gray">
                <InfoCircledIcon />
            </IconButton>
        </Popover.Trigger>
        <Popover.Content maxWidth="calc(min(100vw, 30rem))">
            <Text>
                {content}
            </Text>
        </Popover.Content>
    </Popover.Root>
)
