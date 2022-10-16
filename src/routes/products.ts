import express from "express";
const productHandle = require("../handlers/products");
const { authenticate } = require("../middleware/authentication");

const router = express.Router();
router.use(express.json());

router.post("/create", authenticate, productHandle.create);
router.get("/showproducts", productHandle.displayProducts);
router.get("/showproduct/:id", productHandle.displayProduct);
module.exports = router;
