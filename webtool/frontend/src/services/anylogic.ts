import "https://anylogic.zenmo.com/assets/js-client-8.5.0/cloud-client.js"

// see https://anylogic.help/cloud/api/js.html
// declare const CloudClient: CloudClient

export const startSimulation = async (divId: string, sessionId: string): Promise<AnyLogicCloudClient.Animation> => {
    // API key is of user "publiek@zenmo.com"
    const apiKey = "17e0722f-25c4-4549-85c3-d36509f5c710"
    const modelId = "b9f2137d-b8cc-462f-85a4-fb2379f0eb39"

    const cloudClient = CloudClient.create(apiKey, "https://anylogic.zenmo.com")
    const model = await cloudClient.getModelById(modelId)
    const latestVersion = await cloudClient.getModelVersionByNumber(model, model.modelVersions.length)
    const inputs = cloudClient.createDefaultInputs(latestVersion)
    inputs.setInput("p_local4localBackendUrl", import.meta.env.VITE_ANYLOGIC_CALLBACK_URL)
    inputs.setInput("p_local4localSession", sessionId)
    const animation = await cloudClient.startAnimation(inputs, divId)
    animation.setSpeed(1)

    // Example how to call into AnyLogic
    // see https://anylogic.help/cloud/api/js.html#animation-class
    // animation.callFunction("experiment.root.API_function_setPVslider", [6])

    return animation
}
