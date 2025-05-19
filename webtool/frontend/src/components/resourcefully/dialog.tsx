import { Dialog} from "@radix-ui/themes"
import {FunctionComponent} from "react"
import Animation = AnyLogicCloudClient.Animation

import {ResourcefullyDialogContent} from "./content.tsx"
import {Local4LocalButton} from "../Local4LocalButton.tsx"
import {local4localLightGreen} from "../../colors.ts"
import {PilotState} from "../../services/use-pilot.ts"

const Button: FunctionComponent = () => (
    <Local4LocalButton
        style={{
            height: "unset",
            fontSize: "1.3rem",
            padding: "1.7rem 3rem",
            margin: "0 4rem",
            backgroundColor: local4localLightGreen,
            alignSelf: "center",
            color: "black",
            zIndex: 99,
        }}
    >
        Ga naar gevoeligheidsanalyse ➔
    </Local4LocalButton>
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
