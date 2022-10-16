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
const supertest_1 = __importDefault(require("supertest"));
const bodyParser = require("body-parser");
const index_1 = __importDefault(require("../../index"));
index_1.default.use(bodyParser.json());
index_1.default.use(bodyParser.urlencoded({ extended: false }));
const request = (0, supertest_1.default)(index_1.default);
describe("Orders endpoint testing", function () {
    let token;
    beforeAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                firstname: "Testing2",
                lastname: "User2",
                password: "Pass123",
            };
            const res = yield request.post("/users/create").send(user);
            token = res.body.token;
            const product = {
                name: "Product3",
                price: 20,
            };
            yield request
                .post("/products/create")
                .set("Authorization", "Bearer " + token)
                .send(product);
        });
    });
    it("creates a new order", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const order = {
                user_id: 1,
                status: "active",
            };
            const res = yield request
                .post("/orders/create")
                .set("Authorization", "Bearer " + token)
                .send(order);
            expect(res.body.order_id).toEqual(3);
            expect(res.body.user_id).toEqual(1);
            expect(res.body.status).toEqual("active");
            expect(res.status).toEqual(200);
        });
    });
    it("returns complete customer orders", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                id: 1,
            };
            const res = yield request
                .get("/orders/complete")
                .set("Authorization", "Bearer " + token)
                .send(user);
            expect(res.body[0].order_id).toEqual(2);
        });
    });
    it("doesnt return complete orders without token", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                id: 1,
            };
            const res = yield request.get("/orders/complete").send(user);
            expect(res.status).toEqual(401);
        });
    });
    it("doesnt return complete orders for non existent user", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                id: 6,
            };
            const res = yield request
                .get("/orders/complete")
                .set("Authorization", "Bearer " + token)
                .send(user);
            expect(res.status).toEqual(400);
        });
    });
    it("returns current user order", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                id: 1,
            };
            const res = yield request
                .get("/orders/current")
                .set("Authorization", "Bearer " + token)
                .send(user);
            expect(res.status).toEqual(200);
            expect(res.body.order_id).toEqual(3);
            expect(res.body.user_id).toEqual(1);
            expect(res.body.status).toEqual("active");
        });
    });
    it("adds a product to the order", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const product = {
                quantity: 20,
                order_id: 1,
                product_id: 2,
            };
            const res = yield request
                .post("/orders/1/products")
                .set("Authorization", "Bearer " + token)
                .send(product);
            expect(res.status).toEqual(200);
            expect(res.body).toEqual({
                id: 2,
                quantity: 20,
                order_id: 1,
                product_id: 2,
            });
        });
    });
});
