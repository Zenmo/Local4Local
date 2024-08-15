import {FormEvent, FunctionComponent, useState} from "react"
import {Pilot, HouseholdGroup, SolarFarm, WindFarm} from "local4local"

export const ViewPilot: FunctionComponent<{ pilot: Pilot, setPilot: (pilot: Pilot) => void }> = ({pilot, setPilot}) => {
    const [showAddHouseholdGroup, setShowAddHouseholdGroup] = useState(false)
    const [showAddSolarFarm, setShowAddSolarFarm] = useState(false)
    const [showAddWindFarm, setShowAddWindFarm] = useState(false)

    const addHouseHold = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const householdGroup = new HouseholdGroup(
            formData.get("type") as string,
            parseInt(formData.get("households_n") as string),
            parseFloat(formData.get("hasPV_r") as string),
            parseFloat(formData.get("hasHeatPump_r") as string),
            parseFloat(formData.get("hasChargePoint_r") as string),
            parseFloat(formData.get("hasHomeBattery_r") as string),
            parseFloat(formData.get("annualBaseConsumptionAvg_kWh") as string),
        )

        setPilot(pilot.withHouseholdGroup(householdGroup))
        setShowAddHouseholdGroup(false)
    }

    const addSolarFarm = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const solarFarm = new SolarFarm(
            parseFloat(formData.get("nominalPower_kW") as string),
        )

        setPilot(pilot.withSolarFarms(solarFarm))
        setShowAddSolarFarm(false)
    }

    const addWindFarm = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const windFarm = new WindFarm(
            parseFloat(formData.get("nominalPower_kW") as string),
        )

        setPilot(pilot.withWindFarms(windFarm))
        setShowAddWindFarm(false)
    }

    return (
        <div>
            <h1>{pilot.name}</h1>
            <h2>Huishoudens</h2>
            <dt>Aantal groepen</dt>
            <dd>{pilot.householdGroups.asJsReadonlyArrayView().length}</dd>
            {pilot.householdGroups.asJsReadonlyArrayView().map((householdGroup, i) => (
                <div key={i}>
                    <div>groep {i + 1}</div>
                    <dt>Type</dt>
                    <dd>{householdGroup.type}</dd>
                    <dt>Aantal huishoudens</dt>
                    <dd>{householdGroup.households_n}</dd>
                    <dt>Percentage met zonnepanelen</dt>
                    <dd>{householdGroup.hasPV_r}</dd>
                    <dt>Percentage met warmtepomp</dt>
                    <dd>{householdGroup.hasHeatPump_r}</dd>
                    <dt>Percentage met laadpaal</dt>
                    <dd>{householdGroup.hasChargePoint_r}</dd>
                    <dt>Percentage met thuisbatterij</dt>
                    <dd>{householdGroup.hasHomeBattery_r}</dd>
                    <dt>Jaarlijks gemiddeld verbruik (kWh)</dt>
                    <dd>{householdGroup.annualBaseConsumptionAvg_kWh}</dd>
                </div>
            ))
            }
            {showAddHouseholdGroup && (
                <form onSubmit={addHouseHold}>
                    <div>
                        <label htmlFor="type">Type</label>
                        <input type="text" id="type" name="type"/>
                    </div>
                    <div>
                        <label htmlFor="households_n">Aantal huishoudens</label>
                        <input type="number" id="households_n" name="households_n"/>
                    </div>
                    <div>
                        <label htmlFor="hasPV_r">Percentage met zonnepanelen</label>
                        <input type="number" id="hasPV_r" name="hasPV_r"/>
                    </div>
                    <div>
                        <label htmlFor="hasHeatPump_r">Percentage met warmtepomp</label>
                        <input type="number" id="hasHeatPump_r" name="hasHeatPump_r"/>
                    </div>
                    <div>
                        <label htmlFor="hasChargePoint_r">Percentage met laadpaal</label>
                        <input type="number" id="hasChargePoint_r" name="hasChargePoint_r"/>
                    </div>
                    <div>
                        <label htmlFor="hasHomeBattery_r">Percentage met thuisbatterij</label>
                        <input type="number" id="hasHomeBattery_r" name="hasHomeBattery_r"/>
                    </div>
                    <div>
                        <label htmlFor="annualBaseConsumptionAvg_kWh">Jaarlijks gemiddeld verbruik (kWh)</label>
                        <input type="number" id="annualBaseConsumptionAvg_kWh" name="annualBaseConsumptionAvg_kWh"/>
                    </div>
                    <button type="submit">Opslaan</button>
                </form>
            )}
            <button onClick={() => setShowAddHouseholdGroup(true)}>Voeg groep toe</button>

            <h2>Zonneparken</h2>
            <dt>Aantal zonneparken</dt>
            <dd>{pilot.solarFarms.asJsReadonlyArrayView().length}</dd>
            {pilot.solarFarms.asJsReadonlyArrayView().map((solarFarm, i) => (
                <div key={i}>
                    <div>park {i + 1}</div>
                    <dt>Vermogen (kW)</dt>
                    <dd>{solarFarm.nominalPower_kW}</dd>
                </div>
            ))
            }
            {showAddSolarFarm && (
                <form onSubmit={addSolarFarm}>
                    <div>
                        <label htmlFor="nominalPower_kW">Vermogen (kW)</label>
                        <input type="number" id="nominalPower_kW" name="nominalPower_kW"/>
                    </div>
                    <button type="submit">Opslaan</button>
                </form>
            )}
            <button onClick={() => setShowAddSolarFarm(true)}>Voeg park toe</button>

            <h2>Windparken</h2>
            <dt>Aantal windparken</dt>
            <dd>{pilot.windFarms.asJsReadonlyArrayView().length}</dd>
            {pilot.windFarms.asJsReadonlyArrayView().map((windFarm, i) => (
                <div key={i}>
                    <div>park {i + 1}</div>
                    <dt>Vermogen (kW)</dt>
                    <dd>{windFarm.nominalPower_kW}</dd>
                </div>
            ))
            }
            {showAddWindFarm && (
                <form onSubmit={addWindFarm}>
                    <div>
                        <label htmlFor="nominalPower_kW">Vermogen (kW)</label>
                        <input type="number" id="nominalPower_kW" name="nominalPower_kW"/>
                    </div>
                    <button type="submit">Opslaan</button>
                </form>
            )}
            <button onClick={() => setShowAddWindFarm(true)}>Voeg park toe</button>
        </div>
    )
}
