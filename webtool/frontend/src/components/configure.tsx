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

    type AssetType =  HouseholdGroup | SolarFarm | WindFarm | Battery | HeatStorage;

    interface AssetHandlers<AssetType> {
        display: (show: boolean) => void;
        save: (asset: AssetType) => void;
        delete: (asset: AssetType) => void;
    }

    const assetHandlers: Record<string, AssetHandlers<AssetType>> = {
        HouseholdGroup: {
            display: (show: boolean) => setShowAddHouseholdGroup(show),
            save: (asset: AssetType) => setPilot(pilot.withHouseholdGroup(asset as HouseholdGroup)),
            delete: (asset: AssetType) => setPilot(pilot.withoutHouseholdGroup(asset as HouseholdGroup)),
        },
        SolarFarm: {
            display: (show: boolean) => setShowAddSolarFarm(show),
            save: (asset: AssetType) => setPilot(pilot.withSolarFarm(asset as SolarFarm)),
            delete: (asset: AssetType) => setPilot(pilot.withoutSolarFarm(asset as SolarFarm)),
        },
        WindFarm: {
            display: (show: boolean) => setShowAddWindFarm(show),
            save: (asset: AssetType) => setPilot(pilot.withWindFarm(asset as WindFarm)),
            delete: (asset: AssetType) => setPilot(pilot.withoutWindFarm(asset as WindFarm)),
        },
        Battery: {
            display: (show: boolean) => setShowAddBattery(show),
            save: (asset: AssetType) => setPilot(pilot.withBattery(asset as Battery)),
            delete: (asset: AssetType) => setPilot(pilot.withoutBattery(asset as Battery)),
        },
        HeatStorage: {
            display: (show: boolean) => setShowAddHeatStorage(show),
            save: (asset: AssetType) => setPilot(pilot.withHeatStorage(asset as HeatStorage)),
            delete: (asset: AssetType) => setPilot(pilot.withoutHeatStorage(asset as HeatStorage)),
        },
    };

   
    // Generic save function
    const saveAsset = (asset: AssetType) => {
        const type = asset.constructor.name;
        const handler = assetHandlers[type]?.save;
        
        if (handler) {
            handler(asset);
        } else {
            console.error(`No save handler found for type: ${type}`);
        }
    };

    // Generic delete function
    const deleteAsset = (asset: AssetType) => {
        const type = asset.constructor.name;
        const handler = assetHandlers[type]?.delete;

        if (handler) {
            handler(asset);
        } else {
            console.error(`No delete handler found for type: ${type}`);
        }
    };

    const handleDisplay = (type: string, show: boolean) => {
        const handler = assetHandlers[type]?.display;

        if (handler) {
            handler(show);
        } else {
            console.error(`No delete handler found for type: ${type}`);
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
