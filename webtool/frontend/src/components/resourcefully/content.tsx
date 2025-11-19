import {FunctionComponent, useState} from "react"
import {ReactSubmitEvent, ResourcefullyForm, SubmitEventHandeler} from "./form.tsx"
import {ResourcefullyExport, createExport, ExportMetadata} from "local4local"
import {Pilot} from "local4local"
import {createDeeplink} from "../deeplink.ts"
import Animation = AnyLogicCloudClient.Animation
import {getCoopReport, getHouseholdGroupReports} from "./preview.ts"
import {PilotState} from "../../services/use-pilot.ts"
import {DialogButtonRow} from "./DialogButtonRow.tsx"

async function createExportObject(submitEvent: ReactSubmitEvent, pilot: Pilot, anyLogicAnimation: Animation): Promise<ResourcefullyExport> {
    const form = new FormData(submitEvent.currentTarget)
    const exportMetadata = new ExportMetadata(
        form.get("scenarioDescription") as string,
        form.get("personName") as string,
        form.get("organizationName") as string,
        form.get("email")  as string,
    );

    const coopReport = await getCoopReport(anyLogicAnimation)
    const householdGroupReports = await getHouseholdGroupReports(anyLogicAnimation)

    return createExport(pilot, exportMetadata, createDeeplink(pilot), coopReport, householdGroupReports)
}

export const ResourcefullyDialogContent: FunctionComponent<{
    anyLogicAnimation: Animation,
    pilotState: PilotState,
}> = ({pilotState, anyLogicAnimation}) => {
    const [pilot] = pilotState
    const [error, setError] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const onSubmit: SubmitEventHandeler = async (submitEvent) => {
        submitEvent.preventDefault()
        const resourceFullyExport = await createExportObject(submitEvent, pilot, anyLogicAnimation)

        const action = (submitEvent.nativeEvent.submitter as HTMLButtonElement).value
        if (action === "preview") {
            const x = window.open() as Window
            x.document.open();
            x.document.write('<html><body><pre>' + resourceFullyExport.toJson() + '</pre></body></html>');
            x.document.close();
        } else {
            const url = import.meta.env.VITE_BACKEND_URL + "/resourcefully-report"
            const response = await fetch(url, {
                method: "POST",
                body: resourceFullyExport.toJson(),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setSubmitted(true)
            if (!response.ok) {
                setError(`${response.status} ${response.body}`)
            }
        }
    }

    let content = <ResourcefullyForm
        onSubmit={onSubmit}
        pilotState={pilotState} />

    if (!pilot.hasGenerationAssets()) {
        return (
            <>
                <p>De gevoeligheidsanalyse is alleen mogelijk wanneer de coöperatie eigen opwek heeft.</p>
                <p>Voeg opwekassets toe en probeer het opnieuw.</p>
                <DialogButtonRow />
            </>
        )
    }

    if (submitted) {
        content = (
            <>
                <p>Opgestuurd naar Resourcefully</p>
                <DialogButtonRow />
            </>
        )
    }

    if (error) {
        content = (
            <>
                <p>Fout bij het opsturen: {error}</p>
                <DialogButtonRow />
            </>
        )
    }

    return content
}
