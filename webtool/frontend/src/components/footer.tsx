import {css} from "@emotion/react"

export const Footer = () => (
    <div css={css`
        padding: .5rem 1rem;
        //text-align: right;
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 1.5rem;
    `}>
        <a style={{marginBottom: "-.4rem"}} href="https://github.com/zenmo/local4local">
            <img style={{height: "1rem"}} src="/Git-Logo-2Color.svg" alt="Broncode" />
        </a>
        <span>
            Gemaakt door
            &nbsp;
            <a href="https://zenmo.com">Zenmo</a>
        </span>
    </div>
)
