const mysql = require("mysql");

const connection = mysql.createPool({
  connectionLimit: 1000,
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  debug: false
});

connection.connect((err) => {
  if (err) throw err
  console.log("Connection to MySQL succesful")
})

module.exports = connection;
