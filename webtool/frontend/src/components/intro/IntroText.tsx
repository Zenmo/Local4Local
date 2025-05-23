import {FunctionComponent, PropsWithChildren} from "react"
import {ExternalLink} from "../ExternalLink.tsx"

const wikiLink = "https://local4local.notion.site/Hoe-maak-ik-een-grove-berekening-van-de-gelijktijdigheid-van-mijn-energiegemeenschap-17a0306d63c2805ba3c8d60695d662b5";

const H2: FunctionComponent<PropsWithChildren> = ({children}) => (
    <h2 style={{paddingTop: "1.5rem"}}>{children}</h2>
)

export const IntroText: FunctionComponent = () => {
    return (
        <div style={{
            padding: "1rem",
            margin: "2rem 1rem",
            textAlign: "justify",
            textAlignLast: "center",
            border: "1px solid #ccc",
            borderRadius: "7px",
            maxWidth: "50rem",
        }}>
            <h1>Simuleer je energiegemeenschap</h1>
            <p>
                Welkom bij de Local 4 Local Coöperatie Configurator. Met deze tool kun je je
                eigen energiegemeenschap nabouwen en simuleren. Je stelt in
                welke <strong>zonneparken</strong> en <strong>windmolens</strong> je beheert,
                wat de <strong>kostprijs</strong> is van de stroom die je opwekt, en aan
                welke klanten cq. <strong>leden</strong> je stroom gaat leveren.
                Daarbij kun je ook instellen of die leden zelf ook zonnepanelen hebben, of ze een <strong>elektrische
                auto</strong> opladen
                en of ze een <strong>warmtepomp</strong> hebben.
            </p>
            <H2>Gelijktijdigheid optimaliseren</H2>
            <p>
                De Coöperatie Configurator geeft je vervolgens inzicht in de
                totale <strong>opwek</strong> en <strong>verbruik</strong> van elektriciteit
                binnen de gemeenschap, en de <strong>gelijktijdigheid</strong> van die twee. Je kunt interactief
                veranderingen doorvoeren,
                zoals het bijplaatsen van zonnepanelen of windmolens, of het aanpassen van
                je ledenbestand.
            </p>
            <H2>Zorgvuldige prijsberekening</H2>
            <p>
                Op basis van de kostprijs van opgewekte elektriciteit,
                de inkoop en verkoop, en de weersdata en marktprijzen van elektriciteit uit 2023 wordt
                een inschatting gemaakt van de tarieven. We maken onderscheid in een tarief voor
                gelijktijdige en ongelijktijdige levering. Het tarief voor gelijktijdige levering heet <strong>Kostprijs+</strong>.
            </p>
            <p>
                Bij de bepaling van de tarieven wordt gezorgd dat de coöperatie en de leverancier
                <strong> precies break-even</strong> draaien.
                Zonder winstoogmerk, maar ook zonder verlies te draaien dus.
            </p>
            <H2>Lokaal samenwerken</H2>
            <p>
                Dit geeft je de mogelijkheid om jouw optimale <strong>energiegemeenschap</strong> te vormen, zowel op gebied
                van <strong>energiebalans</strong> en <strong>duurzaamheid</strong>, als ook met een
                aantrekkelijk <strong>energietarief</strong> voor je leden. Probeer het zelf
                uit, het is makkelijker dan je denkt!
            </p>
            <p style={{paddingTop: "1.5rem"}}>Meer informatie is te vinden in de <ExternalLink href={wikiLink}>local4local kennisbank</ExternalLink></p>
        </div>
    )
};
