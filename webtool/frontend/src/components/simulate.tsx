import {FunctionComponent, PropsWithChildren} from "react"
import {Intro} from "./intro.tsx";

export const Simulate: FunctionComponent<{
    showInfo: boolean,
}> = ({showInfo}) => {

    const anylogicElementId = "anylogic"

    return (
        <>
            {showInfo ? (
                <Center>
                    <div id={anylogicElementId} style={{width: "100%", aspectRatio: "8/5"}}/>
                </Center>
                ) :
                <div>
                    {/* Content that should be shown/hidden based on Configure settings */}
                    <Intro />
                </div>
            }
        </>
    )
}

const Center: FunctionComponent<PropsWithChildren> = ({children}) => (
    <div css={{
        display: "flex",
        justifyContent: "center",
        padding: ".7rem",
    }}>
        {children}
    </div>
)
