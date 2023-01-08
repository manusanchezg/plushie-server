const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "trypassword",
  database: "ecommerce",
});

module.exports = connection;
