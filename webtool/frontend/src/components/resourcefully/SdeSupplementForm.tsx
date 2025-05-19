import {ComponentProps, Fragment, FunctionComponent} from "react"
import {PilotState} from "../../services/use-pilot.ts"
import {Callout, Flex} from "@radix-ui/themes"
import {InfoCircledIcon} from "@radix-ui/react-icons"
import {SdeAanvraagBedragFormRow, SdeBasisenergiePrijsFormRow} from "../cost/SdeForm.tsx"
import {WindFarmHeading} from "../wind-farm/wind-farm.tsx"
import {SolarFarmHeading} from "../solarfarm/solarfarm-heading.tsx"
import {BiogasGeneratorHeading} from "../assets/biogas-generator.tsx"

export const SdeSupplementForm: FunctionComponent<{
    pilotState: PilotState,
}> = ({pilotState}) => {
    const [pilot, setPilot] = pilotState

    if (!pilot.hasFixedPriceAssets()) {
        return null
    }

    const ppaWindFarms = pilot.getFixedPriceWindFarms().asJsReadonlyArrayView()
    const ppaSolarFarms = pilot.getFixedPriceSolarFarms().asJsReadonlyArrayView()
    const ppaBiogasGenerators = pilot.getFixedPriceBiogasGenerators().asJsReadonlyArrayView()

    return (
        <Flex direction="column">
            <SdeSupplementNotice style={{margin: "1rem"}}/>
            {ppaWindFarms.map(windFarm => (
                <Fragment key={windFarm.id}>
                    <WindFarmHeading />
                    <SdeAanvraagBedragFormRow
                        value={windFarm.cost.sdeAanvraagbedrag_eurpkWh || 0}
                        onInput={event => setPilot(
                            pilot.replaceWindFarmByRef(windFarm, windFarm.withSdeAanvraagbedrag_eurpkWh(
                                parseFloat(event.target.value) || 0
                            ))
                        )}
                    />
                    <SdeBasisenergiePrijsFormRow
                        value={windFarm.cost.sdeBasisenergieprijs_eurpkWh || 0}
                        onInput={event => setPilot(
                            pilot.replaceWindFarmByRef(windFarm, windFarm.withSdeBasisenergieprijs_eurpkWh(
                                parseFloat(event.target.value) || 0
                            ))
                        )} />
                </Fragment>
            ))}
            {ppaSolarFarms.map(solarFarm => (
                <Fragment key={solarFarm.id}>
                    <SolarFarmHeading />
                    <SdeAanvraagBedragFormRow
                        value={solarFarm.cost.sdeAanvraagbedrag_eurpkWh || 0}
                        onInput={event => setPilot(
                            pilot.replaceSolarFarmByRef(solarFarm, solarFarm.withSdeAanvraagbedrag_eurpkWh(
                                parseFloat(event.target.value) || 0
                            ))
                        )}
                    />
                    <SdeBasisenergiePrijsFormRow
                        value={solarFarm.cost.sdeBasisenergieprijs_eurpkWh || 0}
                        onInput={event => setPilot(
                            pilot.replaceSolarFarmByRef(solarFarm, solarFarm.withSdeBasisenergieprijs_eurpkWh(
                                parseFloat(event.target.value) || 0
                            ))
                        )} />
                </Fragment>
            ))}
            {ppaBiogasGenerators.map(biogasGenerator => (
                <Fragment key={biogasGenerator.id}>
                    <BiogasGeneratorHeading />
                    <SdeAanvraagBedragFormRow
                        value={biogasGenerator.cost.sdeAanvraagbedrag_eurpkWh || 0}
                        onInput={event => setPilot(
                            pilot.replaceBiogasGeneratorByRef(biogasGenerator, biogasGenerator.withSdeAanvraagbedrag_eurpkWh(
                                parseFloat(event.target.value) || 0
                            ))
                        )}
                    />
                    <SdeBasisenergiePrijsFormRow
                        value={biogasGenerator.cost.sdeBasisenergieprijs_eurpkWh || 0}
                        onInput={event => setPilot(
                            pilot.replaceBiogasGeneratorByRef(biogasGenerator, biogasGenerator.withSdeBasisenergieprijs_eurpkWh(
                                parseFloat(event.target.value) || 0
                            ))
                        )} />
                </Fragment>
            ))}
        </Flex>
    )
}

const SdeSupplementNotice: FunctionComponent<ComponentProps<typeof Callout.Root>> = ({style, ...props}) => (
    <Callout.Root color="blue" style={{maxWidth: "30rem", ...style}} {...props}>
        <Callout.Icon>
            <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
            U heeft bij de opwek voor een fixed-price PPA gekozen.
            Voor de extra analyse is het nodig om de SDE-tarieven op te geven.
        </Callout.Text>
    </Callout.Root>
)
