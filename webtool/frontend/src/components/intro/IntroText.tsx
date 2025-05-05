import {FunctionComponent} from "react"

export const IntroText: FunctionComponent = () => {
    return (
        <div style={{
            padding: "1rem",
            margin: "2rem 1rem",
            textAlign: "justify",
            border: "1px solid #ccc",
            borderRadius: "7px",
            maxWidth: "70rem",
        }}>
            <p>
                Welkom bij de <strong>Local 4 Local Cooperatie Configurator</strong>. De Cooperatie Configurator is een tool
                waarmee je je
                eigen <strong>energiegemeenschap</strong> kan nabouwen en simuleren. Je stelt in
                welke <strong>zonneparken</strong> en <strong>windmolens</strong> je beheert,
                wat de <strong>kostprijs</strong> is van de stroom die je opwekt, en aan
                welke <strong>klanten</strong> cq. <strong>leden</strong> je stroom gaat leveren.
                Daarbij kun je ook instellen of die leden zelf ook <strong>zonnepanelen</strong> hebben, of ze een <strong>elektrische
                auto</strong> opladen
                en of ze een <strong>warmtepomp</strong> hebben.
            </p>
            <p>
                De Cooperatie Configurator geeft je vervolgens inzicht in de
                totale <strong>opwek</strong> en <strong>verbruik</strong> van elektriciteit
                binnen de gemeenschap, en de <strong>gelijktijdigheid</strong> van die twee. Je kunt interactief
                veranderingen doorvoeren,
                zoals het bijplaatsen van <strong>zonnepanelen</strong> of <strong>windmolens</strong>, of het aanpassen van
                je ledenbestand.
            </p>
            <p>
                Op basis van de <strong>kostprijs</strong> van opgewekte elektriciteit,
                de <strong>gelijktijdigheid</strong> van opwek en verbruik die wordt
                behaald, en de <strong>weersdata</strong> en <strong>marktprijzen</strong> van elektriciteit uit 2023 wordt
                ook een inschatting gemaakt van
                het <strong>kostprijs+ tarief</strong>.
            </p>
            <p>
                Bij de bepaling van de tarieven voor gelijktijdige en ongelijktijdige levering wordt gezorgd dat de cooperatie en de leverancier <strong>precies break-even </strong> draaien.
                Zonder winstoogmerk, maar ook zonder verlies te draaien dus.
            </p>
            <p>
                Dit geeft je de mogelijkheid om jouw optimale <strong>energiegemeenschap</strong> te vormen, zowel op gebied
                van <strong>energiebalans</strong> en <strong>duurzaamheid</strong>, als ook met een
                aantrekkelijk <strong>energietarief</strong> voor je leden. Probeer het zelf
                uit, het is makkelijker dan je denkt!
            </p>
        </div>
    )
};
