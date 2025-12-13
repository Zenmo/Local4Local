package nu.local4local.backend

import nu.local4local.backend.resourcefully.ResourcefullyController
import nu.local4local.backend.resourcefully.ResourcefullyStorage
import org.http4k.core.Method
import org.http4k.core.Request
import org.http4k.core.Status
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class ResourcefullyControllerTest {

    @Test
    fun `resourcefully-report stores request`() {

        val controller = ResourcefullyController()
        val handler = controller.routes

        val json = """
        {
            "organizationName": "CocoTest",
            "personName": "Test",
            "email": "test@local4local.com",
            "scenarioDescription": null,
            "scenarioUrl": null,
            "year": 2023,
            "includeFeedInInCoopProduction": false,
            "supplierCost": null,
            "householdGroups": [],
            "companies": [],
            "windFarms": [],
            "solarFarms": [],
            "biogasGenerators": [],
            "batteries": [],
            "coopReport": null
        }
    """.trimIndent()


        val response = handler(
            Request(Method.POST, "/resourcefully-report").body(json)
        )

        assertEquals(Status.OK, response.status)
     }
}
