import {ComponentProps, FunctionComponent, PropsWithChildren} from "react"
import {local4localDarkOrange} from "../../colors.ts"
import {Local4LocalButton} from "./Local4LocalButton.tsx"

export const BigButton: FunctionComponent<PropsWithChildren<ComponentProps<typeof Local4LocalButton>>> = ({style, children, ...props}) => (
    <Local4LocalButton
        style={{
            height: "4rem",
            minWidth: "17rem",
            fontSize: "1.5rem",
            padding: "1.7rem 2.5rem",
            backgroundColor: local4localDarkOrange,
            alignSelf: "center",
            color: "white",
            ...style,
        }}
        {...props}
    >
        {children}
    </Local4LocalButton>
)
