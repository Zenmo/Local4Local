import {css} from "@emotion/react"

export const Footer = () => (
    <div css={css`
        padding: .5rem 1rem;
        text-align: right;
    `}>
        Gemaakt door
        &nbsp;
        <a href="https://zenmo.com">Zenmo</a>
    </div>
)
