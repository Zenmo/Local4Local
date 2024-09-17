Local4Local Coöperatie Configurator
===

"Een eerlijke prijs voor lokaal opgewekte stroom en warmte."

A financial and energy calculation tool for Energy Cooperatives.

Live tool: [cooperatieconfigurator.local4local.nu](https://cooperatieconfigurator.local4local.nu)\
made by [Zenmo](https://zenmo.com)

Repository components
---

|                                          |                                                                                      |
|------------------------------------------|--------------------------------------------------------------------------------------|
| [anylogic](/anylogic)                    | Simulation code.                                                                     |
| [webtool](/anylogic)                     | Root of the webtool. Contains a Docker compose file to run locally.                  |
| ├─ [frontend](/webtool/frontend)         | SPA based on React and Vite.<br> Can build an artifact to embed in external website. 
| └─ [gradle](/webtool/gradle)             | Gradle main project (nu.local4local) with sub projects:                              
|    ├─ [common](/webtool/gradle/common)   | DTOs and serialization logic shared between frontend, backend and AnyLogic.          |
|    ├─ [backend](/webtool/gradle/backend) | Webserver based on Kotlin and http4k.                                                |
|    └─ [/client](/webtool/gradle/client)  | Library to connect from AnyLogic.                                                    |

Local environment
---

### Webtool

1\. cd to `webtool`

2\. Copy `ngrok.example.env` to `ngrok.env` and optionally fill it out.

3\. Install dependencies:

```
docker compose run --rm gradle-js
docker compose run --rm npm-base 
```

4\. Run components:

```
docker compose up -d backend frontend
```

### AnyLogic

(Todo)
