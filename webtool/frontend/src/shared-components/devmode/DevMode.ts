import {useState, createContext, useContext} from "react"

export const DevModeContext = createContext<DevModeControl>({
    isDevMode: false,
    toggleDevMode: () => {},
})

/**
 * Use this to read if dev mode is enabled.
 */
export const useIsDevMode = () => useContext(DevModeContext).isDevMode

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
