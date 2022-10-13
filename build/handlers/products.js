"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayProduct = exports.displayProducts = exports.create = void 0;
const products_1 = __importDefault(require("../models/products"));
const currentProduct = new products_1.default();
const create = (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };
    try {
        const createdProduct = yield currentProduct.create(newProduct);
        _res.status(200).json(createdProduct);
    }
    catch (err) {
        _res.status(400).send('Failed to create this product: ' + err);
    }
});
exports.create = create;
const displayProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield currentProduct.index();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(400).send('Failed to display products list:  ' + err);
    }
});
exports.displayProducts = displayProducts;
const displayProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield currentProduct.show(parseInt(req.params.id));
        res.status(200).json(product);
    }
    catch (err) {
        res.status(400).send('Failed to display requested product:  ' + err);
    }
});
exports.displayProduct = displayProduct;
