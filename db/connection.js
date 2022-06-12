const mysql = require("mysql2");

// Connect to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "5228",
    database: "employees",
  },
  console.log("Connected to the employees database.")
);

module.exports = connection;
