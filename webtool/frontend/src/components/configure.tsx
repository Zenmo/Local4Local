import {FunctionComponent, useState} from "react"
import {Pilot, HouseholdGroup, SolarFarm, WindFarm, Battery, HeatStorage, SupplierCost} from "local4local"
import {HouseholdForm} from "./household/household-form.tsx"
import {AddDropdown} from "./add-dropdown.tsx"
import {Grid, Heading} from "@radix-ui/themes"
import {SolarFarmForm} from "./solarfarm/solarfarm-form.tsx"
import {BatteriesDisplayEdit, BatteryForm} from "./assets/battery.tsx"
import {BiogasGeneratorForm, BiogasGeneratorsDisplayEdit} from "./assets/biogas-generator.tsx"
import {WindFarmsDisplayEdit, WindFarmForm} from "./assets/wind-farm.tsx"
import {HeatStorageForm} from "./heat-storage/heat-storage-form.tsx"
import {SupplierCostDisplay, SupplierCostForm} from "./supplier-cost.tsx"
import {HouseholdsDisplayEdit} from "./household/households-display-edit.tsx";
import {SolarFarmsDisplayEdit} from "./solarfarm/solarfarms-display-edit.tsx";
import {HeatStoragesDisplayEdit} from "./heat-storage/heat-storage-display-edit.tsx";

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
                    <SupplierCostForm initialData={pilot.supplierCost} save={(supplierCost: SupplierCost) => onChange(pilot.withSupplierCost(supplierCost))} hide={() => setShowEditSupplierCost(false)}/>
                    :
                    <SupplierCostDisplay supplierCost={pilot.supplierCost} onEdit={() => setShowEditSupplierCost(true)}/>
                }

                <HouseholdsDisplayEdit pilot={pilot} onChange={onChange}/>
                <SolarFarmsDisplayEdit pilot={pilot} onChange={onChange}/>
                <WindFarmsDisplayEdit pilot={pilot} onChange={onChange}/>
                <BiogasGeneratorsDisplayEdit pilot={pilot} onChange={onChange}/>
                <BatteriesDisplayEdit pilot={pilot} onChange={onChange}/>
                <HeatStoragesDisplayEdit pilot={pilot} onChange={onChange}/>

                {showAddHouseholdGroup &&
                    <HouseholdForm save={(asset: HouseholdGroup) => onChange(pilot.create(asset))} hide={() => setShowAddHouseholdGroup(false)}/>}
                {showAddSolarFarm &&
                    <SolarFarmForm save={(asset: SolarFarm) => onChange(pilot.create(asset))} hide={() => setShowAddSolarFarm(false)}/>}
                {showAddWindFarm &&
                    <WindFarmForm save={(asset: WindFarm) => onChange(pilot.create(asset))} hide={() => setShowAddWindFarm(false)}/>}
                {showAddBiogasGenerator &&
                    <BiogasGeneratorForm save={(asset) => onChange(pilot.create(asset))} hide={() => setShowAddBiogasGenerator(false)}/>}
                {showAddBattery &&
                    <BatteryForm save={(asset: Battery) => onChange(pilot.create(asset))} hide={() => setShowAddBattery(false)}/>}
                {showAddHeatStorage &&
                    <HeatStorageForm save={(asset: HeatStorage) => onChange(pilot.create(asset))} hide={() => setShowAddHeatStorage(false)}/>}

                {showAddDropdown &&
                    <AddDropdown
                        style={{alignSelf: "end"}}
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
