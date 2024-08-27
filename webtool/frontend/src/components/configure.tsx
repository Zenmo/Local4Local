import {FunctionComponent, useState} from "react"
import {Pilot, HouseholdGroup, SolarFarm, WindFarm, Battery, HeatStorage} from "local4local"
import {HouseholdDisplay} from "./household/household-display.tsx"
import {HouseholdForm} from "./household/household-form.tsx"
import {AddDropdown} from "./add-dropdown.tsx"
import {Flex} from "@radix-ui/themes"
import {SolarFarmDisplay, SolarFarmForm} from "./solar-farm.tsx"
import {WindFarmDisplay, WindFarmForm} from "./wind-farm.tsx"
import {BatteryDisplay, BatteryForm} from "./battery.tsx"
import {HeatStorageDisplay} from "./heat-storage/heat-storage-display.tsx"
import {HeatStorageForm} from "./heat-storage/heat-storage-form.tsx"

export const Configure: FunctionComponent<{ pilot: Pilot, setPilot: (pilot: Pilot) => void }> = ({pilot, setPilot}) => {
    const [showAddHouseholdGroup, setShowAddHouseholdGroup] = useState(false)
    const [showAddSolarFarm, setShowAddSolarFarm] = useState(false)
    const [showAddWindFarm, setShowAddWindFarm] = useState(false)
    const [showAddBattery, setShowAddBattery] = useState(false)
    const [showAddHeatStorage, setShowAddHeatStorage] = useState(false)

    const showAddDropdown = !(
        showAddHouseholdGroup ||
        showAddSolarFarm ||
        showAddWindFarm ||
        showAddBattery ||
        showAddHeatStorage)

    const saveHouseholdGroup = (householdGroup: HouseholdGroup) => {
        setPilot(pilot.withHouseholdGroup(householdGroup))
    }

    const saveSolarFarm = (solarFarm: SolarFarm) => {
        setPilot(pilot.withSolarFarm(solarFarm))
    }

    const saveWindFarm = (windFarm: WindFarm) => {
        setPilot(pilot.withWindFarm(windFarm))
    }

    const saveBattery = (battery: Battery) => {
        setPilot(pilot.withBattery(battery))
    }

    const saveHeatStorage = (heatStorage: HeatStorage) => {
        setPilot(pilot.withHeatStorage(heatStorage))
    }

    return (
        <Flex wrap={"wrap"} gap={".2rem"} pt={".4rem"} minHeight={"5rem"} justify={"center"} css={{
            alignItems: "center"
        }}>

            {pilot.householdGroups.asJsReadonlyArrayView().map((it, i) =>
                <HouseholdDisplay key={"householdGroup_" + i} householdGroup={it}/>)}
            {showAddHouseholdGroup &&
                <HouseholdForm saveHouseholdGroup={saveHouseholdGroup} hide={() => setShowAddHouseholdGroup(false)}/>}

            {pilot.solarFarms.asJsReadonlyArrayView().map((it, i) =>
                <SolarFarmDisplay key={"solarFarm_" + i} solarFarm={it} />)}
            {showAddSolarFarm &&
                <SolarFarmForm saveSolarFarm={saveSolarFarm} hide={() => setShowAddSolarFarm(false)} />}

            {pilot.windFarms.asJsReadonlyArrayView().map((it, i) =>
                <WindFarmDisplay windFarm={it} key={"windFarm_" + i} />)}
            {showAddWindFarm &&
                <WindFarmForm saveWindFarm={saveWindFarm} hide={() => setShowAddWindFarm(false)} />}

            {pilot.batteries.asJsReadonlyArrayView().map((it, i) =>
                <BatteryDisplay key={"battery_" + i} battery={it} />)}
            {showAddBattery &&
                <BatteryForm saveBattery={saveBattery} hide={() => setShowAddBattery(false)} />}

            {pilot.heatStorages.asJsReadonlyArrayView().map((it, i) =>
                <HeatStorageDisplay heatStorage={it} key={"heatStorage_" + i} />)}
            {showAddHeatStorage &&
                <HeatStorageForm saveHeatStorage={saveHeatStorage} hide={() => setShowAddHeatStorage(false)} />}

            {showAddDropdown &&
                <AddDropdown
                    style={{
                        alignSelf: "end",
                    }}
                    addHouseholdGroup={() => setShowAddHouseholdGroup(true)}
                    addSolarFarm={() => setShowAddSolarFarm(true)}
                    addWindFarm={() => setShowAddWindFarm(true)}
                    addBattery={() => setShowAddBattery(true)}
                    addHeatStorage={() => setShowAddHeatStorage(true)}
                />}
        </Flex>
    )
}
