import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import {Request , Response , NextFunction} from 'express';
dotenv.config()
export const authenticate = (req: Request , res: Response , next: NextFunction) =>{
    try{
        const tokenHeader: string = req.headers.authorization as string;
        const token = tokenHeader.split(' ')[1];
        const {TOKEN_SECRET} = process.env;
        if(jwt.verify(token, TOKEN_SECRET as string)){
            next();
        }
    }
    catch(err){
        res.status(401).send('Authentication error occurred due to invalid token!: ' + err);
    }
}