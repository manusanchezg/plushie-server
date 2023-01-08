const express = require("express");
const router = express.Router();
const WishlistController = require("../controllers/wishlist");
const controller = new WishlistController();

router.post("/", (req, res) => {
  const { username, product_id } = req.body;
  controller.addToWishlist(res, username, product_id);
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  controller.getWishlist(res, username);

});

router.delete("/:username", (req, res) => {
  const { username } = req.params;
  const { product_id } = req.query;
  controller.deleteFromWishlist(res, username, product_id)

});

module.exports = router;
