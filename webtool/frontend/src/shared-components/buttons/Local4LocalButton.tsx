import {ComponentProps, FunctionComponent} from "react"
import {Button} from "@radix-ui/themes"

export const Local4LocalButton: FunctionComponent<ComponentProps<typeof Button>> = ({style, ...props}) => (
    <Button
        style={{
            cursor: "pointer",
            paddingRight: "1rem",
            borderRadius: "100rem",
            ...style,
        }}
        {...props} />
)

export {
    Local4LocalButton as Button
}
