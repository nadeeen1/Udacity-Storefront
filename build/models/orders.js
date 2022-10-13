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
const database_1 = __importDefault(require("../database"));
var status;
(function (status) {
    status[status["active"] = 0] = "active";
    status[status["complete"] = 1] = "complete";
})(status || (status = {}));
class order {
    showOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id = $1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length == 0) {
                    throw new Error("This user does not have any orders! Please enter correct user id and try again!");
                }
            }
            catch (err) {
                throw new Error("Error occurred!: " + err);
            }
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY order_id DESC LIMIT 1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error('Could not retrieve the current user order: ' + err);
            }
        });
    }
    showCompletedOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id = $1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length == 0) {
                    throw new Error("This user does not have any orders! Please enter correct user id and try again!");
                }
            }
            catch (err) {
                throw new Error("" + err);
            }
            try {
                const status = 'complete';
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id = $1 AND status = $2';
                const result = yield conn.query(sql, [id, status]);
                conn.release();
                if (result.rows.length == 0) {
                    throw new Error('no completed orders for this user!');
                }
                return result.rows;
            }
            catch (err) {
                throw new Error('Could not retrieve the orders completed by the user: ' + err);
            }
        });
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (user_id , status) VALUES ($1, $2) RETURNING *';
                const result = yield conn.query(sql, [
                    order.user_id,
                    order.status
                ]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error('Could not create this order: ' + err);
            }
        });
    }
    addProduct(order_product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE order_id = $1';
                const result = yield conn.query(sql, [order_product.order_id]);
                conn.release();
                if (result.rows.length == 0) {
                    throw new Error('This order id does not exist! Please make sure you enter a valid order id and try again!');
                }
            }
            catch (err) {
                throw new Error('Error occurred! ' + err);
            }
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id = $1';
                const result = yield conn.query(sql, [order_product.product_id]);
                conn.release();
                if (result.rows.length == 0) {
                    throw new Error('This product id does not exist! Please make sure you enter a valid product id and try again!');
                }
            }
            catch (err) {
                throw new Error('Error occurred! ' + err);
            }
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders_products (quantity , order_id , product_id) VALUES ($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [
                    order_product.quantity,
                    order_product.order_id,
                    order_product.product_id
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error('Could not add this product to the order: ' + err);
            }
        });
    }
}
exports.default = order;
