import {FunctionComponent, PropsWithChildren} from "react"
import {Button, Heading} from "@radix-ui/themes";

export const Simulate: FunctionComponent<{
    showSimulation: boolean,
    onClickStart: (elementId: string) => void
}> = ({showSimulation, onClickStart}) => {
    const anylogicElementId = "anylogic"

    return (
        <>
        <Heading as="h3">
            Simulate
        </Heading>
        <Center>
            {showSimulation ?
                <div id={anylogicElementId} style={{width: "100%", aspectRatio: "8/5"}}/>
                :
                <div>
                    <Button type="button" onClick={() => onClickStart(anylogicElementId)}>
                        (her)start simulatie
                    </Button>
                </div>

            }
        </Center>
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
