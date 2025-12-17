import {FunctionComponent} from "react"
import {IntroPage} from "./pages/intro/IntroPage.tsx"
import {RekentoolPage} from "./pages/rekentool/RekentoolPage.tsx"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import {pilotFromJson} from "local4local"
import {VideoTutorialPage} from "./pages/video-tutorial/VideoTutorialPage.tsx"

const router = createBrowserRouter([
    {
        path: "/",
        Component: IntroPage,
    },
    {
        path: "/rekentool",
        Component: RekentoolPage,
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
    },
    {
        path: "/video-tutorial",
        Component: VideoTutorialPage,
    },
]);

export const Router: FunctionComponent = () => {
    return (
        <RouterProvider router={router} />
    )
}
