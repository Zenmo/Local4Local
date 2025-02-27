import {EventHandler, FunctionComponent, SyntheticEvent} from "react"
import {Button, Dialog, Flex, Text, TextField} from "@radix-ui/themes"

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
                <TextField.Root name="scenarioDescription" placeholder="Omschrijving scenario" />
            </label>
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                    Uw e-mailadres
                </Text>
                <TextField.Root name="email" type="email" placeholder="E-mailadres" />
            </label>
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                    Uw naam
                </Text>
                <TextField.Root name="personName" placeholder="Uw naam" />
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
                <Button variant="soft" color="gray">
                    Annuleren
                </Button>
            </Dialog.Close>
            <Button name="action" value="send">Opsturen</Button>
            <Button name="action" value="preview">Bericht bekijken</Button>
        </Flex>
    </form>
)
