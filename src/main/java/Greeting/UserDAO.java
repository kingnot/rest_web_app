package Greeting;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserDAO {

    public User create(User user) {
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = ConnectionHelper.getConnection();
            ps = conn.prepareStatement("INSERT INTO users (first_name, last_name, email_address, city, country, message, time_created) VALUES (?, ?, ?, ?, ?, ?, NOW())", new String[] { "ID" });
            ps.setString(1, user.getFirstName());
            ps.setString(2, user.getLastName());
            ps.setString(3, user.getEmailAddress());
            ps.setString(4, user.getCity());
            ps.setString(5, user.getCountry());
            ps.setString(6, user.getMessage());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            int id = rs.getInt(1);
            user.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        } finally {
            ConnectionHelper.close(conn);
        }

        return user;
    }
}
