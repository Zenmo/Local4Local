import {FunctionComponent} from "react";
import {Pilot} from "local4local"
import {local4localDarkOrange} from "../../../colors.ts";
import {Local4LocalButton} from "../../../shared-components/buttons/Local4LocalButton.tsx";
import {NavLink} from "react-router";
import {FaArrowRight} from "react-icons/fa6"

export const LoadExampleCaseButton: FunctionComponent<{exampleCase: Pilot}> = ({exampleCase}) => (
    <Local4LocalButton
        asChild
        style={{
            fontSize: "1.3rem",
            height: "2.5rem",
            aspectRatio: "1 / 1",
            padding: "0",
            fontWeight: "bold",
            backgroundColor: local4localDarkOrange + "80",
        }}
    >
        <NavLink to={"/rekentool?pilot=" + encodeURIComponent(exampleCase.toJson())}>
            <FaArrowRight />
        </NavLink>
    </Local4LocalButton>
)
