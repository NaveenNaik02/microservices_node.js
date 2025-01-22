import { NextFunction, Request, Response, Router } from "express";
import { RequestValidator } from "../utils/requestValidator";
import { CartService } from "../services/cart.service";
import { CreateCart } from "../dto";
import { STATUS_CODES } from "../utils";
import { CartRepository } from "../repository/cart.repository";
import { AuthenticatedRequest, RequestAuthorizer } from "../middleware";

const router = Router();

const repo = new CartRepository();
const service = new CartService(repo);

router.post(
  "/cart",
  RequestAuthorizer,
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const user = (req as AuthenticatedRequest).user;
      const { errors, input } = await RequestValidator(CreateCart, req.body);

      if (errors) {
        res.status(STATUS_CODES.BAD_REQUEST).json(errors);
      }
      const response = await service.createCart({
        ...input,
        customerId: user,
      });
    } catch (error) {}
  }
);
