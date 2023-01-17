const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/products");
const controller = new ProductController();

router.get("/", (req, res) => {
  const { page, number } = req.query;
  controller.bringAllProducts(res, page, number);
});

router.get("/total-products", (req, res) => {
  controller.getNumberOfProducts(res)
})

router.post("/filter-price", (req, res) => {
  const {highestPrice, lowestPrice} = req.body;
  const { page, number } = req.query;
  controller.filterByPrice(res, highestPrice, lowestPrice, page, number)
}) 

router.get("/atoz", (req, res) => {
  const { page, number } = req.query;
  controller.orderAToZ(res, page, number);
});

router.get("/gallery/:id", (req, res) => {
  const { id } = req.params;
  controller.getGallery(res, id);
});

router.get("/ztoa", (req, res) => {
  const { page, number } = req.query;
  controller.orderZToA(res, page, number);
});

router.get("/highestPrice", (req, res) => {
  const { page, number } = req.query;
  controller.highestPrice(res, page, number);
});

router.get("/lowestPrice", (req, res) => {
  const { page, number } = req.query;
  controller.lowestPrice(res, page, number);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  controller.productDetail(res, id);
});

router.post("/", (req, res) => {
  const { search } = req.query;
  const { page, number } = req.body;
  const regex = "%" + search + "%"
  controller.searchProduct(res, regex, page, number)
}) 

module.exports = router;
