package Greeting;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ResourceBundle;

public class ConnectionHelper {
    private static ConnectionHelper instance;

    private ConnectionHelper()
    {
        String driver = null;
        try {
            /* Get Bundle is Not working for some reason
            Class.forName("com.mysql.jdbc.Driver");
            url = "jdbc:mysql://localhost/directory?user=root";
            ResourceBundle bundle = ResourceBundle.getBundle("Greeting.properties");
            driver = bundle.getString("jdbc.driver");
            Class.forName(driver);
            url = bundle.getString("jdbc.url");
            username = bundle.getString("jdbc.username");
            password = bundle.getString("jdbc.password");
            */
            driver = "com.mysql.jdbc.Driver";
            Class.forName(driver).newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        if (instance == null) {
            instance = new ConnectionHelper();
        }
        try {
            return DriverManager.getConnection("jdbc:mysql://localhost:3306/restwebapp?autoReconnect=true&useSSL=false&user=admin&password=admin");
        } catch (SQLException e) {
            throw e;
        }
    }

    public static void close(Connection connection)
    {
        try {
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
