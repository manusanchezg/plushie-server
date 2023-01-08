const db = require("../db");

class Controller {
  getNewIn(res) {
    db.query(
      `SELECT * FROM products ORDER BY product_id DESC LIMIT 20`,
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }

  getSale(res) {
    db.query(
      `SELECT * FROM products ORDER BY price LIMIT 20`,
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }

  getCategories(res) {
    db.query("SELECT * FROM categories", (err, result) => {
      if (err) res.send({ err });
      else res.status(200).json(result);
    });
  }

  getCategory(res, id) {
    db.query(`SELECT * FROM categories WHERE id=?`, [id], (err, result) => {
      if (err) res.send({ err });
      else res.status(200).json(result);
    });
  }

  getVariations(res, id) {
    db.query(`SELECT * FROM categories WHERE id=?`, [id], (err, result) => {
      if (err) res.send({ err });
      else res.status(200).json(result);
    });
  }

  getFilteredProducts(res, category_id) {
    db.query(
      `SELECT * FROM products WHERE category_id=?`,
      [category_id],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }
}

module.exports = Controller;
