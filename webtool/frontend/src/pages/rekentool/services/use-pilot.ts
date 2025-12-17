import {Dispatch, SetStateAction, useState} from "react"
import {Pilot, createDefaultStartPilot} from "local4local"

// Can't use ReturnType<typeof useState> because of function overloads
export type PilotState = [Pilot, Dispatch<SetStateAction<Pilot>>]

export function usePilot(initialPilot?: Pilot): PilotState {
    return useState<Pilot>(initialPilot ?? createDefaultStartPilot)
}
