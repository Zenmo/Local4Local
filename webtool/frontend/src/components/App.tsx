
import {Header} from "./header.tsx"
import {MainContent} from "./main-content.tsx"
import {Footer} from "./footer.tsx"

import '@radix-ui/themes/styles.css';
import {Theme} from "@radix-ui/themes"
import {css} from "@emotion/react"

export function App() {
    return (
        <Theme css={css`
            display: flex;
            flex-direction: column;
        `}>
            <Header />
            <MainContent css={css`
                flex-grow: 1;
            `}/>
            <Footer />
        </Theme>
    )
}
