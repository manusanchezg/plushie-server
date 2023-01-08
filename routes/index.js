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

module.exports = router;
