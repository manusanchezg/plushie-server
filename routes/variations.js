const express = require("express");
const router = express.Router();
const Controller = require("../controllers/index");
const controller = new Controller();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  controller.getVariations(res, id);
});

module.exports = router;
