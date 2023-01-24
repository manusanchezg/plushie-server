const mysql = require("mysql");

const connection = mysql.createConnection({
  connectionLimit: 1000,
  host: process.env.HOST,
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  debug: false
});

module.exports = connection;
