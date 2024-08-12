package nu.local4local.client

import kotlin.test.Test
import kotlin.test.assertEquals

class ClientTest {
    @Test
    fun testPingPong() {
        val client = Client()
        val response = client.ping()
        assertEquals("pong", response)
    }
}
