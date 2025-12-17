import {Pilot} from "local4local"

export function createDeeplink(pilot: Pilot): string {
    const url = new URL(window.location.origin + window.location.pathname)
    url.searchParams.append("pilot", pilot.toJson())

    return url.toString()
}
