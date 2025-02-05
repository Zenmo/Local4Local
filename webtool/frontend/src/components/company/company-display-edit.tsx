import {FunctionComponent, useState} from "react"
import {Company, Pilot} from "local4local"
import {CompanyDisplay} from "./company-display.tsx";
import {CompanyForm} from "./company-form.tsx"

export const CompanyDisplayEdit: FunctionComponent<{
    pilot: Pilot,
    titles: {[key: string]: {name: string, title: string, infoText: string}}
    onChange: (pilot: Pilot) => void,
}> = ({pilot, titles, onChange}) => {
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
                    titles={titles}
                />
            ) : (
                <CompanyDisplay
                    key={i}
                    company={it}
                    titles={titles}
                    onEdit={() => { setSelectedCompany(it)}}
                    toDelete={() => onChange(pilot.removeCompany(it))}
                />
            )
        )}
        </>
    )
}
