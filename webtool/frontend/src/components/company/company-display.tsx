import {FunctionComponent} from "react"
import {Card, DataList, Flex} from "@radix-ui/themes"
import {Company} from "local4local"
import {CompanyHeading} from "./company-heading.tsx"
import {CardMenu} from "./../card-menu.tsx"

const numberFormatter = new Intl.NumberFormat()

export const CompanyDisplay: FunctionComponent<{
    company: Company,
    onEdit: () => void,
    toDelete: () => void,
}> = ({company, onEdit, toDelete}) => {
    return (
        <Card>
            <Flex className="head-title">
                <CompanyHeading />
                <CardMenu onDelete={toDelete} onEdit={onEdit}/>
            </Flex>
            <DataList.Root style={{gridTemplateColumns: "3fr 1fr"}}>
                <DataList.Item>
                    <DataList.Label>Naam</DataList.Label>
                    <DataList.Value>{company.name}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>Bruto jaarverbruik</DataList.Label>
                    <DataList.Value>{numberFormatter.format(company.annualElectricityConsumption_kWh)} kWh</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                    <DataList.Label>Zonnepanelen</DataList.Label>
                    <DataList.Value>{numberFormatter.format(company.pvInstalled_kWp)} kWp</DataList.Value>
                </DataList.Item>
                {/*<DataList.Item>*/}
                {/*    <DataList.Label>Aantal laadpunten</DataList.Label>*/}
                {/*    <DataList.Value>{company.chargePoints_n}</DataList.Value>*/}
                {/*</DataList.Item>*/}
            </DataList.Root>
        </Card>
    )
}
