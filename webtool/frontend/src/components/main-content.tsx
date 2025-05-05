import {FunctionComponent} from "react"
import {IntroPage} from "./intro/IntroPage.tsx"
import {ConfigureAndSimulate} from "./ConfigureAndSimulate.tsx"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <IntroPage />,
    },
    {
        path: "/rekentool",
        element: <ConfigureAndSimulate />
    }
]);

export const MainContent: FunctionComponent = () => {
    return (
        <RouterProvider router={router} />
    )
}
