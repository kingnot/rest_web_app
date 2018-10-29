package Greeting;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class HelloWorldTest {

    @Test
    void getClichedMessage() {
        HelloWorld greeting = new HelloWorld();
        String msg = greeting.getClichedMessage();
        assertEquals("Hello World", msg);
    }
}