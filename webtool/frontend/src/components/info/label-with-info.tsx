import {FunctionComponent, ReactElement} from "react"
import { Text } from "@radix-ui/themes"
import {InfoButton} from "./info-button.tsx"

interface LabelInfoProps {
    data: {
        name: string;
        title: string;
        infoText?: string | ReactElement;
    };
}

export const LabelWithInfo: FunctionComponent<LabelInfoProps> = ({ data: {name, title, infoText} }) => {
    return (
        <label className="form-label" css={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            color: "black",
        }} htmlFor={name}>
            <Text>{title}</Text>
            {infoText && <InfoButton content={infoText} />}
        </label>
    )
}

export const DivWithInfo: FunctionComponent<LabelInfoProps> = ({ data: {title, infoText} }) => {
    return (
        <div className="form-label" css={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            color: "black",
        }}>
            <Text>{title}</Text>
            {infoText && <InfoButton content={infoText} />}
        </div>
    )
}
