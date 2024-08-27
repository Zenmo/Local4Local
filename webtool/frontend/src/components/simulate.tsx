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
            <div id={anylogicElementId} style={{height: "50rem"}}/>
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