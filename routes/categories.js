const express = require("express");
const router = express.Router();
const Controller = require("../controllers/index");
const controller = new Controller();

router.get("/", (req, res) => {
  controller
    .getCategories()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.post("/filteredProducts", (req, res) => {
  const { category_id, page, number } = req.body;
  controller
    .getFilteredProducts(category_id, page, number)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  controller
    .getCategory(id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
