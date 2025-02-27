import {Button, Dialog} from "@radix-ui/themes"
import {FunctionComponent} from "react"
import {Pilot} from "local4local"
import Animation = AnyLogicCloudClient.Animation

import {ResourcefullyDialogContent} from "./content.tsx"

export const ResourcefullyDialog: FunctionComponent<{
    anyLogicAnimation?: Animation,
    pilot: Pilot,
}> = ({pilot, anyLogicAnimation}) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Extra analyse</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="35rem" aria-describedby={undefined}>
                <Dialog.Title>Analyse door resourcefully</Dialog.Title>

                <ResourcefullyDialogContent pilot={pilot} anyLogicAnimation={anyLogicAnimation} />
            </Dialog.Content>
        </Dialog.Root>
    )
}
