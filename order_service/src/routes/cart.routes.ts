import { NextFunction, Request, Response, Router } from "express";
import { RequestValidator } from "../utils/requestValidator";
import { CartService } from "../services/cart.service";
import { CreateCart } from "../dto";
import { logger, STATUS_CODES } from "../utils";
import { CartRepository } from "../repository/cart.repository";
import { AuthenticatedRequest, RequestAuthorizer } from "../middleware";
import { GetProductDetails } from "../utils/broker";

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
        id: req.id,
      });

      res.status(STATUS_CODES.CREATED).json(response);
    } catch (error) {
      logger.error(error);
      _next(error);
    }
  }
);

router.get("/products", async (req, res, _next) => {
  try {
    const result = await GetProductDetails(1);
    res.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_ERROR).json(error);
  }
});

export default router;
