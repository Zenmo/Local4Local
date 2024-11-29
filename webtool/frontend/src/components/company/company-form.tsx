import {FormEvent, FunctionComponent} from "react"
import {Company} from "local4local"
import {Button, Card, Text} from "@radix-ui/themes"
import {CompanyHeading} from "./company-heading.tsx"

export const CompanyForm: FunctionComponent<{
    initialData?: Company | null;
    save: (company: Company) => void,
    hide: () => void,
}> = ({initialData, save, hide}) => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form);
        const householdGroup = new Company(
            formData.get("name") as string,
            parseFloat(formData.get("annualElectricityConsumption_kWh") as string) || 0,
            parseFloat(formData.get("pvInstalled_kWp") as string) || 0,
            // parseInt(formData.get("chargePoints_n") as string) || 0,
        );
        save(householdGroup);
        hide();
    };

    return (
        <Card className="form-box">
            <CompanyHeading />
            <form onSubmit={onSubmit}>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="name">Naam</label>
                    <input className="form-input" type="text" id="name" name="name" defaultValue={initialData?.name} />
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="annualElectricityConsumption_kWh">Bruto jaarverbruik
                        [kWh]</label>
                    <input
                        className="form-input"
                        type="number"
                        id="annualElectricityConsumption_kWh"
                        name="annualElectricityConsumption_kWh"
                        defaultValue={initialData?.annualElectricityConsumption_kWh}
                        min={0} />
                </div>
                <div className="form-message">
                    <Text>
                        Verbruik achter de meter. Inclusief verbruik van eigen opwek.
                        {/*Exclusief verbruik van laadpalen.*/}
                    </Text>
                </div>
                <div className="radix-grid">
                    <label className="form-label" htmlFor="pvInstalled_kWp">Zonnepanelen [kWp]</label>
                    <input className="form-input" type="number" id="pvInstalled_kWp" name="pvInstalled_kWp"
                           defaultValue={initialData?.pvInstalled_kWp} min={0} />
                </div>
                {/*<div className="radix-grid">*/}
                {/*    <label className="form-label" htmlFor="chargePoints_n">Aantal laadpunten</label>*/}
                {/*    <input className="form-input" type="number" id="chargePoints_n" name="chargePoints_n"*/}
                {/*           defaultValue={initialData?.chargePoints_n} min={0} />*/}
                {/*</div>*/}
                <Button onClick={hide} style={{marginRight: '10px'}} highContrast variant="soft">Annuleren</Button>
                <Button type="submit">Opslaan</Button>
            </form>
        </Card>
    )
}
