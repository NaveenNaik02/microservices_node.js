import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware";
import { CreateCart, UpdateCart } from "../dto";
import {
  container,
  logger,
  NotFoundError,
  RequestValidator,
  STATUS_CODES,
  TYPES,
} from "../utils";
import { ICartService } from "../interfaces";

const service = container.get<ICartService>(TYPES.CART_SERVICE);

export const createCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    const { errors, input } = await RequestValidator(CreateCart, req.body);

    if (errors) {
      res.status(STATUS_CODES.BAD_REQUEST).json(errors);
    }
    const response = await service.createCart({
      ...input,
      customerId: user!.id,
    });

    res.status(STATUS_CODES.CREATED).json(response);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getCartController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const response = await service.getCart(user.id);
    res.status(STATUS_CODES.OK).json(response);
  } catch (error) {
    next(error);
  }
};

export const editCartController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const { errors, input } = await RequestValidator(UpdateCart, req.body);
    if (errors) {
      res.status(STATUS_CODES.BAD_REQUEST).json(errors);
    }

    const lineItemId = parseInt(req.params.lineItemId, 10);
    const response = await service.editCart(lineItemId, user.id, input.qty);
    res.status(STATUS_CODES.OK).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteCartController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const lineItemId = parseInt(req.params.lineItemId, 10);
    await service.deleteCart(lineItemId, user.id);
    res.status(STATUS_CODES.OK).send();
  } catch (error) {
    next(error);
  }
};
