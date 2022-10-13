"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderHandle = require('../handlers/orders');
const { authenticate } = require('../middleware/authentication');
const router = express_1.default.Router();
router.use(express_1.default.json());
router.get('/current', authenticate, orderHandle.showOrder);
router.get('/complete', authenticate, orderHandle.showComplete);
router.post('/create', authenticate, orderHandle.createOrder);
router.post('/orders/:id/products', authenticate, orderHandle.addProducts);
module.exports = router;
