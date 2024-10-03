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
import {BufferPriceDisplay, BufferPriceForm} from "./buffer-price.tsx"

export const Configure: FunctionComponent<{ pilot: Pilot, setPilot: (pilot: Pilot) => void }> = ({pilot, setPilot}) => {
    const [showAddHouseholdGroup, setShowAddHouseholdGroup] = useState(false)
    const [showAddSolarFarm, setShowAddSolarFarm] = useState(false)
    const [showAddWindFarm, setShowAddWindFarm] = useState(false)
    const [showAddBattery, setShowAddBattery] = useState(false)
    const [showAddHeatStorage, setShowAddHeatStorage] = useState(false)
    const [showBufferPrice, setShowBufferPrice] = useState(false)

    const showAddDropdown = !(
        showAddHouseholdGroup ||
        showAddSolarFarm ||
        showAddWindFarm ||
        showAddBattery ||
        showAddHeatStorage ||
        showBufferPrice
    )

    return (
        <Grid gap="2" pt="4">
            {pilot.householdGroups.asJsReadonlyArrayView().map((it, i) =>
                <HouseholdDisplay key={"householdGroup_" + i} householdGroup={it} 
                    toDelete={() => setPilot(pilot.remove(it))}
                />)}
           
            {pilot.solarFarms.asJsReadonlyArrayView().map((it, i) =>
                <SolarFarmDisplay key={"solarFarm_" + i} solarFarm={it} 
                    toDelete={() => setPilot(pilot.remove(it))}
                />)}
           
            {pilot.windFarms.asJsReadonlyArrayView().map((it, i) =>
                <WindFarmDisplay windFarm={it} key={"windFarm_" + i} 
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
            
            {(pilot.bufferPrice_eurpkWh && !showBufferPrice )? (
                <BufferPriceDisplay 
                    bufferPrice_eurpkWh={pilot.bufferPrice_eurpkWh} 
                    key={"bufferPrice_eurpkWh"} 
                    toDelete={() => setPilot(pilot.withoutBufferPrice())} 
                />
            ) : null}
            
            {showAddHouseholdGroup &&
                <HouseholdForm 
                    saveHouseholdGroup={(asset: HouseholdGroup) => setPilot(pilot.create(asset))} 
                    hide={() => setShowAddHouseholdGroup(false)}
                />}
            {showAddSolarFarm &&
                <SolarFarmForm saveSolarFarm={(asset: SolarFarm) => setPilot(pilot.create(asset))} hide={() => setShowAddSolarFarm(false)} />}
            {showAddWindFarm &&
                <WindFarmForm saveWindFarm={(asset: WindFarm) => setPilot(pilot.create(asset))} hide={() => setShowAddWindFarm(false)} />}
            {showAddBattery &&
                <BatteryForm saveBattery={(asset: Battery) => setPilot(pilot.create(asset))} hide={() => setShowAddBattery(false)} />}
            {showAddHeatStorage &&
                <HeatStorageForm saveHeatStorage={(asset: HeatStorage) => setPilot(pilot.create(asset))} hide={() => setShowAddHeatStorage(false)} />}
            {showBufferPrice &&
                <BufferPriceForm 
                    initialData={pilot.bufferPrice_eurpkWh} 
                    saveBufferPrice={(bufferPrice: number) => setPilot(pilot.withBufferPrice(bufferPrice))} 
                    hide={() => setShowBufferPrice(false)}
            />}

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
                    addBufferPrice={() => setShowBufferPrice(true)}
                />}
        </Grid>
    )
}
