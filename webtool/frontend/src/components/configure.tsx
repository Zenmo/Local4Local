import {FunctionComponent, useState} from "react"
import {Pilot, HouseholdGroup, SolarFarm, WindFarm, Battery, HeatStorage, SupplierCost} from "local4local"
import {HouseholdDisplay} from "./household/household-display.tsx"
import {HouseholdForm} from "./household/household-form.tsx"
import {AddDropdown} from "./add-dropdown.tsx"
import {Grid} from "@radix-ui/themes"
import {SolarFarmDisplay, SolarFarmForm} from "./solar-farm.tsx"
import {WindFarmDisplay, WindFarmForm} from "./wind-farm.tsx"
import {BatteryDisplay, BatteryForm} from "./battery.tsx"
import {HeatStorageDisplay} from "./heat-storage/heat-storage-display.tsx"
import {HeatStorageForm} from "./heat-storage/heat-storage-form.tsx"
import {SupplierCostDisplay, SupplierCostForm} from "./supplier-cost.tsx"
import {BiogasGeneratorDisplay, BiogasGeneratorForm} from "./biogas-generator.tsx"

export const Configure: FunctionComponent<{ pilot: Pilot, setPilot: (pilot: Pilot) => void }> = ({pilot, setPilot}) => {
    const [showAddHouseholdGroup, setShowAddHouseholdGroup] = useState(false)
    const [showAddSolarFarm, setShowAddSolarFarm] = useState(false)
    const [showAddWindFarm, setShowAddWindFarm] = useState(false)
    const [showAddBiogasGenerator, setShowAddBiogasGenerator] = useState(false)
    const [showAddBattery, setShowAddBattery] = useState(false)
    const [showAddHeatStorage, setShowAddHeatStorage] = useState(false)
    const [showEditSupplierCost, setShowEditSupplierCost] = useState(false)
    const [selectedHouseholdGroup, setSelectedHouseholdGroup] = useState<HouseholdGroup | null>(null);


    const showAddDropdown = !(
        showAddHouseholdGroup ||
        showAddSolarFarm ||
        showAddWindFarm ||
        showAddBiogasGenerator ||
        showAddBattery ||
        showAddHeatStorage ||
        showEditSupplierCost
    )

    return (
        <Grid gap="2" pt="4">
            {showEditSupplierCost ?
                <SupplierCostForm
                    initialData={pilot.supplierCost}
                    save={(supplierCost: SupplierCost) => setPilot(pilot.withSupplierCost(supplierCost))}
                    hide={() => setShowEditSupplierCost(false)}
                />
                :
                <SupplierCostDisplay supplierCost={pilot.supplierCost} onEdit={() => setShowEditSupplierCost(true)}/>
            }

            {pilot.householdGroups.asJsReadonlyArrayView().map((it, i) =>
                selectedHouseholdGroup == it ? (
                    <HouseholdForm
                        key={"householdGroup_" + i}
                        save={(asset: HouseholdGroup) => {
                            // setPilot(pilot.replaceHouseHoldGroup(i, asset))
                            // setPilot(pilot.remove(it));
                            setPilot(pilot.create(asset));
                            setSelectedHouseholdGroup(null);
                        }}
                        hide={() => {
                            setSelectedHouseholdGroup(null);
                        }}
                        initialData={selectedHouseholdGroup}
                    />
                ) : (
                    <HouseholdDisplay
                        key={"householdGroup_" + i}
                        householdGroup={it}
                        onEdit={() => { setSelectedHouseholdGroup(it)}}
                        toDelete={() => setPilot(pilot.remove(it))}
                    />
                )
            )}

            {pilot.solarFarms.asJsReadonlyArrayView().map((it, i) =>
                <SolarFarmDisplay key={"solarFarm_" + i} solarFarm={it} 
                    toDelete={() => setPilot(pilot.remove(it))}
                />)}
           
            {pilot.windFarms.asJsReadonlyArrayView().map((it, i) =>
                <WindFarmDisplay windFarm={it} key={"windFarm_" + i} 
                    toDelete={() => setPilot(pilot.remove(it))}
                />)}

            {pilot.biogasGenerators.asJsReadonlyArrayView().map((it, i) =>
                <BiogasGeneratorDisplay
                    biogasGenerator={it}
                    key={"biogasGenerator_" + i}
                    toDelete={() => setPilot(pilot.remove(it))}
                />)}
            
            {pilot.batteries.asJsReadonlyArrayView().map((it, i) =>
                <BatteryDisplay key={"battery_" + i} battery={it} 
                    toDelete={() => setPilot(pilot.remove(it))}
                />)}
            
            {pilot.heatStorages.asJsReadonlyArrayView().map((it, i) =>
                <HeatStorageDisplay heatStorage={it} key={"heatStorage_" + i}
                    toDelete={() => setPilot(pilot.remove(it))}
                />)}
            
            {showAddHouseholdGroup &&
                <HouseholdForm
                    save={(asset: HouseholdGroup) => setPilot(pilot.create(asset))}
                    hide={() => setShowAddHouseholdGroup(false)}
                />}
            {showAddSolarFarm &&
                <SolarFarmForm saveSolarFarm={(asset: SolarFarm) => setPilot(pilot.create(asset))} hide={() => setShowAddSolarFarm(false)} />}
            {showAddWindFarm &&
                <WindFarmForm saveWindFarm={(asset: WindFarm) => setPilot(pilot.create(asset))} hide={() => setShowAddWindFarm(false)} />}
            {showAddBiogasGenerator &&
                <BiogasGeneratorForm save={(asset) => setPilot(pilot.create(asset))} hide={() => setShowAddBiogasGenerator(false)} />}
            {showAddBattery &&
                <BatteryForm saveBattery={(asset: Battery) => setPilot(pilot.create(asset))} hide={() => setShowAddBattery(false)} />}
            {showAddHeatStorage &&
                <HeatStorageForm saveHeatStorage={(asset: HeatStorage) => setPilot(pilot.create(asset))} hide={() => setShowAddHeatStorage(false)} />}

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
                    addBiogasGenerator={() => setShowAddBiogasGenerator(true)}
                />}
        </Grid>
    )
}
