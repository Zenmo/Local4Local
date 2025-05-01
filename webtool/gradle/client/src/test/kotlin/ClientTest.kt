package nu.local4local.client

import nu.local4local.common.AssetCost
import nu.local4local.common.Pilot
import nu.local4local.common.WindFarm
import nu.local4local.common.idCounter
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class ClientTest {
    @Test
    fun testPingPong() {
        val client = Client()
        val response = client.ping()
        assertEquals("pong", response)
    }

    @Test
    fun testGetDefaultPilot() {
        val client = Client()
        val pilot = client.getPilot("startPilot")
        assertEquals("startPilot", pilot.name)
    }

    @Test
    fun testNonExistentPilot() {
        val client = Client()
        val exception = assertFailsWith<RuntimeException> {
            client.getPilot("nonExistentPilot")
        }
        assertEquals("Error 404 from GET ${client.baseUrl}/pilots/nonExistentPilot", exception.message)
    }

    @Test
    fun testAddPilot() {
        idCounter = 80
        val client = Client()
        client.savePilot(
            "addedSession",
            Pilot(
                name = "addedPilot", windFarms = listOf(
                    WindFarm(nominalPower_kW = 42.0, cost = AssetCost())
                )
            )
        )
        val pilot = client.getPilot("addedSession")

        assertEquals(42.0, pilot.windFarms.first().nominalPower_kW)
        assertEquals("WindFarm_80", pilot.windFarms.first().id)
    }
}
