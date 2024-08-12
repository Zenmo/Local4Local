import { useState } from 'react'
import viteLogo from '/vite.svg'
import {Map} from "./components/Map.tsx"
import {Pilot} from "local4local"
import {css} from "@emotion/react"

function App() {
  const [count, setCount] = useState(0)

    const pilot = new Pilot("Pilot")

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} css={css`
              height: 6em;
              padding: 1.5em;
              will-change: filter;
              transition: filter 300ms;
              &:hover {
                  filter: drop-shadow(0 0 2em #646cffaa);
              }
              &:hover {
                  filter: drop-shadow(0 0 2em #61dafbaa);
              }
          `} alt="Vite logo" />
        </a>
      </div>
      <h1>Systeemontwerptool</h1>
      <Map />
        <h1>{pilot.name}</h1>

      <div css={{
          padding: "2em"
      }}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
