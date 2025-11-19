package nu.local4local.common

import kotlinx.serialization.json.Json

val json = Json {
    encodeDefaults = true
    prettyPrint = true
}
