import {FunctionComponent, useState} from "react"
import {EmotionProps} from "../services/types"
import {IntroPage} from "./intro/IntroPage.tsx"
import {ConfigureAndSimulate} from "./ConfigureAndSimulate.tsx"

export const MainContent: FunctionComponent<EmotionProps> = ({css, className}) => {
    const [showConfigSimulate, setShowConfigSimulate] = useState(false)

    return (
        <>
            {showConfigSimulate ?
                <ConfigureAndSimulate css={css} className={className} />
                :
                <IntroPage onClickStart={() => setShowConfigSimulate(true)} css={css} className={className} />
            }
        </>
    )
}
