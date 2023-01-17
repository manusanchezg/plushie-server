const express = require("express");
const router = express.Router();
const Controller = require("../controllers/index");
const controller = new Controller();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  controller.getVariations(res, id);
});

router.post("/stock/:id", (req, res) => {
    const { id } = req.params;
    const { color, size } = req.body
    controller.getStock(res, id, color, size)
})

router.post("/color/:id", (req, res) => {
  const { id } = req.params;
  const { size } = req.body
  controller.getColor(res, id, size)
})

router.post("/size/:id", (req, res) => {
  const { id } = req.params
  const { color } = req.body
  controller.getSize(res, id, color)
})

module.exports = router;
