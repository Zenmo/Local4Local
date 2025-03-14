import {FunctionComponent, useState} from "react"
import {ReactSubmitEvent, ResourcefullyForm, SubmitEventHandeler} from "./form.tsx"
import {Button, Dialog} from "@radix-ui/themes"
import {ResourcefullyExport, createExport, ExportMetadata} from "local4local"
import {Pilot} from "local4local"
import {createDeeplink} from "../deeplink.ts"
import Animation = AnyLogicCloudClient.Animation
import {getCoopReport} from "./preview.ts"

async function createExportObject(submitEvent: ReactSubmitEvent, pilot: Pilot, anyLogicAnimation: Animation): Promise<ResourcefullyExport> {
    const form = new FormData(submitEvent.currentTarget)
    const exportMetadata = new ExportMetadata(
        form.get("scenarioDescription") as string,
        form.get("personName") as string,
        form.get("organizationName") as string,
        form.get("email")  as string,
    );

    const coopReport = await getCoopReport(anyLogicAnimation)

    return createExport(pilot, exportMetadata, createDeeplink(pilot), coopReport)
}

export const ResourcefullyDialogContent: FunctionComponent<{
    anyLogicAnimation: Animation,
    pilot: Pilot,
}> = ({pilot, anyLogicAnimation}) => {
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

    let content = <ResourcefullyForm onSubmit={onSubmit} />

    if (submitted) {
        content = (
            <>
                <p>Opgestuurd naar Resourcefully</p>
                <Dialog.Close>
                    <Button>Sluiten</Button>
                </Dialog.Close>
            </>
        )
    }

    if (error) {
        content = (
            <>
                <p>Fout bij het opsturen: {error}</p>
                <Dialog.Close>
                    <Button>Sluiten</Button>
                </Dialog.Close>
            </>
        )
    }

    return content
}
