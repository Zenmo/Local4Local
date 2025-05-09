import { Header } from "./header.tsx";
import { MainContent } from "./main-content.tsx";
import { Footer } from "./footer.tsx";

import '@radix-ui/themes/styles.css';
import "../style.css"
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
                
                /* fonts copied from local4local.nu */
                @font-face {
                    font-family: 'rubik-regular';
                    src: url('/rubik-regular.woff2') format('woff2');
                    font-weight: normal;
                    font-style: normal;
                    font-display: swap;
                }

                @font-face {
                    font-family: 'rubik-light';
                    src: url('/rubik-light.woff2') format('woff2');
                    font-weight: light;
                    font-style: normal;
                    font-display: swap;
                }

                --default-font-family: 'rubik-light';
                --heading-font-family: 'rubik-regular';
                --strong-font-family: 'rubik-regular';
                
                h1, h2, h3, h4, h5, h6 {
                    font-family: var(--heading-font-family), sans-serif;
                }
                
                strong, b {
                    font-family: var(--strong-font-family), sans-serif;
                }
                
                button {
                    font-family: var(--strong-font-family), sans-serif;
                }
            `}
        >
            <Header style={{marginTop: "auto"}}/>
            <MainContent />
            <Footer style={{marginTop: "auto"}}/>
        </Theme>
    );
}
