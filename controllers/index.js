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
    db.query(`SELECT * FROM variations WHERE product_id=?`, [id], (err, result) => {
      if (err) res.send({ err });
      else res.status(200).json(result);
    });
  }

  getStock(res, id, color, size) {
    db.query(
      `SELECT stock FROM variations WHERE product_id=? AND color=? AND size=?`,
      [id, color, size],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }

  getColor(res, id, size) {
    db.query(
      `SELECT color FROM variations WHERE product_id=? AND size=?`,
      [id, size],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }

  getSize(res, id, color) {
    db.query(
      `SELECT size FROM variations WHERE product_id=? AND color=?`,
      [id, color],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }

  getFilteredProducts(res, category_id, pageNumber = 0, numberOfItems = 12) {
    db.query(
      `SELECT * FROM products WHERE category_id=?
      LIMIT ? OFFSET ?`,
      [category_id, Number(numberOfItems), Number(pageNumber)],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }
}

module.exports = Controller;
