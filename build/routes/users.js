"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userHandle = require('../handlers/users');
const { authenticate } = require('../middleware/authentication');
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post('/create', userHandle.create);
router.get('/showusers', authenticate, userHandle.displayUsers);
router.get('/show/:id', authenticate, userHandle.displayUser);
module.exports = router;
