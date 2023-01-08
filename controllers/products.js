const db = require("../db");

class ProductController {
  bringAllProducts(res, pageNumber = 0, numberOfItems = 12) {
    db.query(
      `SELECT product_id, title, summary, details, price, thumbnail FROM products LIMIT ? OFFSET ?;`,
      [numberOfItems, pageNumber],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(201).json(result);
      }
    );
  }

  productDetail(res, id) {
    db.query(
      `SELECT product_id, title, summary, details, price, thumbnail
        FROM products
        WHERE product_id = ?;`,
      [id],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(201).json(result);
      }
    );
  }

  getGallery(res, id) {
    db.query(
      `SELECT url FROM gallery WHERE product_id = ?`,
      [id],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }
  orderAToZ(res) {
    db.query(
      `SELECT product_id, title, summary, details, price, thumbnail
                FROM products
                ORDER BY title`,
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }

  orderZToA(res) {
    return db.query(
      `SELECT product_id, title, summary, details, price, thumbnail
           FROM products
           ORDER BY title DESC`,
      (err, result) => {
        if (err) res.send(err);
        else res.status(200).json(result);
      }
    );
  }

  highestPrice(res) {
    db.query(
      `SELECT product_id, title, summary, details, price, thumbnail
           FROM products
           ORDER BY price DESC`,
      (err, result) => {
        if (err) res.send(err);
        else res.status(200).json(result);
      }
    );
  }

  lowestPrice(res) {
    db.query(
      `SELECT product_id, title, summary, details, price, thumbnail
           FROM products
           ORDER BY price`,
      (err, result) => {
        if (err) res.send(err);
        else res.status(200).json(result);
      }
    );
  }

  filterByPrice(res, highestPrice, lowestPrice) {
    db.query(
      `SELECT product_id, title, summary, details, price, thumbnail
          FROM products
          WHERE price BETWEEN ? AND ?`,
      [lowestPrice, highestPrice],
      (err, result) => {
        if (err) res.send(err);
        else res.status(200).json(result);
      }
    );
  }
}

module.exports = ProductController;
