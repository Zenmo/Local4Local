import { Header } from "./header.tsx";
import { Footer } from "./footer/Footer.tsx";
import '@radix-ui/themes/styles.css';
import "./style.css"
import {FunctionComponent, PropsWithChildren} from "react"

export const Layout: FunctionComponent<PropsWithChildren> = ({children}) => (
    <>
        <Header style={{marginTop: "auto"}}/>
        {children}
        <Footer style={{marginTop: "auto"}} />
    </>
)
