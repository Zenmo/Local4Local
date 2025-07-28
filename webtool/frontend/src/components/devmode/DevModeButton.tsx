import {FunctionComponent} from "react"
import {IconButton} from "@radix-ui/themes"
import {FaBug} from "react-icons/fa"
import {DevModeControl} from "./DevMode.ts"

export const DevModeButton: FunctionComponent<{devModeControl: DevModeControl}> = ({
    devModeControl: {
        isDevMode,
        toggleDevMode,
    }
}) => {
    const color = isDevMode ? "green" : "lightgrey"

    return (
        <IconButton
            style={{
                backgroundColor: "transparent",
            }}
            onClick={toggleDevMode}
        >
            <FaBug color={color} />
        </IconButton>
    )
}