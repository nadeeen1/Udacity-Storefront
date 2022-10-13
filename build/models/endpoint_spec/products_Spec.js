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
const bodyParser = require('body-parser');
const index_1 = __importDefault(require("../../index"));
index_1.default.use(bodyParser.json());
index_1.default.use(bodyParser.urlencoded({ extended: false }));
const request = (0, supertest_1.default)(index_1.default);
describe('Products endpoint testing', function () {
    it('creates a new product', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const product = {
                name: "Product1",
                price: 20
            };
            const res = yield request.post('/products/create')
                .set('Authorization', 'Bearer ' + process.env.TOKEN)
                .send(product);
            expect(res.body.id).toEqual(1);
            expect(res.body.product_name).toEqual("Product1");
            expect(res.body.price).toEqual(20);
            expect(res.status).toEqual(200);
        });
    });
    it('creates a second new product', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const product = {
                name: "Product2",
                price: 40
            };
            const res = yield (yield request.post('/products/create')
                .set('Authorization', 'Bearer ' + process.env.TOKEN)
                .send(product));
            expect(res.body.id).toEqual(2);
            expect(res.body.product_name).toEqual("Product2");
            expect(res.body.price).toEqual(40);
            expect(res.status).toEqual(200);
        });
    });
    it('fails to create a new product as no token was supplied', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const product = {
                name: "Product2",
                price: 30
            };
            const res = yield (yield request.post('/products/create').send(product));
            expect(res.status).toEqual(401);
        });
    });
    it('should return requested product', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.get('/products/showproduct/1');
            expect(res.body.id).toEqual(1);
            expect(res.body.product_name).toEqual("Product1");
            expect(res.body.price).toEqual(20);
            expect(res.status).toEqual(200);
        });
    });
    it('should return requested products list', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.get('/products/showproducts');
            expect(res.status).toEqual(200);
            expect(res.body[0].id).toEqual(1);
            expect(res.body[0].product_name).toEqual("Product1");
            expect(res.body[0].price).toEqual(20);
            expect(res.body[1].id).toEqual(2);
            expect(res.body[1].product_name).toEqual("Product2");
            expect(res.body[1].price).toEqual(40);
        });
    });
});
