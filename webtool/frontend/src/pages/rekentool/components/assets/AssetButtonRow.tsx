import {FunctionComponent} from "react"
import {Local4LocalButton} from "../../../../shared-components/buttons/Local4LocalButton.tsx"
import {local4localDarkBlue, local4localDarkOrange} from "../../../../colors.ts"


export const AssetButtonRow: FunctionComponent<{onClickCancel: () => void}> = ({onClickCancel}) => (
    <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem",
    }}>
        <Local4LocalButton
            type="button"
            onClick={onClickCancel}
            variant="outline"
            style={{
                boxShadow: `inset 0 0 0 1px ${local4localDarkBlue}`,
                color: local4localDarkBlue,
            }}
        >
            Annuleren
        </Local4LocalButton>
        <Local4LocalButton type="submit" style={{backgroundColor: local4localDarkOrange}}>Opslaan</Local4LocalButton>
    </div>
)
