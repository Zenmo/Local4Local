import {FunctionComponent, PropsWithChildren} from "react"
import {Local4LocalButton} from "../Local4LocalButton.tsx"
import {Dialog, Flex} from "@radix-ui/themes"
import {local4localLightOrange} from "../../colors.ts"

export const DialogButtonRow: FunctionComponent<PropsWithChildren> = ({children}) => {
    return (
        <Flex gap="3" mt="4" justify="between">
            <Dialog.Close>
                <Local4LocalButton style={{backgroundColor: local4localLightOrange}}>
                    Annuleren
                </Local4LocalButton>
            </Dialog.Close>
            <Flex gap="3">
                {children}
            </Flex>
        </Flex>
    )
}