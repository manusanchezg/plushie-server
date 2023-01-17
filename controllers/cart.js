const db = require("../db");

class CartController {
  addToCart(res, username, product_id, quantity, color, size) {
    db.query(
      `INSERT INTO shopping_cart (customer_id, product_id, quantity, color, size) VALUES(?, ?, ?, ?, ?)`,
      [username, product_id, quantity, color, size],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json({ message: "Item succesfully added" });
        console.log(err);
      }
    );
  }

  getCart(res, username) {
    db.query(
      `SELECT * FROM shopping_cart WHERE customer_id=?;`,
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

  updateCart(res, username, product_id, quantity, color, size) {
    db.query(
      `UPDATE shopping_cart
                SET color=?,
                    size=?
                    quantity=?
                    WHERE product_id=?
                    AND customer_id=?`,
      [color, size, Number(quantity), product_id, username],
      (err, result) => {
        if (err) res.send(err);
        else res.status(200).json({ message: "Item updated" });
      }
    );
  }

  getTotalPurchase(res, username) {
    db.query(
      `SELECT SUM(p.price * sc.quantity) AS total 
              FROM shopping_cart AS sc
              INNER JOIN products as p
              ON p.product_id = sc.product_id
              WHERE customer_id=?`,
      [username],
      (err, result) => {
        if (err) res.json({ err });
        else res.status(200).send(result);
      }
    );
  }
}

module.exports = CartController;
