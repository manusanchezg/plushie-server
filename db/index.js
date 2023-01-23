const mysql = require("mysql");

const connection = mysql.createPool({
  connectionLimit: 1000,
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  debug: false
});

module.exports = connection;
