import {HomeIcon} from "@radix-ui/react-icons"
import {Heading} from "@radix-ui/themes"

export const HouseholdHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <HomeIcon />
        &nbsp;
        Huishoudens
    </Heading>
)
