import Client from '../database';
import bcrypt from 'bcrypt';
import { PoolClient, QueryResult } from 'pg';

export type User = {
    firstName: string,
    lastName: string,
    password: string
}

export type dbUser = {
    id: number,
    firstName: string,
    lastName: string,
    password: string
}

export default class user{
    async index(): Promise<dbUser[]>{
        try{
            const conn: PoolClient = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result: QueryResult = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err){
            throw new Error('Could not retrieve users: ' + err);
        }
    }

    async create(user: User): Promise<dbUser>{
        try {
            const pepper = process.env.BCRYPT_PASSWORD as string;
            const saltRounds = process.env.SALT_ROUNDS as string;
            //encrypting the password to be added to db
            const encrypted = bcrypt.hashSync( user.password + pepper, parseInt(saltRounds));
            const conn: PoolClient = await Client.connect();
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';
            const result: QueryResult = await conn.query(sql, [
              user.firstName,
              user.lastName,
              encrypted
            ]);
            conn.release();
            return result.rows[0];
          } catch (err) {
            throw new Error('Could not create the requested user. Error message: ' +  err);
          }
    }

    async getById(id: number): Promise<dbUser>{
        try{
            const conn: PoolClient = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id = $1';
            const result: QueryResult = await conn.query(sql , [id]);
            conn.release();
            return result.rows[0];
        } catch(err){
            throw new Error('Could not retrieve requested user: ' + err);
        }
    }
}