const db = require("../db");

class CartController {
  addToCart(username, product_id, quantity, color, size) {
    return new Promise((res, rej) => {
      db.query(
        `INSERT INTO shopping_cart (customer_id, product_id, quantity, color, size) VALUES(?, ?, ?, ?, ?)`,
        [username, product_id, quantity, color, size],
        (err, result) => {
          if (err) rej({ err });
          else res({ message: "Item succesfully added" });
        }
      );
    });
  }

  getCart(username) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT * FROM shopping_cart WHERE customer_id=?;`,
        [username],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }

  deleteFromCart(username, product_id) {
    return new Promise((res, rej) => {
      db.query(
        `DELETE FROM shopping_cart WHERE customer_id=? AND product_id=?`,
        [username, product_id],
        (err, result) => {
          if (err) rej({ err });
          else res({ message: "Item deleted succesfully" });
        }
      );
    });
  }

  updateCart(username, product_id, quantity, color, size) {
    return new Promise((res, rej) => {
      db.query(
        `UPDATE shopping_cart
        SET color=?,
        size=?
        quantity=?
        WHERE product_id=?
        AND customer_id=?`,
        [color, size, Number(quantity), product_id, username],
        (err, result) => {
          if (err) rej(err);
          else res({ message: "Item updated" });
        }
      );
    });
  }

  getTotalPurchase(username) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT SUM(p.price * sc.quantity) AS total 
        FROM shopping_cart AS sc
        INNER JOIN products as p
        ON p.product_id = sc.product_id
        WHERE customer_id=?`,
        [username],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }
}

module.exports = CartController;
