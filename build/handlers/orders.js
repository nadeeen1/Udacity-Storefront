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
exports.addProducts = exports.createOrder = exports.showComplete = exports.showOrder = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const currentOrder = new orders_1.default();
const showOrder = (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield currentOrder.showOrder(parseInt(req.body.id));
        _res.status(200).json(order);
    }
    catch (err) {
        _res.status(400).send("Failed to show order: " + err);
    }
});
exports.showOrder = showOrder;
const showComplete = (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield currentOrder.showCompletedOrders(parseInt(req.body.id));
        _res.status(200).json(orders);
    }
    catch (err) {
        _res.status(400).send("Failed to show order: " + err);
    }
});
exports.showComplete = showComplete;
const createOrder = (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            user_id: parseInt(req.body.user_id),
            status: req.body.status,
        };
        const orders = yield currentOrder.createOrder(order);
        _res.status(200).json(orders);
    }
    catch (err) {
        _res.status(400).send("Failed to create new order: " + err);
    }
});
exports.createOrder = createOrder;
const addProducts = (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_product = {
            quantity: parseInt(req.body.quantity),
            order_id: parseInt(req.body.order_id),
            product_id: parseInt(req.body.product_id),
        };
        const order = yield currentOrder.addProduct(order_product);
        _res.status(200).json(order);
    }
    catch (err) {
        _res.status(400).send("Failed to add this product to the order: " + err);
    }
});
exports.addProducts = addProducts;
