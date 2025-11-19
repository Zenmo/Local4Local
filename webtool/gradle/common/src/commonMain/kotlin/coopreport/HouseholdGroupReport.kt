package nu.local4local.common.coopreport

import kotlinx.serialization.Serializable
import nu.local4local.common.json
import kotlin.js.JsExport
import kotlin.jvm.JvmStatic

@JsExport
fun householdGroupReportListFromJson(jsonString: String): List<HouseholdGroupReport> = json.decodeFromString(jsonString)

@JsExport
@Serializable
data class HouseholdGroupReport(
    val id: String,
    val avgPvSystemPower_kWp: Double,
    val avgHomeBatteryCapacity_kWh: Double,
    val avgHomeBatteryPower_kW: Double,
    val pvHouseholdsWithHomeBattery_fr: Double,
    val nonPvHouseholdsWithHomeBattery_fr: Double,
) {
    @JsExport.Ignore
    companion object {
        @JvmStatic
        fun listToJson(list: List<HouseholdGroupReport>): String = json.encodeToString(list)
    }

    @JsExport.Ignore
    class Builder {
        var id: String? = null
            private set
        var avgPvSystemPower_kWp: Double? = null
            private set
        var avgHomeBatteryCapacity_kWh: Double? = null
            private set
        var avgHomeBatteryPower_kW: Double? = null
            private set
        var pvHouseholdsWithHomeBattery_fr: Double? = null
            private set
        var nonPvHouseholdsWithHomeBattery_fr: Double? = null
            private set

        fun build() = HouseholdGroupReport(
            id!!,
            avgPvSystemPower_kWp!!,
            avgHomeBatteryCapacity_kWh!!,
            avgHomeBatteryPower_kW!!,
            pvHouseholdsWithHomeBattery_fr!!,
            nonPvHouseholdsWithHomeBattery_fr!!,
        )

        fun id(id: String) = apply {
            this.id = id
        }

        fun avgPvSystemPower_kWp(avgPvSystemPower_kWp: Double) = apply {
            this.avgPvSystemPower_kWp = avgPvSystemPower_kWp
        }

        fun avgHomeBatteryCapacity_kWh(avgHomeBatteryCapacity_kWh: Double) = apply {
            this.avgHomeBatteryCapacity_kWh = avgHomeBatteryCapacity_kWh
        }

        fun avgHomeBatteryPower_kW(avgHomeBatteryPower_kW: Double) = apply {
            this.avgHomeBatteryPower_kW = avgHomeBatteryPower_kW
        }

        fun pvHouseholdsWithHomeBattery_fr(pvHouseholdsWithHomeBattery_fr: Double) = apply {
            this.pvHouseholdsWithHomeBattery_fr = pvHouseholdsWithHomeBattery_fr
        }

        fun nonPvHouseholdsWithHomeBattery_fr(nonPvHouseholdsWithHomeBattery_fr: Double) = apply {
            this.nonPvHouseholdsWithHomeBattery_fr = nonPvHouseholdsWithHomeBattery_fr
        }
    }

    fun toJson(): String = json.encodeToString(this)
}
