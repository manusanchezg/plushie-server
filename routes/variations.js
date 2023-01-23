const express = require("express");
const router = express.Router();
const Controller = require("../controllers/index");
const controller = new Controller();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  controller
    .getVariations(id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.post("/stock/:id", (req, res) => {
  const { id } = req.params;
  const { color, size } = req.body;
  controller
    .getStock(res, id, color, size)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.post("/color/:id", (req, res) => {
  const { id } = req.params;
  const { size } = req.body;
  controller
    .getColor(res, id, size)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.post("/size/:id", (req, res) => {
  const { id } = req.params;
  const { color } = req.body;
  controller
    .getSize(res, id, color)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
