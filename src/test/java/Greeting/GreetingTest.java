package Greeting;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import javax.ws.rs.core.Response;

class GreetingTest {

    @Test
    void getMsg() {
        Greeting greeting = new Greeting();
        Response res = greeting.getMsg("Fei", "Hi there!");
        String output = res.readEntity(String.class);
        assertEquals("Hello from Fei: Hi there!", output);
    }
}