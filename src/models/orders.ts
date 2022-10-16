import Client from "../database";
import { PoolClient, QueryResult } from "pg";

export type Order = {
  user_id: number;
  status: string;
};

export type DBOrder = {
  order_id: number;
  user_id: number;
  status: string;
};

export type Order_product = {
  quantity: number;
  order_id: number;
  product_id: number;
};

export type DBOrder_product = {
  id: number;
  quantity: number;
  order_id: number;
  product_id: number;
};

export default class order {
  async showOrder(id: number): Promise<DBOrder> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id = $1";
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length == 0) {
        throw new Error(
          "This user does not have any orders! Please enter correct user id and try again!"
        );
      }
    } catch (err) {
      throw new Error("Error occurred!: " + err);
    }
    try {
      const conn: PoolClient = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = $1 ORDER BY order_id DESC LIMIT 1";
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error("Could not retrieve the current user order: " + err);
    }
  }
  async showCompletedOrders(id: number): Promise<DBOrder[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id = $1";
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length == 0) {
        throw new Error(
          "This user does not have any orders! Please enter correct user id and try again!"
        );
      }
    } catch (err) {
      throw new Error("" + err);
    }
    try {
      const status = "complete";
      const conn: PoolClient = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id = $1 AND status = $2";
      const result: QueryResult = await conn.query(sql, [id, status]);
      conn.release();
      if (result.rows.length == 0) {
        throw new Error("no completed orders for this user!");
      }
      return result.rows;
    } catch (err) {
      throw new Error(
        "Could not retrieve the orders completed by the user: " + err
      );
    }
  }

  async createOrder(order: Order): Promise<DBOrder> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql =
        "INSERT INTO orders (user_id , status) VALUES ($1, $2) RETURNING *";
      const result: QueryResult = await conn.query(sql, [
        order.user_id,
        order.status,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error("Could not create this order: " + err);
    }
  }

  async addProduct(order_product: Order_product): Promise<DBOrder_product> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql = "SELECT * FROM orders WHERE order_id = $1";
      const result: QueryResult = await conn.query(sql, [
        order_product.order_id,
      ]);
      conn.release();
      if (result.rows.length == 0) {
        throw new Error(
          "This order id does not exist! Please make sure you enter a valid order id and try again!"
        );
      }
    } catch (err) {
      throw new Error("Error occurred! " + err);
    }

    try {
      const conn: PoolClient = await Client.connect();
      const sql = "SELECT * FROM products WHERE id = $1";
      const result: QueryResult = await conn.query(sql, [
        order_product.product_id,
      ]);
      conn.release();
      if (result.rows.length == 0) {
        throw new Error(
          "This product id does not exist! Please make sure you enter a valid product id and try again!"
        );
      }
    } catch (err) {
      throw new Error("Error occurred! " + err);
    }

    try {
      const conn: PoolClient = await Client.connect();
      const sql =
        "INSERT INTO order_products (quantity , order_id , product_id) VALUES ($1, $2, $3) RETURNING *";
      const result: QueryResult = await conn.query(sql, [
        order_product.quantity,
        order_product.order_id,
        order_product.product_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error("Could not add this product to the order: " + err);
    }
  }
}
