import { Request, Response } from "express";
import order from "../models/orders";
const currentOrder = new order();
export const showOrder = async (req: Request, _res: Response) => {
  try {
    const order = await currentOrder.showOrder(parseInt(req.body.id));
    _res.status(200).json(order);
  } catch (err) {
    _res.status(400).send("Failed to show order: " + err);
  }
};
export const showComplete = async (req: Request, _res: Response) => {
  try {
    const orders = await currentOrder.showCompletedOrders(
      parseInt(req.body.id)
    );
    _res.status(200).json(orders);
  } catch (err) {
    _res.status(400).send("Failed to show order: " + err);
  }
};

export const createOrder = async (req: Request, _res: Response) => {
  try {
    const order = {
      user_id: parseInt(req.body.user_id),
      status: req.body.status,
    };
    const orders = await currentOrder.createOrder(order);
    _res.status(200).json(orders);
  } catch (err) {
    _res.status(400).send("Failed to create new order: " + err);
  }
};

export const addProducts = async (req: Request, _res: Response) => {
  try {
    const order_product = {
      quantity: parseInt(req.body.quantity),
      order_id: parseInt(req.body.order_id),
      product_id: parseInt(req.body.product_id),
    };
    const order = await currentOrder.addProduct(order_product);
    _res.status(200).json(order);
  } catch (err) {
    _res.status(400).send("Failed to add this product to the order: " + err);
  }
};
