import { Request, Response } from "express";
import product from "../models/products";
const currentProduct = new product();
export const create = async (req: Request, _res: Response) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const createdProduct = await currentProduct.create(newProduct);
    _res.status(200).json(createdProduct);
  } catch (err) {
    _res.status(400).send("Failed to create this product: " + err);
  }
};

export const displayProducts = async (req: Request, res: Response) => {
  try {
    const products = await currentProduct.index();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).send("Failed to display products list:  " + err);
  }
};

export const displayProduct = async (req: Request, res: Response) => {
  try {
    const product = await currentProduct.show(parseInt(req.params.id));
    res.status(200).json(product);
  } catch (err) {
    res.status(400).send("Failed to display requested product:  " + err);
  }
};
