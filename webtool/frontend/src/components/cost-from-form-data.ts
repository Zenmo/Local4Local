
import {AssetCost} from "local4local"

export const costFromFormData = (formData: FormData) => new AssetCost(
    parseFloat(formData.get("sdeSubsidy_eurpkWh") as string) || 0,
    parseFloat(formData.get("LCOE_eurpkWh") as string) || 0,
    parseFloat(formData.get("CAPEX_eur") as string) || 0,
    parseFloat(formData.get("interest_r") as string) * 0.01 || 0,
    parseFloat(formData.get("depreciationPeriod_y") as string) || 0,
    parseFloat(formData.get("OPEX_eurpy") as string) || 0,
);
