const db = require("../db");

class ProductController {
  bringAllProducts(res, pageNumber = 0, numberOfItems = 12) {
    db.query(
      `SELECT product_id, title, summary, details, price, thumbnail FROM products LIMIT ? OFFSET ?;`,
      [Number(numberOfItems), Number(pageNumber)],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(201).json(result);
      }
    );
  }

  getNumberOfProducts(res) {
    db.query("SELECT COUNT(*) FROM products", (err, result) => {
      if (err) res.send({ err });
      else res.status(201).json(result);
    });
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

  orderAToZ(res, pageNumber = 0, numberOfItems = 12) {
    db.query(
      `SELECT product_id, title, summary, details, price, thumbnail
                FROM products
                ORDER BY title
                LIMIT ? OFFSET ?`,
      [Number(numberOfItems), Number(pageNumber)],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }

  orderZToA(res, pageNumber = 0, numberOfItems = 12) {
    return db.query(
      `SELECT product_id, title, summary, details, price, thumbnail
           FROM products
           ORDER BY title DESC
           LIMIT ? OFFSET ?`,
      [Number(numberOfItems), Number(pageNumber)],
      (err, result) => {
        if (err) res.send(err);
        else res.status(200).json(result);
      }
    );
  }

  highestPrice(res, pageNumber = 0, numberOfItems = 12) {
    db.query(
      `SELECT product_id, title, summary, details, price, thumbnail
           FROM products
           ORDER BY price DESC
           LIMIT ? OFFSET ?`,
      [Number(numberOfItems), Number(pageNumber)],
      (err, result) => {
        if (err) res.send(err);
        else res.status(200).json(result);
      }
    );
  }

  lowestPrice(res, pageNumber = 0, numberOfItems = 12) {
    db.query(
      `SELECT product_id, title, summary, details, price, thumbnail
           FROM products
           ORDER BY price`,
      [Number(numberOfItems), Number(pageNumber)],
      (err, result) => {
        if (err) res.send(err);
        else res.status(200).json(result);
      }
    );
  }

  filterByPrice(
    res,
    highestPrice,
    lowestPrice,
    pageNumber = 0,
    numberOfItems = 12
  ) {
    db.query(
      `SELECT product_id, title, summary, details, price, thumbnail
          FROM products
          WHERE price BETWEEN ? AND ?
          LIMIT ? OFFSET ?`,
      [lowestPrice, highestPrice, Number(numberOfItems), Number(pageNumber)],
      (err, result) => {
        if (err) res.send(err);
        else res.status(200).json(result);
      }
    );
  }

  searchProduct(res, string, pageNumber = 0, numberOfItems = 12) {
    db.query(
      `SELECT * FROM products WHERE title LIKE ? LIMIT ? OFFSET ?`,
      [string, Number(numberOfItems), Number(pageNumber)],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }
}

module.exports = ProductController;
