import { Request, Response, NextFunction } from "express";
import { container, STATUS_CODES, TYPES, NotFoundError } from "../utils";
import { IOrderService } from "../interfaces";
import { OrderStatus } from "../types";

const orderService = container.get<IOrderService>(TYPES.ORDER_SERVICE);

const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new NotFoundError("user not found");
    }

    const response = await orderService.createOrder(user.id);
    res.status(STATUS_CODES.CREATED).json(response);
  } catch (error) {
    next(error);
  }
};

const getOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new NotFoundError("user not found");
    }

    const response = await orderService.getOrders(user.id);
    res.status(STATUS_CODES.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new NotFoundError("user not found");
    }

    const response = await orderService.getOrder(user.id);
    res.status(STATUS_CODES.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const updateOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.id);
    const status = req.body.status as OrderStatus;
    const response = await orderService.updateOrder(orderId, status);
    res.status(STATUS_CODES.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new NotFoundError("user not found");
    }

    const orderId = parseInt(req.params.id);
    const response = await orderService.deleteOrder(orderId);
    res.status(STATUS_CODES.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const checkoutOrder = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);
  const response = await orderService.findOrder(orderId);
  res.status(STATUS_CODES.OK).json(response);
};

export {
  createOrderController,
  getOrdersController,
  getOrderController,
  updateOrderController,
  deleteOrderController,
  checkoutOrder,
};
