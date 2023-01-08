const db = require("../db");

class WishlistController {
  addToWishlist(res, username, product_id) {
    db.query(
      `INSERT INTO wishlist (customer_id, product_id)
                     VALUES (?, ?)`,
      [username, product_id],
      (err, result) => {
        if (err) res.status(401).send({ message: "Oops, we had a problem" });
        else res.status(201).json({ msg: "Product added to wishlist" });
      }
    );
  }

  getWishlist(res, username) {
    db.query(
      `SELECT * FROM wishlist WHERE customer_id=?;`,
      [username],
      (err, result) => {
        if (err) res.send({ err });
        else res.status(200).json(result);
      }
    );
  }

  deleteFromWishlist(res, username, product_id) {
    db.query(
      `DELETE FROM wishlist WHERE product_id=? AND customer_id=?`,
      [product_id, username],
      (err, result) => {
        if (err) res.send({ err });
        else
          res
            .status(200)
            .json({ message: "Item deleted successfully from the wishlist" });
      }
    );
  }
}

module.exports = WishlistController;
