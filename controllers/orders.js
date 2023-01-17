const db = require("../db");

class OrdersController {
  createNewOrder(res, username, total, orderDate, arrivedDate) {
    db.query(
      `INSERT INTO orders(customer_id, total_price, order_date, arrived_date)
                  VALUES(?, ?, ?, ?);`,
      [username, total, orderDate, arrivedDate],
      (err, result) => {
        if (err) res.json(err);
        else res.status(200).json({ id: result.insertId });
      }
    );
  }

  setProductsOrder(res, orderId, productId, quantity, color, size) {
    db.query(
      `INSERT INTO orders_products(order_id, product_id, quantity, color, size)
              VALUES(?, ?, ?, ?, ?);`,
      [orderId, productId, quantity, color, size],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200);
      }
    );
  }

  getOrders(res, username) {
    db.query(
      `SELECT * FROM orders WHERE customer_id=?`,
      [username],
      (err, result) => {
        if (err) res.json(err);
        else res.status(200).json(result);
      }
    );
  }

  getProductsInOrder(orderId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM orders_products WHERE order_id=?`, [orderId],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }

  getStatus(statusId) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM status WHERE id=?`, [statusId], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

module.exports = OrdersController;
