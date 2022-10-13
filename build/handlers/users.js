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
exports.displayUser = exports.displayUsers = exports.create = void 0;
const users_1 = __importDefault(require("../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = new users_1.default();
const create = (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    };
    try {
        const createdUser = yield currentUser.create(newUser);
        const { TOKEN_SECRET } = process.env;
        const token = jsonwebtoken_1.default.sign({ newUser: createdUser }, TOKEN_SECRET);
        _res.send({
            token,
            createdUser
        });
    }
    catch (err) {
        _res.status(400).send('Failed to create this user: ' + err);
    }
});
exports.create = create;
const displayUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield currentUser.index();
        res.json(users);
    }
    catch (err) {
        res.status(400).send('Failed to display users list:  ' + err);
    }
});
exports.displayUsers = displayUsers;
const displayUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield currentUser.getById(parseInt(req.params.id));
        res.json(user);
    }
    catch (err) {
        res.status(400).send('Failed to display requested user:  ' + err);
    }
});
exports.displayUser = displayUser;
