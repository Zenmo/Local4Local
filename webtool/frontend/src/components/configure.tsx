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

    const showAddDropdown = !(
        showAddHouseholdGroup ||
        showAddSolarFarm ||
        showAddWindFarm ||
        showAddBattery ||
        showAddHeatStorage)

    type AssetType = Pilot | HouseholdGroup | SolarFarm | WindFarm | Battery | HeatStorage;

    const saveAsset = (asset: AssetType) => {
        const type = asset.constructor.name;

        switch (type) {
            case "HouseholdGroup":
                setPilot(pilot.withHouseholdGroup(asset as HouseholdGroup));
                break;
            case "SolarFarm":
                setPilot(pilot.withSolarFarm(asset as SolarFarm));
                break;
            case "WindFarm":
                setPilot(pilot.withWindFarm(asset as WindFarm));
                break;
            case "Battery":
                setPilot(pilot.withBattery(asset as Battery));
                break;
            case "HeatStorage":
                setPilot(pilot.withHeatStorage(asset as HeatStorage));
                break;
            default:
                break;
        }
    };

    const deleteAsset = (asset: AssetType) => {
        const type = asset.constructor.name;

        switch (type) {
        case "HouseholdGroup":
            setPilot(pilot.withoutHouseholdGroup(asset as HouseholdGroup))
            break;
        case "SolarFarm":
            setPilot(pilot.withoutSolarFarm(asset as SolarFarm));
            break;
        case "WindFarm":
            setPilot(pilot.withoutWindFarm(asset as WindFarm));
            break;
        case "Battery":
            setPilot(pilot.withoutBattery(asset as Battery));
            break;
        case "HeatStorage":
            setPilot(pilot.withoutHeatStorage(asset as HeatStorage));
            break;
        default:
            break;
        };
    }

    type AssetStringType = "HouseholdGroup" | "SolarFarm" | "WindFarm" | "Battery" | "HeatStorage";

    const handleDisplay = (type: AssetStringType, show: boolean) => {
        // const type = asset.constructor.name;

        const setters: Record<string, React.Dispatch<React.SetStateAction<boolean>>> = {
            HouseholdGroup: setShowAddHouseholdGroup,
            SolarFarm: setShowAddSolarFarm,
            WindFarm: setShowAddWindFarm,
            Battery: setShowAddBattery,
            HeatStorage: setShowAddHeatStorage,
        };
        
        const setShowFunction = setters[type];
        if (setShowFunction) {
            setShowFunction(show);
        }
    };

    return (
        <Grid gap="2" pt="4">
            {pilot.householdGroups.asJsReadonlyArrayView().map((it, i) =>
                <HouseholdDisplay key={"householdGroup_" + i} householdGroup={it} 
                    toDelete={() => deleteAsset(it)}
                />)}
           
            {pilot.solarFarms.asJsReadonlyArrayView().map((it, i) =>
                <SolarFarmDisplay key={"solarFarm_" + i} solarFarm={it} 
                    toDelete={() => deleteAsset(it)}
                />)}
           
            {pilot.windFarms.asJsReadonlyArrayView().map((it, i) =>
                <WindFarmDisplay windFarm={it} key={"windFarm_" + i} 
                    toDelete={() => deleteAsset(it)}
                />)}
            
            {pilot.batteries.asJsReadonlyArrayView().map((it, i) =>
                <BatteryDisplay key={"battery_" + i} battery={it} 
                    toDelete={() => deleteAsset(it)}
                />)}
            
            {pilot.heatStorages.asJsReadonlyArrayView().map((it, i) =>
                <HeatStorageDisplay heatStorage={it} key={"heatStorage_" + i}
                    toDelete={() => deleteAsset(it)}
                />)}
            
            {showAddHouseholdGroup &&
                <HouseholdForm saveHouseholdGroup={saveAsset} hide={() => setShowAddHouseholdGroup(false)}/>}
            {showAddSolarFarm &&
                <SolarFarmForm saveSolarFarm={saveAsset} hide={() => setShowAddSolarFarm(false)} />}
            {showAddWindFarm &&
                <WindFarmForm saveWindFarm={saveAsset} hide={() => setShowAddWindFarm(false)} />}
            {showAddBattery &&
                <BatteryForm saveBattery={saveAsset} hide={() => setShowAddBattery(false)} />}
            {showAddHeatStorage &&
                <HeatStorageForm saveHeatStorage={saveAsset} hide={() => setShowAddHeatStorage(false)} />}


            {showAddDropdown &&
                <AddDropdown
                    style={{
                        alignSelf: "end",
                    }}
                    addHouseholdGroup={() => handleDisplay("HouseholdGroup", true)}
                    addSolarFarm={() => handleDisplay("SolarFarm", true)}
                    addWindFarm={() => handleDisplay("WindFarm", true)}
                    addBattery={() => handleDisplay("Battery", true)}
                    addHeatStorage={() => handleDisplay("HeatStorage", true)}
                />}
        </Grid>
    )
}
