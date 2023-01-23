const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/products");
const controller = new ProductController();

router.get("/", (req, res) => {
  const { page, number } = req.query;
  controller
    .bringAllProducts(page, number)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/ztoa", (req, res) => {
  const { page, number } = req.query;
  controller
    .orderZToA(page, number)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/highestPrice", (req, res) => {
  const { page, number } = req.query;
  controller
    .highestPrice(page, number)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/lowestPrice", (req, res) => {
  const { page, number } = req.query;
  controller
    .lowestPrice(page, number)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/total-products", (req, res) => {
  controller
    .getNumberOfProducts()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.post("/filter-price", (req, res) => {
  const { highestPrice, lowestPrice } = req.body;
  const { page, number } = req.query;
  controller
    .filterByPrice(highestPrice, lowestPrice, page, number)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/atoz", (req, res) => {
  const { page, number } = req.query;
  controller
    .orderAToZ(page, number)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/gallery/:id", (req, res) => {
  const { id } = req.params;
  controller
    .getGallery(id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  controller
    .productDetail(id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

//http:localhost=3100/products?page=3&number=1
router.post("/", (req, res) => {
  const { search } = req.query;
  const { page, number } = req.body;
  const regex = "%" + search + "%";
  controller
    .searchProduct(regex, page, number)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
