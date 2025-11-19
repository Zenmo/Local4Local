import {householdGroupReportListFromJson, KtList, HouseholdGroupReport} from "local4local"
import Animation = AnyLogicCloudClient.Animation

export async function getCoopReport(anyLogicAnimation: Animation) {
    return await anyLogicAnimation.callFunction("experiment.root.f_getCoopReport", [])
}

export async function getHouseholdGroupReports(anyLogicAnimation: Animation): Promise<KtList<HouseholdGroupReport>> {
    const res = await anyLogicAnimation.callFunction("experiment.root.f_getHouseholdGroupAssets", [])
    return householdGroupReportListFromJson(JSON.stringify(res))
}
