import {FunctionComponent, useState} from "react"
import {Company, Pilot} from "local4local"
import {CompanyDisplay} from "./company-display.tsx";
import {CompanyForm} from "./company-form.tsx"

export const CompanyDisplayEdit: FunctionComponent<{
    pilot: Pilot,
    onChange: (pilot: Pilot) => void,
}> = ({pilot, onChange}) => {
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    return (
        <>
            {pilot.companies.asJsReadonlyArrayView().map((it, i) =>
                selectedCompany == it ? (
                <CompanyForm
                    key={"householdGroup_" + i}
                    save={(newCompany: Company) => {
                        onChange(pilot.replaceCompany(it, newCompany))
                        setSelectedCompany(null);
                    }}
                    hide={() => {
                        setSelectedCompany(null);
                    }}
                    initialData={selectedCompany}
                />
            ) : (
                <CompanyDisplay
                    key={i}
                    company={it}
                    onEdit={() => { setSelectedCompany(it)}}
                    toDelete={() => onChange(pilot.removeCompany(it))}
                />
            )
        )}
        </>
    )
}
