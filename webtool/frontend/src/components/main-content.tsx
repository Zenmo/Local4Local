import {FunctionComponent} from "react"
import {IntroPage} from "./intro/IntroPage.tsx"
import {ConfigureAndSimulateLoader} from "./ConfigureAndSimulate.tsx"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import {pilotFromJson} from "local4local"

const router = createBrowserRouter([
    {
        path: "/",
        element: <IntroPage />,
    },
    {
        path: "/rekentool",
        element: <ConfigureAndSimulateLoader />,
        loader: ({request: {url}}) => {
            const parsedUrl = URL.parse(url)
            if (!parsedUrl) {
                throw new Error(`Invalid URL ${url}`)
            }
            const pilotString = parsedUrl.searchParams.get("pilot")
            const result: any = {}
            if (pilotString) {
                try {
                    result.pilot = pilotFromJson(pilotString)
                } catch (e) {
                    alert("Laden uit URL mislukt, zie console voor details")
                    console.error(e)
                }
            }
            return result
        }
    }
]);

export const MainContent: FunctionComponent = () => {
    return (
        <RouterProvider router={router} />
    )
}
