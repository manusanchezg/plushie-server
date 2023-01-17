const express = require("express");
const router = express.Router();
const Controller = require("../controllers/index");
const controller = new Controller();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/new-in", (req, res) => {
  controller.getNewIn(res);
});

router.get("/sale", (req, res) => {
  controller.getSale(res);
});

router.post("/stock/:id", (req, res) => {
  const { id } = req.params
  const { color, size } = req.body
  controller.getStock(res, id, color, size)
})

router.post("/color/:id", (req, res) => {
  const { id } = req.params
  const { size } = req.body
  controller.getColor(res, id, size)
})

router.post("/size/:id", (req, res) => {
  const { id } = req.params
  const { color } = req.body
  controller.getSize(res, id, color)
})

module.exports = router;
