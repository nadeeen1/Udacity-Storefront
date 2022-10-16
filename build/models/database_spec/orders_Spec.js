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
const orders_1 = __importDefault(require("../../models/orders"));
const products_1 = __importDefault(require("../../models/products"));
const users_1 = __importDefault(require("../../models/users"));
const testing = new orders_1.default();
const testingu = new users_1.default();
describe("Orders Database testing cases", function () {
    it("should have a create method", () => {
        expect(testing.createOrder).toBeDefined();
    });
    it("should have a show order method", () => {
        expect(testing.showOrder).toBeDefined();
    });
    it("should have a show completed orders method", () => {
        expect(testing.showOrder).toBeDefined();
    });
    it("should have method to add products to an order", () => {
        expect(testing.addProduct).toBeDefined();
    });
    beforeAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                firstname: "Testing",
                lastname: "User",
                password: "Pass123",
            };
            yield testingu.create(user);
        });
    });
    const newOrder = {
        user_id: 1,
        status: "active",
    };
    const newOrder1 = {
        user_id: 1,
        status: "complete",
    };
    it("should create a new active order", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield testing.createOrder(newOrder);
            expect(res).toEqual({
                order_id: 1,
                user_id: 1,
                status: "active",
            });
        });
    });
    it("should create a new complete order", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield testing.createOrder(newOrder1);
            expect(res).toEqual({
                order_id: 2,
                user_id: 1,
                status: "complete",
            });
        });
    });
    it("should display the current order", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield testing.showOrder(1);
            expect(res).toEqual({
                order_id: 2,
                user_id: 1,
                status: "complete",
            });
        });
    });
    it("should display the completed orders", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield testing.showCompletedOrders(1);
            expect(res[0]).toEqual({
                order_id: 2,
                user_id: 1,
                status: "complete",
            });
        });
    });
    const testProduct = new products_1.default();
    const productT = {
        name: "Product1",
        price: 100,
    };
    function create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield testProduct.create(productT);
        });
    }
    create();
    const op = {
        quantity: 100,
        order_id: 1,
        product_id: 1,
    };
    it("adds a product to an existing order", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield testing.addProduct(op);
            expect(res).toEqual({
                id: 1,
                quantity: 100,
                order_id: 1,
                product_id: 1,
            });
        });
    });
});
