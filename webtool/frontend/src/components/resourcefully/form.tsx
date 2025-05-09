import {EventHandler, FunctionComponent, SyntheticEvent} from "react"
import {Dialog, Flex, Text, TextField} from "@radix-ui/themes"
import {Local4LocalButton} from "../Local4LocalButton.tsx"
import {local4localDarkOrange, local4localLightBlue, local4localLightOrange} from "../../colors.ts"

export type ReactSubmitEvent = SyntheticEvent<HTMLFormElement, SubmitEvent>
export type SubmitEventHandeler = EventHandler<ReactSubmitEvent>

export const ResourcefullyForm: FunctionComponent<{onSubmit: SubmitEventHandeler}> = ({onSubmit}) => (
    <form onSubmit={onSubmit}>
        <p>Resourcefully voert onder andere een sensitivity analyse uit.</p>
        <p>U ontvangt direct een ontvangstbevestiging per e-mail.</p>
        <Flex direction="column" gap="3">
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                    Omschrijving scenario
                </Text>
                <TextField.Root name="scenarioDescription" placeholder="Omschrijving scenario" required />
            </label>
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                    Uw e-mailadres
                </Text>
                <TextField.Root name="email" type="email" placeholder="E-mailadres" required />
            </label>
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                    Uw naam
                </Text>
                <TextField.Root name="personName" placeholder="Uw naam" required />
            </label>
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                    Organisatie
                </Text>
                <TextField.Root name="organizationName" placeholder="Organisatie" />
            </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
                <Local4LocalButton style={{backgroundColor: local4localLightOrange}}>
                    Annuleren
                </Local4LocalButton>
            </Dialog.Close>
            <Local4LocalButton name="action" value="preview" style={{backgroundColor: local4localLightBlue}}>Bericht bekijken</Local4LocalButton>
            <Local4LocalButton name="action" value="send" style={{backgroundColor: local4localDarkOrange}}>Opsturen</Local4LocalButton>
        </Flex>
    </form>
)
