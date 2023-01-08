const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart")
const controller = new CartController()

router.post("/:username", (req, res) => {
  const { username } = req.params;
  const { product_id, quantity } = req.body;
  controller.addToCart(res, username, product_id, quantity)
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  controller.getCart(res, username)
});

router.delete("/:username", (req, res) => {
  const { username } = req.params;
  const { product_id } = req.query;

  controller.deleteFromCart(res, username, product_id)
});

module.exports = router;
