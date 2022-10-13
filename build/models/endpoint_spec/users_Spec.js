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
describe('Users endpoint testing', function () {
    let token;
    beforeAll(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                firstName: "Testing2",
                lastName: "User2",
                password: "Pass123"
            };
            const res = yield request.post('/users/create').send(user);
            expect(res.body.createdUser.id).toEqual(2);
            expect(res.body.createdUser.firstname).toEqual("Testing2");
            expect(res.body.createdUser.lastname).toEqual("User2");
            expect(res.status).toEqual(200);
            token = res.body.token;
        });
    });
    it('creates a second new user', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                firstName: "Testing3",
                lastName: "User3",
                password: "Pass123"
            };
            const res = yield request.post('/users/create').send(user);
            expect(res.body.createdUser.id).toEqual(3);
            expect(res.body.createdUser.firstname).toEqual("Testing3");
            expect(res.body.createdUser.lastname).toEqual("User3");
            expect(res.status).toEqual(200);
        });
    });
    it('should not return user as no token is supplied', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.get('/users/show/2');
            expect(res.status).toEqual(401);
        });
    });
    it('should not return list of users as no token is supplied', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.get('/users/showusers');
            expect(res.status).toEqual(401);
        });
    });
    it('should return requested user', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.get('/users/show/2')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toEqual(200);
            expect(res.body.id).toEqual(2);
            expect(res.body.firstname).toEqual("Testing2");
            expect(res.body.lastname).toEqual("User2");
        });
    });
    it('should return requested users list', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.get('/users/showusers')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toEqual(200);
            expect(res.body[0].id).toEqual(1);
            expect(res.body[0].firstname).toEqual("Testing1");
            expect(res.body[0].lastname).toEqual("User1");
            expect(res.body[1].id).toEqual(2);
            expect(res.body[1].firstname).toEqual("Testing2");
            expect(res.body[1].lastname).toEqual("User2");
            expect(res.body[2].id).toEqual(3);
            expect(res.body[2].firstname).toEqual("Testing3");
            expect(res.body[2].lastname).toEqual("User3");
        });
    });
});
