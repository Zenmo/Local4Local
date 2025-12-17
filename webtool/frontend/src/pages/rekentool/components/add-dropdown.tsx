import {DropdownMenu} from "@radix-ui/themes"
import {CSSProperties, FunctionComponent} from "react"
import {PlusIcon} from "@radix-ui/react-icons"
import {local4localLightGreen} from "../../../colors.ts"
import {Local4LocalButton} from "../../../shared-components/buttons/Local4LocalButton.tsx"

export const AddDropdown: FunctionComponent<{
    addHouseholdGroup: () => void
    addWindFarm: () => void
    addSolarFarm: () => void
    addBattery: () => void
    addHeatStorage: () => void
    addCompany?: () => void
    addBiogasGenerator?: () => void
    disableAddBattery?: boolean
    style?: CSSProperties
}> = ({
    addHouseholdGroup,
    addWindFarm,
    addSolarFarm,
    addBattery,
    addHeatStorage,
    addCompany,
    addBiogasGenerator,
    disableAddBattery = false,
    style,
}) => (
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <Local4LocalButton style={{
                backgroundColor: local4localLightGreen,
                ...style,
            }}>
                <PlusIcon style={{ width: "1.2rem", height: "1.2rem" }}  />
                Toevoegen
                <DropdownMenu.TriggerIcon />
            </Local4LocalButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
            <DropdownMenu.Item onSelect={addHouseholdGroup}>Huishoudens</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={addCompany}>Bedrijf</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={addWindFarm}>Windpark</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={addSolarFarm}>Zonnepark</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={addBattery} disabled={disableAddBattery}>
                Batterij {disableAddBattery && "(al toegevoegd)"}
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
