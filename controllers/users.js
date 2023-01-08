const db = require("../db");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRound = 10;

class UserController {
  register(res, username, password, email) {
    bcrypt.hash(password, saltRound, (err, hash) => {
      if (err) console.log(err);
      db.query(
        `INSERT INTO user (username, password, email, is_admin)
                 VALUES(?, ?, ?, 'false')`,
        [username, hash, email]
      );
      res.status(201).json({ msg: "Created user" });
    });
  }

  login(req, res, username, password) {
    db.query(
      `SELECT * FROM user WHERE username = ?;`,
      [username],
      (err, result) => {
        if (err) res.send({ err });
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
              };

              res.status(200).json({ auth: true, token, result });
            } else res.status(404).json({ error });
          });
        } else res.status(404).json({ message: "User doesn't exist" });
      }
    );
  }

  getUserInfo(res, username, password) {
    db.query(
      `SELECT * FROM user WHERE username = ?;`,
      [username],
      (err, result) => {
        if (err) res.send({ err });
        if (result) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              res.status(201).send(result);
            } else
              res.status(403).json({ message: "You need to log in first" });
          });
        }
      }
    );
  }

  modifyUserData(res, username, name, lastName, birthdate, shippingAddress) {
    db.query(
      `UPDATE user
            SET name=?,
                last_name=?,
                birthdate=?,
                shipping_address=?'
                WHERE username=?;`,
      [name, lastName, birthdate, shippingAddress, username],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }
}

module.exports = UserController;
