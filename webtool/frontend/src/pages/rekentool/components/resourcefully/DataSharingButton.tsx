import { Popover } from "@radix-ui/themes"
import {FunctionComponent} from "react"
import {Local4LocalButton} from "../../../../shared-components/buttons/Local4LocalButton.tsx"
import {InfoCircledIcon} from "@radix-ui/react-icons"

export const DataSharingButton: FunctionComponent = () => (
    <Popover.Root>
        <Popover.Trigger>
            <Local4LocalButton variant="outline" size="1">
                <InfoCircledIcon />
                Dataverwerking
            </Local4LocalButton>
        </Popover.Trigger>
        <Popover.Content maxWidth="calc(min(100vw, 30rem))">
            <DataSharingText />
        </Popover.Content>
    </Popover.Root>
)

const DataSharingText: FunctionComponent = () => (
    <>
        <p>Hoe wordt de ingevulde gegevens gebruikt?</p>
        <ul>
            <li>De gegevens worden permanent opgeslagen.</li>
            <li>Gegevens worden enkel gebruikt ter ondersteuning en verbetering van de tool.</li>
            <li>De gegevens zijn alleen toegankelijk voor beheerders</li>
            <li>Herleidbare gegevens worden niet breed gedeeld, zowel binnen als buiten het Local4Local consortium.</li>
        </ul>
    </>
)
