
const startSimulation = async () => {
    // API key is of AnyLogic user local4local@zenmo.com.
    // Task: put this behind a login.
    const apiKey = '8ff79c33-c035-4b73-a148-ed313361237f'
    const modelId = 'ae85f08e-f7f9-43b9-be0b-a22210bbe899'

    // CloudClient is imported old-school via <script> tag
    // see https://anylogic.help/cloud/api/js.html
    const cloudClient = CloudClient.create(apiKey, 'https://engine.holontool.nl')
    const model = await cloudClient.getModelById(modelId)
    const latestVersion = await cloudClient.getModelVersionById(model, model.modelVersions.at(-1))
    const inputs = cloudClient.createDefaultInputs(latestVersion)
    // set inputs here
    const animation = await cloudClient.startAnimation(inputs, 'anylogic')
    animation.setSpeed(1)

    // Example how to call into AnyLogic
    // see https://anylogic.help/cloud/api/js.html#animation-class
    // animation.callFunction('experiment.root.API_function_setPVslider', [6])
    return animation
}

startSimulation()
