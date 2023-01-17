const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart");
const controller = new CartController();

router.post("/:username", (req, res) => {
  const { username } = req.params;
  const { product_id, quantity, color, size } = req.body;
  controller.addToCart(res, username, product_id, quantity, color, size);
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  controller.getCart(res, username);
});

router.delete("/:username", (req, res) => {
  // localhost:3000/username?product_id=number
  const { username } = req.params;
  const { product_id } = req.query;

  controller.deleteFromCart(res, username, product_id);
});

router.put("/:username", (req, res) => {
  const { username } = req.params;
  const { product_id, quantity, color, size } = req.body;

  controller.updateCart(res, username, product_id, quantity, color, size);
});

router.get("/total-purchase/:username", (req, res) => {
  const { username } = req.params;
  controller.getTotalPurchase(res, username);
});

module.exports = router;
