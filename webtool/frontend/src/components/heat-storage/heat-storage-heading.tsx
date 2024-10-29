import {Heading} from "@radix-ui/themes"
import {GiHeatHaze} from "react-icons/gi"

export const HeatStorageHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <GiHeatHaze />
        &nbsp;
        Warmteopslag
    </Heading>
)
