import {Pilot, pilotFromJson, createDefaultStartPilot} from "local4local"

export function createDeeplink(pilot: Pilot): string {
    const url = new URL(window.location.origin + window.location.pathname)
    url.searchParams.append("pilot", pilot.toJson())

    return url.toString()
}

export function intializePilotFromDeeplink(): Pilot {
    try {
        const url = new URL(window.location.href)
        const jsonString = url.searchParams.get("pilot")
        if (!jsonString) {
            return createDefaultStartPilot()
        }
        return pilotFromJson(jsonString)
    } catch (e) {
        alert("Laden uit URL mislukt, zie console voor details")
        console.error(e)
        return createDefaultStartPilot()
    }
}
