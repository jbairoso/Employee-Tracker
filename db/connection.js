const mysql = require("mysql2");

// Connect to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "5228",
    database: "employees",
  },
  console.log("Connected to the employees database.")
);

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
