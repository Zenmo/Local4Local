import { Header } from "./header.tsx";
import { MainContent } from "./main-content.tsx";
import { Footer } from "./footer.tsx";

import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";
import { css } from "@emotion/react";

export function App() {
    return (
        <Theme
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center; 
                justify-content: center;

                /* set variables for Radix UI */
                --cursor-button: pointer;
                --cursor-checkbox: pointer;
                --cursor-disabled: default;
                --cursor-link: pointer;
                --cursor-menu-item: pointer;
                --cursor-radio: pointer;
                --cursor-slider-thumb: grab;
                --cursor-slider-thumb-active: grabbing;
                --cursor-switch: pointer;
            `}
        >
            <Header />
            <MainContent
                css={css`
                    flex-grow: 1;
                    margin-top: 16px;
                `}
            />
            <Footer />
        </Theme>
    );
}
