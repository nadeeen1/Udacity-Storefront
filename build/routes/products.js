"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productHandle = require("../handlers/products");
const { authenticate } = require("../middleware/authentication");
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post("/create", authenticate, productHandle.create);
router.get("/showproducts", productHandle.displayProducts);
router.get("/showproduct/:id", productHandle.displayProduct);
module.exports = router;
