import {FunctionComponent} from "react";
import {Pilot} from "local4local"
import {local4localDarkOrange} from "../../colors.ts";
import {Local4LocalButton} from "../Local4LocalButton.tsx";
import {NavLink} from "react-router";

export const LoadExampleCaseButton: FunctionComponent<{exampleCase: Pilot}> = ({exampleCase}) => (
    <Local4LocalButton
        asChild
        style={{
            fontSize: "1.5rem",
            height: "2.2rem",
            aspectRatio: "1 / 1",
            padding: "0",
            fontWeight: "bold",
            backgroundColor: local4localDarkOrange + "80",
        }}
    >
        <NavLink to={"/rekentool?pilot=" + encodeURIComponent(exampleCase.toJson())}>➔</NavLink>
    </Local4LocalButton>
)