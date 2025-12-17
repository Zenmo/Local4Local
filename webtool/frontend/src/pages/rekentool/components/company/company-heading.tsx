import {Heading} from "@radix-ui/themes"
import {HiOutlineBuildingOffice2} from "react-icons/hi2"

export const CompanyHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <HiOutlineBuildingOffice2 />
        &nbsp;
        Bedrijf
    </Heading>
)
