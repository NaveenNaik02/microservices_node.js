import { NextFunction, Request, Response, Router } from "express";
import { RequestValidator } from "../utils/requestValidator";
import { CartService } from "../services/cart.service";
import { CreateCart, UpdateCart } from "../dto";
import { logger, STATUS_CODES } from "../utils";
import { CartRepository } from "../repository/cart.repository";
import { AuthenticatedRequest, RequestAuthorizer } from "../middleware";
import { NotFoundError } from "../utils/error";

const router = Router();

const repo = new CartRepository();
const service = new CartService(repo);

router.post(
  "/cart",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

router.get(
  "/cart",
  RequestAuthorizer,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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
  }
);

router.patch(
  "/cart/:lineItemId",
  RequestAuthorizer,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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
  }
);

router.delete(
  "/cart/:lineItemId",
  RequestAuthorizer,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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
  }
);

export default router;
