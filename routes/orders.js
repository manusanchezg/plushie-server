const express = require("express");
const router = express.Router();
const Controller = require("../controllers/orders");
const controller = new Controller();

router.get("/status/:id", (req, res) => {
  const { id } = req.params;
  controller
    .getStatus(id)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.json(error));
});

router.post("/:orderId/product/:productId", (req, res) => {
  const { orderId, productId } = req.params;
  const { quantity, color, size } = req.body;
  controller.setProductsOrder(res, orderId, productId, quantity, color, size);
});

router.get("/:uername/:orderId", (req, res) => {
  const { orderId } = req.params;
  controller
    .getProductsInOrder(orderId)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.send(error));
});

router.post("/:username", (req, res) => {
  const { username } = req.params;
  const { total, orderDate, arrivedDate } = req.body;
  controller.createNewOrder(res, username, total, orderDate, arrivedDate);
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  controller.getOrders(res, username);
});

module.exports = router;
