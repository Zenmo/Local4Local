import {FunctionComponent, PropsWithChildren} from "react"
import {Button} from "@radix-ui/themes";

export const Simulate: FunctionComponent<{
    showSimulation: boolean,
    onClickStart: (elementId: string) => void
}> = ({showSimulation, onClickStart}) => {
    const anylogicElementId = "anylogic"

    return (
        <>
            {showSimulation ?
                <div id={anylogicElementId} style={{width: "100%", aspectRatio: "8/5"}}/>
                :
                <Center>
                    <Button type="button" onClick={() => onClickStart(anylogicElementId)}>
                        (her)start simulatie
                    </Button>
                </Center>
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
