const db = require("../db");

class CartController {
  addToCart(res, username, product_id, quantity) {
    db.query(
      `INSERT INTO shopping_cart (customer_id, product_id, quantity) VALUES(?, ?, ?)`,
      [username, product_id, quantity],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json({ message: "Item succesfully added" });
      }
    );
  }
  getCart(res, username) {
    db.query(
      `SELECT * FROM shopping_cart WHERE customer_id=?`,
      [username],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }

  deleteFromCart(res, username, product_id) {
    db.query(
        `DELETE FROM shopping_cart WHERE customer_id=? AND product_id=?`,
        [username, product_id],
        (err, result) => {
          if (err) res.send({ err });
          else res.status(200).json({ message: "Item deleted succesfully" });
        }
      );
  }
}

module.exports = CartController;
