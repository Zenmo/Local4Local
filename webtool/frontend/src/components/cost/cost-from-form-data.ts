
import {AssetCost, PPAType} from "local4local"

export const costFromFormData = (formData: FormData) => {
    const ppaTypeString = formData.get("ppaType") as string

    return new AssetCost(
        ppaTypeString ? PPAType.valueOf(ppaTypeString) : undefined,
        parseFloat(formData.get("sdeAanvraagbedrag_eurpkWh") as string) || 0.1,
        parseFloat(formData.get("sdeBasisenergieprijs_eurpkWh") as string) || 0.04,
        parseFloat(formData.get("LCOE_eurpkWh") as string) || 0.1,
        parseFloat(formData.get("CAPEX_eur") as string) || 400000,
        parseFloat(formData.get("interest_r") as string) * 0.01 || 6,
        parseFloat(formData.get("depreciationPeriod_y") as string) || 15,
        parseFloat(formData.get("OPEX_eurpy") as string) || 8000,
    );
}
