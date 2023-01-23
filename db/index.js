const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

connection.connect((err) => {
  if (err) throw err
  console.log("Connection to MySQL succesful")
})

module.exports = connection;
