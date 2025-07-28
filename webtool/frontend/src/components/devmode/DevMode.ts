import {useState, createContext} from "react"

export const IsDevModeContext = createContext(false)

export type DevModeControl = {
    isDevMode: boolean,
    toggleDevMode: () => void,
}

export function useDevMode(): DevModeControl {
    const [isDevMode, setDevMode] = useState<boolean>(
        localStorage.getItem("devMode") === "true"
    )

    function toggleDevMode() {
        localStorage.setItem("devMode", (!isDevMode).toString())
        setDevMode(!isDevMode)
    }

    return {isDevMode, toggleDevMode}
}
