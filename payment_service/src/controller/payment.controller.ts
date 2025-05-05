import { NextFunction, Request, Response } from "express";
import { AuthorizeError, container, NotFoundError, TYPES } from "../utils";
import { IPaymentService } from "../interface";

const paymentService = container.get<IPaymentService>(TYPES.PAYMENT_SERVICE);

export const createPaymentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new AuthorizeError("user not found");
    }

    const { orderNumber } = req.body;
    const response = await paymentService.createPayment(user.id, orderNumber);
    res.status(201).json({ message: "Payment was successful", data: response });
  } catch (error) {
    next(error);
  }
};

export const verifyPaymentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new AuthorizeError("user not found");
    }

    const paymentId = req.params.id;
    if (!paymentId) {
      throw new NotFoundError("payment id not found");
    }

    await paymentService.verifyPayment(paymentId);
    res.status(200).json({ message: "payment verification completed" });
  } catch (error) {
    next(error);
  }
};
