package nu.local4local.backend

import org.http4k.format.ConfigurableKotlinxSerialization
import org.http4k.format.asConfigurable
import org.http4k.format.withStandardMappings

object CocoKotlinxSerialization : ConfigurableKotlinxSerialization({
    ignoreUnknownKeys = false
    encodeDefaults = true
    asConfigurable().withStandardMappings().done()
})
