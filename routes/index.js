const express = require("express");
const router = express.Router();
const Controller = require("../controllers/index");
const controller = new Controller();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/new-in", (req, res) => {
  controller
    .getNewIn()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/sale", (req, res) => {
  controller
    .getSale()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
