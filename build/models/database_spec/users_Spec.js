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
const users_1 = __importDefault(require("../../models/users"));
const testing = new users_1.default();
describe("Users Database testing cases", function () {
    it("should have a create method", () => {
        expect(testing.create).toBeDefined();
    });
    it("should have an index method", () => {
        expect(testing.index).toBeDefined();
    });
    it("should have a show user method", () => {
        expect(testing.getById).toBeDefined();
    });
    const newUser = {
        firstname: "Testing1",
        lastname: "User1",
        password: "Pass123",
    };
    it("should create a new user", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield testing.create(newUser);
            expect(res.id).toEqual(2);
            expect(res.firstname).toEqual("Testing1");
            expect(res.lastname).toEqual("User1");
        });
    });
    it("should return a list of users", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield testing.index();
            expect(res[0].id).toEqual(1);
            expect(res[0].firstname).toEqual("Testing");
            expect(res[0].lastname).toEqual("User");
            expect(res[1].id).toEqual(2);
            expect(res[1].firstname).toEqual("Testing1");
            expect(res[1].lastname).toEqual("User1");
        });
    });
    it("should return requested user", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield testing.getById(1);
            expect(res.id).toEqual(1);
            expect(res.firstname).toEqual("Testing");
            expect(res.lastname).toEqual("User");
        });
    });
});
