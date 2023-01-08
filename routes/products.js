const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/products");
const controller = new ProductController();

router.get("/", (req, res) => {
  const { page, number } = req.query;
  controller.bringAllProducts(res, page, number);
});

router.post("/filter-price", (req, res) => {
  const {highestPrice, lowestPrice} = req.body;
  controller.filterByPrice(res, highestPrice, lowestPrice)
}) 

router.get("/atoz", (req, res) => {
  controller.orderAToZ(res);
});

router.get("/gallery/:id", (req, res) => {
  const { id } = req.params;
  controller.getGallery(res, id);
});

router.get("/ztoa", (req, res) => {
  controller.orderZToA(res);
});

router.get("/highestPrice", (req, res) => {
  controller.highestPrice(res);
});

router.get("/lowestPrice", (req, res) => {
  controller.lowestPrice(res);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  controller.productDetail(res, id);
});

module.exports = router;
