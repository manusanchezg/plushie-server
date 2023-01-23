const db = require("../db");

class ProductController {
  bringAllProducts(pageNumber = 0, numberOfItems = 12) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT product_id, title, summary, details, price, thumbnail FROM products LIMIT ? OFFSET ?;`,
        [Number(numberOfItems), Number(pageNumber)],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }

  getNumberOfProducts() {
    return new Promise((res, rej) => {
      db.query("SELECT COUNT(*) AS total FROM products", (err, result) => {
        if (err) rej({ err });
        else res(result);
      });
    });
  }

  productDetail(id) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT product_id, title, summary, details, price, thumbnail
        FROM products
        WHERE product_id = ?;`,
        [id],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }

  getGallery(id) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT url FROM gallery WHERE product_id = ?`,
        [id],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }

  orderAToZ(pageNumber = 0, numberOfItems = 12) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT product_id, title, summary, details, price, thumbnail
        FROM products
        ORDER BY title
        LIMIT ? OFFSET ?`,
        [Number(numberOfItems), Number(pageNumber)],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }

  orderZToA(pageNumber = 0, numberOfItems = 12) {
    return new Promise((res, rej) => {
      return db.query(
        `SELECT product_id, title, summary, details, price, thumbnail
        FROM products
        ORDER BY title DESC
        LIMIT ? OFFSET ?`,
        [Number(numberOfItems), Number(pageNumber)],
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  }

  highestPrice(pageNumber = 0, numberOfItems = 12) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT product_id, title, summary, details, price, thumbnail
        FROM products
        ORDER BY price DESC
        LIMIT ? OFFSET ?`,
        [Number(numberOfItems), Number(pageNumber)],
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  }

  lowestPrice(pageNumber = 0, numberOfItems = 12) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT product_id, title, summary, details, price, thumbnail
        FROM products
        ORDER BY price`,
        [Number(numberOfItems), Number(pageNumber)],
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  }

  filterByPrice(highestPrice, lowestPrice, pageNumber = 0, numberOfItems = 12) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT product_id, title, summary, details, price, thumbnail
        FROM products
        WHERE price BETWEEN ? AND ?
        LIMIT ? OFFSET ?`,
        [lowestPrice, highestPrice, Number(numberOfItems), Number(pageNumber)],
        (err, result) => {
          if (err) rej(err);
          else res(result);
        }
      );
    });
  }

  searchProduct(string, pageNumber = 0, numberOfItems = 12) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT * FROM products WHERE title LIKE ? LIMIT ? OFFSET ?`,
        [string, Number(numberOfItems), Number(pageNumber)],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }
}

module.exports = ProductController;
