const express = require("express");
const router = express.Router();
const WishlistController = require("../controllers/wishlist");
const controller = new WishlistController();

router.post("/", (req, res) => {
  const { username, product_id } = req.body;
  controller
    .addToWishlist(username, product_id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  controller
    .getWishlist(username)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.delete("/:username", (req, res) => {
  const { username } = req.params;
  const { product_id } = req.query;
  controller
    .deleteFromWishlist(username, product_id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
