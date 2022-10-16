import { Request, Response } from "express";
import user from "../models/users";
import jwt from "jsonwebtoken";
const currentUser = new user();
export const create = async (req: Request, _res: Response) => {
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  try {
    const createdUser = await currentUser.create(newUser);
    const { TOKEN_SECRET } = process.env;
    const token = jwt.sign({ newUser: createdUser }, TOKEN_SECRET as string);
    _res.status(200).send({
      token,
      createdUser,
    });
  } catch (err) {
    _res.status(400).send("Failed to create this user: " + err);
  }
};

export const displayUsers = async (req: Request, res: Response) => {
  try {
    const users = await currentUser.index();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send("Failed to display users list:  " + err);
  }
};

export const displayUser = async (req: Request, res: Response) => {
  try {
    const user = await currentUser.getById(parseInt(req.params.id));
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send("Failed to display requested user:  " + err);
  }
};
