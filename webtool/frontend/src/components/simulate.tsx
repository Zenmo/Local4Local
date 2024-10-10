import {FunctionComponent, PropsWithChildren} from "react"
import {Button} from "@radix-ui/themes"

export const Simulate: FunctionComponent<{
    onClickStart: (elementId: string) => void
}> = ({onClickStart}) => {
    const anylogicElementId = "anylogic"

    return (
        <>
            <Center>
                <Button type="button" onClick={() => onClickStart(anylogicElementId)}>
                    (her)start simulatie
                </Button>
            </Center>
            <div id={anylogicElementId} style={{width: "100%", aspectRatio: "8/5"}}/>
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
