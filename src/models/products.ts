import Client from '../database';
import { PoolClient, QueryResult } from 'pg';

export type Product = {
    name: string,
    price: number
}

export type dbProduct = {
    id: number,
    name: string,
    price: number
}

export default class products{
    async index() : Promise<dbProduct[]>{
        try{
            const conn: PoolClient = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result: QueryResult = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error('Could not retrieve products: ' + err);
        }
    }

    async show(id: number): Promise<dbProduct>{
        try{
            const conn: PoolClient = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id = $1';
            const result: QueryResult = await conn.query(sql , [id]);
            conn.release();
            return result.rows[0];
        }
        catch(err){
            throw new Error('Could not retrieve requested product: ' + err);
        }
    }

    async create(product: Product): Promise<dbProduct>{
        try {
            const conn: PoolClient = await Client.connect();
            const sql = 'INSERT INTO products (product_name, price) VALUES($1, $2) RETURNING *';
            const result: QueryResult = await conn.query(sql, [
              product.name,
              product.price
            ]);
            conn.release();
            return result.rows[0];
          } catch (err) {
            throw new Error('Could not create the requested Product. Error message: ' +  err);
          }
    }
}
