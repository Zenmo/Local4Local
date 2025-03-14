import Animation = AnyLogicCloudClient.Animation

export async function getCoopReport(anyLogicAnimation: Animation) {
    return await anyLogicAnimation.callFunction("experiment.root.f_getCoopReport", [])
}
