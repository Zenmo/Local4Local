import {FunctionComponent, useState} from "react"
import {Pilot, HouseholdGroup, Company, SolarFarm, WindFarm, Battery, HeatStorage, SupplierCost} from "local4local"
import {HouseholdForm} from "./household/household-form.tsx"
import {AddDropdown} from "./add-dropdown.tsx"
import {Flex, Grid} from "@radix-ui/themes"
import {SolarFarmForm} from "./solarfarm/solarfarm-form.tsx"
import {BatteriesDisplayEdit, BatteryForm} from "./assets/battery.tsx"
import {BiogasGeneratorForm, BiogasGeneratorsDisplayEdit} from "./assets/biogas-generator.tsx"
import {WindFarmsDisplayEdit, WindFarmForm} from "./assets/wind-farm.tsx"
import {HeatStorageForm} from "./heat-storage/heat-storage-form.tsx"
import {SupplierCostDisplay, SupplierCostForm} from "./supplier-cost.tsx"
import {HouseholdsDisplayEdit} from "./household/households-display-edit.tsx";
import {SolarFarmsDisplayEdit} from "./solarfarm/solarfarms-display-edit.tsx";
import {HeatStoragesDisplayEdit} from "./heat-storage/heat-storage-display-edit.tsx";
import {CompanyDisplayEdit} from "./company/company-display-edit.tsx"
import {CompanyForm} from "./company/company-form.tsx"
import {SaveButton} from "./save.tsx"

export const Configure: FunctionComponent<{
    pilot: Pilot,
    onChange: (pilot: Pilot) => void,
}> = ({pilot, onChange, }) => {
    const [showAddHouseholdGroup, setShowAddHouseholdGroup] = useState(false)
    const [showAddCompany, setShowAddCompany] = useState(false)
    const [showAddSolarFarm, setShowAddSolarFarm] = useState(false)
    const [showAddWindFarm, setShowAddWindFarm] = useState(false)
    const [showAddBiogasGenerator, setShowAddBiogasGenerator] = useState(false)
    const [showAddBattery, setShowAddBattery] = useState(false)
    const [showAddHeatStorage, setShowAddHeatStorage] = useState(false)
    const [showEditSupplierCost, setShowEditSupplierCost] = useState(false)

    const showAddDropdown = !(
        showAddHouseholdGroup ||
        showAddCompany ||
        showAddSolarFarm ||
        showAddWindFarm ||
        showAddBiogasGenerator ||
        showAddBattery ||
        showAddHeatStorage ||
        showEditSupplierCost
    )

    return (
        <>
            <Grid gap="2" pt="4">
                {showEditSupplierCost ?
                    <SupplierCostForm initialData={pilot.supplierCost} save={(supplierCost: SupplierCost) => onChange(pilot.withSupplierCost(supplierCost))} hide={() => setShowEditSupplierCost(false)}/>
                    :
                    <SupplierCostDisplay supplierCost={pilot.supplierCost} onEdit={() => setShowEditSupplierCost(true)}/>
                }

                <HouseholdsDisplayEdit pilot={pilot} onChange={onChange}/>
                <CompanyDisplayEdit pilot={pilot} onChange={onChange}/>
                <SolarFarmsDisplayEdit pilot={pilot} onChange={onChange}/>
                <WindFarmsDisplayEdit pilot={pilot} onChange={onChange}/>
                <BiogasGeneratorsDisplayEdit pilot={pilot} onChange={onChange}/>
                <BatteriesDisplayEdit pilot={pilot} onChange={onChange}/>
                <HeatStoragesDisplayEdit pilot={pilot} onChange={onChange}/>

                {showAddHouseholdGroup &&
                    <HouseholdForm save={(asset: HouseholdGroup) => onChange(pilot.create(asset))} hide={() => setShowAddHouseholdGroup(false)}/>}
                {showAddCompany &&
                    <CompanyForm save={(company: Company) => onChange(pilot.addCompany(company))} hide={() => setShowAddCompany(false)}/>}
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
                    <Flex gap=".5rem" justify="end">
                        <SaveButton pilot={pilot} />
                        <AddDropdown
                            addHouseholdGroup={() => setShowAddHouseholdGroup(true)}
                            addCompany={() => setShowAddCompany(true)}
                            addSolarFarm={() => setShowAddSolarFarm(true)}
                            addWindFarm={() => setShowAddWindFarm(true)}
                            addBattery={() => setShowAddBattery(true)}
                            addHeatStorage={() => setShowAddHeatStorage(true)}
                            addBiogasGenerator={() => setShowAddBiogasGenerator(true)}
                        />
                    </Flex>
                }
            </Grid>
        </>
    )
}
