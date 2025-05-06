import {ComponentProps, FunctionComponent} from "react"

export const Header: FunctionComponent<ComponentProps<"h1">> = (props) => (
    <h1 css={{
        display: "flex",
        alignItems: "center",
        padding: ".4em .7em",
        margin: "0",
    }} {...props}>
        <a href="https://local4local.nu">
            <img src="/local4local-logo.svg" alt="Local4Local"/>
        </a>
        <span css={{
            paddingBottom: ".42em",
            paddingLeft: "1em",
        }}>Coöperatie Configurator</span>
    </h1>
)
