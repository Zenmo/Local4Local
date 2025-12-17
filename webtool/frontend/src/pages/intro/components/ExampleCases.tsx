import {FunctionComponent} from "react"
import {local4localGreen} from "../../../colors.ts"
import {LoadExampleCaseButton} from "./LoadExampleCaseButton.tsx"
import {solarFarmCase, windFarmCase, windSliceCase} from "local4local"
import {Flex} from "@radix-ui/themes"

export const ExampleCases: FunctionComponent = () => (
    <>
        <h3 style={{color: local4localGreen}}>
            Coöperatief zonnepark, leden zonder eigen zonnepanelen
        </h3>

        <Flex align="center" gap="1rem">
            <p>
                Een casus waarin de opwek van een zonnepark van 800kW geleverd wordt
                aan 200 leden zonder eigen zonnepanelen.
            </p>
            <div>
                <LoadExampleCaseButton exampleCase={solarFarmCase.get()} />
            </div>
        </Flex>

        <h3 style={{color: local4localGreen}}>
            Coöperatie met windenergie, leden met zonnepanelen
        </h3>

        <Flex align="center" gap="1rem">
            <p>
                Een casus waarin 10% van de productie van een 2.5MW windmolen (250kW)
                wordt gebruikt om stroom te leveren aan 350 klanten.
                50% van de leden heeft eigen zonnepanelen.
                Zij ontvangen een teruglever&shy;vergoeding van 5ct/kWh.
            </p>
            <div>
                <LoadExampleCaseButton exampleCase={windFarmCase.get()} />
            </div>
        </Flex>

        <h3 style={{color: local4localGreen}}>
            Coöperatie met zonnepark en ‘plakje wind’, leden zonder eigen zonnepanelen
        </h3>

        <Flex align="center" gap="1rem">
            <p>
                Een casus met een zonnepark van 800kW en een ‘plakje wind’ van 200kW.
                De coöperatie levert stroom aan 400 klanten, die geen eigen zonnepanelen panelen hebben.
            </p>
            <div>
                <LoadExampleCaseButton exampleCase={windSliceCase.get()} />
            </div>
        </Flex>
    </>
)
