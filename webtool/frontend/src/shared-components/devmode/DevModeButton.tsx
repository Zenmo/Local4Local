import {FunctionComponent, useContext} from "react"
import {IconButton} from "@radix-ui/themes"
import {FaBug} from "react-icons/fa"
import {DevModeContext} from "./DevMode.ts"

export const DevModeButton: FunctionComponent = () => {
    const {isDevMode, toggleDevMode} = useContext(DevModeContext)
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
