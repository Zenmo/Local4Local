import {SunIcon} from "@radix-ui/react-icons"
import {Heading} from "@radix-ui/themes"

export const SolarFarmHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <SunIcon />
        &nbsp;
        Zonnepark
    </Heading>
)
