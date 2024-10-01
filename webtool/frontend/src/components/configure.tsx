import {FunctionComponent, useState} from "react"
import {Pilot, HouseholdGroup, SolarFarm, WindFarm, Battery, HeatStorage} from "local4local"
import {HouseholdDisplay} from "./household/household-display.tsx"
import {HouseholdForm} from "./household/household-form.tsx"
import {AddDropdown} from "./add-dropdown.tsx"
import {Grid} from "@radix-ui/themes"
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
    // const [editIndex, setEditIndex] = useState(Number);
    // const [householdGroupList, setHouseholdGroupList] = useState([]);
    const [editingAsset, setEditingAsset] = useState<HouseholdGroup | null>(null);


    const showAddDropdown = !(
        showAddHouseholdGroup ||
        showAddSolarFarm ||
        showAddWindFarm ||
        showAddBattery ||
        showAddHeatStorage)

    const saveHouseholdGroup = (householdGroup: HouseholdGroup) => {
        // editIndex ? setPilot(pilot.edditAsset(householdGroup)) : setPilot(pilot.withHouseholdGroup(householdGroup))
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

    const deleteAsset = (type: string, asset: any) => {
        switch (type) {
        case "householdGroup":
            setPilot(pilot.withoutHouseholdGroup(asset))
            break;
        case "solarFarm":
            setPilot(pilot.withoutSolarFarm(asset));
            break;
        case "windFarm":
            setPilot(pilot.withoutWindFarm(asset));
            break;
        case "battery":
            setPilot(pilot.withoutBattery(asset));
            break;
        case "heatStorage":
            setPilot(pilot.withoutHeatStorage(asset));
            break;
        default:
            break;
        };
    }

    const handleDisplay = (type: string, show: boolean) => {
        switch (type) {
        case "householdGroup":
            setShowAddHouseholdGroup(show)
            break;
        case "solarFarm":
            setShowAddSolarFarm(show);
            break;
        case "windFarm":
            setShowAddWindFarm(show);
            break;
        case "battery":
            setShowAddBattery(show);
            break;
        case "heatStorage":
            setShowAddHeatStorage(show);
            break;
        default:
            break;
        };
    };

    return (
        <Grid gap="2" pt="4">
            {pilot.householdGroups.asJsReadonlyArrayView().map((it, i) =>
                editingAsset !== it ? (
                    <HouseholdDisplay key={"householdGroup_" + i} householdGroup={it} 
                        toDelete={() => deleteAsset("householdGroup", it)}
                    />
                ) : null
            )}
           
            {pilot.solarFarms.asJsReadonlyArrayView().map((it, i) =>
                <SolarFarmDisplay key={"solarFarm_" + i} solarFarm={it} 
                    toDelete={() => deleteAsset("solarFarm", it)}
                />)}
           
            {pilot.windFarms.asJsReadonlyArrayView().map((it, i) =>
                <WindFarmDisplay windFarm={it} key={"windFarm_" + i} 
                    toDelete={() => deleteAsset("windFarm", it)}
                />)}
            
            {pilot.batteries.asJsReadonlyArrayView().map((it, i) =>
                <BatteryDisplay key={"battery_" + i} battery={it} 
                    toDelete={() => deleteAsset("battery", it)}
                />)}
            
            {pilot.heatStorages.asJsReadonlyArrayView().map((it, i) =>
                <HeatStorageDisplay heatStorage={it} key={"heatStorage_" + i}
                    toDelete={() => deleteAsset("heatStorage", it)}
                />)}
            
            {showAddHouseholdGroup &&
                <HouseholdForm initialData={editingAsset} saveHouseholdGroup={saveHouseholdGroup} hide={() => setShowAddHouseholdGroup(false)}/>}
            {showAddSolarFarm &&
                <SolarFarmForm saveSolarFarm={saveSolarFarm} hide={() => setShowAddSolarFarm(false)} />}
            {showAddWindFarm &&
                <WindFarmForm saveWindFarm={saveWindFarm} hide={() => setShowAddWindFarm(false)} />}
            {showAddBattery &&
                <BatteryForm saveBattery={saveBattery} hide={() => setShowAddBattery(false)} />}
            {showAddHeatStorage &&
                <HeatStorageForm saveHeatStorage={saveHeatStorage} hide={() => setShowAddHeatStorage(false)} />}


            {showAddDropdown &&
                <AddDropdown
                    style={{
                        alignSelf: "end",
                    }}
                    addHouseholdGroup={() => handleDisplay("householdGroup", true)}
                    addSolarFarm={() => handleDisplay("solarFarm", true)}
                    addWindFarm={() => handleDisplay("windFarm", true)}
                    addBattery={() => handleDisplay("battery", true)}
                    addHeatStorage={() => handleDisplay("heatStorage", true)}
                />}
        </Grid>
    )
}
