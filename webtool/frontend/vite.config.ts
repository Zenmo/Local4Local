import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react({ jsxImportSource: '@emotion/react' })],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: "[name].js",
                assetFileNames: '[name].css',
            },
        },
    },
})
