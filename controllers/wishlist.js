const db = require("../db");

class WishlistController {
  addToWishlist(username, product_id) {
    return new Promise((res, rej) => {
      db.query(
        `INSERT INTO wishlist (customer_id, product_id)
        VALUES (?, ?)`,
        [username, product_id],
        (err, result) => {
          if (err) rej({ message: "Oops, we had a problem" });
          else res({ msg: "Product added to wishlist" });
        }
      );
    });
  }

  getWishlist(username) {
    return new Promise((res, rej) => {
      db.query(
        `SELECT * FROM wishlist WHERE customer_id=?;`,
        [username],
        (err, result) => {
          if (err) rej({ err });
          else res(result);
        }
      );
    });
  }

  deleteFromWishlist(username, product_id) {
    return new Promise((res, rej) => {
      db.query(
        `DELETE FROM wishlist WHERE product_id=? AND customer_id=?`,
        [product_id, username],
        (err, result) => {
          if (err) rej({ err });
          else res({ message: "Item deleted successfully from the wishlist" });
        }
      );
    });
  }
}

module.exports = WishlistController;
