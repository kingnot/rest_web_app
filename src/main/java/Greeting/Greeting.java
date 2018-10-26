package Greeting;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

@Path("/hello")
public class Greeting {

    @GET
    @Path("/{param}")
    public Response getMsg(@PathParam("param") String parameter, @DefaultValue("Nothing to say") @QueryParam("value") String value) {

        String output = "Hello from " + parameter + ": " + value;

        return Response.status(200).entity(output).build();

    }

}
