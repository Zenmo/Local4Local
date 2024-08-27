import { GiHeatHaze } from "react-icons/gi";
import {Heading} from "@radix-ui/themes"

export const HeatStorageHeading = () => (
    <Heading as="h3" style={{paddingBottom: ".5rem"}}>
        <GiHeatHaze />
        &nbsp;
        Warmteopslag
    </Heading>
)
