
import {Pilot} from "local4local"
import cryptoRandomString from "crypto-random-string"

/**
 * Save pilot and return session id
 */
export const savePilot = async (pilot: Pilot): Promise<string> => {
    const sessionId = cryptoRandomString({length: 10, type: 'alphanumeric'})
    const url = import.meta.env.VITE_BACKEND_URL + "/pilots/" + sessionId
    const response = await fetch(url, {
        method: "PUT",
        body: pilot.toJson(),
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        throw new Error(`Error ${response.status} from PUT ${url}`)
    }

    return sessionId
}

