const express = require("express");
const router = express.Router();
const Controller = require("../controllers/index");
const controller = new Controller();

router.get("/", (req, res) => {
  controller.getCategories(res);
});

router.post("/filteredProducts", (req, res) => {
  const { category_id } = req.body;
  controller.getFilteredProducts(res, category_id);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  controller.getCategory(res, id);
});

module.exports = router;
