import { Router } from "express";
import { RequestAuthorizer } from "../middleware";

import {
  createCartController,
  deleteCartController,
  editCartController,
  getCartController,
} from "../controllers";

const router = Router();

router.post("/cart", RequestAuthorizer, createCartController);
router.get("/cart", RequestAuthorizer, getCartController);
router.patch("/cart/:lineItemId", RequestAuthorizer, editCartController);
router.delete("/cart/:lineItemId", RequestAuthorizer, deleteCartController);

export default router;
