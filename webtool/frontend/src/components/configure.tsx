import {FunctionComponent, useState} from "react"
import {Pilot, HouseholdGroup, SolarFarm, WindFarm, Battery, HeatStorage, SupplierCost} from "local4local"
import {HouseholdForm} from "./household/household-form.tsx"
import {AddDropdown} from "./add-dropdown.tsx"
import {Grid, Heading} from "@radix-ui/themes"
import {SolarFarmDisplay, SolarFarmForm} from "./solar-farm.tsx"
import {WindFarmDisplay, WindFarmForm} from "./wind-farm.tsx"
import {BatteryDisplay, BatteryForm} from "./battery.tsx"
import {HeatStorageDisplay} from "./heat-storage/heat-storage-display.tsx"
import {HeatStorageForm} from "./heat-storage/heat-storage-form.tsx"
import {SupplierCostDisplay, SupplierCostForm} from "./supplier-cost.tsx"
import {BiogasGeneratorDisplay, BiogasGeneratorForm} from "./biogas-generator.tsx"
import {HouseholdDisplayEdit} from "./household/household-display-edit.tsx";

export const Configure: FunctionComponent<{
    pilot: Pilot,
    onChange: (pilot: Pilot) => void,
}> = ({pilot, onChange, }) => {
    const [showAddHouseholdGroup, setShowAddHouseholdGroup] = useState(false)
    const [showAddSolarFarm, setShowAddSolarFarm] = useState(false)
    const [showAddWindFarm, setShowAddWindFarm] = useState(false)
    const [showAddBiogasGenerator, setShowAddBiogasGenerator] = useState(false)
    const [showAddBattery, setShowAddBattery] = useState(false)
    const [showAddHeatStorage, setShowAddHeatStorage] = useState(false)
    const [showEditSupplierCost, setShowEditSupplierCost] = useState(false)

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
        <>
            <Heading as="h3">
                Configure
            </Heading>
            <Grid gap="2" pt="4">
                {showEditSupplierCost ?
                    <SupplierCostForm
                        initialData={pilot.supplierCost}
                        save={(supplierCost: SupplierCost) => onChange(pilot.withSupplierCost(supplierCost))}
                        hide={() => setShowEditSupplierCost(false)}
                    />
                    : <SupplierCostDisplay supplierCost={pilot.supplierCost}
                                           onEdit={() => setShowEditSupplierCost(true)}/>}

                <HouseholdDisplayEdit pilot={pilot} onChange={onChange}/>

                {pilot.solarFarms.asJsReadonlyArrayView().map((it, i) =>
                    <SolarFarmDisplay key={"solarFarm_" + i} solarFarm={it}
                                      toDelete={() => onChange(pilot.remove(it))}
                    />)}

                {pilot.windFarms.asJsReadonlyArrayView().map((it, i) =>
                    <WindFarmDisplay windFarm={it} key={"windFarm_" + i}
                                     toDelete={() => onChange(pilot.remove(it))}
                    />)}

                {pilot.biogasGenerators.asJsReadonlyArrayView().map((it, i) =>
                    <BiogasGeneratorDisplay
                        biogasGenerator={it}
                        key={"biogasGenerator_" + i}
                        toDelete={() => onChange(pilot.remove(it))}
                    />)}

                {pilot.batteries.asJsReadonlyArrayView().map((it, i) =>
                    <BatteryDisplay key={"battery_" + i} battery={it}
                                    toDelete={() => onChange(pilot.remove(it))}
                    />)}

                {pilot.heatStorages.asJsReadonlyArrayView().map((it, i) =>
                    <HeatStorageDisplay heatStorage={it} key={"heatStorage_" + i}
                                        toDelete={() => onChange(pilot.remove(it))}
                    />)}

                {showAddHouseholdGroup &&
                    <HouseholdForm
                        save={(asset: HouseholdGroup) => onChange(pilot.create(asset))}
                        hide={() => setShowAddHouseholdGroup(false)}
                    />}
                {showAddSolarFarm &&
                    <SolarFarmForm saveSolarFarm={(asset: SolarFarm) => onChange(pilot.create(asset))}
                                   hide={() => setShowAddSolarFarm(false)}/>}
                {showAddWindFarm &&
                    <WindFarmForm saveWindFarm={(asset: WindFarm) => onChange(pilot.create(asset))}
                                  hide={() => setShowAddWindFarm(false)}/>}
                {showAddBiogasGenerator &&
                    <BiogasGeneratorForm save={(asset) => onChange(pilot.create(asset))}
                                         hide={() => setShowAddBiogasGenerator(false)}/>}
                {showAddBattery &&
                    <BatteryForm saveBattery={(asset: Battery) => onChange(pilot.create(asset))}
                                 hide={() => setShowAddBattery(false)}/>}
                {showAddHeatStorage &&
                    <HeatStorageForm saveHeatStorage={(asset: HeatStorage) => onChange(pilot.create(asset))}
                                     hide={() => setShowAddHeatStorage(false)}/>}

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
        </>
    )
}
