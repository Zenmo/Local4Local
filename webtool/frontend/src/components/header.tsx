
import local4localLogo from "../assets/local4local-logo.svg"

export const Header = () => (
    <h1 css={{
        display: "flex",
        alignItems: "center",
        padding: ".4em .7em",
        margin: "0",
    }}>
        <a href="https://local4local.nu">
            <img src={local4localLogo} alt="Local4Local"/>
        </a>
        <span css={{
            paddingBottom: ".42em",
            paddingLeft: "1em",
        }}>Coöperatie Configurator</span>
    </h1>
)