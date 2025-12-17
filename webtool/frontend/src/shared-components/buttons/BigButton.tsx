import {ComponentProps, FunctionComponent, PropsWithChildren} from "react"
import {local4localLightGreen} from "../../colors.ts"
import {Local4LocalButton} from "./Local4LocalButton.tsx"

export const BigButton: FunctionComponent<PropsWithChildren<ComponentProps<typeof Local4LocalButton>>> = ({style, children, ...props}) => (
    <Local4LocalButton
        style={{
            height: "4rem",
            width: "17rem",
            fontSize: "1.5rem",
            padding: "1.7rem",
            backgroundColor: local4localLightGreen,
            alignSelf: "center",
            color: "black",
            fontWeight: "bold",
            ...style,
        }}
        {...props}
    >
        {children}
    </Local4LocalButton>
)
