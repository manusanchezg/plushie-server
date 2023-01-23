const db = require("../db");

class OrdersController {
  createNewOrder(username, total, orderDate, arrivedDate) {
    return new Promise((res, rej) => {
      db.query(
        `INSERT INTO orders(customer_id, total_price, order_date, arrived_date)
        VALUES(?, ?, ?, ?);`,
        [username, total, orderDate, arrivedDate],
        (err, result) => {
          if (err) rej(err);
          else res({ id: result.insertId });
        }
      );
    });
  }

  setProductsOrder(orderId, productId, quantity, color, size) {
    return new Promise((res, rej) => {
      db.query(
        `INSERT INTO orders_products(order_id, product_id, quantity, color, size)
        VALUES(?, ?, ?, ?, ?);`,
        [orderId, productId, quantity, color, size],
        (err, result) => {
          if (err) rej({ err });
          else res(200);
        }
      );
    });
  }

  getOrders(username) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT * FROM orders WHERE customer_id=?`,
        [username],
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  }

  getProductsInOrder(orderId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM orders_products WHERE order_id=?`,
        [orderId],
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
