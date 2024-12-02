import {Button, DropdownMenu} from "@radix-ui/themes"
import {CSSProperties, FunctionComponent} from "react"

export const AddDropdown: FunctionComponent<{
    addHouseholdGroup: () => void
    addWindFarm: () => void
    addSolarFarm: () => void
    addBattery: () => void
    addHeatStorage: () => void
    addCompany?: () => void
    addBiogasGenerator?: () => void
    style: CSSProperties
}> = ({
    addHouseholdGroup,
    addWindFarm,
    addSolarFarm,
    addBattery,
    addHeatStorage,
    addCompany,
    addBiogasGenerator,
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
            <DropdownMenu.Item onSelect={addCompany}>Bedrijf</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={addWindFarm}>Windpark</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={addSolarFarm}>Zonnepark</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={addBattery}>
                Batterij
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={addHeatStorage} style={{display: "none"}}>
                Warmte-opslag
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={addBiogasGenerator}>
                Biogasmotor
            </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
)
