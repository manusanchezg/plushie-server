const db = require("../db");

class Controller {
  getNewIn() {
    return new Promise((res, rej) => {
      db.query(
        `SELECT * FROM products ORDER BY product_id DESC LIMIT 20`,
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }

  getSale() {
    return new Promise((res, rej) => {
      db.query(
        `SELECT * FROM products ORDER BY price LIMIT 20`,
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }

  getCategories() {
    return new Promise((res, rej) => {
      db.query("SELECT * FROM categories", (err, result) => {
        if (err) rej({ err });
        else res(result);
      });
    });
  }

  getCategory(id) {
    db.query(`SELECT * FROM categories WHERE id=?`, [id], (err, result) => {
      return new Promise((res, rej) => {
        if (err) rej({ err });
        else res(result);
      });
    });
  }

  getVariations(id) {
    return new Promise((res, rej) => {

      db.query(
        `SELECT * FROM variations WHERE product_id=?`,
        [id],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
        );
      })
  }

  getStock(id, color, size) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT stock FROM variations WHERE product_id=? AND color=? AND size=?`,
        [id, color, size],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }

  getColor(id, size) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT color FROM variations WHERE product_id=? AND size=?`,
        [id, size],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }

  getSize(id, color) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT size FROM variations WHERE product_id=? AND color=?`,
        [id, color],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }

  getFilteredProducts(category_id, pageNumber = 0, numberOfItems = 12) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT * FROM products WHERE category_id=?
        LIMIT ? OFFSET ?`,
        [category_id, Number(numberOfItems), Number(pageNumber)],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }
}

module.exports = Controller;
