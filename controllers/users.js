const db = require("../db");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRound = 10;

class UserController {
  register(username, password, email) {
    return new Promise((res, rej) => {
      bcrypt.hash(password, saltRound, (err, hash) => {
        if (err) rej(err);
        db.query(
          `INSERT INTO user (username, password, email, is_admin)
          VALUES(?, ?, ?, 'false')`,
          [username, hash, email]
        );
        res({ msg: "Created user" });
      });
    });
  }

  login(req, username, password) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT * FROM user WHERE username = ?;`,
        [username],
        (err, result) => {
          if (err) rej({ err });
          if (result.length) {
            bcrypt.compare(password, result[0].password, (error, response) => {
              if (response) {
                const id = result[0].username;
                const token = jwt.sign({ id }, process.env.SESSION_SECRET, {
                  expiresIn: 300,
                });
                req.session.user = {
                  username,
                  email: result[0].email || "",
                  name: result[0].name || "",
                  lastName: result[0].last_name || "",
                  birthdate: result[0].birthdate || "",
                  shippingAddress: result[0].shipping_address || "",
                  isAdmin: result[0].is_admin
                };

                res({ auth: true, token, result });
              } else rej({ error });
            });
          } else rej({ message: "User doesn't exist" });
        }
      );
    });
  }

  getUserInfo(username, password) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT * FROM user WHERE username = ?;`,
        [username],
        (err, result) => {
          if (err) rej({ err });
          if (result) {
            bcrypt.compare(password, result[0].password, (error, response) => {
              if (response) {
                res(result);
              } else rej({ message: "You need to log in first" });
            });
          }
        }
      );
    });
  }

  modifyUserData(username, name, lastName, birthdate, shippingAddress) {
    return new Promise((res, rej) => {
      db.query(
        `UPDATE user
        SET name=?,
        last_name=?,
        birthdate=?,
        shipping_address=?'
        WHERE username=?;`,
        [name, lastName, birthdate, shippingAddress, username],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }
}

module.exports = UserController;
