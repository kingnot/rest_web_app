package Greeting;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class MessageDAO {

    public Message create(Message message) {
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = ConnectionHelper.getConnection();
            ps = conn.prepareStatement("INSERT INTO messages (content, time_created) VALUES (?, NOW())", new String[] { "ID" });
            ps.setString(1, message.getContent());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            int id = rs.getInt(1);
            message.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        } finally {
            ConnectionHelper.close(conn);
        }

        return message;
    }
}
