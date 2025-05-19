import {Dispatch, SetStateAction, useState} from "react"
import {Pilot} from "local4local"
import {intializePilotFromDeeplink} from "../components/deeplink.ts"

// Can't use ReturnType<typeof useState> because of function overloads
export type PilotState = [Pilot, Dispatch<SetStateAction<Pilot>>]

export function usePilot(): PilotState {
    return useState<Pilot>(intializePilotFromDeeplink)
}
