import React from 'react'
import ReactDOM from 'react-dom/client'
import {Layout} from './layout/Layout.tsx'

ReactDOM.createRoot(document.getElementById("app")!).render(
    <React.StrictMode>
        <Layout />
    </React.StrictMode>,
)
