import {FunctionComponent} from "react"

export const Simulate: FunctionComponent<{
    onClickStart: (elementId: string) => void
}> = ({onClickStart}) => {
    const anylogicElementId = "anylogic"

    return (
        <>
            <button type="button" onClick={() => onClickStart(anylogicElementId)}>Start simulatie</button>
            <div id={anylogicElementId} style={{height: "600px"}}/>
        </>
    )
}