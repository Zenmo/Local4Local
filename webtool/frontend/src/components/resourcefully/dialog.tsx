import {Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes"
import {EventHandler, FunctionComponent, SyntheticEvent} from "react"
import {Pilot} from "local4local"
import Animation = AnyLogicCloudClient.Animation
import {ResourcefullyExport, ExportMetadata} from "local4local"
import {createDeeplink} from "../deeplink.ts"

function createExportObject(submitEvent: ReactSubmitEvent, pilot: Pilot): ResourcefullyExport {
    const form = new FormData(submitEvent.currentTarget)
    const exportMetadata = new ExportMetadata(
        form.get("scenarioDescription") as string,
        form.get("personName") as string,
        form.get("organizationName") as string,
        form.get("email")  as string,
    );

    return ResourcefullyExport.create(pilot, exportMetadata, createDeeplink(pilot))
}

type ReactSubmitEvent = SyntheticEvent<HTMLFormElement, SubmitEvent>
type SubmitEventHandeler = EventHandler<ReactSubmitEvent>

export const ResourcefullyDialog: FunctionComponent<{
    anyLogicAnimation?: Animation,
    pilot: Pilot,
}> = ({pilot}) => {
    const onSubmit: SubmitEventHandeler = (submitEvent) => {
        submitEvent.preventDefault()
        const resourceFullyExport = createExportObject(submitEvent, pilot)

        const action = (submitEvent.nativeEvent.submitter as HTMLButtonElement).value
        if (action === "preview") {
            const x = window.open() as Window
            x.document.open();
            x.document.write('<html><body><pre>' + resourceFullyExport.toJson() + '</pre></body></html>');
            x.document.close();
        } else {
            // TODO submit to backend
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Extra analyse</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="35rem" aria-describedby={undefined}>
                <Dialog.Title>Analyse door resourcefully</Dialog.Title>

                <p>Resourcefully voert onder andere een sensitivity analyse uit.</p>
                <p>U ontvangt direct een ontvangstbevestiging per e-mail.</p>

                <form onSubmit={onSubmit}>
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
            </Dialog.Content>
        </Dialog.Root>
    )
}
