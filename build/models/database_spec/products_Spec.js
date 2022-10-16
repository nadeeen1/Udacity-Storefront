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
const products_1 = __importDefault(require("../../models/products"));
const testing = new products_1.default();
describe("Products Database testing cases", function () {
    it("should have a create method", () => {
        expect(testing.create).toBeDefined();
    });
    it("should have an index method", () => {
        expect(testing.index).toBeDefined();
    });
    it("should have a show user method", () => {
        expect(testing.show).toBeDefined();
    });
    const newProduct = {
        name: "Product2",
        price: 50,
    };
    it("should create a new product", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield testing.create(newProduct);
            expect(res.id).toEqual(2);
            expect(res.product_name).toEqual("Product2");
            expect(res.price).toEqual(50);
        });
    });
    it("should return a list of products", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield testing.index();
            expect(res[0].id).toEqual(1);
            expect(res[0].product_name).toEqual("Product1");
            expect(res[0].price).toEqual(100);
            expect(res[1].id).toEqual(2);
            expect(res[1].product_name).toEqual("Product2");
            expect(res[1].price).toEqual(50);
        });
    });
    it("should return requested Product", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield testing.show(1);
            expect(res.id).toEqual(1);
            expect(res.product_name).toEqual("Product1");
            expect(res.price).toEqual(100);
        });
    });
});
