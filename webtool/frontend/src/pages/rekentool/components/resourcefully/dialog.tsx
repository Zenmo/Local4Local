import { Dialog} from "@radix-ui/themes"
import {FunctionComponent} from "react"
import Animation = AnyLogicCloudClient.Animation

import {ResourcefullyDialogContent} from "./content.tsx"
import {PilotState} from "../../services/use-pilot.ts"
import {FaArrowRight} from "react-icons/fa6"
import {BigButton} from "../../../../shared-components/buttons/BigButton.tsx"

const Button: FunctionComponent = () => (
    <BigButton style={{zIndex: 99}}>
        Gevoeligheidsanalyse <FaArrowRight />
    </BigButton>
)

export const ResourcefullyDialog: FunctionComponent<{
    anyLogicAnimation: Animation,
    pilotState: PilotState,
}> = ({pilotState, anyLogicAnimation}) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: ".5rem",
                }}>
                    <Button />
                </div>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="35rem" aria-describedby={undefined}>
                <Dialog.Title>Analyse door Resourcefully</Dialog.Title>

                <ResourcefullyDialogContent
                    pilotState={pilotState}
                    anyLogicAnimation={anyLogicAnimation} />
            </Dialog.Content>
        </Dialog.Root>
    )
}
