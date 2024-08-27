import {Button, DropdownMenu} from "@radix-ui/themes"
import {CSSProperties, FunctionComponent} from "react"

export const AddDropdown: FunctionComponent<{
    addHouseholdGroup: () => void
    addWindFarm: () => void
    addSolarFarm: () => void
    style: CSSProperties
}> = ({
    addHouseholdGroup,
    addWindFarm,
    addSolarFarm,
    style,
}) => (
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <Button style={style}>
                Toevoegen
                <DropdownMenu.TriggerIcon />
            </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Item onSelect={addHouseholdGroup}>Huishoudens</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={addWindFarm}>Windpark</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={addSolarFarm}>Zonnepark</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => alert("Batterij nog niet geïmplementeerd")}>
                Batterij
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => alert("Warmte-opslag nog niet geïmplementeerd")}>
                Warmte-opslag
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => alert("Bedrijf nog niet geïmplementeerd")}>
                Bedrijf
            </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
)
