const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart");
const controller = new CartController();

router.post("/:username", (req, res) => {
  const { username } = req.params;
  const { product_id, quantity, color, size } = req.body;
  controller
    .addToCart(username, product_id, quantity, color, size)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  controller
    .getCart(username)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

// localhost:3000/username?product_id=number
router.delete("/:username", (req, res) => {
  const { username } = req.params;
  const { product_id } = req.query;

  controller
    .deleteFromCart(username, product_id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.put("/:username", (req, res) => {
  const { username } = req.params;
  const { product_id, quantity, color, size } = req.body;

  controller
    .updateCart(username, product_id, quantity, color, size)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/total-purchase/:username", (req, res) => {
  const { username } = req.params;
  controller
    .getTotalPurchase(username)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
